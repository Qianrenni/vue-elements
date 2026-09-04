// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSider from '../Sider.vue';

describe('QSider 快照测试', () => {
  it('默认深色 Sider 渲染', () => {
    const wrapper = mount(QSider, {
      slots: { default: '<div class="nav">导航</div>' },
    });
    expect(wrapper.classes()).toContain('q-layout-sider--dark');
    expect(wrapper.attributes('style')).toContain('width: 200px');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('折叠态渲染（collapsed + collapsible）', () => {
    const wrapper = mount(QSider, {
      props: { collapsible: true, collapsed: true },
      slots: { default: '<div class="nav">导航</div>' },
    });
    expect(wrapper.attributes('style')).toContain('width: 80px');
    expect(wrapper.find('.q-layout-sider-trigger').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
