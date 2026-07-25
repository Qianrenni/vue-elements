import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

import { useCarousel } from '../composable';
import type { CarouselEmits, CarouselProps } from '../type';

/** 存放被 mock 拦截的插槽内容 */
const hoisted = vi.hoisted(() => ({
  slotItems: [] as unknown[],
  mountedHooks: [] as Array<() => void>,
  beforeUnmountHooks: [] as Array<() => void>,
  templateRefs: new Map<string, unknown>(),
}));

// 部分 mock vue：提供插槽内容并拦截生命周期，使组合式函数可脱离组件实例测试
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    useSlots: () => ({ default: () => hoisted.slotItems }),
    useTemplateRef: (name: string) => {
      if (!hoisted.templateRefs.has(name)) {
        hoisted.templateRefs.set(name, actual.ref(null));
      }
      return hoisted.templateRefs.get(name);
    },
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onBeforeUnmount: (fn: () => void) => hoisted.beforeUnmountHooks.push(fn),
  };
});

/**
 * 创建指定数量的 QCarouselItem 虚拟节点
 * @param count 轮播项数量
 * @returns 模拟的 vnode 数组
 */
const createItems = (count: number): unknown[] =>
  Array.from({ length: count }, () => ({ type: { name: 'QCarouselItem' } }));

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需覆盖的 Props 字段
 * @returns props 与 emit 模拟函数
 */
const createCarousel = (
  overrides: Partial<CarouselProps> = {},
): { props: CarouselProps; emit: ReturnType<typeof vi.fn> } => {
  const props: CarouselProps = {
    width: 300,
    height: 150,
    duration: 500,
    loop: true,
    ...overrides,
  };
  return { props, emit: vi.fn() };
};

describe('useCarousel', () => {
  beforeEach(() => {
    hoisted.slotItems = createItems(3);
    hoisted.mountedHooks.length = 0;
    hoisted.beforeUnmountHooks.length = 0;
    hoisted.templateRefs.clear();
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('应该正确统计轮播项数量（前后各附加一个复制项）', () => {
    const { props, emit } = createCarousel();
    const { itemsCount, totalItemsCount } = useCarousel(
      props,
      emit as CarouselEmits,
    );

    expect(itemsCount.value).toBe(3);
    expect(totalItemsCount.value).toBe(5);
  });

  it('应该以索引 1 初始化并映射实际索引为 0', () => {
    const { props, emit } = createCarousel();
    const { currentIndex, realIndex } = useCarousel(
      props,
      emit as CarouselEmits,
    );

    expect(currentIndex.value).toBe(1);
    expect(realIndex.value).toBe(0);
  });

  it('应该在 next 时前进并触发 change 事件', async () => {
    const { props, emit } = createCarousel();
    const { next, realIndex } = useCarousel(props, emit as CarouselEmits);

    next();
    await nextTick();

    expect(realIndex.value).toBe(1);
    expect(emit).toHaveBeenCalledWith('change', 1);
  });

  it('应该在 prev 时后退', () => {
    const { props, emit } = createCarousel();
    const { next, prev, realIndex } = useCarousel(props, emit as CarouselEmits);

    next();
    prev();

    expect(realIndex.value).toBe(0);
  });

  it('应该在非循环模式下阻止越过首尾边界', () => {
    const { props, emit } = createCarousel({ loop: false });
    const { prev, next, goTo, currentIndex } = useCarousel(
      props,
      emit as CarouselEmits,
    );

    prev();
    expect(currentIndex.value).toBe(1);

    goTo(2);
    next();
    expect(currentIndex.value).toBe(3);
  });

  it('应该在循环模式下越过末尾时重置回首项并临时关闭过渡', () => {
    const { props, emit } = createCarousel();
    const { next, goTo, currentIndex, useTransition } = useCarousel(
      props,
      emit as CarouselEmits,
    );

    // 跳到末尾复制项位置后再前进，触发无缝重置
    goTo(3);
    next();

    expect(currentIndex.value).toBe(1);
    expect(useTransition.value).toBe(false);
  });

  it('应该根据方向计算 transform 样式', () => {
    const { props: horizontal, emit: emitH } = createCarousel();
    const { transformStyle: styleH } = useCarousel(
      horizontal,
      emitH as CarouselEmits,
    );
    expect(styleH.value).toBe('translateX(-300px)');

    const { props: vertical, emit: emitV } = createCarousel({ vertical: true });
    const { transformStyle: styleV } = useCarousel(
      vertical,
      emitV as CarouselEmits,
    );
    expect(styleV.value).toBe('translateY(-150px)');
  });

  it('应该根据过渡开关计算 transition 样式', () => {
    const { props, emit } = createCarousel();
    const { transition, useTransition } = useCarousel(
      props,
      emit as CarouselEmits,
    );

    expect(transition.value).toBe('500ms ease-in-out');

    useTransition.value = false;
    expect(transition.value).toBe('none');
  });

  it('应该过滤掉非 QCarouselItem 的插槽节点', () => {
    hoisted.slotItems = [
      ...createItems(2),
      { type: { name: 'OtherComponent' } },
    ];
    const { props, emit } = createCarousel();
    const { itemsCount } = useCarousel(props, emit as CarouselEmits);

    expect(itemsCount.value).toBe(2);
  });

  it('应该在挂载时启动自动播放并添加悬停监听器', () => {
    const { props, emit } = createCarousel({ autoplay: true });
    const fakeEl = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    hoisted.templateRefs.set('carousel', ref(fakeEl as unknown as HTMLElement));

    useCarousel(props, emit as CarouselEmits);

    // 触发挂载钩子
    hoisted.mountedHooks.forEach((fn) => fn());

    expect(fakeEl.addEventListener).toHaveBeenCalledWith(
      'mouseenter',
      expect.any(Function),
    );
    expect(fakeEl.addEventListener).toHaveBeenCalledWith(
      'mouseleave',
      expect.any(Function),
    );
  });

  it('应该在卸载时停止自动播放并移除悬停监听器', () => {
    const { props, emit } = createCarousel();
    const fakeEl = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    hoisted.templateRefs.set('carousel', ref(fakeEl as unknown as HTMLElement));

    useCarousel(props, emit as CarouselEmits);

    hoisted.mountedHooks.forEach((fn) => fn());
    hoisted.beforeUnmountHooks.forEach((fn) => fn());

    expect(fakeEl.removeEventListener).toHaveBeenCalledWith(
      'mouseenter',
      expect.any(Function),
    );
    expect(fakeEl.removeEventListener).toHaveBeenCalledWith(
      'mouseleave',
      expect.any(Function),
    );
  });

  it('应该在 carousel 元素为 null 时跳过添加悬停监听器', () => {
    const { props, emit } = createCarousel();
    hoisted.templateRefs.set('carousel', ref(null));

    useCarousel(props, emit as CarouselEmits);

    expect(() => hoisted.mountedHooks.forEach((fn) => fn())).not.toThrow();
  });
});
