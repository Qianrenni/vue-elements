// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTag from '../Tag.vue';

/**
 * QTag 快照测试：校验默认/自定义样式下渲染出的 DOM 结构稳定。
 */
describe('QTag 快照测试', () => {
  it('默认属性渲染', () => {
    const wrapper = mount(QTag, { props: { text: '默认标签' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义颜色与背景渲染', () => {
    const wrapper = mount(QTag, {
      props: { text: '自定义', color: '#f60', background: '#ffd' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
