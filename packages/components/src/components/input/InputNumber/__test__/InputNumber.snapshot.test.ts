// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QInputNumber from '../InputNumber.vue';

describe('QInputNumber 快照/基础', () => {
  it('受控值渲染', () => {
    const wrapper = mount(QInputNumber, {
      props: { modelValue: 5, min: 0, max: 10 },
    });
    expect(wrapper.find('input').element.value).toBe('5');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('点击加号步进并触发事件', async () => {
    const wrapper = mount(QInputNumber, {
      props: { modelValue: 0, step: 2, min: -10, max: 10 },
    });
    await wrapper.find('.q-input-number-plus').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2]);
    expect(wrapper.emitted('change')?.[0]).toEqual([2]);
    expect(wrapper.find('input').element.value).toBe('2');
  });

  it('达到最大值后加号禁用', async () => {
    const wrapper = mount(QInputNumber, {
      props: { modelValue: 10, step: 1, min: 0, max: 10 },
    });
    expect(
      wrapper.find('.q-input-number-plus').attributes('disabled'),
    ).toBeDefined();
    expect(
      wrapper.find('.q-input-number-minus').attributes('disabled'),
    ).toBeUndefined();
  });

  it('禁用态输入框禁用', () => {
    const wrapper = mount(QInputNumber, {
      props: { modelValue: 1, disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });
});
