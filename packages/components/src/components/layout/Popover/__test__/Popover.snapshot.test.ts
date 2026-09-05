// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import QPopover from '../Popover.vue';

/** 清理残留 Teleport 弹层 */
afterEach(() => {
  document.querySelectorAll('.q-popover').forEach((n) => n.remove());
});

/** 挂载到 body 内并确保卸载清理 Teleport */
const mountPopover = (props: Record<string, unknown> = {}, slots = {}) =>
  mount(QPopover, {
    props: { content: '卡片内容', ...props },
    slots: {
      default: `<button type="button">点我</button>`,
      ...slots,
    },
    attachTo: document.body,
  });

describe('QPopover 渲染', () => {
  it('受控 open 时弹层显示标题与内容', () => {
    const wrapper = mountPopover({
      open: true,
      title: '标题',
      trigger: 'click',
    });
    const pop = document.querySelector('.q-popover');
    expect(pop).not.toBeNull();
    expect(pop!.textContent).toContain('标题');
    expect(pop!.textContent).toContain('卡片内容');
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('未受控 click 触发：点击切换显隐并 emit', async () => {
    const wrapper = mountPopover({ trigger: 'click' });
    // 初始关闭：弹层挂载但 display:none（为测量定位保留挂载）
    let pop = document.querySelector('.q-popover') as HTMLElement | null;
    expect((pop as HTMLElement).style.display).toBe('none');

    await wrapper.find('.q-popover-trigger').trigger('click');
    await nextTick();
    pop = document.querySelector('.q-popover');
    expect((pop as HTMLElement).style.display).toBe('block');
    expect(wrapper.emitted('update:open')!.at(-1)![0]).toBe(true);

    await wrapper.find('.q-popover-trigger').trigger('click');
    await nextTick();
    pop = document.querySelector('.q-popover');
    expect((pop as HTMLElement).style.display).toBe('none');
    expect(wrapper.emitted('update:open')!.at(-1)![0]).toBe(false);
    wrapper.unmount();
  });

  it('placement 应用侧边类', () => {
    const wrapper = mountPopover({ open: true, placement: 'bottomLeft' });
    const pop = document.querySelector('.q-popover') as HTMLElement;
    expect(pop.className).toContain('q-popover--bottom');
    expect(pop.className).toContain('q-popover--align-start');
    wrapper.unmount();
  });

  it('arrow=false 隐藏箭头', () => {
    const wrapper = mountPopover({ open: true, arrow: false });
    expect(document.querySelector('.q-popover-arrow')).toBeNull();
    wrapper.unmount();
  });

  it('content 插槽自定义内容', () => {
    const wrapper = mountPopover(
      { open: true },
      {
        content: `<template #content><a href="#">操作链接</a></template>`,
      },
    );
    expect(document.querySelector('.q-popover-content a')).not.toBeNull();
    wrapper.unmount();
  });
});
