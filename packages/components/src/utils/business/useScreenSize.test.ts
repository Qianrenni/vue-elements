import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type UseScreenSizeType = {
  getWidth: (width: number) => { value: boolean };
  getHeight: (height: number) => { value: boolean };
};

describe('useScreenSize', () => {
  let useScreenSize: UseScreenSizeType;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal('window', {
      innerWidth: 1024,
      innerHeight: 768,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const mod = await import('./useScreenSize');
    useScreenSize = mod.useScreenSize as unknown as UseScreenSizeType;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('getWidth 应该根据当前窗口宽度返回响应式布尔值', () => {
    const isSmall = useScreenSize.getWidth(768);
    // 1024 <= 768 → false
    expect(isSmall.value).toBe(false);

    const isLarge = useScreenSize.getWidth(2048);
    // 1024 <= 2048 → true
    expect(isLarge.value).toBe(true);
  });

  it('getHeight 应该根据当前窗口高度返回响应式布尔值', () => {
    const isShort = useScreenSize.getHeight(600);
    // 768 <= 600 → false
    expect(isShort.value).toBe(false);

    const isTall = useScreenSize.getHeight(1024);
    // 768 <= 1024 → true
    expect(isTall.value).toBe(true);
  });

  it('应该缓存相同 key 的查询返回同一引用', () => {
    const r1 = useScreenSize.getWidth(768);
    const r2 = useScreenSize.getWidth(768);
    expect(r1).toBe(r2);
  });

  it('不同的 key 应返回不同的 ref', () => {
    const r1 = useScreenSize.getWidth(768);
    const r2 = useScreenSize.getWidth(1024);
    expect(r1).not.toBe(r2);
  });

  it('getWidth 与 getHeight 使用不同的缓存空间', () => {
    const w = useScreenSize.getWidth(768);
    const h = useScreenSize.getHeight(768);
    expect(w).not.toBe(h);
  });
});
