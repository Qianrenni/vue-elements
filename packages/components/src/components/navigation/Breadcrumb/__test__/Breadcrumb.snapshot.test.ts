// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QBreadcrumb from '../Breadcrumb.vue';

describe('QBreadcrumb 快照测试', () => {
  it('默认 items 渲染', () => {
    const wrapper = mount(QBreadcrumb, {
      props: {
        items: [{ title: '首页' }, { title: '组件' }, { title: 'Button' }],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('含 href + 自定义分隔符渲染', () => {
    const wrapper = mount(QBreadcrumb, {
      props: {
        items: [{ title: '首页', href: '/' }, { title: '详情' }],
        separator: '>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
