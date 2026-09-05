// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import { QTag } from '../index';

describe('QTag 渲染', () => {
  it('应渲染 text 文本', () => {
    const { getByText } = render(QTag, { props: { text: '标签内容' } });
    expect(getByText('标签内容')).toBeTruthy();
  });

  it('默认应用 color=white 与 background 默认值', () => {
    const { container } = render(QTag, { props: { text: 'x' } });
    const span = container.querySelector('.tag')!;
    const style = span.getAttribute('style') ?? '';
    expect(style).toContain('color: white');
    expect(style).toContain('background: var(--q-color-tag)');
  });

  it('应将自定义 color/background 应用到 style', () => {
    const { container } = render(QTag, {
      props: { text: 'x', color: '#fff', background: '#000' },
    });
    const span = container.querySelector('.tag') as HTMLElement;
    // 真实浏览器会将颜色值解析为 rgb(...)，断言计算后的样式值
    expect(span.style.color).toBe('rgb(255, 255, 255)');
    expect(span.style.background).toBe('rgb(0, 0, 0)');
  });

  it('根元素应包含 tag 类名', () => {
    const { container } = render(QTag, { props: { text: 'x' } });
    expect(container.querySelector('.tag')).toBeTruthy();
  });
});
