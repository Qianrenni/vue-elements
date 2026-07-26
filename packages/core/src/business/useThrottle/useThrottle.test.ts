import { useThrottle } from '@/business/useThrottle/useThrottle';
import { describe, expect, it, vi } from 'vitest';

describe('useThrottle', () => {
  it('应该在间隔内执行一次节流函数', () => {
    const fn = vi.fn();
    const throttled = useThrottle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('应该在超过间隔后再次执行', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = useThrottle(fn, 50);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('应该使用默认的 16ms 节流间隔', () => {
    const fn = vi.fn();
    const throttled = useThrottle(fn);

    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('应该将参数传递给原始函数', () => {
    const fn = vi.fn();
    const throttled = useThrottle(fn, 100);

    throttled('a', 1);

    expect(fn).toHaveBeenCalledWith('a', 1);
  });

  it('应该保持正确的 this 上下文', () => {
    const fn = vi.fn();
    const obj = { value: 42, fn };
    const throttled = useThrottle(obj.fn, 100);
    throttled.call(obj);
    expect(fn.mock.instances[0]).toBe(obj);
  });
});
