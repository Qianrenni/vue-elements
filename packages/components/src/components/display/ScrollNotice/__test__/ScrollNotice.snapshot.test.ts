// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QScrollNotice from '../ScrollNotice.vue';

/**
 * QScrollNotice 快照测试：滚动动画由 requestAnimationFrame 驱动，
 * stub 为 no-op 后渲染保持静态，避免 DOM transform 被动画改写。
 */
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('QScrollNotice 快照测试', () => {
  it('默认插槽渲染', () => {
    vi.stubGlobal('requestAnimationFrame', vi.fn());
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const wrapper = mount(QScrollNotice, {
      slots: { default: '<span>最新公告：系统升级通知</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
