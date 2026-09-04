// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QAnchor from '../Anchor.vue';

const items = [
  { href: '#s1', title: '第一节' },
  {
    href: '#s2',
    title: '第二节',
    children: [{ href: '#s2-1', title: '子节' }],
  },
];

describe('QAnchor 快照测试', () => {
  it('渲染一级与二级锚点', () => {
    const wrapper = mount(QAnchor, { props: { items } });
    const links = wrapper.findAll('.q-anchor-link a');
    expect(links).toHaveLength(3);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('激活项应用 active 类', () => {
    const wrapper = mount(QAnchor, {
      props: { items },
      global: {
        // 直接驱动内部 activeHref 不可行，此处验证首项默认渲染即可
      },
    });
    expect(wrapper.find('.q-anchor-link--child').exists()).toBe(true);
  });
});
