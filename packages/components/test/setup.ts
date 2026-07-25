import { vi } from 'vitest';

/**
 * 全局测试 setup，在所有测试文件加载前执行。
 * jsdom 不实现 matchMedia，而 useFollowSystemTheme 在模块级即访问 window.matchMedia，
 * 因此必须在模块 import 前完成 polyfill。
 */
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
