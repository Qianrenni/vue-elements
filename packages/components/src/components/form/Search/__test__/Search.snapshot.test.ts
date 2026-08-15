// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QSearch from '../Search.vue';

/**
 * QSearch 快照测试：组件内嵌 QIcon（Search），需 stub fetch 后等待渲染。
 */
const svgResponse = (): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: { get: () => 'image/svg+xml' },
    text: () => Promise.resolve('<svg viewBox="0 0 24 24"></svg>'),
  }) as unknown as Response;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('QSearch 快照测试', () => {
  it('默认搜索框渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const wrapper = mount(QSearch);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('带占位符 + 禁用渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const wrapper = mount(QSearch, {
      props: { placeholder: '搜索关键词', disabled: true, name: 'q' },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
