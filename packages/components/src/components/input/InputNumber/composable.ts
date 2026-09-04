import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { InputNumberEmits, InputNumberProps } from './type';

/** 将任意输入值转数字；无法解析返回 null */
export function parseToNumber(
  raw: string | number | null | undefined,
): number | null {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = typeof raw === 'number' ? raw : Number(raw);
  return Number.isNaN(n) ? null : n;
}

/** 数字在 [min, max] 内收敛 */
export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/** 四舍五入到 step 的整数倍（从 0 对齐；供需要对齐步长的场景使用） */
export function roundToStep(value: number, step: number): number {
  if (step <= 0 || !Number.isFinite(step)) return value;
  return Math.round(value / step) * step;
}

/** 四舍五入到 precision 位小数 */
export function roundToPrecision(value: number, precision?: number): number {
  if (precision === undefined || precision < 0) return value;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

/** useInputNumber 返回值接口 */
export interface UseInputNumberReturn {
  /** 展示文本 */
  displayText: Ref<string>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 增减可用性（受限时禁用） */
  canPlus: ComputedRef<boolean>;
  canMinus: ComputedRef<boolean>;
  /** 文本输入 */
  onInput: (e: Event) => void;
  /** 失焦提交 */
  onBlur: (e: FocusEvent) => void;
  /** 聚焦 */
  onFocus: (e: FocusEvent) => void;
  /** 键盘上/下 */
  onKeydown: (e: KeyboardEvent) => void;
  /** 增加 / 减少 */
  plus: () => void;
  minus: () => void;
}

/**
 * QInputNumber 组件核心逻辑：受控值 + 本地编辑文本 + 步进/限制。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useInputNumber = (
  props: InputNumberProps,
  emit: InputNumberEmits,
): UseInputNumberReturn => {
  const min = computed(() => props.min ?? -Infinity);
  const max = computed(() => props.max ?? Infinity);
  const step = computed(() => props.step ?? 1);

  /** 本地编辑文本（输入时使用，失焦回填规范化值） */
  const editing = ref(false);
  const draft = ref('');

  const displayText = ref('');

  /** 当前规范值 */
  function normalize(raw: number | null): number | null {
    if (raw === null) return null;
    const c = clamp(raw, min.value, max.value);
    return roundToPrecision(c, props.precision);
  }

  /** 同步展示文本 */
  function syncText() {
    const v = normalize(parseToNumber(props.modelValue));
    displayText.value = v === null ? '' : String(v);
  }

  syncText();
  watch(
    () => props.modelValue,
    () => {
      if (!editing.value) syncText();
    },
  );

  /** 提交新值 */
  function commit(value: number | null) {
    const next = normalize(value);
    emit('update:modelValue', next);
    emit('change', next);
    // 非编辑态直接回填展示文本（避免依赖父级异步回写）
    if (!editing.value) {
      displayText.value = next === null ? '' : String(next);
    }
    return next;
  }

  /** 增减可用性 */
  const current = computed(() => parseToNumber(props.modelValue));

  const canPlus = computed(() => {
    if (props.disabled || current.value === null) return false;
    return current.value < max.value;
  });

  const canMinus = computed(() => {
    if (props.disabled || current.value === null) return false;
    return current.value > min.value;
  });

  const isDisabled = computed(() => props.disabled === true);

  /** 文本输入：仅存草稿，不做提交 */
  function onInput(e: Event) {
    if (props.disabled) return;
    const el = e.target as HTMLInputElement;
    // 允许负号、数字与小数
    const cleaned = el.value.replace(/[^\d.-]/g, '');
    editing.value = true;
    draft.value = cleaned;
    el.value = cleaned;
  }

  /** 失焦：解析并提交规范值 */
  function onBlur(e: FocusEvent) {
    editing.value = false;
    const raw = draft.value === '' ? null : parseToNumber(draft.value);
    const next = normalize(raw);
    displayText.value = next === null ? '' : String(next);
    draft.value = '';
    emit('update:modelValue', next);
    emit('change', next);
    emit('blur', e);
  }

  /** 聚焦 */
  function onFocus(e: FocusEvent) {
    draft.value = displayText.value;
    emit('focus', e);
  }

  /** 键盘上/下 */
  function onKeydown(e: KeyboardEvent) {
    if (props.disabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      plus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      minus();
    } else if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  /** 增加 */
  function plus() {
    if (!canPlus.value) return;
    const base = current.value ?? 0;
    commit(base + step.value);
  }

  /** 减少 */
  function minus() {
    if (!canMinus.value) return;
    const base = current.value ?? 0;
    commit(base - step.value);
  }

  return {
    displayText,
    isDisabled,
    canPlus,
    canMinus,
    onInput,
    onBlur,
    onFocus,
    onKeydown,
    plus,
    minus,
  };
};
