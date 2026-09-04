import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { RateEmits, RateProps } from './type';

/** 某颗星（0-based）是否满星 */
export function isFull(display: number, index: number): boolean {
  return display >= index + 1;
}

/** 某颗星（0-based）是否半星（仅 allowHalf 场景） */
export function isHalf(
  display: number,
  index: number,
  allowHalf: boolean,
): boolean {
  return allowHalf && display === index + 0.5;
}

/** useRate 返回值接口 */
export interface UseRateReturn {
  /** 展示值（悬停预览优先，否则为 modelValue） */
  displayValue: ComputedRef<number>;
  /** 悬停预览值（0 表示无预览） */
  hoverValue: Ref<number>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 指针悬停某颗星（half=true 命中左半 → 半星预览） */
  onHover: (index: number, half?: boolean) => void;
  /** 移出 */
  onLeave: () => void;
  /** 点击某颗星：index 为 0-based，half=true 表示命中左半（半星） */
  onPick: (index: number, half: boolean) => void;
}

/**
 * QRate 组件核心逻辑：展示/悬停派生 + 取值（含半星、清除）。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useRate = (props: RateProps, emit: RateEmits): UseRateReturn => {
  const count = computed(() => props.count ?? 5);
  const hoverValue = ref(0);
  const isDisabled = computed(() => props.disabled === true);

  /** 展示值 */
  const displayValue = computed(() =>
    hoverValue.value > 0 ? hoverValue.value : (props.modelValue ?? 0),
  );

  /** 悬停某颗星（默认整星 index+1；半星左半为 index+0.5） */
  function onHover(index: number, half?: boolean) {
    if (isDisabled.value) return;
    const preview = half && props.allowHalf ? index + 0.5 : index + 1;
    hoverValue.value = Math.min(preview, count.value);
    emit('hoverChange', hoverValue.value);
  }

  /** 移出 */
  function onLeave() {
    hoverValue.value = 0;
    emit('hoverChange', 0);
  }

  /** 点击取值 */
  function onPick(index: number, half: boolean) {
    if (isDisabled.value) return;
    // 命中左半且允许半星 → x.5（index=0 时即 0.5）；否则整数 index+1
    const raw = half && props.allowHalf ? index + 0.5 : index + 1;
    const next = Math.min(Math.max(raw, 0), count.value);

    // 可清除：再次点击同一值 → 归零
    const current = props.modelValue ?? 0;
    const final = props.allowClear && current === next ? 0 : next;

    hoverValue.value = 0;
    emit('update:modelValue', final);
    emit('change', final);
  }

  return { displayValue, hoverValue, isDisabled, onHover, onLeave, onPick };
};
