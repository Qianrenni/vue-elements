// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QDrawer from '../Drawer.vue';

/**
 * QDrawer 快照测试：关闭 appendToBody（禁用 teleport）后内容在挂载点内联渲染，
 * 从而可以稳定快照整个抽屉结构。
 */
describe('QDrawer 快照测试', () => {
  it('右方向抽屉渲染', () => {
    const wrapper = mount(QDrawer, {
      props: { visible: true, title: '抽屉标题', appendToBody: false },
      slots: { default: '<p>抽屉内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('隐藏关闭按钮 + 底部方向渲染', () => {
    const wrapper = mount(QDrawer, {
      props: {
        visible: true,
        title: '底部抽屉',
        direction: 'bottom',
        showClose: false,
        appendToBody: false,
      },
      slots: { default: '<p>内容</p>' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
