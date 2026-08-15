// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormColorPicker from '../FormColorPicker.vue';

/**
 * QFormColorPicker 快照测试：覆盖默认与带标签/自定义颜色的渲染。
 */
describe('QFormColorPicker 快照测试', () => {
  it('默认颜色渲染', () => {
    const wrapper = mount(QFormColorPicker);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('带标签 + 自定义颜色渲染', () => {
    const wrapper = mount(QFormColorPicker, {
      props: { modelValue: '#f60', label: '主题色', name: 'color' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
