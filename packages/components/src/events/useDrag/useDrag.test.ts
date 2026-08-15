import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDrag } from './useDrag';

const hoisted = vi.hoisted(() => ({
  mockThrottle: vi.fn((fn: (...args: unknown[]) => void) => fn),
}));

vi.mock('@qianrenni/core', () => ({
  useThrottle: hoisted.mockThrottle,
}));

describe('useDrag', () => {
  let element: HTMLElement;

  beforeEach(() => {
    const style: Record<string, string> = {
      bottom: '10px',
      right: '20px',
      userSelect: '',
    };

    vi.stubGlobal('window', {
      getComputedStyle: () => style,
    });
    vi.stubGlobal('getComputedStyle', () => style);
    vi.stubGlobal('document', {
      body: { style },
    });

    element = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
      style: { bottom: '', right: '' },
      dispatchEvent: vi.fn(),
    } as unknown as HTMLElement;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const createPointerEvent = (
    overrides: Partial<PointerEvent> = {},
  ): PointerEvent =>
    ({
      clientX: 0,
      clientY: 0,
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
      target: element,
      ...overrides,
    }) as unknown as PointerEvent;

  /** 从 addEventListener 的 mock calls 中找到指定事件的处理器 */
  const getHandler = (
    event: string,
  ): ((e: PointerEvent) => void) | undefined => {
    const calls = (element.addEventListener as ReturnType<typeof vi.fn>).mock
      .calls as [string, (e: PointerEvent) => void][];
    const call = calls.find(([evt]) => evt === event);
    return call?.[1];
  };

  it('应该在初始化时绑定 pointer 事件', () => {
    useDrag(element);

    expect(element.addEventListener).toHaveBeenCalledWith(
      'pointerdown',
      expect.any(Function),
    );
    expect(element.addEventListener).toHaveBeenCalledWith(
      'pointerup',
      expect.any(Function),
    );
    expect(element.addEventListener).toHaveBeenCalledWith(
      'pointercancel',
      expect.any(Function),
    );
  });

  it('应该在拖拽时更新元素位置并触发 onMove', () => {
    const onMove = vi.fn();
    useDrag(element, onMove);

    // 先触发 startDrag，它会注册 pointermove 监听器
    const startDrag = getHandler('pointerdown')!;
    startDrag(createPointerEvent({ clientX: 100, clientY: 200 }));

    // 现在能获取到 rawDrag
    const rawDrag = getHandler('pointermove')!;
    rawDrag(createPointerEvent({ clientX: 80, clientY: 180 }));

    expect(onMove).toHaveBeenCalled();
    expect(element.style.bottom).toBe('30px');
    expect(element.style.right).toBe('40px');
  });

  it('应该在非鼠标左键点击时忽略拖拽', () => {
    useDrag(element);

    const startDrag = getHandler('pointerdown')!;
    startDrag(createPointerEvent({ button: 2, pointerType: 'mouse' }));

    expect(element.addEventListener).not.toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    );
  });

  it('应该在小于阈值时不标记为移动', () => {
    const { isMove } = useDrag(element);

    const startDrag = getHandler('pointerdown')!;
    startDrag(createPointerEvent({ clientX: 100, clientY: 100 }));

    const rawDrag = getHandler('pointermove')!;
    rawDrag(createPointerEvent({ clientX: 105, clientY: 105 }));

    expect(isMove()).toBe(false);
  });

  it('应该在超过阈值时标记为移动', () => {
    const { isMove } = useDrag(element);

    const startDrag = getHandler('pointerdown')!;
    startDrag(createPointerEvent({ clientX: 100, clientY: 100 }));

    const rawDrag = getHandler('pointermove')!;
    rawDrag(createPointerEvent({ clientX: 80, clientY: 80 }));

    expect(isMove()).toBe(true);
  });

  it('应该调用 throttle 节流拖拽', () => {
    useDrag(element);

    expect(hoisted.mockThrottle).toHaveBeenCalled();
  });

  it('应该在 destroy 时清理所有监听器', () => {
    const { destroy } = useDrag(element);

    const mockRemove = element.removeEventListener as ReturnType<typeof vi.fn>;

    destroy();

    expect(mockRemove).toHaveBeenCalledWith(
      'pointerdown',
      expect.any(Function),
    );
    expect(mockRemove).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(mockRemove).toHaveBeenCalledWith(
      'pointercancel',
      expect.any(Function),
    );
  });

  it('destroy 时若正在拖拽应额外移除 pointermove 并尝试释放指针捕获', () => {
    const { destroy } = useDrag(element);

    // 触发 startDrag 进入拖拽态，注册 pointermove
    const startDrag = getHandler('pointerdown')!;
    startDrag(createPointerEvent({ clientX: 100, clientY: 200 }));

    destroy();

    const mockRemove = element.removeEventListener as ReturnType<typeof vi.fn>;
    expect(mockRemove).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    );
    expect(element.releasePointerCapture).toHaveBeenCalled();
  });

  it('stopDrag 时若释放指针捕获抛错应被捕获且不中断', () => {
    const { destroy } = useDrag(element);
    // 让 releasePointerCapture 在 destroy 内抛错
    (
      element.releasePointerCapture as ReturnType<typeof vi.fn>
    ).mockImplementationOnce(() => {
      throw new Error('capture error');
    });

    expect(() => destroy()).not.toThrow();
  });
});
