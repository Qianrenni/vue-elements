// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QMenu from '../Menu.vue';

const items = [
  { key: 'nav', label: '导航', children: [{ key: 'item', label: '子项' }] },
  { key: 'other', label: '其他' },
];

describe('QMenu 快照测试', () => {
  it('inline 模式渲染', () => {
    const wrapper = mount(QMenu, {
      props: { mode: 'inline', items },
    });
    expect(wrapper.find('.q-menu--inline').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('horizontal 模式渲染', () => {
    const wrapper = mount(QMenu, {
      props: { mode: 'horizontal', items },
    });
    expect(wrapper.find('.q-menu--horizontal').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('选中态渲染', () => {
    const wrapper = mount(QMenu, {
      props: {
        mode: 'inline',
        items,
        selectedKeys: ['item'],
        openKeys: ['nav'],
      },
    });
    expect(wrapper.find('.q-menu-item--selected').text()).toContain('子项');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
