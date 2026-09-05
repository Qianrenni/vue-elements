// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QDescriptions from '../Descriptions.vue';

const ITEMS = [
  { key: 'name', label: '姓名', content: '张三' },
  { key: 'phone', label: '电话', content: '1810000000' },
  { key: 'city', label: '城市', content: '杭州' },
];

describe('QDescriptions 渲染', () => {
  it('默认 horizontal 三列渲染项与标题', () => {
    const wrapper = mount(QDescriptions, {
      props: { title: '用户信息', items: ITEMS },
    });
    expect(wrapper.find('.q-descriptions-title').text()).toBe('用户信息');
    expect(wrapper.findAll('.q-descriptions-item')).toHaveLength(3);
    expect(wrapper.find('.q-descriptions-label').text()).toBe('姓名:');
    expect(wrapper.find('.q-descriptions-content').text()).toBe('张三');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('vertical 布局标签在上方', () => {
    const wrapper = mount(QDescriptions, {
      props: { items: ITEMS, layout: 'vertical' },
    });
    expect(wrapper.find('.q-descriptions').classes()).toContain(
      'q-descriptions--vertical',
    );
  });

  it('bordered + size large + 自定义冒号关闭', () => {
    const wrapper = mount(QDescriptions, {
      props: { items: ITEMS, bordered: true, size: 'large', colon: false },
    });
    expect(wrapper.find('.q-descriptions').classes()).toContain(
      'q-descriptions--bordered',
    );
    expect(wrapper.find('.q-descriptions').classes()).toContain(
      'q-descriptions-size--large',
    );
    expect(wrapper.find('.q-descriptions-label').text()).toBe('姓名');
  });

  it('span 跨列 + 具名插槽覆盖内容', () => {
    const wrapper = mount(QDescriptions, {
      props: {
        items: [
          { key: 'name', label: '姓名', content: '张三' },
          { key: 'desc', label: '描述', span: 2 },
        ],
        column: 3,
      },
      slots: {
        desc: `<template #desc="{ item }">自定义 {{ item.label }}</template>`,
      },
    });
    const items = wrapper.findAll('.q-descriptions-item');
    expect(items[1].attributes('style')).toContain('grid-column: span 2');
    expect(items[1].text()).toContain('自定义 描述');
  });
});
