// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCarousel from '../Carousel.vue';

/**
 * QCarousel 快照测试：仅覆盖空内容静态帧。
 * 关闭 autoplay / showButton / indicator，避免定时器与 QIcon 异步加载带来的不稳定性。
 */
describe('QCarousel 快照测试', () => {
  it('空内容静态帧渲染', () => {
    const wrapper = mount(QCarousel, {
      props: {
        width: 300,
        height: 200,
        autoplay: false,
        showButton: false,
        indicator: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
