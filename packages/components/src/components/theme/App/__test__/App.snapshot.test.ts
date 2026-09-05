// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import QApp from '../App.vue';
import { useQApp } from '../composable';

afterEach(() => {
  document
    .querySelectorAll('.q-notification-container')
    .forEach((node) => node.remove());
});

const Trigger = defineComponent({
  setup() {
    const app = useQApp();
    return () =>
      h(
        'button',
        {
          class: 'open-btn',
          onClick: () =>
            app.notification.success({
              title: 'App 内通知',
              description: '作用域渲染',
            }),
        },
        '打开通知',
      );
  },
});

describe('QApp 作用域上下文', () => {
  it('useQApp().notification 把通知渲染进 App 根', async () => {
    const wrapper = mount(QApp, {
      slots: { default: () => h(Trigger) },
      attachTo: document.body,
    });
    await wrapper.find('.open-btn').trigger('click');

    const container = document.querySelector(
      '.q-app .q-notification-container',
    );
    expect(container).not.toBeNull();
    expect(
      document.querySelector('.q-app .q-notification-title')?.textContent,
    ).toContain('App 内通知');
    wrapper.unmount();
  });

  it('卸载时销毁作用域容器', async () => {
    const wrapper = mount(QApp, {
      slots: { default: () => h(Trigger) },
      attachTo: document.body,
    });
    await wrapper.find('.open-btn').trigger('click');
    expect(
      document.querySelector('.q-app .q-notification-container'),
    ).not.toBeNull();

    wrapper.unmount();
    expect(
      document.querySelector('.q-app .q-notification-container'),
    ).toBeNull();
  });
});
