import { describe, expect, it } from 'vitest';

import {
  alignToStep,
  clampValue,
  normalizeSlider,
  percentToValue,
  toPercent,
} from '../composable';

describe('Slider 纯函数', () => {
  it('clampValue 收敛', () => {
    expect(clampValue(5, 0, 10)).toBe(5);
    expect(clampValue(-1, 0, 10)).toBe(0);
    expect(clampValue(99, 0, 10)).toBe(10);
  });

  it('alignToStep 从 min 对齐', () => {
    expect(alignToStep(7, 5, 0)).toBe(5);
    expect(alignToStep(12, 5, 0)).toBe(10);
    expect(alignToStep(3, 5, 1)).toBe(1);
    expect(alignToStep(7, 0, 0)).toBe(7);
  });

  it('normalizeSlider 收敛+对齐', () => {
    expect(normalizeSlider(7.4, 0, 10, 5)).toBe(5);
    expect(normalizeSlider(150, 0, 100, 10)).toBe(100);
    expect(normalizeSlider(-3, 0, 100, 10)).toBe(0);
  });

  it('toPercent / percentToValue 互逆', () => {
    expect(toPercent(50, 0, 100)).toBe(50);
    expect(percentToValue(50, 0, 100, 1)).toBe(50);
    expect(percentToValue(25, 0, 200, 10)).toBe(50);
    expect(percentToValue(0, 5, 5, 1)).toBe(5);
  });
});
