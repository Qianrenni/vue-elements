import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type {
  NormalizedSelectOption,
  QSelectProps,
  SelectModelValue,
  SelectOption,
  SelectRawValue,
} from './type';

/** useSelect 返回值接口 */
export interface UseSelectReturn {
  /** 规范化后的选项 */
  normalizedOptions: ComputedRef<NormalizedSelectOption[]>;
  /** 是否为多选模式 */
  isMultiple: ComputedRef<boolean>;
  /** 当前选中值数组 */
  selectedValues: ComputedRef<SelectRawValue[]>;
  /** 当前选中项 */
  selectedOptions: ComputedRef<NormalizedSelectOption[]>;
  /** 搜索过滤后的选项 */
  filteredOptions: ComputedRef<NormalizedSelectOption[]>;
  /** 单选展示文案 */
  displayText: ComputedRef<string>;
  /** 是否展示清除按钮 */
  showClear: ComputedRef<boolean>;
  /** 下拉是否展开 */
  isOpen: ComputedRef<boolean>;
  /** 内部展开状态（受控时忽略） */
  innerOpen: Ref<boolean>;
  /** 搜索关键字 */
  searchText: Ref<string>;
  /** 状态修饰类 */
  statusClass: ComputedRef<string>;
  /** 尺寸修饰类 */
  sizeClass: ComputedRef<string>;
  /** 默认搜索过滤：按 label 不区分大小写匹配 */
  defaultFilter: (input: string, option: NormalizedSelectOption) => boolean;
  /** 判断选项是否选中 */
  isSelected: (value: SelectRawValue) => boolean;
  /** 计算选中某项后的新值 */
  nextValue: (option: NormalizedSelectOption) => SelectModelValue;
  /** 计算移除某个值后的新值 */
  removeValue: (value: SelectRawValue) => SelectModelValue;
}

/**
 * Select 组件核心逻辑
 * @param props 组件 Props
 * @returns 选项规范化、选中态、搜索过滤与展开状态
 */
export const useSelect = (props: QSelectProps): UseSelectReturn => {
  /** 选项规范化：字符串/数字简写转换为完整对象 */
  const normalizedOptions = computed<NormalizedSelectOption[]>(() =>
    (props.options ?? []).map((option) =>
      typeof option === 'object' && option !== null
        ? {
            value: (option as SelectOption).value,
            label: String(
              (option as SelectOption).label ?? (option as SelectOption).value,
            ),
            disabled: (option as SelectOption).disabled ?? false,
          }
        : { value: option, label: String(option), disabled: false },
    ),
  );

  /** 是否多选 */
  const isMultiple = computed(() => props.mode === 'multiple');

  /** 选中值数组 */
  const selectedValues = computed<SelectRawValue[]>(() => {
    const value = props.value;
    if (Array.isArray(value)) return value;
    return value === undefined || value === null ? [] : [value];
  });

  /** 选中项 */
  const selectedOptions = computed(() =>
    normalizedOptions.value.filter((option) =>
      selectedValues.value.includes(option.value),
    ),
  );

  /** 搜索关键字 */
  const searchText = ref('');

  /** 默认过滤：按 label 不区分大小写包含匹配 */
  const defaultFilter = (
    input: string,
    option: NormalizedSelectOption,
  ): boolean => option.label.toLowerCase().includes(input.toLowerCase());

  /** 搜索过滤后的选项 */
  const filteredOptions = computed(() => {
    if (!props.showSearch || !searchText.value) return normalizedOptions.value;
    const filter = props.filterOption ?? defaultFilter;
    return normalizedOptions.value.filter((option) =>
      filter(searchText.value, option),
    );
  });

  /** 单选展示文案 */
  const displayText = computed(() =>
    isMultiple.value ? '' : (selectedOptions.value[0]?.label ?? ''),
  );

  /** 是否展示清除按钮 */
  const showClear = computed(
    () => (props.allowClear ?? false) && selectedValues.value.length > 0,
  );

  /** 内部展开状态 */
  const innerOpen = ref(false);

  /** 下拉是否展开（受控时跟随 props.open） */
  const isOpen = computed(() =>
    props.open === undefined ? innerOpen.value : props.open,
  );

  /** 状态修饰类 */
  const statusClass = computed(() =>
    props.status ? `q-select--${props.status}` : '',
  );

  /** 尺寸修饰类 */
  const sizeClass = computed(() => `q-select--${props.size ?? 'middle'}`);

  /** 判断选项是否选中 */
  const isSelected = (value: SelectRawValue): boolean =>
    selectedValues.value.includes(value);

  /** 计算选中某项后的新值 */
  const nextValue = (option: NormalizedSelectOption): SelectModelValue => {
    if (!isMultiple.value) return option.value;
    return isSelected(option.value)
      ? selectedValues.value.filter((item) => item !== option.value)
      : [...selectedValues.value, option.value];
  };

  /** 计算移除某个值后的新值 */
  const removeValue = (value: SelectRawValue): SelectModelValue =>
    selectedValues.value.filter((item) => item !== value);

  return {
    normalizedOptions,
    isMultiple,
    selectedValues,
    selectedOptions,
    filteredOptions,
    displayText,
    showClear,
    isOpen,
    innerOpen,
    searchText,
    statusClass,
    sizeClass,
    defaultFilter,
    isSelected,
    nextValue,
    removeValue,
  };
};
