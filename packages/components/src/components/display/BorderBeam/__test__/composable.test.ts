import { describe, expect, it } from 'vitest';

import {
  buildBeamGradient,
  DEFAULT_BORDER_BEAM_COLOR,
  DEFAULT_BORDER_BEAM_COUNT,
  DEFAULT_BORDER_BEAM_DURATION,
  DEFAULT_BORDER_BEAM_LINE_WIDTH,
  DEFAULT_BORDER_BEAM_SIZE,
  deriveBorderBeam,
  sweepDegrees,
  toCssLength,
} from '../composable';

describe('QBorderBeam 纯逻辑', () => {
  it('默认常量', () => {
    expect(DEFAULT_BORDER_BEAM_DURATION).toBe(6);
    expect(DEFAULT_BORDER_BEAM_SIZE).toBe(100);
    expect(DEFAULT_BORDER_BEAM_LINE_WIDTH).toBe(1);
    expect(DEFAULT_BORDER_BEAM_COUNT).toBe(1);
    expect(DEFAULT_BORDER_BEAM_COLOR).toBe('var(--q-color-primary)');
  });

  it('toCssLength：数字转 px，字符串透传', () => {
    expect(toCssLength(3)).toBe('3px');
    expect(toCssLength('2px')).toBe('2px');
    expect(toCssLength(undefined)).toBeUndefined();
  });

  it('sweepDegrees：默认/钳位', () => {
    expect(sweepDegrees(100)).toBe(50);
    expect(sweepDegrees()).toBe(50);
    expect(sweepDegrees(10000)).toBe(300);
    expect(sweepDegrees(1)).toBe(20);
    expect(sweepDegrees('50')).toBe(25);
  });

  it('buildBeamGradient 为 repeating-conic-gradient 且含颜色', () => {
    const gradient = buildBeamGradient('#ff0000', 2, 50);
    expect(gradient).toContain('repeating-conic-gradient');
    expect(gradient).toContain('#ff0000');
  });

  it('deriveBorderBeam 默认派生与归一化', () => {
    const derived = deriveBorderBeam({});
    expect(derived.color).toBe(DEFAULT_BORDER_BEAM_COLOR);
    expect(derived.count).toBe(1);
    expect(derived.duration).toBe(DEFAULT_BORDER_BEAM_DURATION);
    expect(derived.lineWidth).toBe('1px');
    expect(derived.outset).toBe('0px');

    const custom = deriveBorderBeam({
      color: '#36cfc9',
      count: 0,
      duration: 0,
      lineWidth: 2,
      outset: 4,
      size: 200,
    });
    expect(custom.color).toBe('#36cfc9');
    expect(custom.count).toBe(1); // 0 → 1
    expect(custom.duration).toBe(DEFAULT_BORDER_BEAM_DURATION); // 0 → 默认
    expect(custom.lineWidth).toBe('2px');
    expect(custom.outset).toBe('4px');
  });
});
