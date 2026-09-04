// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QTypography from '../Typography.vue';

describe('QTypography 渲染', () => {
  it('level=1 应渲染为 h1 标题', () => {
    const { container } = render(QTypography, {
      props: { level: 1 },
      slots: { default: '标题' },
    });
    expect(container.querySelector('h1.q-typ')).toBeTruthy();
  });

  it('paragraph 应渲染为 p', () => {
    const { container } = render(QTypography, {
      props: { paragraph: true },
      slots: { default: '段落' },
    });
    expect(container.querySelector('p.q-typ')).toBeTruthy();
  });

  it('copyable 应渲染复制按钮', () => {
    const { container } = render(QTypography, {
      props: { copyable: true },
      slots: { default: '复制我' },
    });
    const btn = container.querySelector(
      'button.q-typ-copy',
    ) as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.type).toBe('button');
  });

  it('ellipsis=2 应写入多行行数 CSS 变量', () => {
    const { container } = render(QTypography, {
      props: { ellipsis: 2 },
      slots: { default: '文字' },
    });
    const el = container.querySelector('.q-typ') as HTMLElement;
    expect(el.classList.contains('q-typ--ellipsis')).toBe(true);
    expect(el.style.getPropertyValue('--q-typ-lines')).toBe('2');
  });

  it('editable 应渲染编辑触发按钮', () => {
    const { container } = render(QTypography, {
      props: { editable: true },
      slots: { default: '可编辑' },
    });
    const trigger = container.querySelector(
      'button.q-typ-edit-trigger',
    ) as HTMLButtonElement;
    expect(trigger).toBeTruthy();
    expect(trigger.type).toBe('button');
  });

  it('点击编辑应进入编辑态并出现文本域', async () => {
    const { container } = render(QTypography, {
      props: { editable: true },
      slots: { default: '原始文本' },
    });
    const trigger = container.querySelector(
      'button.q-typ-edit-trigger',
    ) as HTMLButtonElement;
    trigger.click();
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    const textarea = container.querySelector('textarea.q-typ-edit');
    expect(textarea).toBeTruthy();
  });
});
