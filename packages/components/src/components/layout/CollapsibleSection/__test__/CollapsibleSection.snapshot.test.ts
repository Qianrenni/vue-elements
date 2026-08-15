// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCollapsibleSection from '../CollapsibleSection.vue';

/**
 * QCollapsibleSection 快照测试：覆盖默认展开、收起与隐藏箭头三种状态。
 */
describe('QCollapsibleSection 快照测试', () => {
  it('默认展开渲染', () => {
    const wrapper = mount(QCollapsibleSection, {
      slots: { default: '<p>可折叠内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('初始收起渲染', () => {
    const wrapper = mount(QCollapsibleSection, {
      props: { initialExpanded: false },
      slots: { default: '<p>可折叠内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('隐藏箭头渲染', () => {
    const wrapper = mount(QCollapsibleSection, {
      props: { isShowArrow: false },
      slots: { default: '<p>内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
