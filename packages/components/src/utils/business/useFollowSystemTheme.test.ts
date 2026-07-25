import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { nextTick } from 'vue';

import type { useFollowSystemTheme as UseFollowSystemThemeType } from './useFollowSystemTheme';

const localStorageStore = vi.hoisted(() => new Map<string, string>());

const hoisted = vi.hoisted(() => {
  const global = globalThis as unknown as Record<string, unknown>;
  // 预设 window / localStorage / document，确保模块加载时不崩溃
  global.window = {
    matchMedia: () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  global.localStorage = {
    getItem: (key: string) => localStorageStore.get(key) ?? null,
    setItem: (key: string, value: string) => localStorageStore.set(key, value),
    removeItem: (key: string) => localStorageStore.delete(key),
  };
  global.document = {
    createElement: vi.fn(),
    body: {
      classList: {
        toggle: vi.fn(),
        add: vi.fn(),
        remove: vi.fn(),
      },
    },
  };

  return {
    mountedHooks: [] as Array<() => void>,
    unmountedHooks: [] as Array<() => void>,
  };
});

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    onMounted: (fn: () => void) => hoisted.mountedHooks.push(fn),
    onUnmounted: (fn: () => void) => hoisted.unmountedHooks.push(fn),
  };
});

type ReturnType = {
  isDark: { value: boolean };
  toggle: () => void;
};

describe('useFollowSystemTheme', () => {
  let useFollowSystemTheme: typeof UseFollowSystemThemeType;

  beforeAll(async () => {
    const mod = await import('./useFollowSystemTheme');
    useFollowSystemTheme = mod.useFollowSystemTheme;
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;
  });

  it('应该初始为浅色模式（matchMedia 返回 false）', () => {
    const { isDark } = useFollowSystemTheme() as ReturnType;
    expect(isDark.value).toBe(false);
  });

  it('应该通过 toggle 切换主题', () => {
    const { isDark, toggle } = useFollowSystemTheme() as ReturnType;

    toggle();
    expect(isDark.value).toBe(true);

    toggle();
    expect(isDark.value).toBe(false);
  });

  it('应该在挂载时更新 body class', async () => {
    useFollowSystemTheme();
    hoisted.mountedHooks.forEach((fn) => fn());
    await nextTick();

    expect(document.body.classList.toggle).toHaveBeenCalledWith(
      'dark-mode',
      false,
    );
  });

  it('首次挂载且跟随系统时应注册 matchMedia change 监听', async () => {
    const addSpy = vi.fn();
    const global = globalThis as unknown as Record<string, unknown>;
    global.window = {
      matchMedia: () => ({
        matches: false,
        addEventListener: addSpy,
        removeEventListener: vi.fn(),
      }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    // 清空 localStorage 以确保模块初始化进入"跟随系统"分支
    localStorageStore.clear();
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;

    // 用隔离模块重新加载，获得干净的单例状态（shouldFollowSystem=true）
    vi.resetModules();
    const { useFollowSystemTheme: freshFn } =
      await import('./useFollowSystemTheme');
    freshFn();
    hoisted.mountedHooks.forEach((fn) => fn());
    await nextTick();

    expect(addSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('最后一个实例卸载且仍跟随系统时应移除监听', async () => {
    const removeSpy = vi.fn();
    const global = globalThis as unknown as Record<string, unknown>;
    global.window = {
      matchMedia: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: removeSpy,
      }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    localStorageStore.clear();
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;

    vi.resetModules();
    const { useFollowSystemTheme: freshFn } =
      await import('./useFollowSystemTheme');
    freshFn();
    hoisted.mountedHooks.forEach((fn) => fn());
    await nextTick();
    hoisted.unmountedHooks.forEach((fn) => fn());

    expect(removeSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('系统主题变化时应更新 isDark（updateTheme 接收事件分支）', async () => {
    let listener: ((e: { matches: boolean }) => void) | undefined;
    const global = globalThis as unknown as Record<string, unknown>;
    global.window = {
      matchMedia: () => ({
        matches: false,
        addEventListener: (
          _: string,
          fn: (e: { matches: boolean }) => void,
        ) => {
          listener = fn;
        },
        removeEventListener: vi.fn(),
      }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    localStorageStore.clear();
    hoisted.mountedHooks.length = 0;
    hoisted.unmountedHooks.length = 0;

    vi.resetModules();
    const { useFollowSystemTheme: freshFn } =
      await import('./useFollowSystemTheme');
    const { isDark } = freshFn() as ReturnType;
    hoisted.mountedHooks.forEach((fn) => fn());
    // startListening 在 nextTick 内执行，需等待微任务刷新
    await nextTick();
    // 模拟系统切换到深色
    listener!({ matches: true });
    expect(isDark.value).toBe(true);
  });
});
