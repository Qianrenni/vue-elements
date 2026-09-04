// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSpace from '../Space.vue';

/**
 * QSpace 快照测试：覆盖默认、垂直、间距档位等 DOM 结构。
 */
describe('QSpace 快照测试', () => {
  it('默认水平渲染', () => {
    const wrapper = mount(QSpace, {
      slots: { default: '<span>A</span><span>B</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('vertical + large 渲染', () => {
    const wrapper = mount(QSpace, {
      props: { direction: 'vertical', size: 'large' },
      slots: { default: '<span>一</span><span>二</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('wrap + align=end 渲染', () => {
    const wrapper = mount(QSpace, {
      props: { wrap: true, align: 'end' },
      slots: { default: '<span>A</span><span>B</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
