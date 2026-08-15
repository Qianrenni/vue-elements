// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormSelect from '../FormSelect.vue';

/**
 * QFormSelect 快照测试：选项面板默认收起，覆盖未选中与已选中渲染。
 */
const options = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

describe('QFormSelect 快照测试', () => {
  it('未选中渲染', () => {
    const wrapper = mount(QFormSelect, {
      props: { options, placeholder: '请选择', name: 'sel' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('已选中渲染', () => {
    const wrapper = mount(QFormSelect, {
      props: { options, modelValue: '2', label: '分类', name: 'sel' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
