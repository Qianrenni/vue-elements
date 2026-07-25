import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Ref } from 'vue';

import { useAvatarLazy } from '../composable';
import type { AvatarProps } from '../type';

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

describe('useAvatarLazy', () => {
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

  it('应该在未传 size 时使用默认尺寸 2rem', () => {
    const { size } = useAvatarLazy({ url: 'a.png' });

    expect(size.value).toBe('2rem');
  });

  it('应该透传自定义 size', () => {
    const { size } = useAvatarLazy({ url: 'a.png', size: '48px' });

    expect(size.value).toBe('48px');
  });

  it('应该在图片加载成功时更新状态', () => {
    const { loaded, loadError, handleImageLoad } = useAvatarLazy({
      url: 'a.png',
    });

    handleImageLoad();

    expect(loaded.value).toBe(true);
    expect(loadError.value).toBe(false);
  });

  it('应该在图片加载失败时标记错误', () => {
    const { loaded, loadError, handleImageError } = useAvatarLazy({
      url: 'bad.png',
    });

    handleImageError();

    expect(loaded.value).toBe(true);
    expect(loadError.value).toBe(true);
  });

  it('应该在容器进入视口时触发图片渲染并停止观察', () => {
    const props: AvatarProps = { url: 'a.png' };
    const { shouldRenderImage } = useAvatarLazy(props);

    // 模拟模板引用绑定 DOM 元素后挂载
    const container = {} as HTMLElement;
    (hoisted.templateRefs.get('containerRef') as Ref<HTMLElement>).value =
      container;
    hoisted.mountedHooks.forEach((fn) => fn());

    const observer = MockIntersectionObserver.instances[0];
    expect(observer.observe).toHaveBeenCalledWith(container);
    expect(shouldRenderImage.value).toBe(false);

    // 模拟进入视口
    observer.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver,
    );

    expect(shouldRenderImage.value).toBe(true);
    expect(observer.unobserve).toHaveBeenCalledWith(container);
  });

  it('应该在卸载时断开观察器', () => {
    useAvatarLazy({ url: 'a.png' });

    (hoisted.templateRefs.get('containerRef') as Ref<HTMLElement>).value =
      {} as HTMLElement;
    hoisted.mountedHooks.forEach((fn) => fn());
    hoisted.unmountedHooks.forEach((fn) => fn());

    expect(MockIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
  });

  it('应该在容器引用为空时跳过观察', () => {
    useAvatarLazy({ url: 'a.png' });

    hoisted.mountedHooks.forEach((fn) => fn());

    expect(MockIntersectionObserver.instances.length).toBe(0);
  });
});
