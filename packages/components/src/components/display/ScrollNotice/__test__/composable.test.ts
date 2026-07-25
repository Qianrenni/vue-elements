import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, reactive, type Ref } from 'vue';

import { useScrollNotice } from '../composable';
import type { ScrollNoticeProps } from '../type';

/** 存放被 mock 拦截的生命周期回调与模板引用 */
const hoisted = vi.hoisted(() => ({
  mountedHooks: [] as Array<() => void>,
  beforeUnmountHooks: [] as Array<() => void>,
  templateRefs: new Map<string, unknown>(),
}));

/** 模拟的 useWindowResize 单例 */
const windowResizeMock = vi.hoisted(() => ({
  addHandler: vi.fn(),
  removeHandler: vi.fn(),
}));

// mock utils 桶导出，避免 Node 环境加载含浏览器 API 的模块
vi.mock('@/utils', () => ({
  useWindowResize: windowResizeMock,
}));

// 部分 mock vue：拦截生命周期与模板引用，使组合式函数可脱离组件实例测试
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onBeforeUnmount: (fn: () => void) => hoisted.beforeUnmountHooks.push(fn),
    useTemplateRef: (name: string) => {
      if (!hoisted.templateRefs.has(name)) {
        hoisted.templateRefs.set(name, actual.ref(null));
      }
      return hoisted.templateRefs.get(name);
    },
  };
});

/** 模拟的滚动文本元素 */
interface FakeNoticeEl {
  offsetWidth: number;
  style: { transform: string };
}

describe('useScrollNotice', () => {
  /** 已注册的动画帧回调队列 */
  let rafCallbacks: FrameRequestCallback[];
  let cancelSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
    hoisted.beforeUnmountHooks.length = 0;
    hoisted.templateRefs.clear();
    rafCallbacks = [];
    cancelSpy = vi.fn();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    vi.stubGlobal('cancelAnimationFrame', cancelSpy);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /**
   * 创建组合式函数实例并模拟挂载
   * @param speed 滚动速度
   * @returns props 与模拟的文本元素
   */
  const setupScrollNotice = async (speed: number) => {
    const props = reactive<ScrollNoticeProps>({ speed });
    useScrollNotice(props);

    const noticeEl: FakeNoticeEl = {
      offsetWidth: 100,
      style: { transform: '' },
    };
    (hoisted.templateRefs.get('noticeRef') as Ref<unknown>).value = noticeEl;
    (hoisted.templateRefs.get('scrollRef') as Ref<unknown>).value = {
      offsetWidth: 300,
    };

    hoisted.mountedHooks.forEach((fn) => fn());
    // 等待 startAnimation 内部的 nextTick 完成尺寸读取
    await nextTick();
    return { props, noticeEl };
  };

  it('应该在挂载后从容器右侧开始滚动', async () => {
    const { noticeEl } = await setupScrollNotice(5);

    expect(rafCallbacks).toHaveLength(1);

    // 执行一帧动画：300 - 5 = 295
    rafCallbacks[0](0);
    expect(noticeEl.style.transform).toBe('translateX(295px)');
  });

  it('应该在文本完全移出左侧后重置到右侧起点', async () => {
    const { noticeEl } = await setupScrollNotice(400);

    // 一帧位移 400：300 - 400 = -100 <= -textWidth(100)，重置为 300
    rafCallbacks[0](0);
    expect(noticeEl.style.transform).toBe('translateX(300px)');
  });

  it('应该在挂载时注册窗口尺寸变化处理器', async () => {
    await setupScrollNotice(1);

    expect(windowResizeMock.addHandler).toHaveBeenCalledTimes(1);
  });

  it('应该在 speed 变化时重启动画', async () => {
    const { props } = await setupScrollNotice(1);

    props.speed = 10;
    await nextTick();

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('应该在卸载前取消动画并移除窗口处理器', async () => {
    await setupScrollNotice(1);

    hoisted.beforeUnmountHooks.forEach((fn) => fn());

    expect(cancelSpy).toHaveBeenCalled();
    expect(windowResizeMock.removeHandler).toHaveBeenCalledTimes(1);
  });
});
