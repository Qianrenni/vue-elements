// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QDialog from '../Dialog.vue';

describe('QDialog 渲染', () => {
  it('visible=false 时不应渲染 dialog', () => {
    render(QDialog, { props: { visible: false } });
    expect(document.querySelector('.dialog-overlay')).toBeNull();
  });

  it('visible=true 应渲染 overlay 与容器', () => {
    render(QDialog, { props: { visible: true } });
    expect(document.querySelector('.dialog-overlay')).toBeTruthy();
    expect(document.querySelector('.dialog-container')).toBeTruthy();
  });

  it('title 应渲染标题文本', () => {
    const { getByText } = render(QDialog, {
      props: { visible: true, title: '对话框标题' },
    });
    expect(getByText('对话框标题')).toBeTruthy();
  });

  it('showClose=true 应渲染关闭按钮', () => {
    render(QDialog, { props: { visible: true, showClose: true } });
    expect(document.querySelector('.dialog-header button')).toBeTruthy();
  });

  it('showClose=false 时不应渲染关闭按钮', () => {
    render(QDialog, {
      props: { visible: true, showClose: false },
    });
    expect(document.querySelector('.dialog-header button')).toBeNull();
  });

  it('showFooter=true 默认应渲染确定/取消按钮', () => {
    const { getByText } = render(QDialog, {
      props: { visible: true, showFooter: true },
    });
    expect(getByText('确定')).toBeTruthy();
    expect(getByText('取消')).toBeTruthy();
  });

  it('点击关闭按钮应触发 update:visible=false', async () => {
    const { emitted } = render(QDialog, {
      props: { visible: true },
    });
    const closeBtn = document.querySelector(
      '.dialog-header button',
    ) as HTMLButtonElement;
    closeBtn.click();
    await nextTick();
    expect(emitted('update:visible')).toBeTruthy();
    expect(emitted('update:visible')!.at(-1)).toEqual([false]);
  });

  it('点击 overlay（closeOnClickOverlay=true）应关闭', async () => {
    const { emitted } = render(QDialog, {
      props: { visible: true, closeOnClickOverlay: true },
    });
    (document.querySelector('.dialog-overlay') as HTMLElement).click();
    await nextTick();
    expect(emitted('update:visible')!.at(-1)).toEqual([false]);
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QDialog, {
      props: { visible: true },
      slots: { default: '主体内容' },
    });
    expect(getByText('主体内容')).toBeTruthy();
  });
});
