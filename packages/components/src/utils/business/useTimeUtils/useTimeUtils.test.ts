import { describe, expect, it } from 'vitest';

import { UseTimeUtils } from './useTimeUtils';

describe('useTimeUtils', () => {
  it('时间相同应该相等', () => {
    const date1 = new UseTimeUtils('2023-01-01');
    const date2 = new UseTimeUtils('2023-01-01');
    const date3 = new UseTimeUtils('2023-01-02');
    expect(date1.equals(date2)).toBe(true);
    expect(date1.equals(date3)).toBe(false);
    expect(date2.equals(date3)).toBe(false);
  });
  it('能够分清闰年', () => {
    const start = new UseTimeUtils('2016-01-01');
    const end = new UseTimeUtils('2017-01-01');
    let count = 0;
    while (!start.equals(end)) {
      count += 1;
      start.add(1, 'day');
    }
    expect(count).toBe(366);
  });
  it('能够分清平年', () => {
    const start = new UseTimeUtils('2017-01-01');
    const end = new UseTimeUtils('2018-01-01');
    let count = 0;
    while (!start.equals(end)) {
      count += 1;
      start.add(1, 'day');
    }
    expect(count).toBe(365);
  });

  describe('format', () => {
    it('默认格式应为 YYYY-MM-DD HH:mm:ss', () => {
      const date = new UseTimeUtils('2023-06-15T14:05:09.123');
      expect(date.format()).toBe('2023-06-15 14:05:09');
    });

    it('应支持自定义 padChar', () => {
      const date = new UseTimeUtils('2023-06-05T14:05:09.123');
      // format 仅以占位符首次出现位置输出，重复占位符用于决定 padStart 长度
      expect(date.format('YYYY-MM-DD', ' ')).toBe('2023- 6- 5');
    });

    it('应支持毫秒 S', () => {
      // .42 => 420 毫秒
      const date = new UseTimeUtils('2023-01-01T00:00:00.42');
      expect(date.format('SSS')).toBe('420');
      const ms5 = new UseTimeUtils('2023-01-01T00:00:00.005');
      expect(ms5.format('SSS')).toBe('005');
    });

    it('应支持星期几 d', () => {
      // 2023-06-15 是星期四（getDay() === 4）
      const date = new UseTimeUtils('2023-06-15T00:00:00');
      expect(date.format('d')).toBe('4');
    });

    it('应支持 12 小时制 h', () => {
      // 00:00 -> 12, 13:05 -> 1
      const midnight = new UseTimeUtils('2023-01-01T00:00:00');
      expect(midnight.format('h')).toBe('12');
      const afternoon = new UseTimeUtils('2023-01-01T13:05:00');
      expect(afternoon.format('h')).toBe('1');
      const noon = new UseTimeUtils('2023-01-01T12:00:00');
      expect(noon.format('h')).toBe('12');
      const evening = new UseTimeUtils('2023-01-01T23:59:00');
      expect(evening.format('h')).toBe('11');
    });

    it('应支持 padStart 多个 h', () => {
      const date = new UseTimeUtils('2023-01-01T09:00:00');
      expect(date.format('hh')).toBe('09');
    });

    it('H 与 h 应互不干扰', () => {
      const date = new UseTimeUtils('2023-01-01T13:00:00');
      expect(date.format('H/h')).toBe('13/1');
    });
  });

  describe('add / subtract', () => {
    it('add 应支持所有单位并链式调用', () => {
      const date = new UseTimeUtils('2023-01-01T00:00:00.000');
      const result = date
        .add(1, 'year')
        .add(1, 'month')
        .add(1, 'day')
        .add(1, 'hour')
        .add(1, 'minute')
        .add(1, 'second')
        .add(1, 'millisecond');
      expect(result.format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2024-02-02 01:01:01.001',
      );
    });

    it('subtract 应支持所有单位（含 millisecond）', () => {
      const date = new UseTimeUtils('2024-02-02T01:01:01.001');
      const result = date
        .subtract(1, 'year')
        .subtract(1, 'month')
        .subtract(1, 'day')
        .subtract(1, 'hour')
        .subtract(1, 'minute')
        .subtract(1, 'second')
        .subtract(1, 'millisecond');
      expect(result.format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2023-01-01 00:00:00.000',
      );
    });

    it('add 与 subtract 应互为逆运算', () => {
      const original = new UseTimeUtils('2023-06-15T10:20:30.500');
      const after = new UseTimeUtils('2023-06-15T10:20:30.500');
      after.add(5, 'millisecond').subtract(5, 'millisecond');
      expect(original.equals(after)).toBe(true);
    });

    it('subtract 跨月应正确回退', () => {
      const date = new UseTimeUtils('2023-03-01T00:00:00');
      date.subtract(1, 'day');
      expect(date.format('YYYY-MM-DD')).toBe('2023-02-28');
    });
  });
});
