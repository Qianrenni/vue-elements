// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QScrollNotice from '../ScrollNotice.vue';

describe('QScrollNotice 渲染', () => {
  it('应渲染滚动容器与文本节点', () => {
    const { container, getByText } = render(QScrollNotice, {
      slots: { default: '通知内容' },
    });
    expect(container.querySelector('.scroll-text')).toBeTruthy();
    expect(getByText('通知内容')).toBeTruthy();
  });

  it('外层容器应设置 overflow:hidden', () => {
    const { container } = render(QScrollNotice, {
      slots: { default: 'x' },
    });
    const outer = container.querySelector(
      'div[style*="overflow"]',
    ) as HTMLElement;
    expect(outer).toBeTruthy();
    expect(outer.style.overflow).toBe('hidden');
  });
});
