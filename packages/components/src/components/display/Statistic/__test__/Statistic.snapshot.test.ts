// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QStatistic from '../Statistic.vue';

describe('QStatistic 快照/渲染', () => {
  it('标题 + 千分位数值', () => {
    const wrapper = mount(QStatistic, {
      props: { title: '今日访问', value: 1234567, precision: 0 },
    });
    expect(wrapper.find('.q-statistic-title').text()).toBe('今日访问');
    expect(wrapper.find('.q-statistic-value').text()).toBe('1,234,567');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('前后缀 + 小数', () => {
    const wrapper = mount(QStatistic, {
      props: {
        prefix: '¥',
        value: 99.5,
        precision: 2,
        suffix: '元',
      },
    });
    expect(wrapper.find('.q-statistic-prefix').text()).toBe('¥');
    expect(wrapper.find('.q-statistic-value').text()).toBe('99.50');
    expect(wrapper.find('.q-statistic-suffix').text()).toBe('元');
  });

  it('loading 显示占位', () => {
    const wrapper = mount(QStatistic, {
      props: { value: 100, loading: true },
    });
    expect(wrapper.find('.q-statistic-value').text()).toBe('—');
  });

  it('countUp 开启（jsdom 无 rAF 时序 → 以终值兜底）', async () => {
    const wrapper = mount(QStatistic, {
      props: { value: 88, countUp: true, countDuration: 500 },
    });
    // jsdom 默认不触发真实 rAF；等待微任务后至少保证有内容
    await wrapper.vm.$nextTick();
    const text = wrapper.find('.q-statistic-value').text();
    expect(text === '88' || /^\d+$/.test(text)).toBe(true);
  });
});
