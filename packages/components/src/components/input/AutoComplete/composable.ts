import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type {
  AutoCompleteEmits,
  AutoCompleteOption,
  AutoCompleteOptionSource,
  AutoCompleteProps,
} from './type';

/** 标准化候选源为 AutoCompleteOption 列表 */
export function normalizeOptions(
  options: AutoCompleteOptionSource[] | undefined,
): AutoCompleteOption[] {
  if (!options) return [];
  return options.map((item) => {
    if (typeof item === 'string') {
      return { value: item, label: item, disabled: false };
    }
    return {
      value: item.value,
      label: item.label ?? item.value,
      disabled: item.disabled === true,
    };
  });
}

/** 关键词匹配：filterOption=false 全部展示；函数走自定义；默认忽略大小写包含 */
export function matchKeyword(
  option: AutoCompleteOption,
  keyword: string,
  filterOption: AutoCompleteProps['filterOption'],
): boolean {
  if (filterOption === false) return true;
  if (typeof filterOption === 'function') {
    return filterOption(keyword, option);
  }
  const k = keyword.trim().toLowerCase();
  if (!k) return true;
  return option.label.toLowerCase().includes(k);
}

/** 将索引约束到 [0, length-1]；空列表返回 -1 */
export function clampIndex(index: number, length: number): number {
  if (length <= 0) return -1;
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

/** useAutoComplete 返回值 */
export interface UseAutoCompleteReturn {
  /** 标准化候选 */
  normalized: ComputedRef<AutoCompleteOption[]>;
  /** 过滤后候选 */
  filtered: ComputedRef<AutoCompleteOption[]>;
  /** 键盘高亮索引 */
  activeIndex: Ref<number>;
  /** 当前高亮项 */
  activeOption: ComputedRef<AutoCompleteOption | undefined>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 上下移动高亮（-1 上一项 / 1 下一项） */
  moveActive: (direction: -1 | 1) => void;
  /** 高亮回第一项（默认激活首项） */
  ensureFirst: () => void;
  /** 选中某候选项 */
  selectOption: (option: AutoCompleteOption) => void;
  /** 清空输入 */
  clear: () => void;
}

/**
 * QAutoComplete 组件核心逻辑：候选标准化 / 关键词过滤 / 键盘导航。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useAutoComplete = (
  props: AutoCompleteProps,
  emit: AutoCompleteEmits,
): UseAutoCompleteReturn => {
  const isDisabled = computed(() => props.disabled === true);

  const keyword = computed(() => props.modelValue ?? '');

  const normalized = computed<AutoCompleteOption[]>(() =>
    normalizeOptions(props.options),
  );

  const filtered = computed<AutoCompleteOption[]>(() =>
    normalized.value.filter((opt) =>
      matchKeyword(opt, keyword.value, props.filterOption),
    ),
  );

  /** 键盘高亮索引 */
  const activeIndex = ref(-1);

  const activeOption = computed<AutoCompleteOption | undefined>(() => {
    const list = filtered.value;
    const i = activeIndex.value;
    if (i < 0 || i >= list.length) return undefined;
    return list[i];
  });

  function ensureFirst() {
    activeIndex.value = filtered.value.length ? 0 : -1;
  }

  function moveActive(direction: -1 | 1) {
    const len = filtered.value.length;
    if (len <= 0) {
      activeIndex.value = -1;
      return;
    }
    activeIndex.value = clampIndex(activeIndex.value + direction, len);
  }

  /** 输入变化后回到首项（defaultActiveFirstOption 语义） */
  watch(keyword, () => {
    if (filtered.value.length) {
      activeIndex.value = clampIndex(activeIndex.value, filtered.value.length);
    }
  });

  /** 选中候选：回填文本并派发 */
  function selectOption(option: AutoCompleteOption) {
    if (isDisabled.value || option.disabled) return;
    emit('update:modelValue', option.value);
    emit('change', option.value);
    emit('select', option.value, option);
  }

  /** 清空 */
  function clear() {
    if (isDisabled.value) return;
    emit('update:modelValue', '');
    emit('clear');
  }

  return {
    normalized,
    filtered,
    activeIndex,
    activeOption,
    isDisabled,
    moveActive,
    ensureFirst,
    selectOption,
    clear,
  };
};
