import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';

import { useSwiperAction } from '../composable';
import type { SwiperActionEmits, SwiperActionProps } from '../type';

const hoisted = vi.hoisted(() => ({
  mountedHooks: [] as Array<() => Promise<void> | void>,
}));

// 部分 mock vue，拦截 onMounted 以便手动触发异步挂载钩子
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => Promise<void> | void) =>
      hoisted.mountedHooks.push(fn),
  };
});

/**
 * 创建测试上下文并执行挂载钩子以初始化操作区宽度
 * @param overrides 需要覆盖的 Props 属性
 * @param actionWidth 右侧操作区宽度
 * @returns props、emit 与 useSwiperAction 返回的方法集合
 */
const setup = async (
  overrides: Partial<SwiperActionProps> = {},
  actionWidth = 100,
): Promise<
  {
    props: SwiperActionProps;
    emit: ReturnType<typeof vi.fn>;
  } & ReturnType<typeof useSwiperAction>
> => {
  const props = reactive<SwiperActionProps>({ ...overrides });
  const emit = vi.fn();
  const inner = {
    children: [{ clientWidth: 200 }, { clientWidth: actionWidth }],
  };
  const innerRef = ref<HTMLElement | null>(inner as unknown as HTMLElement);
  const result = useSwiperAction(props, emit as SwiperActionEmits, innerRef);
  for (const fn of hoisted.mountedHooks) {
    await fn();
  }
  return { props, emit, ...result };
};

/**
 * 构造触摸事件模拟对象
 * @param clientX 触点横坐标
 * @returns TouchEvent 模拟对象
 */
const touchEvent = (clientX: number): TouchEvent =>
  ({ type: 'touchstart', touches: [{ clientX }] }) as unknown as TouchEvent;

describe('useSwiperAction', () => {
  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
  });

  it('应该初始位移为 0', async () => {
    const { translateX } = await setup();

    expect(translateX.value).toBe(0);
  });

  it('应该在触摸左滑时更新位移且不超过操作区宽度', async () => {
    const { translateX, onStart, onMove } = await setup();

    onStart(touchEvent(300));
    onMove({ touches: [{ clientX: 250 }] } as unknown as TouchEvent);
    expect(translateX.value).toBe(-50);

    onMove({ touches: [{ clientX: 100 }] } as unknown as TouchEvent);
    expect(translateX.value).toBe(-100);
  });

  it('应该禁止向右滑出正位移', async () => {
    const { translateX, onStart, onMove } = await setup();

    onStart(touchEvent(100));
    onMove({ touches: [{ clientX: 200 }] } as unknown as TouchEvent);

    expect(translateX.value).toBe(0);
  });

  it('应该在滑动超过阈值时展开并触发 swipe 与 update:open 事件', async () => {
    const { translateX, emit, onStart, onMove, onEnd } = await setup();

    onStart(touchEvent(300));
    onMove({ touches: [{ clientX: 240 }] } as unknown as TouchEvent);
    onEnd();

    expect(translateX.value).toBe(-100);
    expect(emit).toHaveBeenCalledWith('swipe');
    expect(emit).toHaveBeenCalledWith('update:open', true);
  });

  it('应该在滑动未达阈值时回弹并触发 update:open false', async () => {
    const { translateX, emit, onStart, onMove, onEnd } = await setup();

    onStart(touchEvent(300));
    onMove({ touches: [{ clientX: 280 }] } as unknown as TouchEvent);
    onEnd();

    expect(translateX.value).toBe(0);
    expect(emit).toHaveBeenCalledWith('update:open', false);
  });

  it('应该支持鼠标拖拽滑动', async () => {
    const { translateX, onStart, onMouseMove } = await setup();

    onStart({ type: 'mousedown', clientX: 300 } as MouseEvent);
    onMouseMove({ clientX: 240 } as MouseEvent);

    expect(translateX.value).toBe(-60);
  });

  it('应该在禁用时忽略所有滑动操作', async () => {
    const { translateX, emit, onStart, onMove, onEnd } = await setup({
      disabled: true,
    });

    onStart(touchEvent(300));
    onMove({ touches: [{ clientX: 200 }] } as unknown as TouchEvent);
    onEnd();

    expect(translateX.value).toBe(0);
    expect(emit).not.toHaveBeenCalled();
  });

  it('应该在操作区宽度为 0 时结束滑动直接归零且不触发事件', async () => {
    const { translateX, emit, onStart, onEnd } = await setup({}, 0);

    onStart(touchEvent(300));
    onEnd();

    expect(translateX.value).toBe(0);
    expect(emit).not.toHaveBeenCalled();
  });

  it('应该支持自定义展开阈值', async () => {
    const { translateX, emit, onStart, onMove, onEnd } = await setup({
      threshold: 30,
    });

    onStart(touchEvent(300));
    onMove({ touches: [{ clientX: 265 }] } as unknown as TouchEvent);
    onEnd();

    expect(translateX.value).toBe(-100);
    expect(emit).toHaveBeenCalledWith('update:open', true);
  });
});
