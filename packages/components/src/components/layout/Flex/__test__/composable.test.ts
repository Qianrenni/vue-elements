import { describe, expect, it } from 'vitest';

import {
  DEFAULT_FLEX_GAP,
  FLEX_GAP_MAP,
  normalizeFlexGap,
} from '../composable';

describe('QFlex normalizeFlexGap', () => {
  it('档位映射', () => {
    expect(FLEX_GAP_MAP.small).toBe('8px');
    expect(FLEX_GAP_MAP.middle).toBe('16px');
    expect(FLEX_GAP_MAP.large).toBe('24px');
  });

  it('undefined → 默认', () => {
    expect(normalizeFlexGap(undefined)).toBe(DEFAULT_FLEX_GAP);
  });

  it('数字转 px，任意字符串透传', () => {
    expect(normalizeFlexGap(12)).toBe('12px');
    expect(normalizeFlexGap('2rem')).toBe('2rem');
    expect(normalizeFlexGap('small')).toBe('8px');
  });
});
