// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QButton from '../Button.vue';

/**
 * QButton 快照测试：覆盖语义类型、尺寸、状态与链接形态的 DOM 结构。
 */
describe('QButton 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QButton, { slots: { default: '按钮' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('type=primary + size=large 渲染', () => {
    const wrapper = mount(QButton, {
      props: { type: 'primary', size: 'large' },
      slots: { default: '主按钮' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('danger + loading 渲染', () => {
    const wrapper = mount(QButton, {
      props: { type: 'primary', danger: true, loading: true },
      slots: { default: '删除中' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('disabled + block 渲染', () => {
    const wrapper = mount(QButton, {
      props: { block: true, disabled: true },
      slots: { default: '禁用' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('href 链接渲染', () => {
    const wrapper = mount(QButton, {
      props: { href: 'https://example.com', target: '_blank' },
      slots: { default: '链接' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
