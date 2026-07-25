// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDrag } from './useDrag';

/**
 * 覆盖 useDrag 中依赖真实 DOM API（Element、MouseEvent、dispatchEvent）的分支：
 * - stopDrag 未移动时在原始目标上派发 click 事件
 * - stopDrag 释放指针捕获抛错时的容错
 */
describe('useDrag DOM 交互', () => {
  let element: HTMLElement;
  let child: HTMLElement;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const getHandler = (
    el: HTMLElement,
    event: string,
  ): ((e: PointerEvent) => void) | undefined => {
    const calls = (el.addEventListener as unknown as ReturnType<typeof vi.fn>)
      .mock.calls as [string, (e: PointerEvent) => void][];
    return calls.find(([evt]) => evt === event)?.[1];
  };

  const pointer = (overrides: Partial<PointerEvent> = {}): PointerEvent =>
    ({
      clientX: 0,
      clientY: 0,
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
      ...overrides,
    }) as unknown as PointerEvent;

  beforeEach(() => {
    element = document.createElement('div');
    child = document.createElement('button');
    element.appendChild(child);
    // jsdom 未实现 Pointer Capture API，polyfill 为空函数
    element.setPointerCapture = vi.fn();
    element.releasePointerCapture = vi.fn();
    // getComputedStyle 返回 bottom/right 初值
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      bottom: '0px',
      right: '0px',
    } as CSSStyleDeclaration);
    // 监听 addEventListener 以便通过调用记录拿到处理器
    vi.spyOn(element, 'addEventListener');
    // jsdom 对 MouseEvent 的 view 字段校验严格（要求 Window 类型），
    // 而 useDrag 源码传入 view: window 在浏览器合法、jsdom 拒绝。
    // 这里用一个继承自 Event 的构造器替换，使 dispatchEvent 能接受。
    vi.stubGlobal(
      'MouseEvent',
      class MockMouseEvent extends Event {
        constructor(type: string, init: EventInit = {}) {
          super(type, init);
        }
      },
    );
  });

  it('未移动松手时应在原始目标上派发 click 事件', () => {
    const drag = useDrag(element);
    const dispatchSpy = vi.spyOn(child, 'dispatchEvent');

    const startDrag = getHandler(element, 'pointerdown')!;
    // pointerdown 目标为子元素 button
    startDrag(pointer({ target: child, clientX: 10, clientY: 10 }));

    const stopDrag = getHandler(element, 'pointerup')!;
    // 未发生 pointermove（或位移小于阈值），isMove 仍为 false
    stopDrag(pointer({ clientX: 10, clientY: 10 }));

    expect(dispatchSpy).toHaveBeenCalled();
    const evt = dispatchSpy.mock.calls[0][0];
    expect(evt).toBeInstanceOf(MouseEvent);
    expect(evt.type).toBe('click');
    drag.destroy();
  });

  it('移动后松手不应派发 click 事件', () => {
    const drag = useDrag(element);
    const dispatchSpy = vi.spyOn(child, 'dispatchEvent');

    const startDrag = getHandler(element, 'pointerdown')!;
    startDrag(pointer({ target: child, clientX: 10, clientY: 10 }));

    const move = getHandler(element, 'pointermove')!;
    // 位移远超默认阈值 10
    move(pointer({ clientX: 80, clientY: 80 }));

    const stopDrag = getHandler(element, 'pointerup')!;
    stopDrag(pointer({ clientX: 80, clientY: 80 }));

    expect(dispatchSpy).not.toHaveBeenCalled();
    drag.destroy();
  });

  it('stopDrag 释放指针捕获抛错时应被容错', () => {
    const drag = useDrag(element);
    vi.spyOn(element, 'releasePointerCapture').mockImplementation(() => {
      throw new Error('capture error');
    });
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const startDrag = getHandler(element, 'pointerdown')!;
    startDrag(pointer({ target: child, clientX: 10, clientY: 10 }));

    const stopDrag = getHandler(element, 'pointerup')!;
    expect(() => stopDrag(pointer({ clientX: 10, clientY: 10 }))).not.toThrow();
    expect(errSpy).toHaveBeenCalled();
    drag.destroy();
  });
});
