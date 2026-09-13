import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QRadioGroupProps, RadioOption, RadioValue } from './type';

/** 规范化后的选项 */
export interface NormalizedRadioOption {
  /** 选项值 */
  value: RadioValue;
  /** 选项文案 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
}

/** useRadioGroup 返回值接口 */
export interface UseRadioGroupReturn {
  /** 规范化后的选项列表 */
  normalizedOptions: ComputedRef<NormalizedRadioOption[]>;
  /** 判断某个值是否选中 */
  isChecked: (value: RadioValue) => boolean;
}

/**
 * RadioGroup 组件核心逻辑
 * @param props 组件 Props
 * @returns normalizedOptions 规范化选项，isChecked 是否选中
 */
export const useRadioGroup = (props: QRadioGroupProps): UseRadioGroupReturn => {
  /** 选项规范化：字符串/数字简写转换为完整对象 */
  const normalizedOptions = computed<NormalizedRadioOption[]>(() =>
    (props.options ?? []).map((option) =>
      typeof option === 'object' && option !== null
        ? {
            value: (option as RadioOption).value,
            label: String(
              (option as RadioOption).label ?? (option as RadioOption).value,
            ),
            disabled: (option as RadioOption).disabled ?? false,
          }
        : { value: option, label: String(option), disabled: false },
    ),
  );

  /** 判断某个值是否选中 */
  const isChecked = (value: RadioValue): boolean => props.value === value;

  return { normalizedOptions, isChecked };
};
