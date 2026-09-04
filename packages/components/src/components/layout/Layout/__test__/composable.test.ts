// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QSider from '../../Sider/Sider.vue';
import QLayout from '../Layout.vue';

describe('QLayout + QSider 联动', () => {
  it('内含 QSider 时自动切换为 has-sider 布局', async () => {
    const wrapper = mount(
      {
        components: { QLayout, QSider },
        template:
          '<QLayout><QSider><div class="menu">菜单</div></QSider><div class="main">主体</div></QLayout>',
      },
      {},
    );
    // Sider 注册发生在挂载后，等待 DOM 更新
    await wrapper.vm.$nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const sider = wrapper.find('.q-layout-sider');
    expect(sider.exists()).toBe(true);
    expect(wrapper.find('.q-layout').classes()).toContain(
      'q-layout--has-sider',
    );
  });
});
