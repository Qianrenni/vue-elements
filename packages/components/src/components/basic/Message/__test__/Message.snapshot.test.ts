// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QMessage from '../Message.vue';

/**
 * QMessage 快照测试：覆盖不同类型下的文案与样式类。
 */
describe('QMessage 快照测试', () => {
  it('success 类型渲染', () => {
    const wrapper = mount(QMessage, {
      props: { message: '操作成功', type: 'success' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('error 类型渲染', () => {
    const wrapper = mount(QMessage, {
      props: { message: '操作失败', type: 'error' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('warning 类型渲染', () => {
    const wrapper = mount(QMessage, {
      props: { message: '请检查输入', type: 'warning' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
