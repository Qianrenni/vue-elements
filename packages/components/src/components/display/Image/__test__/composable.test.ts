import { describe, expect, it } from 'vitest';

import { clampScale, cssLength, turnAngle, zoomAt } from '../composable';

describe('QImage 纯函数', () => {
  it('cssLength 数字转 px / 透传字符串 / undefined', () => {
    expect(cssLength(120)).toBe('120px');
    expect(cssLength('80%')).toBe('80%');
    expect(cssLength(undefined)).toBeUndefined();
    expect(cssLength('')).toBeUndefined();
  });

  it('clampScale / zoomAt 范围控制', () => {
    expect(clampScale(1)).toBe(1);
    expect(clampScale(99)).toBe(6);
    expect(clampScale(0.01)).toBe(0.2);
    expect(clampScale(Number.NaN)).toBe(1);
    expect(zoomAt(1, 1)).toBe(1.5);
    expect(zoomAt(6, 1)).toBe(6);
    expect(zoomAt(1, -1)).toBe(0.5);
  });

  it('turnAngle 累加并归一化', () => {
    expect(turnAngle(0, 1)).toBe(90);
    expect(turnAngle(90, 1)).toBe(180);
    expect(turnAngle(0, -1)).toBe(270);
    expect(turnAngle(180, -1)).toBe(90);
    expect(turnAngle(270, 1)).toBe(0);
  });
});
