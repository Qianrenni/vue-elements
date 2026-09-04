import { describe, expect, it } from 'vitest';

import {
  clamp,
  parseToNumber,
  roundToPrecision,
  roundToStep,
} from '../composable';

describe('InputNumber 纯函数', () => {
  it('parseToNumber 解析/空值/非法', () => {
    expect(parseToNumber(5)).toBe(5);
    expect(parseToNumber('3.5')).toBe(3.5);
    expect(parseToNumber('')).toBeNull();
    expect(parseToNumber(null)).toBeNull();
    expect(parseToNumber(undefined)).toBeNull();
    expect(parseToNumber('abc')).toBeNull();
  });

  it('clamp 收敛到边界', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(20, 0, 10)).toBe(10);
  });

  it('roundToStep 按步长对齐', () => {
    expect(roundToStep(7, 5)).toBe(5);
    expect(roundToStep(7.9, 5)).toBe(10);
    expect(roundToStep(7.4, 5)).toBe(5);
  });

  it('roundToPrecision 保留小数', () => {
    expect(roundToPrecision(1.005, 2)).toBe(1);
    expect(roundToPrecision(1.234, 2)).toBe(1.23);
    expect(roundToPrecision(1.234)).toBe(1.234);
  });
});
