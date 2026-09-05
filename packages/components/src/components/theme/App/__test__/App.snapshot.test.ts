// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h, ref } from 'vue';

import QApp from '../App.vue';
import { useQApp } from '../composable';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  document
    .querySelectorAll('.q-notification-container')
    .forEach((node) => node.remove());
  document
    .querySelectorAll('.q-message-scope')
    .forEach((node) => node.remove());
  document.querySelectorAll('.dialog-overlay').forEach((node) => node.remove());
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

const MessageTrigger = defineComponent({
  setup() {
    const app = useQApp();
    return () =>
      h(
        'button',
        {
          class: 'msg-btn',
          onClick: () => app.message.success('App 内消息'),
        },
        '打开消息',
      );
  },
});

const ModalTrigger = defineComponent({
  setup() {
    const app = useQApp();
    const state = ref('');
    return () =>
      h('div', { class: 'modal-row' }, [
        h(
          'button',
          {
            class: 'modal-btn',
            onClick: async () => {
              const ok = await app.modal.confirm({
                title: 'App 弹窗',
                content: '确认执行?',
              });
              state.value = ok ? '确认了' : '取消了';
            },
          },
          '打开弹窗',
        ),
        state.value ? h('p', { class: 'modal-result' }, state.value) : null,
      ]);
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

  it('useQApp().message 把消息渲染进 App 根', async () => {
    const wrapper = mount(QApp, {
      slots: { default: () => h(MessageTrigger) },
      attachTo: document.body,
    });
    await wrapper.find('.msg-btn').trigger('click');
    await flush();

    expect(
      document.querySelector('.q-app .q-message-scope')?.textContent,
    ).toContain('App 内消息');

    wrapper.unmount();
    expect(document.querySelector('.q-app .q-message-scope')).toBeNull();
  });

  it('useQApp().modal.confirm 命令式弹窗并回传结果', async () => {
    const wrapper = mount(QApp, {
      slots: { default: () => h(ModalTrigger) },
      attachTo: document.body,
    });
    await wrapper.find('.modal-btn').trigger('click');
    await flush();

    const overlay = document.querySelector('.dialog-overlay');
    expect(overlay?.textContent).toContain('App 弹窗');

    const okButton = [...overlay!.querySelectorAll('*')].find(
      (el) => el.children.length === 0 && el.textContent?.trim() === '确定',
    );
    okButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(wrapper.find('.modal-result').text()).toBe('确认了');
    expect(document.querySelector('.dialog-overlay')).toBeNull();
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
