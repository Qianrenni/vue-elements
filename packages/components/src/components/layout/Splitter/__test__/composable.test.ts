import { describe, expect, it } from 'vitest';

import {
  clampPanelSize,
  DEFAULT_SPLITTER_MIN,
  directionAxis,
  percentToPx,
  resolvePanelBasis,
} from '../composable';

describe('QSplitter 纯逻辑', () => {
  it('默认最小 60', () => {
    expect(DEFAULT_SPLITTER_MIN).toBe(60);
  });

  it('resolvePanelBasis', () => {
    expect(resolvePanelBasis(200, 300)).toBe('200px');
    expect(resolvePanelBasis('50%', 300)).toBe('50%');
    expect(resolvePanelBasis(undefined, 300)).toBe('300px');
  });

  it('clampPanelSize', () => {
    expect(clampPanelSize(10, 60, null)).toBe(60);
    expect(clampPanelSize(500, 60, 400)).toBe(400);
    expect(clampPanelSize(200, 60, 400)).toBe(200);
    expect(clampPanelSize(Number.NaN, 60, null)).toBe(60);
  });

  it('percentToPx', () => {
    expect(percentToPx('50%', 800)).toBe(400);
    expect(percentToPx('100%', 300)).toBe(300);
    expect(percentToPx('auto', 300)).toBe(Number.NaN);
  });

  it('directionAxis', () => {
    expect(directionAxis('row')).toEqual({
      sizeProp: 'width',
      posProp: 'clientX',
    });
    expect(directionAxis('column')).toEqual({
      sizeProp: 'height',
      posProp: 'clientY',
    });
  });
});
