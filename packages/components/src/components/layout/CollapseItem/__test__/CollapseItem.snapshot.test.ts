// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCollapseItem from '../CollapseItem.vue';

/**
 * QCollapseItem 快照测试：独立挂载（无父级 Collapse 时走默认上下文），
 * 覆盖默认、禁用两种状态。
 */
describe('QCollapseItem 快照测试', () => {
  it('默认状态渲染', () => {
    const wrapper = mount(QCollapseItem, {
      props: { name: '1', title: '面板标题' },
      slots: { default: '<p>折叠内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('禁用状态渲染', () => {
    const wrapper = mount(QCollapseItem, {
      props: { name: '2', title: '禁用面板', disabled: true },
      slots: { default: '<p>内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
