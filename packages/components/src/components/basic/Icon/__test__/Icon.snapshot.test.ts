// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { IconConfig } from '../composable';
import QIcon from '../Icon.vue';

/**
 * QIcon 快照测试：图标为异步 fetch 加载，需 stub fetch 后 flushPromises 等待渲染。
 */
const createResponse = (body: string): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: { get: () => 'image/svg+xml' },
    text: () => Promise.resolve(body),
  }) as unknown as Response;

afterEach(() => {
  vi.unstubAllGlobals();
  IconConfig.setBase('');
});

describe('QIcon 快照测试', () => {
  it('加载 SVG 后应渲染带尺寸的图标', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(createResponse('<svg viewBox="0 0 24 24"></svg>')),
    );

    const wrapper = mount(QIcon, { props: { icon: 'home', size: 16 } });
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('加载失败时应降级为空 div', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network error')),
    );

    const wrapper = mount(QIcon, { props: { icon: 'missing', size: 24 } });
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
