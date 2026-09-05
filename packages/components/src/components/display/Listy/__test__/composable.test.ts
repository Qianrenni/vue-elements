import { describe, expect, it } from 'vitest';

import { computeListWindow } from '../composable';

describe('QListy 虚拟窗口', () => {
  it('首屏窗口', () => {
    const w = computeListWindow(0, 400, 40, 1000, 4);
    expect(w.start).toBe(0);
    expect(w.offset).toBe(0);
    expect(w.end).toBeGreaterThanOrEqual(10);
  });

  it('滚动中段计算 offset/end 并越界钳制', () => {
    const w = computeListWindow(4000, 400, 40, 1000, 4);
    expect(w.start).toBeGreaterThan(90);
    expect(w.offset).toBe(w.start * 40);
    expect(w.end).toBeLessThanOrEqual(1000);

    const tail = computeListWindow(999999, 400, 40, 50, 4);
    expect(tail.start).toBeLessThan(50);
    expect(tail.end).toBe(50);
    expect(tail.count).toBe(50 - tail.start);
  });

  it('行高为 0 时防御', () => {
    expect(() => computeListWindow(0, 400, 0, 10, 4)).not.toThrow();
  });
});
