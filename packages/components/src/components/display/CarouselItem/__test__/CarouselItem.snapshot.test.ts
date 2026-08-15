// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCarouselItem from '../CarouselItem.vue';

/**
 * QCarouselItem 快照测试：作为纯容器组件，校验默认插槽透传。
 */
describe('QCarouselItem 快照测试', () => {
  it('默认插槽渲染', () => {
    const wrapper = mount(QCarouselItem, {
      slots: { default: '<div>内容项</div>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
