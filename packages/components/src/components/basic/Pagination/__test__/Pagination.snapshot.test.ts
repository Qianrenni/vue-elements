// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QPagination from '../Pagination.vue';

/**
 * QPagination 快照测试：组件内嵌 QIcon，需 stub fetch 后 flushPromises 等待图标渲染。
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

describe('QPagination 快照测试', () => {
  it('中间页码渲染', async () => {
    stubFetchSvg();
    const wrapper = mount(QPagination, {
      props: { currentPage: 3, totalPages: 10 },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('第一页渲染(上一页禁用)', async () => {
    stubFetchSvg();
    const wrapper = mount(QPagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
