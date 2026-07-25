// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QCarouselItem from '../CarouselItem.vue';

describe('QCarouselItem 渲染', () => {
  it('应渲染 carousel-item 根元素', () => {
    const { container } = render(QCarouselItem);
    expect(container.querySelector('.carousel-item')).toBeTruthy();
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QCarouselItem, {
      slots: { default: '第 1 张' },
    });
    expect(getByText('第 1 张')).toBeTruthy();
  });
});
