// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import QCascader from '../Cascader.vue';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [{ value: 'xihu', label: '西湖' }],
      },
    ],
  },
  { value: 'jiangsu', label: '江苏' },
];

describe('QCascader 快照/交互', () => {
  afterEach(() => {
    document.body.querySelectorAll('.q-cascader-dropdown').forEach((n) => {
      n.remove();
    });
  });

  it('占位态 + 展开根列', async () => {
    const wrapper = mount(QCascader, {
      props: { options, placeholder: '请选择区域' },
      attachTo: document.body,
    });
    expect(wrapper.find('.q-cascader-placeholder').text()).toBe('请选择区域');
    await wrapper.find('.q-cascader-trigger').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.q-cascader-dropdown').isVisible()).toBe(true);
    expect(wrapper.findAll('.q-cascader-col')).toHaveLength(1);
    const labels = wrapper
      .findAll('.q-cascader-option-label')
      .map((n) => n.text());
    expect(labels).toEqual(['浙江', '江苏']);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('逐级 drill 到叶子选中并回填', async () => {
    const wrapper = mount(QCascader, {
      props: { options },
      attachTo: document.body,
    });
    await wrapper.find('.q-cascader-trigger').trigger('click');
    await wrapper.vm.$nextTick();

    const clickByText = async (text: string) => {
      const opt = wrapper
        .findAll('.q-cascader-option')
        .find((n) => n.find('.q-cascader-option-label').text() === text);
      expect(opt).toBeTruthy();
      await opt?.trigger('click');
      await wrapper.vm.$nextTick();
    };

    await clickByText('浙江');
    expect(wrapper.findAll('.q-cascader-col')).toHaveLength(2);
    await clickByText('杭州');
    expect(wrapper.findAll('.q-cascader-col')).toHaveLength(3);
    await clickByText('西湖');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
      ['zhejiang', 'hangzhou', 'xihu'],
    ]);
    // 叶子选中后面板收起
    expect(wrapper.find('.q-cascader-dropdown').isVisible()).toBe(false);
    // 父组件回写 v-model → 回填文案
    await wrapper.setProps({
      modelValue: ['zhejiang', 'hangzhou', 'xihu'],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.q-cascader-value').text()).toBe('浙江/杭州/西湖');
    wrapper.unmount();
  });
});
