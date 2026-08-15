// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QLoading from '../Loading.vue';

/**
 * QLoading 快照测试：覆盖三种动画类型、提示文字与 show 开关。
 */
describe('QLoading 快照测试', () => {
  it('breathing 类型渲染', () => {
    const wrapper = mount(QLoading, { props: { type: 'breathing' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('spinner 类型带文字渲染', () => {
    const wrapper = mount(QLoading, {
      props: { type: 'spinner', text: '加载中...' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('skeleton 类型渲染', () => {
    const wrapper = mount(QLoading, { props: { type: 'skeleton' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('show=false 不渲染内容', () => {
    const wrapper = mount(QLoading, { props: { show: false } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
