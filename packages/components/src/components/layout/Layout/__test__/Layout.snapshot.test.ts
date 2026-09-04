// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QLayout from '../Layout.vue';

describe('QLayout 快照测试', () => {
  it('默认纵向布局渲染', () => {
    const wrapper = mount(QLayout, {
      slots: { default: '<div class="child">内容</div>' },
    });
    expect(wrapper.classes()).toContain('q-layout');
    expect(wrapper.classes()).not.toContain('q-layout--has-sider');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('强制 hasSider 横向布局', () => {
    const wrapper = mount(QLayout, {
      props: { hasSider: true },
      slots: { default: '<div class="child">内容</div>' },
    });
    expect(wrapper.classes()).toContain('q-layout--has-sider');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
