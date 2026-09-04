// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFooter from '../Footer.vue';

describe('QFooter 快照测试', () => {
  it('渲染底部栏', () => {
    const wrapper = mount(QFooter, {
      slots: { default: '<span>© 2026</span>' },
    });
    expect(wrapper.element.tagName).toBe('FOOTER');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
