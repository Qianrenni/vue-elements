// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QThemeToggle from '../ThemeToggle.vue';

/**
 * QThemeToggle 快照测试：组件内嵌 QIcon（随系统主题切换日/夜图标），
 * 需 stub fetch 后 flushPromises 等待图标渲染。matchMedia 已由 setup.ts polyfill。
 */
const svgResponse = (): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: { get: () => 'image/svg+xml' },
    text: () => Promise.resolve('<svg viewBox="0 0 24 24"></svg>'),
  }) as unknown as Response;

const stubFetchSvg = () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('QThemeToggle 快照测试', () => {
  it('默认尺寸渲染', async () => {
    stubFetchSvg();
    const wrapper = mount(QThemeToggle);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义尺寸渲染', async () => {
    stubFetchSvg();
    const wrapper = mount(QThemeToggle, { props: { size: 32 } });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
