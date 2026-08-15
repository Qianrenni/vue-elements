// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QBadge from '../Badge.vue';

/**
 * QBadge 快照测试：覆盖默认数字、超限省略与小圆点模式。
 */
describe('QBadge 快照测试', () => {
  it('默认数字徽章渲染', () => {
    const wrapper = mount(QBadge, {
      props: { value: 5 },
      slots: { default: '<span>通知</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('超过 max 显示 99+', () => {
    const wrapper = mount(QBadge, {
      props: { value: 120, max: 99 },
      slots: { default: '<span>通知</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('dot 小圆点模式渲染', () => {
    const wrapper = mount(QBadge, {
      props: { dot: true },
      slots: { default: '<span>通知</span>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
