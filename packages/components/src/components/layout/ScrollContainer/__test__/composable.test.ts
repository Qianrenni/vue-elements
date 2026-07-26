import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';

import { useScrollContainer } from '../composable';
import type { ScrollContainerEmits, ScrollContainerProps } from '../type';

const hoisted = vi.hoisted(() => ({
  mountedHooks: [] as Array<() => void>,
  beforeUnmountHooks: [] as Array<() => void>,
  windowResize: {
    addHandler: vi.fn(),
    removeHandler: vi.fn(),
  },
}));

// 部分 mock vue，拦截生命周期钩子以便手动触发
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onBeforeUnmount: (fn: () => void) => hoisted.beforeUnmountHooks.push(fn),
  };
});

vi.mock('@qyani/core', () => ({
  useThrottle: (fn: (...args: unknown[]) => void) => fn,
}));

// mock components 工具桶中的浏览器尺寸监听实现。
vi.mock('@/utils', () => ({
  useWindowResize: hoisted.windowResize,
}));

/** 模拟滚动容器元素 */
interface FakeContainer {
  scrollLeft: number;
  scrollTop: number;
  offsetHeight: number;
  offsetWidth: number;
  scrollHeight: number;
  scrollWidth: number;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  scrollTo: ReturnType<typeof vi.fn>;
}

/**
 * 创建模拟的滚动容器元素
 * @returns 模拟容器对象
 */
const createContainer = (): FakeContainer => ({
  scrollLeft: 0,
  scrollTop: 0,
  offsetHeight: 100,
  offsetWidth: 100,
  scrollHeight: 500,
  scrollWidth: 500,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  scrollTo: vi.fn(),
});

/**
 * 创建测试上下文并触发挂载钩子
 * @param overrides 需要覆盖的 Props 属性
 * @returns props、emit、容器与滚动处理函数等测试对象
 */
const setup = (
  overrides: Partial<ScrollContainerProps> = {},
): {
  props: ScrollContainerProps;
  emit: ReturnType<typeof vi.fn>;
  container: FakeContainer;
  scrollTo: (options: { left?: number; top?: number }) => void;
  triggerScroll: () => void;
} => {
  const props = reactive<ScrollContainerProps>({ ...overrides });
  const emit = vi.fn();
  const container = createContainer();
  const containerRef = ref<HTMLElement | null>(
    container as unknown as HTMLElement,
  );
  const { scrollTo } = useScrollContainer(
    props,
    emit as ScrollContainerEmits,
    containerRef,
  );
  hoisted.mountedHooks.forEach((fn) => fn());
  const scrollHandler = container.addEventListener.mock.calls[0]?.[1] as
    | (() => void)
    | undefined;
  return {
    props,
    emit,
    container,
    scrollTo,
    triggerScroll: () => scrollHandler?.(),
  };
};

describe('useScrollContainer', () => {
  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
    hoisted.beforeUnmountHooks.length = 0;
    vi.clearAllMocks();
  });

  it('应该在启用滚动时挂载 scroll 监听并注册窗口尺寸回调', () => {
    const { container } = setup({ scrollY: true });

    expect(container.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    expect(hoisted.windowResize.addHandler).toHaveBeenCalled();
  });

  it('应该在未启用任何滚动方向时不挂载 scroll 监听', () => {
    const { container } = setup();

    expect(container.addEventListener).not.toHaveBeenCalled();
  });

  it('应该在滚动时触发 scroll 事件并携带滚动位置', () => {
    const { emit, container, triggerScroll } = setup({ scrollY: true });

    container.scrollTop = 50;
    triggerScroll();

    expect(emit).toHaveBeenCalledWith('scroll', { x: 0, y: 50 });
  });

  it('应该在纵向滚动触底时触发 ended 事件', () => {
    const { emit, container, triggerScroll } = setup({ scrollY: true });

    container.scrollTop = 390;
    triggerScroll();

    expect(emit).toHaveBeenCalledWith('ended');
  });

  it('应该在未触底时不触发 ended 事件', () => {
    const { emit, container, triggerScroll } = setup({ scrollY: true });

    container.scrollTop = 100;
    triggerScroll();

    expect(emit).not.toHaveBeenCalledWith('ended');
  });

  it('应该在横向滚动触底时触发 ended 事件', () => {
    const { emit, container, triggerScroll } = setup({ scrollX: true });

    container.scrollLeft = 395;
    triggerScroll();

    expect(emit).toHaveBeenCalledWith('ended');
  });

  it('应该在可恢复模式下滚动时保存位置并在挂载时恢复', () => {
    const storage = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    });

    storage.set('list', JSON.stringify({ left: 10, top: 20 }));
    const { container, triggerScroll } = setup({
      scrollY: true,
      name: 'list',
      recoverable: true,
    });

    expect(container.scrollTo).toHaveBeenCalledWith({ left: 10, top: 20 });

    container.scrollTop = 30;
    triggerScroll();
    expect(JSON.parse(storage.get('list')!)).toEqual({ left: 0, top: 30 });

    vi.unstubAllGlobals();
  });

  it('应该通过 scrollTo 调用容器的滚动方法', () => {
    const { container, scrollTo } = setup();

    scrollTo({ top: 200 });

    expect(container.scrollTo).toHaveBeenCalledWith({ top: 200 });
  });

  it('应该在卸载前移除 scroll 监听与窗口尺寸回调', () => {
    const { container } = setup({ scrollY: true });

    hoisted.beforeUnmountHooks.forEach((fn) => fn());

    expect(container.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    expect(hoisted.windowResize.removeHandler).toHaveBeenCalled();
  });

  it('应该在容器 ref 为 null 时打印错误', () => {
    const props = reactive<ScrollContainerProps>({});
    const emit = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    useScrollContainer(props, emit as ScrollContainerEmits, ref(null));
    hoisted.mountedHooks.forEach((fn) => fn());

    expect(consoleSpy).toHaveBeenCalledWith('scroll-container ref is null');
    consoleSpy.mockRestore();
  });

  it('应该注册 resize 处理器并在触发时更新容器尺寸', () => {
    setup({ scrollY: true });

    const resizeHandler = hoisted.windowResize.addHandler.mock.calls[0]?.[0] as
      | ((w: number, h: number) => void)
      | undefined;

    expect(resizeHandler).toBeDefined();
    expect(() => resizeHandler?.(800, 600)).not.toThrow();
  });
});
