// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormSwitch from '../FormSwitch.vue';

/**
 * QFormSwitch 快照测试：覆盖开/关、带标签与尺寸三种渲染。
 */
describe('QFormSwitch 快照测试', () => {
  it('关闭状态渲染', () => {
    const wrapper = mount(QFormSwitch, {
      props: { modelValue: false, name: 'sw' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('开启 + 标签渲染', () => {
    const wrapper = mount(QFormSwitch, {
      props: { modelValue: true, label: '启用通知', name: 'sw' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('大尺寸渲染', () => {
    const wrapper = mount(QFormSwitch, {
      props: { modelValue: true, size: 'large', name: 'sw' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
