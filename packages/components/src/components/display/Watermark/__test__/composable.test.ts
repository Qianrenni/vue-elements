import { describe, expect, it } from 'vitest';

import {
  contentLines,
  DEFAULT_WATERMARK_FONT_SIZE,
  rotatedBounds,
} from '../composable';

describe('QWatermark 纯函数', () => {
  it('contentLines 归一化单行/多行/空', () => {
    expect(contentLines('hello')).toEqual(['hello']);
    expect(contentLines(['a', ' b ', '  '])).toEqual(['a', ' b ']);
    expect(contentLines(undefined)).toEqual([]);
    expect(contentLines('   ')).toEqual([]);
  });

  it('rotatedBounds 旋转外接矩形', () => {
    const zero = rotatedBounds(100, 40, 0);
    expect(zero.width).toBeCloseTo(100);
    expect(zero.height).toBeCloseTo(40);
    const ninety = rotatedBounds(100, 40, 90);
    expect(ninety.width).toBeCloseTo(40);
    expect(ninety.height).toBeCloseTo(100);
    expect(DEFAULT_WATERMARK_FONT_SIZE).toBe(16);
  });
});
