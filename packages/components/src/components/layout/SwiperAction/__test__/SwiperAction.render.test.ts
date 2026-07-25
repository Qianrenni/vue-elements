// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QSwiperAction from '../SwiperAction.vue';

describe('QSwiperAction 渲染', () => {
  it('应渲染 swiper-action 根元素及 inner 容器', () => {
    const { container } = render(QSwiperAction);
    expect(container.querySelector('.swiper-action')).toBeTruthy();
    expect(container.querySelector('.swiper-action__inner')).toBeTruthy();
  });

  it('应渲染默认插槽与 action 插槽', () => {
    const { getByText } = render(QSwiperAction, {
      slots: { default: '主内容', action: '删除' },
    });
    expect(getByText('主内容')).toBeTruthy();
    expect(getByText('删除')).toBeTruthy();
  });

  it('inner 应有 translateX(0px) 初始 transform', () => {
    const { container } = render(QSwiperAction);
    const inner = container.querySelector(
      '.swiper-action__inner',
    ) as HTMLElement;
    expect(inner.style.transform).toBe('translateX(0px)');
  });

  it('主内容区与操作区应同时存在', () => {
    const { container } = render(QSwiperAction);
    expect(container.querySelector('.swiper-action__content')).toBeTruthy();
    expect(container.querySelector('.swiper-action__action')).toBeTruthy();
  });
});
