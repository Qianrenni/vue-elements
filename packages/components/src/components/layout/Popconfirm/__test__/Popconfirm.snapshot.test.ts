// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import QPopconfirm from '../Popconfirm.vue';

afterEach(() => {
  document.querySelectorAll('.q-popover').forEach((n) => n.remove());
});

const mountPc = (props: Record<string, unknown> = {}) =>
  mount(QPopconfirm, {
    props: { title: '确认删除？', ...props },
    slots: { default: `<button type="button">删除</button>` },
    attachTo: document.body,
  });

describe('QPopconfirm 渲染', () => {
  it('受控 open 显示标题/按钮', () => {
    const wrapper = mountPc({ open: true });
    const pop = document.querySelector('.q-popover') as HTMLElement;
    expect(pop.textContent).toContain('确认删除？');
    expect(pop.textContent).toContain('确定');
    expect(pop.textContent).toContain('取消');
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('click 触发：点确定关闭并 emit confirm', async () => {
    const wrapper = mountPc();
    await wrapper.find('.q-popover-trigger').trigger('click');
    await nextTick();
    let pop = document.querySelector('.q-popover') as HTMLElement;
    expect(pop.style.display).toBe('block');

    const okBtn = Array.from(
      document.querySelectorAll('.q-popconfirm-btn--primary'),
    )[0] as HTMLElement;
    okBtn.click();
    await nextTick();
    pop = document.querySelector('.q-popover') as HTMLElement;
    expect(pop.style.display).toBe('none');
    expect(wrapper.emitted('confirm')).toBeTruthy();
    expect(wrapper.emitted('update:open')!.at(-1)![0]).toBe(false);
    wrapper.unmount();
  });

  it('点取消 emit cancel 并关闭', async () => {
    const wrapper = mountPc();
    await wrapper.find('.q-popover-trigger').trigger('click');
    await nextTick();
    const cancelBtn = Array.from(
      document.querySelectorAll('.q-popconfirm-btn'),
    ).find((b) => b.textContent?.includes('取消')) as HTMLElement;
    cancelBtn.click();
    await nextTick();
    expect(wrapper.emitted('cancel')).toBeTruthy();
    expect(
      (document.querySelector('.q-popover') as HTMLElement).style.display,
    ).toBe('none');
    wrapper.unmount();
  });

  it('异步确认：loading 期间不关闭，resolve 后关闭', async () => {
    let resolveFn: () => void = () => {};
    const promise = new Promise<void>((resolve) => {
      resolveFn = resolve;
    });
    const wrapper = mountPc({
      onConfirm: () => promise,
    });
    await wrapper.find('.q-popover-trigger').trigger('click');
    await nextTick();

    const okBtn = document.querySelector(
      '.q-popconfirm-btn--primary',
    ) as HTMLElement;
    okBtn.click();
    await nextTick();
    // loading 期间：spinner 出现且仍展开
    expect(document.querySelector('.q-popconfirm-spinner')).not.toBeNull();
    expect(
      (document.querySelector('.q-popover') as HTMLElement).style.display,
    ).toBe('block');

    resolveFn();
    await nextTick();
    await nextTick();
    expect(document.querySelector('.q-popconfirm-spinner')).toBeNull();
    expect(
      (document.querySelector('.q-popover') as HTMLElement).style.display,
    ).toBe('none');
    wrapper.unmount();
  });
});
