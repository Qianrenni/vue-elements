import '@/style/markdown.css';
import '@/style/vendor/katex.css';
import 'highlight.js/styles/github-dark.css';
import { nextTick, onBeforeMount, ref, useTemplateRef, watch } from 'vue';

import type { MarkdownRenderProps, TocItem } from './type';

// ==================== 重依赖懒加载 ====================
// marked / highlight.js / marked-katex-extension / pinyin-pro 体积大且带副作用，
// 仅在真正渲染 markdown 时才动态加载，避免进入组件库主 bundle。
interface HeavyDeps {
  hljs: typeof import('highlight.js').default;
  marked: typeof import('marked').marked;
  markedKatex: typeof import('marked-katex-extension').default;
  pinyin: (text: string) => string;
}

let heavyReady: Promise<HeavyDeps> | null = null;
let katexConfigured = false;

/** 懒加载 markdown 渲染所需的重量级依赖（模块级缓存，仅加载一次） */
function loadHeavyDeps(): Promise<HeavyDeps> {
  heavyReady ??= (async () => {
    const [hlMod, mdMod, mkMod, pyMod] = await Promise.all([
      import('highlight.js'),
      import('marked'),
      import('marked-katex-extension'),
      import('pinyin-pro'),
    ]);
    const hljs = (hlMod as { default: HeavyDeps['hljs'] }).default;
    const marked = (mdMod as { marked: HeavyDeps['marked'] }).marked;
    const markedKatex = (mkMod as { default: HeavyDeps['markedKatex'] })
      .default;
    const pinyin = (pyMod as { pinyin: HeavyDeps['pinyin'] }).pinyin;

    // 动态注册 highlight.js 语言
    const langLoaders: Record<string, () => Promise<unknown>> = {
      c: () => import('highlight.js/lib/languages/c'),
      cpp: () => import('highlight.js/lib/languages/cpp'),
      css: () => import('highlight.js/lib/languages/css'),
      java: () => import('highlight.js/lib/languages/java'),
      javascript: () => import('highlight.js/lib/languages/javascript'),
      json: () => import('highlight.js/lib/languages/json'),
      kotlin: () => import('highlight.js/lib/languages/kotlin'),
      python: () => import('highlight.js/lib/languages/python'),
      typescript: () => import('highlight.js/lib/languages/typescript'),
      xml: () => import('highlight.js/lib/languages/xml'),
      yaml: () => import('highlight.js/lib/languages/yaml'),
    };
    const langDefs: Record<string, unknown> = {};
    await Promise.all(
      Object.entries(langLoaders).map(async ([name, loader]) => {
        const mod = (await loader()) as { default: unknown };
        langDefs[name] = mod.default;
        hljs.registerLanguage(name, mod.default as never);
      }),
    );
    // 别名：html 复用 xml 语言函数，c++ 复用 cpp 语言函数
    hljs.registerLanguage('html', langDefs['xml'] as never);
    hljs.registerLanguage('c++', langDefs['cpp'] as never);

    return { hljs, marked, markedKatex, pinyin };
  })();
  return heavyReady;
}

// ==================== 工具函数 ====================

/** slugify 函数：中文转拼音、生成 ID */
function slugify(text: string, pinyin: (char: string) => string) {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, (char) => pinyin(char))
    .replace(/[^a-z\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** 滚动到指定 ID */
function scrollToIdFn(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', '#' + id);
  }
}

export function useMarkdownRender(props: MarkdownRenderProps) {
  const htmlContent = ref('');
  const toc = ref<TocItem[]>([]);
  const tocExpanded = ref(props.showToc ?? false);
  const refMarkdownContainer = useTemplateRef<HTMLElement>('markdownContainer');
  // 解析序号：懒加载使 parseMarkdown 变为真正的异步，
  // 并发调用时仅允许最后一次写入状态（避免 toc/htmlContent 重复）
  let parseSeq = 0;

  // 构建 marked renderer（依赖懒加载完成后调用；闭包捕获当前实例的 toc）
  function buildRenderer(deps: HeavyDeps) {
    const { hljs, marked, pinyin } = deps;
    const renderer = new marked.Renderer();

    renderer.code = function ({
      text: code,
      lang: infoString,
    }: {
      text: string;
      lang?: string;
    }) {
      const lang = (infoString || '').split(/\s+/)[0] || 'plaintext';
      const langAlias: Record<string, string> = {
        html: 'xml',
        vue: 'xml',
        jsx: 'javascript',
        tsx: 'typescript',
      };
      const resolvedLang = langAlias[lang.toLowerCase()] || lang;

      let highlighted: string;
      if (!resolvedLang || !hljs.getLanguage(resolvedLang)) {
        highlighted = hljs.highlight(code, { language: 'plaintext' }).value;
      } else {
        try {
          highlighted = hljs.highlight(code, { language: resolvedLang }).value;
        } catch (e) {
          console.warn(
            `Highlight.js 无法识别语言：${lang}，已降级为 plaintext ${e}`,
          );
          highlighted = hljs.highlight(code, { language: 'plaintext' }).value;
        }
      }

      return `<pre><code class="hljs language-${resolvedLang}">${highlighted}</code></pre>`;
    };

    renderer.image = function ({ href, title, text }) {
      let finalHref = href;
      if (!finalHref.startsWith('http')) {
        finalHref = `/images/${finalHref.replace(/^\.\/images\//, '')}`;
      }
      return `<img src="${finalHref}" alt="${text}" ${title ? `title="${title}"` : ''} />`;
    };

    renderer.heading = function (text) {
      const id = slugify(text.text, pinyin);
      toc.value.push({ id, text: text.text, level: text.depth });
      return `<h${text.depth} id="${id}">${text.text.replace(/\*+/g, '')}</h${text.depth}>`;
    };

    renderer.link = (payload) => {
      const href = payload.href;
      const text = payload.text;
      const title = payload.title || '';
      if (href && href.startsWith('#')) {
        return `<a href="#${slugify(href, pinyin)}" data-anchor>${text}</a>`;
      }
      return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank">${text}</a>`;
    };

    return renderer;
  }

  // 处理锚点点击事件
  function handleAnchorClick(e: MouseEvent) {
    e.preventDefault();
    const targetId = (e.target as HTMLAnchorElement)?.getAttribute('href');
    if (!targetId) return;
    if (targetId.startsWith('#')) {
      scrollToIdFn(targetId.slice(1));
    }
  }

  // DOM 更新后绑定事件
  function bindAnchorEvents() {
    const links = document.querySelectorAll('a[data-anchor]');
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      anchor.removeEventListener('click', handleAnchorClick);
      anchor.addEventListener('click', handleAnchorClick);
    });
  }

  // 解析 Markdown
  /**
   * 解析 Markdown 文本，并为表格提供可横向滚动的容器。
   * @param content - 待解析的 Markdown 原文。
   * @returns Promise<void>，解析结果会写入 htmlContent。
   * @throws 当 Markdown 解析器无法处理输入内容时抛出异常。
   */
  async function parseMarkdown(content: string): Promise<void> {
    const seq = ++parseSeq;
    toc.value = [];
    const deps = await loadHeavyDeps();
    if (seq !== parseSeq) return; // 已有更新的解析，放弃本次写入
    const { marked, markedKatex } = deps;
    // katex 扩展仅全局配置一次
    if (!katexConfigured) {
      marked.use(
        markedKatex({ output: 'mathml', strict: false, throwOnError: false }),
      );
      katexConfigured = true;
    }
    const renderer = buildRenderer(deps);
    const parsedContent = await marked.parse(content, {
      renderer,
      gfm: true,
      breaks: false,
      pedantic: false,
    });
    if (seq !== parseSeq) return; // 再次检查，避免被更新的解析覆盖
    htmlContent.value = parsedContent
      .replace(/<table>/g, '<div class="markdown-table-wrapper"><table>')
      .replace(/<\/table>/g, '</table></div>');
    nextTick(() => {
      bindAnchorEvents();
    });
  }

  function toggleToc() {
    tocExpanded.value = !tocExpanded.value;
  }

  function scrollToHeading(id: string) {
    scrollToIdFn(id);
  }

  const copyHandler = async () => {
    navigator.clipboard.writeText(props.content);
  };

  // 监听 content 变化
  watch(
    () => props.content,
    (newVal) => {
      parseMarkdown(newVal);
    },
    { immediate: true },
  );

  onBeforeMount(() => {
    parseMarkdown(props.content);
  });

  return {
    htmlContent,
    toc,
    tocExpanded,
    refMarkdownContainer,
    toggleToc,
    scrollToHeading,
    copyHandler,
    parseMarkdown,
    getTOC: () => toc.value,
    scrollToById: (id: string) => scrollToIdFn(id),
    scrollTo: (options: {
      left?: number;
      top?: number;
      behavior?: 'smooth' | 'auto' | 'instant';
    }) => {
      refMarkdownContainer.value?.scrollTo(options);
    },
    getContent: () => props.content,
  };
}
