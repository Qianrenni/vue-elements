// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';

import QCarouselItem from '../../CarouselItem/CarouselItem.vue';
import QCarousel from '../Carousel.vue';

describe('QCarousel 渲染', () => {
  it('应渲染 carousel 根元素及指示器', () => {
    const { container } = render(QCarousel, {
      props: { width: 300, height: 200, autoplay: false },
      slots: {
        default: () => [
          h(QCarouselItem, () => '第一张'),
          h(QCarouselItem, () => '第二张'),
        ],
      },
    });
    expect(container.querySelector('.carousel')).toBeTruthy();
    expect(container.querySelectorAll('.indicator')).toHaveLength(2);
  });

  it('showButton=false 时不应渲染切换按钮', () => {
    const { container } = render(QCarousel, {
      props: {
        width: 300,
        height: 200,
        autoplay: false,
        showButton: false,
      },
      slots: {
        default: () => [h(QCarouselItem, () => 'x')],
      },
    });
    // showButton=false 时只有指示器容器一个 carousel-indicators
    expect(container.querySelectorAll('.carousel-indicators')).toHaveLength(1);
  });

  it('indicator=false 时不应渲染指示器', () => {
    const { container } = render(QCarousel, {
      props: {
        width: 300,
        height: 200,
        autoplay: false,
        indicator: false,
      },
      slots: {
        default: () => [h(QCarouselItem, () => 'x')],
      },
    });
    expect(container.querySelectorAll('.indicator')).toHaveLength(0);
  });

  it('width/height 应应用到根元素 style', () => {
    const { container } = render(QCarousel, {
      props: { width: 250, height: 150, autoplay: false },
      slots: {
        default: () => [h(QCarouselItem, () => 'x')],
      },
    });
    const carousel = container.querySelector('.carousel') as HTMLElement;
    expect(carousel.style.width).toBe('250px');
    expect(carousel.style.height).toBe('150px');
  });
});
