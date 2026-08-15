// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QCard from '../Card.vue';

/**
 * QCard 快照测试：覆盖各命名插槽透传与动画开启。
 */
describe('QCard 快照测试', () => {
  it('默认插槽渲染', () => {
    const wrapper = mount(QCard, {
      slots: { default: '<p>卡片内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('完整插槽 + 动画渲染', () => {
    const wrapper = mount(QCard, {
      props: { animation: true },
      slots: {
        header: '<h3>标题</h3>',
        left: '<span>左</span>',
        default: '<p>内容</p>',
        right: '<span>右</span>',
        footer: '<button>操作</button>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
