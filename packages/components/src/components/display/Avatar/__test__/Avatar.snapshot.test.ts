// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QAvatar from '../Avatar.vue';

/**
 * QAvatar 快照测试：懒加载依赖 IntersectionObserver（jsdom 未实现），
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

describe('QAvatar 快照测试', () => {
  it('未加载时渲染骨架屏占位', () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const wrapper = mount(QAvatar, {
      props: { url: 'https://example.com/a.png' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义尺寸渲染', () => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    const wrapper = mount(QAvatar, {
      props: { url: 'https://example.com/a.png', size: '3rem', alt: '用户' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
