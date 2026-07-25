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
});
