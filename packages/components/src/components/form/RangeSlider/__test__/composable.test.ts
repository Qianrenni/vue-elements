import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';

import { useRangeSlider } from '../composable';
import type { QRangeSliderProps } from '../type';

describe('useRangeSlider', () => {
  it('value 缺省时应为 [min, max]', () => {
    const { range, percent } = useRangeSlider({});

    expect(range.value).toEqual([0, 100]);
    expect(percent.value).toEqual([0, 100]);
  });

  it('应反映传入的 value 并换算位置百分比', () => {
    const { range, percent } = useRangeSlider({ value: [25, 75] });

    expect(range.value).toEqual([25, 75]);
    expect(percent.value).toEqual([25, 75]);
  });

  it('应支持自定义 min/max', () => {
    const { percent } = useRangeSlider({ value: [50, 150], min: 0, max: 200 });

    expect(percent.value).toEqual([25, 75]);
  });

  it('value 顺序颠倒时应保证左值不大于右值', () => {
    const { range } = useRangeSlider({ value: [80, 20] });

    expect(range.value).toEqual([20, 80]);
  });

  it('min 与 max 相等时位置百分比应为 0', () => {
    const { percent } = useRangeSlider({ value: [5, 5], min: 5, max: 5 });

    expect(percent.value).toEqual([0, 0]);
  });

  it('默认应可交互', () => {
    const { isDisabled } = useRangeSlider({});

    expect(isDisabled.value).toBe(false);
  });

  it('disabled 时应不可交互', () => {
    const { isDisabled } = useRangeSlider({ disabled: true });

    expect(isDisabled.value).toBe(true);
  });

  it('range 应随 value 响应式变化', () => {
    const props = reactive<QRangeSliderProps>({ value: [0, 100] });
    const { percent } = useRangeSlider(props);

    expect(percent.value).toEqual([0, 100]);

    props.value = [10, 40];
    expect(percent.value).toEqual([10, 40]);
  });

  describe('clamp', () => {
    it('应夹在 min/max 之间', () => {
      const { clamp } = useRangeSlider({ min: 0, max: 100, value: [20, 80] });

      expect(clamp(0, -50)).toBe(0);
      expect(clamp(1, 200)).toBe(100);
    });

    it('应对齐到步进点', () => {
      const { clamp } = useRangeSlider({
        min: 0,
        max: 100,
        step: 10,
        value: [20, 80],
      });

      expect(clamp(0, 23)).toBe(20);
      expect(clamp(0, 26)).toBe(30);
    });

    it('左值不应大于右值', () => {
      const { clamp } = useRangeSlider({ min: 0, max: 100, value: [20, 60] });

      expect(clamp(0, 90)).toBe(60);
    });

    it('右值不应小于左值', () => {
      const { clamp } = useRangeSlider({ min: 0, max: 100, value: [20, 60] });

      expect(clamp(1, 5)).toBe(20);
    });

    it('对齐步进后仍应夹在 min/max 之间', () => {
      const { clamp } = useRangeSlider({
        min: 5,
        max: 10,
        step: 3,
        value: [5, 10],
      });

      expect(clamp(1, 10)).toBe(10);
    });

    it('step 非法时应按 1 处理', () => {
      const { clamp } = useRangeSlider({ min: 0, max: 100, step: 0 });

      expect(clamp(0, 33.4)).toBe(33);
    });
  });

  describe('markList', () => {
    it('marks 缺省时应为空数组', () => {
      const { markList } = useRangeSlider({});

      expect(markList.value).toEqual([]);
    });

    it('应按值升序并换算位置百分比', () => {
      const { markList } = useRangeSlider({
        min: 0,
        max: 100,
        marks: { 100: '满', 0: '空', 50: '半' },
      });

      expect(markList.value).toEqual([
        { value: 0, label: '空', percent: 0 },
        { value: 50, label: '半', percent: 50 },
        { value: 100, label: '满', percent: 100 },
      ]);
    });
  });
});
