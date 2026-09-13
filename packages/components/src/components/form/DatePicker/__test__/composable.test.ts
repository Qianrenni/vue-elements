import { describe, expect, it } from 'vitest';

import { useDatePicker } from '../composable';

describe('useDatePicker', () => {
  describe('nativeType', () => {
    it('缺省时应为 date', () => {
      expect(useDatePicker({}).nativeType.value).toBe('date');
    });

    it('应把 picker 映射为原生类型', () => {
      expect(useDatePicker({ picker: 'week' }).nativeType.value).toBe('week');
      expect(useDatePicker({ picker: 'month' }).nativeType.value).toBe('month');
      expect(useDatePicker({ picker: 'year' }).nativeType.value).toBe('date');
    });

    it('quarter 无原生支持，应退化为 month', () => {
      expect(useDatePicker({ picker: 'quarter' }).nativeType.value).toBe(
        'month',
      );
    });

    it('showTime 应为 datetime-local 且优先于 picker', () => {
      expect(useDatePicker({ showTime: true }).nativeType.value).toBe(
        'datetime-local',
      );
      expect(
        useDatePicker({ showTime: true, picker: 'week' }).nativeType.value,
      ).toBe('datetime-local');
    });
  });

  describe('text', () => {
    it('无值时应为空串', () => {
      expect(useDatePicker({}).text.value).toBe('');
      expect(useDatePicker({ value: '' }).text.value).toBe('');
    });

    it('普通 picker 应原样返回', () => {
      expect(useDatePicker({ value: '2026-09-13' }).text.value).toBe(
        '2026-09-13',
      );
    });

    it('showTime 时应原样返回', () => {
      expect(
        useDatePicker({ value: '2026-09-13T10:00', showTime: true }).text.value,
      ).toBe('2026-09-13T10:00');
    });

    it('year 应把四位年份补全为完整日期', () => {
      expect(useDatePicker({ value: '2026', picker: 'year' }).text.value).toBe(
        '2026-01-01',
      );
    });

    it('year 已是完整日期时应原样返回', () => {
      expect(
        useDatePicker({ value: '2026-09-13', picker: 'year' }).text.value,
      ).toBe('2026-09-13');
    });

    it('quarter 应换算为月份', () => {
      expect(
        useDatePicker({ value: '2026-Q1', picker: 'quarter' }).text.value,
      ).toBe('2026-01');
      expect(
        useDatePicker({ value: '2026-Q4', picker: 'quarter' }).text.value,
      ).toBe('2026-10');
      expect(
        useDatePicker({ value: '2026-q2', picker: 'quarter' }).text.value,
      ).toBe('2026-04');
    });

    it('quarter 非法格式应原样返回', () => {
      expect(
        useDatePicker({ value: '2026-09', picker: 'quarter' }).text.value,
      ).toBe('2026-09');
    });
  });

  describe('showClear', () => {
    it('未开启 allowClear 时不展示', () => {
      expect(useDatePicker({ value: '2026-09-13' }).showClear.value).toBe(
        false,
      );
    });

    it('开启 allowClear 且有值时才展示', () => {
      expect(
        useDatePicker({ value: '2026-09-13', allowClear: true }).showClear
          .value,
      ).toBe(true);
      expect(useDatePicker({ allowClear: true }).showClear.value).toBe(false);
    });
  });

  describe('statusClass', () => {
    it('无状态时应为空串', () => {
      expect(useDatePicker({}).statusClass.value).toBe('');
    });

    it('应按状态生成修饰类', () => {
      expect(useDatePicker({ status: 'error' }).statusClass.value).toBe(
        'q-date-picker--error',
      );
      expect(useDatePicker({ status: 'warning' }).statusClass.value).toBe(
        'q-date-picker--warning',
      );
    });
  });

  describe('sizeClass', () => {
    it('缺省应为 middle', () => {
      expect(useDatePicker({}).sizeClass.value).toBe('q-date-picker--middle');
    });

    it('应按尺寸生成修饰类', () => {
      expect(useDatePicker({ size: 'small' }).sizeClass.value).toBe(
        'q-date-picker--small',
      );
      expect(useDatePicker({ size: 'large' }).sizeClass.value).toBe(
        'q-date-picker--large',
      );
    });
  });
});
