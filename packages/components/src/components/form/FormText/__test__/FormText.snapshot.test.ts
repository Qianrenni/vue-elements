// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QFormText from '../FormText.vue';

/**
 * QFormText 快照测试：带前缀图标时内嵌 QIcon，需 stub fetch 后等待渲染。
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

describe('QFormText 快照测试', () => {
  it('默认文本输入渲染', () => {
    const wrapper = mount(QFormText, {
      props: {
        modelValue: '',
        label: '用户名',
        name: 'username',
        placeholder: '请输入用户名',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('带前缀图标渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const wrapper = mount(QFormText, {
      props: { modelValue: 'admin', name: 'username', prefixIcon: 'User' },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
