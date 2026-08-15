// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QNavSection from '../NavSection.vue';
import type { NavSectionProps } from '../type';

/**
 * QNavSection 快照测试：初始层级渲染（栈深为 1 时无返回按钮、无 QIcon）。
 */
const sections: NavSectionProps[] = [
  {
    title: '首页',
    value: 'home',
    children: [{ title: '首页1', value: 'home1' }],
  },
  { title: '产品', value: 'products' },
  { title: '关于', value: 'about' },
];

describe('QNavSection 快照测试', () => {
  it('初始层级渲染', () => {
    const wrapper = mount(QNavSection, { props: { sections, title: '导航' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('空导航列表渲染', () => {
    const wrapper = mount(QNavSection, {
      props: { sections: [], title: '导航' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
