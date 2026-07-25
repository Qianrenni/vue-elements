import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMousePosition } from './useMousePosition';

const hoisted = vi.hoisted(() => ({
  mountedHooks: [] as Array<() => void>,
  unmountedHooks: [] as Array<() => void>,
}));

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onUnmounted: (fn: () => void) => hoisted.unmountedHooks.push(fn),
  };
});

describe('useMousePosition', () => {
  let mouseHandler: ((e: MouseEvent) => void) | null = null;

  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;
    mouseHandler = null;
    vi.stubGlobal('window', {
      addEventListener: vi.fn(
        (_event: string, handler: (e: MouseEvent) => void) => {
          mouseHandler = handler;
        },
      ),
      removeEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('应该初始坐标为零', () => {
    const { x, y } = useMousePosition();
    expect(x.value).toBe(0);
    expect(y.value).toBe(0);
  });

  it('应该完整生命周期：挂载后更新坐标，卸载时移除监听器', () => {
    useMousePosition();
    hoisted.mountedHooks.forEach((fn) => fn());

    mouseHandler?.({ pageX: 100, pageY: 200 } as MouseEvent);

    const { x, y } = useMousePosition();
    expect(x.value).toBe(100);
    expect(y.value).toBe(200);

    hoisted.unmountedHooks.forEach((fn) => fn());
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
    );
  });
});
