// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import QSider from '../Sider.vue';

describe('QSider 折叠交互', () => {
  it('点击触发器切换折叠并派发事件', async () => {
    const wrapper = mount(QSider, {
      props: { collapsible: true, collapsed: false },
      slots: { default: '<div>导航</div>' },
    });
    await wrapper.find('.q-layout-sider-trigger').trigger('click');
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true]);
    expect(wrapper.emitted('collapse')?.[0]).toEqual([true, 'clickTrigger']);
  });

  it('折叠时使用 collapsedWidth', async () => {
    const wrapper = mount(QSider, {
      props: { collapsible: true, collapsed: true, collapsedWidth: 64 },
    });
    expect(wrapper.attributes('style')).toContain('width: 64px');
  });
});

describe('useSider 派生逻辑', () => {
  it('渲染不依赖 Layout 上下文（无父级时安全）', () => {
    // 挂载在无 provide 环境（无 QLayout 祖先）
    const spy = vi.spyOn(console, 'error');
    const wrapper = mount(QSider, {
      props: { theme: 'light' },
      slots: { default: '<div>导航</div>' },
    });
    expect(wrapper.classes()).toContain('q-layout-sider--light');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
