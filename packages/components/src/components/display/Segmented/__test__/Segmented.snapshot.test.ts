// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSegmented from '../Segmented.vue';

const OPTIONS = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week', disabled: true },
  { label: '月', value: 'month' },
];

describe('QSegmented 快照/渲染', () => {
  it('渲染选项与选中态', () => {
    const wrapper = mount(QSegmented, {
      props: { options: OPTIONS, modelValue: 'day' },
    });
    const items = wrapper.findAll('.q-segmented-item');
    expect(items).toHaveLength(3);
    expect(items[0].classes()).toContain('q-segmented-item--selected');
    expect(items[1].classes()).toContain('q-segmented-item--disabled');
    expect(items[0].attributes('aria-checked')).toBe('true');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('点击选项触发选中事件（受控）', async () => {
    const wrapper = mount(QSegmented, {
      props: { options: OPTIONS, modelValue: 'day' },
    });
    await wrapper.findAll('.q-segmented-item')[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['month']);
    expect(wrapper.emitted('change')?.[0]).toEqual(['month']);
  });

  it('点击禁用项不触发', async () => {
    const wrapper = mount(QSegmented, {
      props: { options: OPTIONS, modelValue: 'day' },
    });
    await wrapper.findAll('.q-segmented-item')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('键盘：右箭头 + Enter 选中下一项', async () => {
    const wrapper = mount(QSegmented, {
      props: { options: OPTIONS, modelValue: 'day' },
    });
    const root = wrapper.find('.q-segmented');
    await root.trigger('keydown', { key: 'ArrowRight' });
    await root.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['month']);
  });

  it('block/vertical/size 修饰类', () => {
    const wrapper = mount(QSegmented, {
      props: {
        options: OPTIONS,
        modelValue: 'day',
        block: true,
        size: 'large',
      },
    });
    expect(wrapper.classes()).toContain('q-segmented--block');
    expect(wrapper.classes()).toContain('q-segmented--large');
  });
});
