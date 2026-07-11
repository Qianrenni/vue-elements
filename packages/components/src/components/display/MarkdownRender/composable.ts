import { nextTick, onBeforeMount, ref, useTemplateRef, watch } from 'vue';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import hljs from 'highlight.js';
import '@/style/gitub-markdown.css';
import 'highlight.js/styles/github-dark.css';
import '@/style/katex.css';
import { pinyin } from 'pinyin-pro';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import cplus from 'highlight.js/lib/languages/cpp';
import c from 'highlight.js/lib/languages/c';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import type { MarkdownRenderProps, TocItem } from './type';

// 注册 highlight.js 语言
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('c++', cplus);
hljs.registerLanguage('c', c);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);

// slugify 函数：中文转拼音、生成 ID
function slugify(text: string) {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, (char) => pinyin(char))
    .replace(/[^a-z\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 滚动到指定 ID
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
  const tocExpanded = ref(false);
  const refMarkdownContainer = useTemplateRef<HTMLElement>('markdownContainer');

  // 自定义 renderer
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
    const id = slugify(text.text);
    toc.value.push({ id, text: text.text, level: text.depth });
    return `<h${text.depth} id="${id}">${text.text.replace(/\*+/g, '')}</h${text.depth}>`;
  };

  renderer.link = (payload) => {
    const href = payload.href;
    const text = payload.text;
    const title = payload.title || '';
    if (href && href.startsWith('#')) {
      return `<a href="#${slugify(href)}" data-anchor>${text}</a>`;
    }
    return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank">${text}</a>`;
  };

  // 配置 marked
  marked.use(
    markedKatex({ output: 'mathml', strict: false, throwOnError: false }),
  );
  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  });

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
  async function parseMarkdown(content: string) {
    toc.value = [];
    htmlContent.value = await marked.parse(content);
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
