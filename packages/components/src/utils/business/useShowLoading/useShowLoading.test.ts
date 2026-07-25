import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useShowLoading } from './useShowLoading';

vi.mock('@/components/loading/Loading', () => ({
  QLoading: { name: 'QLoading', render: () => {} },
}));

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    render: vi.fn((vnode: unknown) => {
      if (vnode === null) return;
      (vnode as Record<string, unknown>).el = {};
    }),
  };
});

describe('useShowLoading', () => {
  let containerEl: {
    id: string;
    style: Record<string, string>;
    parentNode: unknown;
  };

  beforeEach(() => {
    containerEl = {
      id: '',
      style: {},
      parentNode: null,
    };

    vi.stubGlobal('document', {
      createElement: vi.fn(() => containerEl),
      createComment: vi.fn(),
      body: {
        appendChild: vi.fn((child: unknown) => {
          (child as typeof containerEl).parentNode = document.body;
        }),
        removeChild: vi.fn(),
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    useShowLoading.hide();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('应该显示加载遮罩', () => {
    useShowLoading.show(5000);

    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(containerEl.id).toBe('loading-container');
    expect(document.body.appendChild).toHaveBeenCalled();
  });

  it('应该在 delay 后自动隐藏', () => {
    useShowLoading.show(3000);

    vi.advanceTimersByTime(3000);

    expect(document.body.removeChild).toHaveBeenCalled();
  });

  it('应该支持手动隐藏', () => {
    useShowLoading.show(5000);
    useShowLoading.hide();

    expect(document.body.removeChild).toHaveBeenCalled();
  });

  it('应该防止重复显示', () => {
    useShowLoading.show(5000);
    useShowLoading.show(5000);

    expect(document.createElement).toHaveBeenCalledTimes(1);
  });

  it('应该在隐藏后允许再次显示', () => {
    useShowLoading.show(1000);
    vi.advanceTimersByTime(1000);

    useShowLoading.show(1000);
    expect(document.createElement).toHaveBeenCalledTimes(2);
  });
});
