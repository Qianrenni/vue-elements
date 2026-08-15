// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormRadioGroup from '../FormRadioGroup.vue';

/**
 * QFormRadioGroup 快照测试：覆盖选中与纵向排列渲染。
 */
const options = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
];

describe('QFormRadioGroup 快照测试', () => {
  it('横向选中渲染', () => {
    const wrapper = mount(QFormRadioGroup, {
      props: { modelValue: 'male', options, label: '性别', name: 'gender' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('纵向排列渲染', () => {
    const wrapper = mount(QFormRadioGroup, {
      props: {
        modelValue: 'female',
        options,
        direction: 'vertical',
        name: 'g',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
