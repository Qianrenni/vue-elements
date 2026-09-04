import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { SliderEmits, SliderMarks, SliderProps } from './type';

/** 值收敛到 [min, max] */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** 按 step 对齐（step<=0 时原样返回） */
export function alignToStep(value: number, step: number, min: number): number {
  if (step <= 0 || !Number.isFinite(step)) return value;
  return min + Math.round((value - min) / step) * step;
}

/** 规范化值：收敛 + 步长对齐 + 浮点精度 */
export function normalizeSlider(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  const c = clampValue(value, min, max);
  const a = alignToStep(c, step, min);
  const rounded = Math.round(a * 1e6) / 1e6;
  return clampValue(rounded, min, max);
}

/** 值 → 百分比（0-100） */
export function toPercent(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
}

/** 百分比 → 值（按 min/max 缩放后再 step 对齐） */
export function percentToValue(
  percent: number,
  min: number,
  max: number,
  step: number,
): number {
  const value = min + (percent / 100) * (max - min);
  return normalizeSlider(value, min, max, step);
}

/** useSlider 返回值接口 */
export interface UseSliderReturn {
  /** 当前值 */
  value: ComputedRef<number>;
  /** 当前值百分比（填充/手柄定位用） */
  percent: ComputedRef<number>;
  /** 刻度数组（排序） */
  markList: ComputedRef<{ value: number; label: string }[]>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 点击轨道 / 拖动 → 设值 */
  setFromClientX: (clientX: number, el: HTMLElement, commit: boolean) => void;
  /** 键盘调整 */
  onKeydown: (e: KeyboardEvent) => void;
}

/**
 * QSlider 组件核心逻辑：单值滑动条派生值/百分比/刻度 + 事件换算。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 派生状态与处理器
 */
export const useSlider = (
  props: SliderProps,
  emit: SliderEmits,
): UseSliderReturn => {
  const min = computed(() => props.min ?? 0);
  const max = computed(() => props.max ?? 100);
  const step = computed(() => props.step ?? 1);

  /** 当前值 */
  const value = computed(() =>
    normalizeSlider(
      props.modelValue ?? min.value,
      min.value,
      max.value,
      step.value,
    ),
  );

  /** 百分比 */
  const percent = computed(() => toPercent(value.value, min.value, max.value));

  /** 刻度 */
  const markList = computed<{ value: number; label: string }[]>(() => {
    const marks: SliderMarks = props.marks ?? {};
    return Object.entries(marks)
      .map(([v, label]) => ({
        value: Number(v),
        label,
      }))
      .sort((a, b) => a.value - b.value);
  });

  /** 是否禁用 */
  const isDisabled = computed(() => props.disabled === true);

  /** 派发新值 */
  function commit(next: number, isChange: boolean) {
    emit('update:modelValue', next);
    if (isChange) emit('change', next);
  }

  /** 由 clientX 计算并写入 */
  function setFromClientX(clientX: number, el: HTMLElement, isChange: boolean) {
    if (isDisabled.value) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const next = percentToValue(ratio * 100, min.value, max.value, step.value);
    commit(next, isChange);
  }

  /** 键盘方向键（每次一步） */
  function onKeydown(e: KeyboardEvent) {
    if (isDisabled.value) return;
    const delta = step.value > 0 ? step.value : (max.value - min.value) / 10;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      commit(
        normalizeSlider(value.value + delta, min.value, max.value, step.value),
        true,
      );
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      commit(
        normalizeSlider(value.value - delta, min.value, max.value, step.value),
        true,
      );
    }
  }

  return {
    value,
    percent,
    markList,
    isDisabled,
    setFromClientX,
    onKeydown,
  };
};
