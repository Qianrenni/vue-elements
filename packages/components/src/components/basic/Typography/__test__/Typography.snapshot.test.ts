// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QTypography from '../Typography.vue';

/**
 * QTypography 快照测试：覆盖标题、段落、类型、省略与复制组合。
 */
describe('QTypography 快照测试', () => {
  it('默认 span 渲染', () => {
    const wrapper = mount(QTypography, { slots: { default: '文本' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('level=1 + type=danger 渲染', () => {
    const wrapper = mount(QTypography, {
      props: { level: 1, type: 'danger' },
      slots: { default: '危险标题' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('paragraph + 组合样式渲染', () => {
    const wrapper = mount(QTypography, {
      props: { paragraph: true, strong: true, delete: true, code: true },
      slots: { default: '段落样式' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('copyable 渲染', () => {
    const wrapper = mount(QTypography, {
      props: { copyable: true },
      slots: { default: '可复制' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('多行省略渲染', () => {
    const wrapper = mount(QTypography, {
      props: { paragraph: true, ellipsis: 2 },
      slots: { default: '很长的一段文字内容用于测试多行省略效果……' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
