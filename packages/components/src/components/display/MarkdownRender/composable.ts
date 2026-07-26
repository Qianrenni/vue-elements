import '@/style/markdown.css';
import '@/style/vendor/katex.css';
import hljs from 'highlight.js';
import c from 'highlight.js/lib/languages/c';
import cplus from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { pinyin } from 'pinyin-pro';
import { nextTick, onBeforeMount, ref, useTemplateRef, watch } from 'vue';

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
  const tocExpanded = ref(props.showToc ?? false);
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
  /**
   * 解析 Markdown 文本，并为表格提供可横向滚动的容器。
   * @param content - 待解析的 Markdown 原文。
   * @returns Promise<void>，解析结果会写入 htmlContent。
   * @throws 当 Markdown 解析器无法处理输入内容时抛出异常。
   */
  async function parseMarkdown(content: string): Promise<void> {
    toc.value = [];
    const parsedContent = await marked.parse(content);
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
