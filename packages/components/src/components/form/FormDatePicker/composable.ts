import { useFormEvents } from '@/events';
import type { FormComponentEmits } from '@/types';

import type { FormDatePickerProps } from './type';

/**
 * FormDatePicker 组件核心逻辑
 * @param _props 组件 Props
 * @param emit 组件 Emits
 * @returns onInput 日期选择处理函数
 */
export const useFormDatePicker = (
  _props: FormDatePickerProps,
  emit: FormComponentEmits<string>,
): {
  onInput: (e: Event) => void;
} => {
  const { handleInput } = useFormEvents<string>(emit);

  /** 处理日期输入 */
  const onInput = (e: Event) => {
    handleInput((e.target as HTMLInputElement).value);
  };

  return { onInput };
};
