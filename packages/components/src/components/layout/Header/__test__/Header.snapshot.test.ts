// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QHeader from '../Header.vue';

describe('QHeader 快照测试', () => {
  it('默认渲染', () => {
    const wrapper = mount(QHeader, {
      slots: { default: '<span>Logo</span>' },
    });
    expect(wrapper.element.tagName).toBe('HEADER');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('自定义高度', () => {
    const wrapper = mount(QHeader, {
      props: { height: 72 },
      slots: { default: '<span>Logo</span>' },
    });
    expect(wrapper.attributes('style')).toContain('height: 72px');
  });
});
