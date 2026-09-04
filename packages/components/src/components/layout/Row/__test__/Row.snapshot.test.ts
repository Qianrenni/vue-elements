// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QRow from '../Row.vue';

describe('QRow 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QRow, {
      slots: { default: '<div>A</div><div>B</div>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('gutter + justify=center 渲染', () => {
    const wrapper = mount(QRow, {
      props: { gutter: 16, justify: 'center' },
      slots: { default: '<div>A</div>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
