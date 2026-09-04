// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QRate from '../Rate.vue';

describe('QRate 快照/基础', () => {
  it('渲染 count 颗星', () => {
    const wrapper = mount(QRate, {
      props: { modelValue: 3, count: 5 },
    });
    expect(wrapper.findAll('.q-rate-star')).toHaveLength(5);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('点击整星触发取值', async () => {
    const wrapper = mount(QRate, {
      props: { modelValue: 0, count: 5 },
    });
    await wrapper.findAll('.q-rate-star')[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3]);
  });

  it('allowHalf 渲染左右半区', () => {
    const wrapper = mount(QRate, {
      props: { modelValue: 2.5, count: 3, allowHalf: true },
    });
    expect(wrapper.findAll('.q-rate-half')).toHaveLength(6);
  });

  it('自定义字符', () => {
    const wrapper = mount(QRate, {
      props: { modelValue: 1, count: 3, character: '赞' },
    });
    expect(wrapper.text()).toContain('赞');
  });
});
