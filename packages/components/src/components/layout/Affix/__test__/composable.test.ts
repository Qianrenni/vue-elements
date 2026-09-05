import { describe, expect, it } from 'vitest';

import {
  computeAffixState,
  getFixedBottom,
  getFixedTop,
  getTargetRect,
  type QAffixRect,
} from '../composable';

const rect = (partial: Partial<QAffixRect>): QAffixRect => ({
  top: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
  ...partial,
});

describe('QAffix getTargetRect', () => {
  it('null / 无 getBoundingClientRect 目标按视口处理', () => {
    expect(getTargetRect(null, 800)).toEqual({
      top: 0,
      bottom: 800,
      left: 0,
      width: 0,
      height: 0,
    });
  });

  it('元素目标返回其 getBoundingClientRect', () => {
    const el = {
      getBoundingClientRect: () => ({
        top: 10,
        bottom: 110,
        left: 5,
        width: 100,
        height: 100,
      }),
    } as unknown as HTMLElement;
    expect(getTargetRect(el, 800)).toEqual({
      top: 10,
      bottom: 110,
      left: 5,
      width: 100,
      height: 100,
    });
  });
});

describe('QAffix getFixedTop', () => {
  it('占位顶部未滚到阈值上方时不吸顶', () => {
    const placeholder = rect({ top: 200 });
    expect(getFixedTop(placeholder, rect({ top: 0 }), 0)).toBeUndefined();
    expect(getFixedTop(placeholder, rect({ top: 0 }), 80)).toBeUndefined();
  });

  it('占位顶部超过阈值时返回 fixed top', () => {
    // 视口顶 0 > 占位顶 -100 - 0 → 命中，top=0
    expect(getFixedTop(rect({ top: -100 }), rect({ top: 0 }), 0)).toBe(0);
    // offsetTop=80：占位顶 60 < 80 阈值 → 命中，top=80
    expect(getFixedTop(rect({ top: 60 }), rect({ top: 0 }), 80)).toBe(80);
    // 元素容器 targetRect.top=20 → top=offsetTop+20
    expect(getFixedTop(rect({ top: -10 }), rect({ top: 20 }), 10)).toBe(30);
  });

  it('round 避免临界亚像素提前吸顶', () => {
    // 79.6 四舍五入为 80，恰在阈值上不吸顶
    expect(
      getFixedTop(rect({ top: 79.6 }), rect({ top: 0 }), 80),
    ).toBeUndefined();
  });

  it('offsetTop 未设置返回 undefined', () => {
    expect(
      getFixedTop(rect({ top: -100 }), rect({ top: 0 }), undefined),
    ).toBeUndefined();
  });
});

describe('QAffix getFixedBottom', () => {
  it('占位底部未越过底部阈值时不吸底', () => {
    expect(
      getFixedBottom(rect({ bottom: 700 }), rect({ bottom: 800 }), 0, 800),
    ).toBeUndefined();
  });

  it('占位底部越过阈值时返回 fixed bottom', () => {
    // 视口底 800 < 占位底 900 → 命中，目标贴底 → bottom=0
    expect(
      getFixedBottom(rect({ bottom: 900 }), rect({ bottom: 800 }), 0, 800),
    ).toBe(0);
  });

  it('元素容器不在视口底部时补偿距离', () => {
    // 容器底 600（距视口底 200），bottom=offsetBottom+200=80
    expect(
      getFixedBottom(rect({ bottom: 700 }), rect({ bottom: 600 }), 80, 800),
    ).toBe(280);
  });

  it('offsetBottom 未设置返回 undefined', () => {
    expect(
      getFixedBottom(
        rect({ bottom: 900 }),
        rect({ bottom: 800 }),
        undefined,
        800,
      ),
    ).toBeUndefined();
  });
});

describe('QAffix computeAffixState', () => {
  const viewportHeight = 800;
  const winRect = rect({ top: 0, bottom: 800 });

  it('offsetTop/offsetBottom 均未设置：默认 offsetTop=0', () => {
    const placeholder = rect({ top: -20, bottom: 40, width: 300, height: 60 });
    expect(
      computeAffixState(placeholder, winRect, {
        viewportHeight,
      }),
    ).toEqual({ mode: 'top', top: 0, width: 300, height: 60 });
  });

  it('未滚出可视带时返回 null', () => {
    const placeholder = rect({ top: 100, bottom: 160, width: 300, height: 60 });
    expect(
      computeAffixState(placeholder, winRect, { viewportHeight }),
    ).toBeNull();
  });

  it('设置 offsetTop 后按顶部偏移吸顶', () => {
    const placeholder = rect({ top: 60, bottom: 120, width: 300, height: 60 });
    expect(
      computeAffixState(placeholder, winRect, {
        offsetTop: 80,
        viewportHeight,
      }),
    ).toEqual({ mode: 'top', top: 80, width: 300, height: 60 });
  });

  it('设置 offsetBottom 后按底部吸底', () => {
    const placeholder = rect({
      top: 300,
      bottom: 900,
      width: 300,
      height: 600,
    });
    expect(
      computeAffixState(placeholder, winRect, {
        offsetBottom: 0,
        viewportHeight,
      }),
    ).toEqual({ mode: 'bottom', bottom: 0, width: 300, height: 600 });
  });

  it('同时设置时 top 命中优先', () => {
    const placeholder = rect({ top: -50, bottom: 10, width: 300, height: 60 });
    const state = computeAffixState(placeholder, winRect, {
      offsetTop: 0,
      offsetBottom: 0,
      viewportHeight,
    });
    expect(state).not.toBeNull();
    expect(state!.mode).toBe('top');
  });
});
