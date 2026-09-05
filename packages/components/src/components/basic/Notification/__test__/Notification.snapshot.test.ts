// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import QNotification from '../Notification.vue';

const mountItem = (props: Record<string, unknown> = {}) =>
  mount(QNotification, {
    props: {
      type: 'success',
      title: '保存成功',
      description: '你的修改已保存。',
      ...props,
    },
  });

describe('QNotification 单条渲染', () => {
  it('渲染类型类名 / 标题 / 描述 / 图标', () => {
    const wrapper = mountItem();
    expect(wrapper.classes()).toContain('q-notification');
    expect(wrapper.classes()).toContain('q-notification--success');
    expect(wrapper.find('.q-notification-title').text()).toBe('保存成功');
    expect(wrapper.find('.q-notification-desc').text()).toBe(
      '你的修改已保存。',
    );
    expect(wrapper.find('.q-notification-icon').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('type=error 使用 × 字形与 error 类', () => {
    const wrapper = mountItem({ type: 'error', title: '出错了' });
    expect(wrapper.classes()).toContain('q-notification--error');
    expect(wrapper.find('.q-notification-glyph').text()).toBe('×');
  });

  it('点击关闭按钮触发 onClose', async () => {
    const onClose = vi.fn();
    const wrapper = mountItem({ onClose });
    await wrapper.find('.q-notification-close').trigger('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closable=false 时不渲染关闭按钮', () => {
    const wrapper = mountItem({ closable: false });
    expect(wrapper.find('.q-notification-close').exists()).toBe(false);
  });
});
