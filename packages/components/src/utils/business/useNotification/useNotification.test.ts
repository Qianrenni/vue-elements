// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createNotification } from './useNotification';

const clean = () => {
  document
    .querySelectorAll('.q-notification-container')
    .forEach((node) => node.remove());
};

afterEach(() => {
  clean();
  vi.useRealTimers();
});

const titles = (): string[] =>
  Array.from(document.querySelectorAll('.q-notification-title')).map(
    (n) => n.textContent?.trim() ?? '',
  );

const containers = () =>
  Array.from(document.querySelectorAll('.q-notification-container'));

describe('useNotification 命令式通知', () => {
  it('success 打开标题/描述到 topRight 容器', () => {
    const n = createNotification();
    n.success({ title: '保存成功', description: '详情描述' });
    expect(titles()).toEqual(['保存成功']);
    expect(containers()).toHaveLength(1);
    expect(containers()[0].getAttribute('data-placement')).toBe('topRight');
    expect(
      document.querySelector('.q-notification-desc')?.textContent,
    ).toContain('详情描述');
    n.destroy();
  });

  it('字符串快捷参数渲染为标题', () => {
    const n = createNotification();
    n.info('纯文本通知');
    expect(titles()).toEqual(['纯文本通知']);
    n.destroy();
  });

  it('duration 到期自动关闭', () => {
    vi.useFakeTimers();
    const n = createNotification({ defaults: { duration: 100 } });
    n.open({ title: '短暂通知' });
    expect(titles()).toEqual(['短暂通知']);
    vi.advanceTimersByTime(150);
    expect(titles()).toEqual([]);
    n.destroy();
  });

  it('maxCount 超限移除最早一条', () => {
    const n = createNotification({ defaults: { maxCount: 2 } });
    n.open({ title: '一' });
    n.open({ title: '二' });
    n.open({ title: '三' });
    const titlesInDom = titles();
    expect(titlesInDom).toHaveLength(2);
    expect(titlesInDom).toEqual(['二', '三']);
    n.destroy();
  });

  it('per-call placement 与 config 默认值', () => {
    const n = createNotification({ defaults: { placement: 'bottomLeft' } });
    n.open({ title: '底部通知' });
    n.open({ title: '右上通知', placement: 'topRight' });
    const positions = containers()
      .map((c) => c.getAttribute('data-placement'))
      .sort();
    expect(positions).toEqual(['bottomLeft', 'topRight']);
    n.destroy();
  });

  it('handle.close 与 close(key) 关闭', () => {
    const n = createNotification();
    const handle = n.open({ title: '可关', key: 'k1' });
    handle.close();
    expect(titles()).toEqual([]);
    n.open({ title: '再关', key: 'k2' });
    n.close('k2');
    expect(titles()).toEqual([]);
    n.destroy();
  });

  it('容器空时自动移除，closeAll 清空', () => {
    const n = createNotification();
    n.open({ title: 'A' });
    n.open({ title: 'B' });
    n.closeAll();
    expect(titles()).toEqual([]);
    expect(containers()).toHaveLength(0);
    n.destroy();
  });
});
