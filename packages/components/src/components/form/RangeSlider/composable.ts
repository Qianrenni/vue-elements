import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QRangeSliderProps, RangeSliderValue } from './type';

/** 刻度标记（已换算位置百分比） */
export interface RangeSliderMark {
  /** 刻度值 */
  value: number;
  /** 刻度文案 */
  label: string;
  /** 刻度位置百分比（0 ~ 100） */
  percent: number;
}

/** useRangeSlider 返回值接口 */
export interface UseRangeSliderReturn {
  /** 当前区间值（已保证左值不大于右值） */
  range: ComputedRef<RangeSliderValue>;
  /** 两个滑块的百分比位置 */
  percent: ComputedRef<[number, number]>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 夹取并校正某个滑块的值 */
  clamp: (index: 0 | 1, raw: number) => number;
  /** 刻度列表（已按值升序） */
  markList: ComputedRef<RangeSliderMark[]>;
}

/** 将数值限制在 [min, max] 区间内 */
const clampNumber = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** 将数值对齐到最近的步进点 */
const alignToStep = (value: number, min: number, step: number): number =>
  min + Math.round((value - min) / step) * step;

/**
 * RangeSlider 组件核心逻辑
 * @param props 组件 Props
 * @returns range 区间值，percent 位置百分比，isDisabled 是否禁用，
 *          clamp 校正滑块值，markList 刻度列表
 */
export const useRangeSlider = (
  props: QRangeSliderProps,
): UseRangeSliderReturn => {
  /** 最小值 */
  const min = computed(() => props.min ?? 0);

  /** 最大值 */
  const max = computed(() => props.max ?? 100);

  /** 步进值，非法值回退为 1 */
  const step = computed(() =>
    typeof props.step === 'number' && props.step > 0 ? props.step : 1,
  );

  /** 当前区间值，缺省为 [min, max]，并保证左值不大于右值 */
  const range = computed<RangeSliderValue>(() => {
    const raw = props.value ?? [min.value, max.value];
    const start = clampNumber(raw[0], min.value, max.value);
    const end = clampNumber(raw[1], min.value, max.value);
    return [Math.min(start, end), Math.max(start, end)];
  });

  /** 区间跨度，为 0 时位置百分比统一按 0 处理 */
  const span = computed(() => max.value - min.value);

  /** 数值换算为位置百分比 */
  const toPercent = (value: number): number =>
    span.value <= 0 ? 0 : ((value - min.value) / span.value) * 100;

  /** 两个滑块的百分比位置 */
  const percent = computed<[number, number]>(() => [
    toPercent(range.value[0]),
    toPercent(range.value[1]),
  ]);

  /** 是否禁用 */
  const isDisabled = computed(() => props.disabled ?? false);

  /** 夹取并校正某个滑块的值：对齐步进 → 夹在 min/max → 保证左值不大于右值 */
  const clamp = (index: 0 | 1, raw: number): number => {
    const aligned = alignToStep(
      clampNumber(raw, min.value, max.value),
      min.value,
      step.value,
    );
    const bounded = clampNumber(aligned, min.value, max.value);

    return index === 0
      ? Math.min(bounded, range.value[1])
      : Math.max(bounded, range.value[0]);
  };

  /** 刻度列表：键转数值、换算位置、按值升序 */
  const markList = computed<RangeSliderMark[]>(() =>
    Object.entries(props.marks ?? {})
      .map(([key, label]) => ({
        value: Number(key),
        label,
        percent: toPercent(Number(key)),
      }))
      .filter((mark) => Number.isFinite(mark.value))
      .sort((a, b) => a.value - b.value),
  );

  return { range, percent, isDisabled, clamp, markList };
};
