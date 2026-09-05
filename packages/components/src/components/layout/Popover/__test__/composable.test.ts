import { describe, expect, it } from 'vitest';

import {
  placementAlign,
  placementSide,
  POPOVER_PLACEMENTS,
} from '../composable';

describe('QPopover 纯函数', () => {
  it('POPOVER_PLACEMENTS 共 12 个方向', () => {
    expect(POPOVER_PLACEMENTS).toHaveLength(12);
    expect(POPOVER_PLACEMENTS).toContain('rightBottom');
    expect(POPOVER_PLACEMENTS).toContain('leftTop');
  });

  it('placementSide 解析所在边', () => {
    expect(placementSide('top')).toBe('top');
    expect(placementSide('topRight')).toBe('top');
    expect(placementSide('bottomLeft')).toBe('bottom');
    expect(placementSide('left')).toBe('left');
    expect(placementSide('rightBottom')).toBe('right');
  });

  it('placementAlign 解析对齐', () => {
    expect(placementAlign('top')).toBe('center');
    expect(placementAlign('topLeft')).toBe('start');
    expect(placementAlign('bottomRight')).toBe('end');
    expect(placementAlign('left')).toBe('center');
    expect(placementAlign('leftTop')).toBe('start');
    expect(placementAlign('rightBottom')).toBe('end');
  });
});
