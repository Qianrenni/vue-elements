// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormRangeSlider from '../FormRangeSlider.vue';

/**
 * QFormRangeSlider 快照测试：覆盖水平与垂直方向的滑块渲染。
 */
describe('QFormRangeSlider 快照测试', () => {
  it('水平方向渲染', () => {
    const wrapper = mount(QFormRangeSlider, {
      props: { modelValue: 30, label: '音量', name: 'volume' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('垂直方向渲染', () => {
    const wrapper = mount(QFormRangeSlider, {
      props: {
        modelValue: 80,
        direction: 'vertical',
        min: 0,
        max: 200,
        step: 10,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
