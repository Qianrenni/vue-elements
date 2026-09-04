import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type {
  SegmentedEmits,
  SegmentedOption,
  SegmentedOptionSource,
  SegmentedProps,
  SegmentedValue,
} from './type';

/**
 * 归一化选项：字符串/数字 → { label, value }。
 * @param options 原始选项
 * @returns 归一化后的选项
 */
export function normalizeSegmentedOptions(
  options: SegmentedOptionSource[] | undefined,
): SegmentedOption[] {
  const list = options ?? [];
  return list.map((item) => {
    if (typeof item === 'object' && item !== null) return item;
    const v = item as SegmentedValue;
    return { label: String(v), value: v };
  });
}

/**
 * 定位某值对应的选项索引（找不到返回 -1）。
 * @param options 归一化选项
 * @param value 目标值
 * @returns 索引
 */
export function findIndexByValue(
  options: SegmentedOption[],
  value: SegmentedValue | undefined,
): number {
  if (value === undefined) return -1;
  return options.findIndex((o) => o.value === value);
}

/**
 * 从某索引向指定方向（±1）步进，跳过禁用项并环绕。
 * @param index 起始索引（可为 -1）
 * @param step 步长（1 或 -1）
 * @param options 归一化选项
 * @returns 下一个可用索引；无可用项返回 -1
 */
export function moveIndex(
  index: number,
  step: number,
  options: SegmentedOption[],
): number {
  const n = options.length;
  if (n === 0) return -1;
  if (options.every((o) => o.disabled)) return -1;
  const realStep = step >= 0 ? 1 : -1;
  let i = index;
  for (let k = 0; k < n; k += 1) {
    i = (i + realStep + n) % n;
    if (!options[i].disabled) return i;
  }
  return -1;
}

/** 第一个可用选项索引（无返回 -1） */
export function firstEnabledIndex(options: SegmentedOption[]): number {
  return options.findIndex((o) => !o.disabled);
}

/** 最后一个可用选项索引（无返回 -1） */
export function lastEnabledIndex(options: SegmentedOption[]): number {
  for (let i = options.length - 1; i >= 0; i -= 1) {
    if (!options[i].disabled) return i;
  }
  return -1;
}

/** useSegmented 返回值接口 */
export interface UseSegmentedReturn {
  /** 归一化选项 */
  options: ComputedRef<SegmentedOption[]>;
  /** 当前选中值 */
  selectedValue: ComputedRef<SegmentedValue | undefined>;
  /** 当前选中索引 */
  selectedIndex: ComputedRef<number>;
  /** 是否整体禁用 */
  isDisabledAll: ComputedRef<boolean>;
  /** 容器修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
  /** 某选项是否禁用 */
  optionDisabled: (index: number) => boolean;
  /** 某选项是否选中 */
  optionChecked: (index: number) => boolean;
  /** 点击/Enter 选中某选项 */
  onSelect: (index: number) => void;
  /** 从索引步进 */
  step: (index: number, direction: 1 | -1) => number;
}

/**
 * QSegmented 组件核心逻辑：归一化 + 选中态派生 + 选择分发。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useSegmented = (
  props: SegmentedProps,
  emit: SegmentedEmits,
): UseSegmentedReturn => {
  const options = computed(() => normalizeSegmentedOptions(props.options));
  const selectedValue = computed(() => props.modelValue);
  const selectedIndex = computed(() =>
    findIndexByValue(options.value, props.modelValue),
  );
  const isDisabledAll = computed(() => props.disabled === true);

  const classList = computed(() => ({
    'q-segmented--block': props.block === true,
    'q-segmented--vertical': props.vertical === true,
    'q-segmented--disabled': isDisabledAll.value,
    [`q-segmented--${props.size ?? 'middle'}`]: true,
  }));

  function optionDisabled(index: number): boolean {
    const opt = options.value[index];
    return isDisabledAll.value || Boolean(opt?.disabled);
  }

  function optionChecked(index: number): boolean {
    return index === selectedIndex.value;
  }

  function onSelect(index: number) {
    if (optionDisabled(index)) return;
    const opt = options.value[index];
    if (!opt) return;
    if (opt.value === props.modelValue) return;
    emit('update:modelValue', opt.value);
    emit('change', opt.value);
  }

  function step(index: number, direction: 1 | -1): number {
    return moveIndex(index, direction, options.value);
  }

  return {
    options,
    selectedValue,
    selectedIndex,
    isDisabledAll,
    classList,
    optionDisabled,
    optionChecked,
    onSelect,
    step,
  };
};
