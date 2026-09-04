// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QContent from '../Content.vue';

describe('QContent 快照测试', () => {
  it('渲染内容区', () => {
    const wrapper = mount(QContent, {
      slots: { default: '<p>主体内容</p>' },
    });
    expect(wrapper.element.tagName).toBe('MAIN');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
