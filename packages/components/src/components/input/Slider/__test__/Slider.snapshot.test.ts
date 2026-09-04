// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSlider from '../Slider.vue';

describe('QSlider 快照/基础', () => {
  it('渲染轨道/填充/手柄', () => {
    const wrapper = mount(QSlider, {
      props: { modelValue: 50, min: 0, max: 100 },
    });
    expect(wrapper.find('.q-slider-rail').exists()).toBe(true);
    expect(wrapper.find('.q-slider-handle').attributes('style')).toContain(
      '50%',
    );
    expect(wrapper.find('.q-slider-fill').attributes('style')).toContain('50%');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('键盘右移一步', async () => {
    const wrapper = mount(QSlider, {
      props: { modelValue: 50, min: 0, max: 100, step: 10 },
    });
    await wrapper
      .find('.q-slider-handle')
      .trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([60]);
    expect(wrapper.emitted('change')?.[0]).toEqual([60]);
  });

  it('禁用时键盘无响应', async () => {
    const wrapper = mount(QSlider, {
      props: { modelValue: 50, min: 0, max: 100, disabled: true },
    });
    await wrapper
      .find('.q-slider-handle')
      .trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('渲染刻度标记', () => {
    const wrapper = mount(QSlider, {
      props: { modelValue: 50, marks: { 0: '0', 50: '50', 100: '100' } },
    });
    expect(wrapper.findAll('.q-slider-mark-label')).toHaveLength(3);
    expect(wrapper.findAll('.q-slider-mark-dot')).toHaveLength(3);
  });
});
