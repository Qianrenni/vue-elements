// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormCheckboxGroup from '../FormCheckboxGroup.vue';

/**
 * QFormCheckboxGroup 快照测试：覆盖横向/纵向排列与选中状态。
 */
const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
];

describe('QFormCheckboxGroup 快照测试', () => {
  it('横向排列渲染', () => {
    const wrapper = mount(QFormCheckboxGroup, {
      props: {
        modelValue: ['vue'],
        options,
        label: '框架',
        name: 'frameworks',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('纵向排列渲染', () => {
    const wrapper = mount(QFormCheckboxGroup, {
      props: { modelValue: [], options, direction: 'vertical', name: 'f' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
