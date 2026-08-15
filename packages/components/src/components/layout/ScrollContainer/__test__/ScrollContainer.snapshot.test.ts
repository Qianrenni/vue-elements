// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QScrollContainer from '../ScrollContainer.vue';

/**
 * QScrollContainer 快照测试：纯容器组件，校验默认插槽透传。
 */
describe('QScrollContainer 快照测试', () => {
  it('默认插槽渲染', () => {
    const wrapper = mount(QScrollContainer, {
      slots: { default: '<p>滚动内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
