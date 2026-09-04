// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCol from '../Col.vue';

describe('QCol 快照测试', () => {
  it('默认 span=24 渲染', () => {
    const wrapper = mount(QCol, { slots: { default: '内容' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('span + offset 渲染', () => {
    const wrapper = mount(QCol, {
      props: { span: 8, offset: 4 },
      slots: { default: '内容' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
