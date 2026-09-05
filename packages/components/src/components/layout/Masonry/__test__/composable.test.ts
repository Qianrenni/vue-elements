import { describe, expect, it } from 'vitest';

import {
  DEFAULT_MASONRY_COLUMNS,
  DEFAULT_MASONRY_GAP,
  masonryContainerStyle,
  masonryGap,
  masonryItemStyle,
  normalizeColumns,
} from '../composable';

describe('QMasonry 纯逻辑', () => {
  it('默认常量', () => {
    expect(DEFAULT_MASONRY_COLUMNS).toBe(4);
    expect(DEFAULT_MASONRY_GAP).toBe(16);
  });

  it('normalizeColumns 钳制', () => {
    expect(normalizeColumns()).toBe(4);
    expect(normalizeColumns(0)).toBe(1);
    expect(normalizeColumns(2.8)).toBe(2);
  });

  it('gap 数字转 px', () => {
    expect(masonryGap(8)).toBe('8px');
    expect(masonryGap()).toBe('16px');
  });

  it('容器/子项样式', () => {
    const style = masonryContainerStyle(3, 12);
    expect(style.columnCount).toBe(3);
    expect(style.columnGap).toBe('12px');
    expect(masonryItemStyle(8).marginBottom).toBe('8px');
    expect(masonryItemStyle().breakInside).toBe('avoid');
  });
});
