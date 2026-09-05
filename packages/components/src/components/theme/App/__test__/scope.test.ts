// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';

import { createMessageScope } from '../messageScope';
import { createModalScope } from '../modalScope';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const clickText = (text: string) => {
  const overlay = document.querySelector('.dialog-overlay');
  expect(overlay).not.toBeNull();
  const target = [...overlay!.querySelectorAll('*')].find(
    (el) => el.children.length === 0 && el.textContent?.trim() === text,
  );
  expect(target, `找不到按钮「${text}」`).toBeTruthy();
  target!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
};

afterEach(() => {
  document.body.innerHTML = '';
});

describe('createMessageScope 作用域消息', () => {
  it('渲染进指定 host 并可自动关闭', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const msg = createMessageScope({ host: () => host });
    msg.success({ message: '保存成功', duration: 30 });
    await flush();

    const container = host.querySelector('.q-message-scope');
    expect(container).not.toBeNull();
    expect(host.textContent).toContain('保存成功');

    await new Promise((resolve) => setTimeout(resolve, 80));
    expect(host.querySelector('.q-message-scope')).toBeNull();
    msg.destroy();
  });

  it('close 可立即关闭单条', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const msg = createMessageScope({ host: () => host });
    const handle = msg.error({ message: '出错了', duration: 0 });
    await flush();
    expect(host.textContent).toContain('出错了');

    handle.close();
    await flush();
    expect(host.querySelector('.q-message-scope')).toBeNull();
    msg.destroy();
  });
});

describe('createModalScope 命令式弹窗', () => {
  it('confirm 点「确定」resolve true', async () => {
    const modal = createModalScope();
    const result = modal.confirm({ title: '删除确认', content: '确定删除？' });
    await flush();

    const overlay = document.querySelector('.dialog-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay!.textContent).toContain('删除确认');
    expect(overlay!.textContent).toContain('确定删除？');

    clickText('确定');
    expect(await result).toBe(true);
    expect(document.querySelector('.dialog-overlay')).toBeNull();
  });

  it('confirm 点「取消」resolve false', async () => {
    const modal = createModalScope();
    const result = modal.confirm({ title: '确认' });
    await flush();
    expect(document.querySelector('.dialog-overlay')).not.toBeNull();

    clickText('取消');
    expect(await result).toBe(false);
    expect(document.querySelector('.dialog-overlay')).toBeNull();
  });

  it('alert 仅「确定」且 resolve true', async () => {
    const modal = createModalScope();
    const result = modal.alert({ title: '提示', content: '操作成功' });
    await flush();

    const overlay = document.querySelector('.dialog-overlay')!;
    expect(overlay.textContent).toContain('操作成功');
    expect(overlay.textContent).not.toContain('取消');

    clickText('确定');
    expect(await result).toBe(true);
    expect(document.querySelector('.dialog-overlay')).toBeNull();
  });

  it('destroy 关闭未决弹窗并 resolve false', async () => {
    const modal = createModalScope();
    const result = modal.confirm({ title: '未决' });
    await flush();
    expect(document.querySelector('.dialog-overlay')).not.toBeNull();

    modal.destroy();
    expect(await result).toBe(false);
    expect(document.querySelector('.dialog-overlay')).toBeNull();
  });
});
