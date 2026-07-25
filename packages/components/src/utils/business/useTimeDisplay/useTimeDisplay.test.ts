import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTimeDisplay } from './useTimeDisplay';

const hoisted = vi.hoisted(() => {
  let mockNow = Date.now();
  return {
    setMockNow: (v: number) => {
      mockNow = v;
    },
    mockUseTimeUtils: function mockUseTimeUtils(
      source?: Date | string | number,
    ) {
      return {
        valueOf: () => {
          if (source === undefined) return mockNow;
          const t = new Date(source).getTime();
          return Number.isNaN(t) ? NaN : t;
        },
        format: (fmt: string) => `FMT:${fmt}`,
      };
    },
  };
});

vi.mock('../useTimeUtils', () => ({
  handleDateFormat: (format: string, keyWords: string) => {
    const s = new Set(keyWords);
    const p = new Map<string, number>();
    let temp = '';
    for (const char of format) {
      if (!p.has(char)) {
        temp = `${temp}${char}`;
      }
      if (s.has(char)) {
        p.set(char, (p.get(char) || 0) + 1);
      }
    }
    return { temp, p };
  },
  UseTimeUtils: hoisted.mockUseTimeUtils,
}));

describe('useTimeDisplay', () => {
  beforeEach(() => {
    hoisted.setMockNow(1_700_000_000_000);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('初始值为格式字符串', () => {
    const { value } = useTimeDisplay(undefined, 'HH:mm:ss', {
      mode: 'realtime',
    });
    expect(value.value).toBe('HH:mm:ss');
  });

  it('应该在 start 后实时更新格式化时间', () => {
    const { value, start } = useTimeDisplay(undefined, 'HH:mm:ss', {
      mode: 'realtime',
    });

    start();
    expect(value.value).toBe('FMT:HH:mm:ss');
  });

  it('应该在 start 后倒计时显示剩余时间', () => {
    hoisted.setMockNow(1_700_000_000);
    const target = new Date(1_700_010_000); // 10 秒后
    const { value, start } = useTimeDisplay(target, 'HH:mm:ss', {
      mode: 'countdown',
    });

    start();
    // remaining = 10000ms → 0 时 0 分 10 秒
    expect(value.value).toBe('00:00:10');
  });

  it('应该在倒计时结束时归零并触发 onFinish', () => {
    const onFinish = vi.fn();
    hoisted.setMockNow(1_700_000_000);
    const target = new Date(1_699_000_000); // 已过期

    const { value, start } = useTimeDisplay(target, 'HH:mm:ss', {
      mode: 'countdown',
      onFinish,
    });

    start();
    expect(value.value).toBe('0:0:0');
    expect(onFinish).toHaveBeenCalled();
  });

  it('应该支持手动停止', () => {
    const { value, start, stop } = useTimeDisplay(undefined, 'HH:mm:ss', {
      mode: 'realtime',
    });

    start();
    expect(value.value).toBe('FMT:HH:mm:ss');

    // 停止后不应再通过 setInterval 更新
    value.value = 'stopped';
    stop();
    vi.advanceTimersByTime(2000);
    expect(value.value).toBe('stopped');
  });

  it('应该处理无效时间源', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { value } = useTimeDisplay('invalid-date', 'HH:mm:ss', {
      mode: 'countdown',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      '[useTimeDisplay] Invalid source time:',
      'invalid-date',
    );
    expect(value.value).toBe('HH:mm:ss');
    consoleSpy.mockRestore();
  });

  it('应该在多次启动时不重复创建定时器', () => {
    const { value, start, stop } = useTimeDisplay(undefined, 'HH:mm:ss', {
      mode: 'realtime',
    });

    start();
    expect(value.value).toBe('FMT:HH:mm:ss');

    // 第二次 start 不应影响
    start();
    // 验证没有副作用
    expect(value.value).toBe('FMT:HH:mm:ss');
    stop();
  });
});
