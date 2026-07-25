import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMarkdownRender } from '../composable';
import type { MarkdownRenderProps } from '../type';

describe('useMarkdownRender', () => {
  beforeEach(() => {
    // Node 环境无 DOM，为 nextTick 中的锚点绑定逻辑提供最小 document stub
    vi.stubGlobal('document', {
      querySelectorAll: () => [],
      getElementById: () => null,
    });
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  /**
   * 创建组合式函数实例并完成初次解析
   * @param content Markdown 内容
   * @returns useMarkdownRender 的返回值
   */
  const createRender = async (content: string) => {
    const props: MarkdownRenderProps = { content };
    const render = useMarkdownRender(props);
    await render.parseMarkdown(content);
    return render;
  };

  it('应该将 Markdown 解析为 HTML', async () => {
    const { htmlContent } = await createRender('**bold** text');

    expect(htmlContent.value).toContain('<strong>bold</strong>');
  });

  it('应该为标题生成 id 并收集目录', async () => {
    const { htmlContent, toc } = await createRender(
      '# Hello World\n\n## Sub Title',
    );

    expect(htmlContent.value).toContain('<h1 id="hello-world">');
    expect(toc.value).toEqual([
      { id: 'hello-world', text: 'Hello World', level: 1 },
      { id: 'sub-title', text: 'Sub Title', level: 2 },
    ]);
  });

  it('应该为中文标题生成非空 id', async () => {
    const { toc } = await createRender('# 中文标题');

    expect(toc.value).toHaveLength(1);
    expect(toc.value[0].id.length).toBeGreaterThan(0);
  });

  it('应该在重新解析时重置目录', async () => {
    const render = await createRender('# First');
    await render.parseMarkdown('# Second');

    expect(render.toc.value).toHaveLength(1);
    expect(render.toc.value[0].text).toBe('Second');
  });

  it('应该高亮代码块并标记语言类名', async () => {
    const { htmlContent } = await createRender(
      '```typescript\nconst a: number = 1;\n```',
    );

    expect(htmlContent.value).toContain('language-typescript');
    expect(htmlContent.value).toContain('hljs');
  });

  it('应该将未知语言的代码块降级为 plaintext 渲染', async () => {
    const { htmlContent } = await createRender(
      '```unknownlang\nsome code\n```',
    );

    expect(htmlContent.value).toContain('<pre><code class="hljs');
    expect(htmlContent.value).toContain('some code');
  });

  it('应该重写相对路径图片地址', async () => {
    const { htmlContent } = await createRender('![pic](./images/pic.png)');

    expect(htmlContent.value).toContain('src="/images/pic.png"');
  });

  it('应该保留 http 图片地址', async () => {
    const { htmlContent } = await createRender(
      '![pic](https://example.com/p.png)',
    );

    expect(htmlContent.value).toContain('src="https://example.com/p.png"');
  });

  it('应该为表格添加横向滚动容器', async () => {
    const { htmlContent } = await createRender(
      '| 参数 | 类型 |\n| --- | --- |\n| color | string |',
    );

    expect(htmlContent.value).toContain(
      '<div class="markdown-table-wrapper"><table>',
    );
    expect(htmlContent.value).toContain('</table></div>');
  });

  it('应该为外部链接添加 target="_blank"', async () => {
    const { htmlContent } = await createRender('[site](https://example.com)');

    expect(htmlContent.value).toContain('target="_blank"');
  });

  it('应该为锚点链接添加 data-anchor 标记', async () => {
    const { htmlContent } = await createRender('[jump](#section)');

    expect(htmlContent.value).toContain('data-anchor');
    expect(htmlContent.value).toContain('href="#section"');
  });

  it('应该切换目录展开状态', async () => {
    const { tocExpanded, toggleToc } = await createRender('# Title');

    expect(tocExpanded.value).toBe(false);
    toggleToc();
    expect(tocExpanded.value).toBe(true);
  });

  it('应该通过 copyHandler 复制原始内容', async () => {
    const writeText = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const { copyHandler } = await createRender('raw content');
    await copyHandler();

    expect(writeText).toHaveBeenCalledWith('raw content');
  });

  it('应该通过 getContent 返回原始内容', async () => {
    const { getContent } = await createRender('# Title');

    expect(getContent()).toBe('# Title');
  });
});
