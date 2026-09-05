import { describe, expect, it } from 'vitest';

import {
  buildOptions,
  formatHasSeconds,
  formatTime,
  normalizeTimeValue,
  pad2,
  parseTimeValue,
} from '../composable';

describe('QTimePicker 纯逻辑', () => {
  it('pad2 补零', () => {
    expect(pad2(3)).toBe('03');
    expect(pad2(23)).toBe('23');
  });

  it('parseTimeValue 解析/钳位', () => {
    expect(parseTimeValue('12:30:45')).toEqual({
      hour: 12,
      minute: 30,
      second: 45,
    });
    expect(parseTimeValue('09:05')).toEqual({ hour: 9, minute: 5, second: 0 });
    expect(parseTimeValue('25:99:99')).toEqual({
      hour: 23,
      minute: 59,
      second: 59,
    });
    expect(parseTimeValue('')).toEqual({ hour: 0, minute: 0, second: 0 });
  });

  it('formatTime 按格式输出', () => {
    const parts = { hour: 12, minute: 30, second: 45 };
    expect(formatTime(parts, 'HH:mm:ss')).toBe('12:30:45');
    expect(formatTime(parts, 'HH:mm')).toBe('12:30');
    expect(formatTime(parts, 'H:mm:s')).toBe('12:30:45');
  });

  it('formatHasSeconds', () => {
    expect(formatHasSeconds('HH:mm:ss')).toBe(true);
    expect(formatHasSeconds('HH:mm')).toBe(false);
  });

  it('buildOptions 按步长生成', () => {
    expect(buildOptions(24, 1)).toHaveLength(24);
    expect(buildOptions(60, 5)).toEqual([
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
    ]);
  });

  it('normalizeTimeValue 对齐分钟步长', () => {
    expect(normalizeTimeValue('12:33:40', { minute: 5 })).toBe('12:30:40');
    expect(normalizeTimeValue('', {})).toBe('');
    expect(normalizeTimeValue(undefined, {})).toBeUndefined();
  });
});
