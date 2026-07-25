import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type UseWindowResizeType = {
  addHandler: (handler: (width: number, height: number) => void) => void;
  removeHandler: (handler: (width: number, height: number) => void) => void;
  getHandlerCount: () => number;
  triggerResize: () => void;
};

describe('useWindowResize', () => {
  let useWindowResize: UseWindowResizeType;
  let resizeHandler: ((w: number, h: number) => void) | null = null;

  beforeEach(async () => {
    vi.resetModules();
    resizeHandler = null;
    vi.stubGlobal('window', {
      innerWidth: 1024,
      innerHeight: 768,
      addEventListener: vi.fn(
        (_event: string, handler: (...args: unknown[]) => void) => {
          resizeHandler = handler as (w: number, h: number) => void;
        },
      ),
      removeEventListener: vi.fn(),
    });
    const mod = await import('./useWindowResize');
    useWindowResize = mod.useWindowResize;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('应该在添加处理器时绑定 resize 监听器并立即触发一次', () => {
    const handler = vi.fn();
    useWindowResize.addHandler(handler);

    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      { passive: true },
    );
    expect(handler).toHaveBeenCalledWith(1024, 768);
  });

  it('应该在移除处理器后不再通知', () => {
    const handler = vi.fn();
    useWindowResize.addHandler(handler);
    useWindowResize.removeHandler(handler);

    // 模拟 resize 事件触发
    resizeHandler?.(800, 600);

    // 处理器应只被调用一次（添加时立即触发），resize 触发时不再通知
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('应该在移除最后一个处理器时解绑 resize 监听器', () => {
    const handler = vi.fn();
    useWindowResize.addHandler(handler);
    useWindowResize.removeHandler(handler);

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('应该返回当前处理器数量', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    useWindowResize.addHandler(h1);
    useWindowResize.addHandler(h2);

    expect(useWindowResize.getHandlerCount()).toBeGreaterThanOrEqual(2);
  });

  it('应该支持手动触发 resize', () => {
    const handler = vi.fn();
    useWindowResize.addHandler(handler);
    handler.mockClear();

    useWindowResize.triggerResize();

    expect(handler).toHaveBeenCalledWith(1024, 768);
  });
});
