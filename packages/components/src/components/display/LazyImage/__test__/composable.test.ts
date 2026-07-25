import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Ref } from 'vue';

import { useLazyImage } from '../composable';

/** 存放被 mock 拦截的生命周期回调与模板引用 */
const hoisted = vi.hoisted(() => ({
  mountedHooks: [] as Array<() => void>,
  unmountedHooks: [] as Array<() => void>,
  templateRefs: new Map<string, unknown>(),
}));

// 部分 mock vue：拦截生命周期与模板引用，使组合式函数可脱离组件实例测试
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onUnmounted: (fn: () => void) => hoisted.unmountedHooks.push(fn),
    useTemplateRef: (name: string) => {
      if (!hoisted.templateRefs.has(name)) {
        hoisted.templateRefs.set(name, actual.ref(null));
      }
      return hoisted.templateRefs.get(name);
    },
  };
});

/** 模拟 IntersectionObserver，记录回调与调用情况 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
}

describe('useLazyImage', () => {
  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;
    hoisted.templateRefs.clear();
    MockIntersectionObserver.instances.length = 0;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('应该在未传宽高时默认使用 100%', () => {
    const { width, height } = useLazyImage({ src: 'a.png' });

    expect(width.value).toBe('100%');
    expect(height.value).toBe('100%');
  });

  it('应该将数字尺寸转换为 px 字符串', () => {
    const { width, height } = useLazyImage({
      src: 'a.png',
      width: 200,
      height: 100,
    });

    expect(width.value).toBe('200px');
    expect(height.value).toBe('100px');
  });

  it('应该原样保留字符串尺寸', () => {
    const { width, height } = useLazyImage({
      src: 'a.png',
      width: '50vw',
      height: '10rem',
    });

    expect(width.value).toBe('50vw');
    expect(height.value).toBe('10rem');
  });

  it('应该在图片加载成功时更新状态', () => {
    const { loaded, loadError, handleImageLoad } = useLazyImage({
      src: 'a.png',
    });

    handleImageLoad();

    expect(loaded.value).toBe(true);
    expect(loadError.value).toBe(false);
  });

  it('应该在图片加载失败时标记错误', () => {
    const { loaded, loadError, handleImageError } = useLazyImage({
      src: 'bad.png',
    });

    handleImageError();

    expect(loaded.value).toBe(true);
    expect(loadError.value).toBe(true);
  });

  it('应该在容器进入视口时触发图片渲染并停止观察', () => {
    const { shouldRenderImage } = useLazyImage({ src: 'a.png' });

    const container = {} as HTMLElement;
    (hoisted.templateRefs.get('containerRef') as Ref<HTMLElement>).value =
      container;
    hoisted.mountedHooks.forEach((fn) => fn());

    const observer = MockIntersectionObserver.instances[0];
    expect(observer.observe).toHaveBeenCalledWith(container);
    expect(shouldRenderImage.value).toBe(false);

    observer.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver,
    );

    expect(shouldRenderImage.value).toBe(true);
    expect(observer.unobserve).toHaveBeenCalledWith(container);
  });

  it('应该在卸载时断开观察器', () => {
    useLazyImage({ src: 'a.png' });

    (hoisted.templateRefs.get('containerRef') as Ref<HTMLElement>).value =
      {} as HTMLElement;
    hoisted.mountedHooks.forEach((fn) => fn());
    hoisted.unmountedHooks.forEach((fn) => fn());

    expect(MockIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
  });
});
