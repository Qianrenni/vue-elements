// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTab from '../Tab.vue';

/**
 * QTab 快照测试：覆盖默认与自定义激活类名的标签列表渲染。
 */
describe('QTab 快照测试', () => {
  it('标签列表默认渲染', () => {
    const wrapper = mount(QTab, { props: { list: ['首页', '产品', '关于'] } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义激活类名渲染', () => {
    const wrapper = mount(QTab, {
      props: { list: ['选项A', '选项B'], activeClass: 'custom-active' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
