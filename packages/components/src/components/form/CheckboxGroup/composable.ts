import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type {
  CheckboxOption,
  CheckboxValue,
  QCheckboxGroupProps,
} from './type';

/** 规范化后的选项 */
export interface NormalizedCheckboxOption {
  /** 选项值 */
  value: CheckboxValue;
  /** 选项文案 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
}

/** useCheckboxGroup 返回值接口 */
export interface UseCheckboxGroupReturn {
  /** 规范化后的选项列表 */
  normalizedOptions: ComputedRef<NormalizedCheckboxOption[]>;
  /** 判断某个值是否选中 */
  isChecked: (value: CheckboxValue) => boolean;
  /** 切换某个选项，返回新的选中值数组 */
  toggle: (value: CheckboxValue) => CheckboxValue[];
}

/**
 * CheckboxGroup 组件核心逻辑
 * @param props 组件 Props
 * @returns normalizedOptions 规范化选项，isChecked 是否选中，toggle 切换选中
 */
export const useCheckboxGroup = (
  props: QCheckboxGroupProps,
): UseCheckboxGroupReturn => {
  /** 选项规范化：字符串/数字简写转换为完整对象 */
  const normalizedOptions = computed<NormalizedCheckboxOption[]>(() =>
    (props.options ?? []).map((option) =>
      typeof option === 'object' && option !== null
        ? {
            value: (option as CheckboxOption).value,
            label: String(
              (option as CheckboxOption).label ??
                (option as CheckboxOption).value,
            ),
            disabled: (option as CheckboxOption).disabled ?? false,
          }
        : { value: option, label: String(option), disabled: false },
    ),
  );

  /** 当前选中值（默认空数组） */
  const currentValue = computed<CheckboxValue[]>(() => props.value ?? []);

  /** 判断某个值是否选中 */
  const isChecked = (value: CheckboxValue): boolean =>
    currentValue.value.includes(value);

  /** 切换某个选项，返回新的选中值数组 */
  const toggle = (value: CheckboxValue): CheckboxValue[] =>
    isChecked(value)
      ? currentValue.value.filter((item) => item !== value)
      : [...currentValue.value, value];

  return { normalizedOptions, isChecked, toggle };
};
