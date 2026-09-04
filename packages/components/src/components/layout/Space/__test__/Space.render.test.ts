// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QSpace from '../Space.vue';

describe('QSpace 渲染', () => {
  it('应渲染容器并应用默认间距', () => {
    const { container } = render(QSpace, {
      slots: { default: '<span>A</span><span>B</span>' },
    });
    const el = container.querySelector('div.q-space') as HTMLElement;

    expect(el).toBeTruthy();
    expect(el.style.columnGap).toBe('var(--q-space-6)');
  });

  it('direction=vertical 应附加垂直修饰类', () => {
    const { container } = render(QSpace, {
      props: { direction: 'vertical' },
      slots: { default: '<span>A</span><span>B</span>' },
    });
    expect(
      (container.querySelector('.q-space') as HTMLElement).classList.contains(
        'q-space--vertical',
      ),
    ).toBe(true);
  });

  it('size 数值应反映到 inline gap', () => {
    const { container } = render(QSpace, {
      props: { size: 24 },
      slots: { default: '<span>A</span><span>B</span>' },
    });
    const el = container.querySelector('.q-space') as HTMLElement;
    expect(el.style.columnGap).toBe('24px');
  });

  it('split=true 应附加分隔条类', () => {
    const { container } = render(QSpace, {
      props: { split: true },
      slots: { default: '<span>A</span><span>B</span>' },
    });
    const el = container.querySelector('.q-space') as HTMLElement;
    expect(el.classList.contains('q-space--split-bar')).toBe(true);
    expect(el.style.columnGap).toBe('0px');
  });

  it('split 字符串应写入 content 变量', () => {
    const { container } = render(QSpace, {
      props: { split: '/' },
      slots: { default: '<span>A</span><span>B</span>' },
    });
    const el = container.querySelector('.q-space') as HTMLElement;
    expect(el.style.getPropertyValue('--q-split-content')).toBe(
      '" /"'.replace(' ', ''),
    );
  });
});
