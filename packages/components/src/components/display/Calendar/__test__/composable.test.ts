import { describe, expect, it } from 'vitest';

import {
  daysInMonth,
  inMonth,
  isSameDay,
  monthMatrix,
  monthTitle,
  WEEK_HEADERS,
} from '../composable';

describe('QCalendar 纯逻辑', () => {
  it('表头为日~六', () => {
    expect(WEEK_HEADERS).toHaveLength(7);
    expect(WEEK_HEADERS[0]).toBe('日');
  });

  it('daysInMonth 含闰年', () => {
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2023, 1)).toBe(28);
    expect(daysInMonth(2026, 8)).toBe(30);
  });

  it('monthMatrix 生成 42 格且首格为当月 1 号所在周开始', () => {
    const cells = monthMatrix(2026, 8); // 2026-09
    expect(cells).toHaveLength(42);
    const first = new Date(2026, 8, 1);
    const offset = first.getDay();
    expect(cells[offset].getDate()).toBe(1);
  });

  it('isSameDay / inMonth / monthTitle', () => {
    expect(isSameDay(new Date(2026, 8, 5), new Date(2026, 8, 5))).toBe(true);
    expect(isSameDay(new Date(2026, 8, 5), new Date(2026, 9, 5))).toBe(false);
    expect(inMonth(new Date(2026, 8, 20), 2026, 8)).toBe(true);
    expect(monthTitle(2026, 8)).toBe('2026 年 9 月');
  });
});
