// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSwiperAction from '../SwiperAction.vue';

/**
 * QSwiperAction 快照测试：初始未滑动状态（translateX 为 0）的静态渲染。
 */
describe('QSwiperAction 快照测试', () => {
  it('默认内容与操作区渲染', () => {
    const wrapper = mount(QSwiperAction, {
      slots: { default: '<div>列表项</div>', action: '<button>删除</button>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
