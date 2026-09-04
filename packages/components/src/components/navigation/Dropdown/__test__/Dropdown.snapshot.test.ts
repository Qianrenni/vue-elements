// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QDropdown from '../Dropdown.vue';

const items = [
  { key: 'edit', label: '编辑' },
  { key: 'del', label: '删除', danger: true },
];

describe('QDropdown 快照测试', () => {
  it('受控展开时渲染弹层菜单', () => {
    const wrapper = mount(QDropdown, {
      props: { items, trigger: 'click', open: true },
      slots: { default: '<button>操作</button>' },
      attachTo: document.body,
    });
    // Teleport 到 body
    const menu = document.body.querySelector('.q-dropdown');
    expect(menu).not.toBeNull();
    expect(menu?.textContent).toContain('编辑');
    wrapper.unmount();
    // 清理 Teleport 残留
    document.body.querySelectorAll('.q-dropdown').forEach((n) => n.remove());
  });

  it('未展开时无弹层', () => {
    const wrapper = mount(QDropdown, {
      props: { items, trigger: 'click' },
      slots: { default: '<button>操作</button>' },
      attachTo: document.body,
    });
    expect(document.body.querySelector('.q-dropdown')).toBeNull();
    wrapper.unmount();
  });
});
