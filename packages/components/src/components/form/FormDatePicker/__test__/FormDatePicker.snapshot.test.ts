// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormDatePicker from '../FormDatePicker.vue';

/**
 * QFormDatePicker 快照测试：覆盖默认 date 类型与带标签/值的渲染。
 */
describe('QFormDatePicker 快照测试', () => {
  it('默认 date 类型渲染', () => {
    const wrapper = mount(QFormDatePicker, {
      props: { modelValue: '2026-08-15' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('datetime-local 类型 + 标签渲染', () => {
    const wrapper = mount(QFormDatePicker, {
      props: {
        modelValue: '2026-08-15T10:00',
        type: 'datetime-local',
        label: '开始时间',
        name: 'start',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
