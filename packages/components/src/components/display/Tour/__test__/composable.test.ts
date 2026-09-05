import { describe, expect, it } from 'vitest';

import {
  computeCardPos,
  computeMaskPanes,
  DEFAULT_TOUR_MASK,
} from '../composable';

const rect = {
  top: 100,
  bottom: 200,
  left: 300,
  right: 500,
  width: 200,
  height: 100,
};
const viewport = { width: 1000, height: 700 };

describe('QTour 纯逻辑', () => {
  it('默认遮罩色', () => {
    expect(DEFAULT_TOUR_MASK).toBe('rgba(0, 0, 0, 0.45)');
  });

  it('computeMaskPanes 四块覆盖周边并留孔', () => {
    const panes = computeMaskPanes(rect, viewport);
    expect(panes.top.height).toBe(100);
    expect(panes.bottom.top).toBe(200);
    expect(panes.left.width).toBe(300);
    expect(panes.right.width).toBe(500);
  });

  it('computeCardPos 底部放不下时翻转上方', () => {
    const lowRect = { ...rect, top: 600, bottom: 700 };
    const res = computeCardPos(lowRect, 'bottom', viewport);
    expect(res.flip).toBe(true);
    expect(res.top).toBeLessThan(600);
  });

  it('computeCardPos 横向夹在视口内', () => {
    const res = computeCardPos(rect, 'bottom', viewport);
    expect(res.left).toBeGreaterThanOrEqual(12);
    expect(res.left + 280).toBeLessThanOrEqual(viewport.width - 12);
  });
});
