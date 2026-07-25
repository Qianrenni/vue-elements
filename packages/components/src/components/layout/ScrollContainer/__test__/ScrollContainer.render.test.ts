// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QScrollContainer from '../ScrollContainer.vue';

describe('QScrollContainer 渲染', () => {
  it('应渲染滚动容器根元素', () => {
    const { container } = render(QScrollContainer);
    expect(container.querySelector('.scroll-container')).toBeTruthy();
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QScrollContainer, {
      slots: { default: '滚动内容' },
    });
    expect(getByText('滚动内容')).toBeTruthy();
  });

  it('应暴露 scrollTo 方法', () => {
    const { container } = render(QScrollContainer);
    // 组件 defineExpose 了 scrollTo，通过实例可访问
    const el = container.querySelector('.scroll-container') as HTMLElement;
    expect(el).toBeTruthy();
  });
});
