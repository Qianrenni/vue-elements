// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QLazyImage from '../LazyImage.vue';

/**
 * QLazyImage 快照测试：懒加载依赖 IntersectionObserver（jsdom 未实现），
 * stub 后初始渲染为骨架屏占位。snapshot 前不触发 intersection，保持静态。
 */
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('QLazyImage 快照测试', () => {
  it('未加载时渲染骨架屏占位', () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const wrapper = mount(QLazyImage, {
      props: { src: 'https://example.com/img.png' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义宽高渲染', () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const wrapper = mount(QLazyImage, {
      props: { src: 'https://example.com/img.png', width: 200, height: 120 },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
