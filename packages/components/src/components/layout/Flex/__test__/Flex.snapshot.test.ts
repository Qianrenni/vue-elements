// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFlex from '../Flex.vue';

describe('QFlex 渲染', () => {
  it('默认横向 flex 容器与插槽', () => {
    const wrapper = mount(QFlex, {
      slots: { default: '<span class="a">A</span><span class="b">B</span>' },
    });
    const el = wrapper.get('.q-flex');
    const style = el.attributes('style') ?? '';
    expect(style).toContain('display: flex');
    expect(style).toContain('flex-direction: row');
    expect(wrapper.find('.a').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('vertical/wrap/justify/align/gap 生效', () => {
    const wrapper = mount(QFlex, {
      props: {
        vertical: true,
        wrap: true,
        justify: 'space-between',
        gap: 'small',
      },
    });
    const style = wrapper.get('.q-flex').attributes('style') ?? '';
    expect(style).toContain('flex-direction: column');
    expect(style).toContain('flex-wrap: wrap');
    expect(style).toContain('justify-content: space-between');
    expect(style).toContain('gap: 8px');
  });

  it('tag 支持自定义标签', () => {
    const wrapper = mount(QFlex, { props: { tag: 'section' } });
    expect(wrapper.get('.q-flex').element.tagName).toBe('SECTION');
  });
});
