// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import QFloatButton from '../FloatButton.vue';

const mountFb = (props: Record<string, unknown> = {}, slot = '') =>
  mount(QFloatButton, { props, slots: slot ? { icon: slot } : {} });

describe('QFloatButton 渲染', () => {
  it('默认圆形 default 渲染插槽图标', () => {
    const wrapper = mountFb({}, '＋');
    const root = wrapper.get('.q-float-btn');
    expect(root.classes()).toContain('q-float-btn--circle');
    expect(root.classes()).toContain('q-float-btn--default');
    expect(root.text()).toContain('＋');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('primary + square + description', () => {
    const wrapper = mountFb({
      type: 'primary',
      shape: 'square',
      description: '问',
    });
    const root = wrapper.get('.q-float-btn');
    expect(root.classes()).toContain('q-float-btn--primary');
    expect(root.classes()).toContain('q-float-btn--square');
    expect(root.text()).toContain('问');
  });

  it('badge count / dot 渲染', () => {
    const wrapper = mountFb({ badge: { count: 5 } });
    const badge = wrapper.get('.q-float-btn__badge');
    expect(badge.text()).toBe('5');
    const wrapper2 = mountFb({ badge: { dot: true } });
    expect(wrapper2.get('.q-float-btn__badge').classes()).toContain(
      'q-float-btn__badge--dot',
    );
  });

  it('点击 emit click', async () => {
    const wrapper = mountFb();
    await wrapper.get('.q-float-btn').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('disabled 点击不 emit', async () => {
    const wrapper = mountFb({ disabled: true });
    await wrapper.get('.q-float-btn').trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('backTop：默认隐藏（未滚动），点击滚动置顶', async () => {
    const scrollTo = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);
    const wrapper = mountFb({ backTop: true });
    const root = wrapper.get('.q-float-btn');
    expect(root.classes()).toContain('q-float-btn--hidden');
    await root.trigger('click');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(wrapper.emitted('click')).toBeTruthy();
    scrollTo.mockRestore();
  });

  it('href 渲染为链接形态', () => {
    const wrapper = mountFb({ href: 'https://example.com', target: '_blank' });
    expect(wrapper.get('.q-float-btn').element.tagName).toBe('A');
  });
});
