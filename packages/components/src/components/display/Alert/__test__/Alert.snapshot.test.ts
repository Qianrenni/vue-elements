// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QAlert from '../Alert.vue';

describe('QAlert 渲染', () => {
  it('默认 info 渲染标题', () => {
    const wrapper = mount(QAlert, { props: { message: '提示内容' } });
    expect(wrapper.find('.q-alert').classes()).toContain('q-alert--info');
    expect(wrapper.find('.q-alert-message').text()).toBe('提示内容');
    expect(wrapper.find('.q-alert-icon').text()).toBe('i');
  });

  it('description 分两行显示', () => {
    const wrapper = mount(QAlert, {
      props: { message: '标题', description: '详细说明', type: 'warning' },
    });
    expect(wrapper.find('.q-alert-description').text()).toBe('详细说明');
    expect(wrapper.find('.q-alert--warning').exists()).toBe(true);
  });

  it('closable 点击关闭并 emit', async () => {
    const wrapper = mount(QAlert, {
      props: { message: 'x', closable: true },
    });
    expect(wrapper.find('.q-alert').exists()).toBe(true);
    await wrapper.find('.q-alert-close').trigger('click');
    expect(wrapper.find('.q-alert').exists()).toBe(false);
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('banner 修饰与 action 插槽', () => {
    const wrapper = mount(QAlert, {
      props: { message: 'b', banner: true, type: 'error', showIcon: false },
      slots: { action: '<button>查看</button>' },
    });
    expect(wrapper.find('.q-alert').classes()).toContain('q-alert--banner');
    expect(wrapper.find('.q-alert-icon').exists()).toBe(false);
    expect(wrapper.find('.q-alert-action').text()).toBe('查看');
  });
});
