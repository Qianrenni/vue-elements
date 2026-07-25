// @vitest-environment browser
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QPagination from '../Pagination.vue';

describe('QPagination 渲染', () => {
  it('应渲染当前页与总页数', () => {
    const { getByText } = render(QPagination, {
      props: { currentPage: 2, totalPages: 5 },
    });
    expect(getByText('2 / 5')).toBeTruthy();
  });

  it('currentPage=1 时上一页按钮应禁用', () => {
    const { container } = render(QPagination, {
      props: { currentPage: 1, totalPages: 5 },
    });
    const buttons = container.querySelectorAll('button');
    const prevBtn = buttons[0] as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('currentPage=totalPages 时下一页按钮应禁用', () => {
    const { container } = render(QPagination, {
      props: { currentPage: 5, totalPages: 5 },
    });
    const buttons = container.querySelectorAll('button');
    const nextBtn = buttons[1] as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });

  it('点击下一页应触发 update:currentPage 与 change', async () => {
    const { container, emitted } = render(QPagination, {
      props: { currentPage: 2, totalPages: 5 },
    });
    const buttons = container.querySelectorAll('button');
    (buttons[1] as HTMLButtonElement).click();
    await nextTick();
    expect(emitted('update:currentPage')).toBeTruthy();
    expect(emitted('update:currentPage')![0]).toEqual([3]);
    expect(emitted('change')).toBeTruthy();
    expect(emitted('change')![0]).toEqual([3]);
  });

  it('点击上一页应触发 update:currentPage 减一', async () => {
    const { container, emitted } = render(QPagination, {
      props: { currentPage: 3, totalPages: 5 },
    });
    const buttons = container.querySelectorAll('button');
    (buttons[0] as HTMLButtonElement).click();
    await nextTick();
    expect(emitted('update:currentPage')![0]).toEqual([2]);
  });

  it('跳转输入并点击应跳转到指定页', async () => {
    const onChange = vi.fn();
    const { container } = render(QPagination, {
      props: { currentPage: 1, totalPages: 5, onChange },
    });
    const input = container.querySelector('input') as HTMLInputElement;
    input.value = '4';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    const buttons = container.querySelectorAll('button');
    // 跳转按钮是最后一个
    (buttons[buttons.length - 1] as HTMLButtonElement).click();
    await nextTick();
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
