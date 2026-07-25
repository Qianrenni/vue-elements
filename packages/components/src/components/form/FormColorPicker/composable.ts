import { useFormEvents } from '@/events';
import type { FormComponentEmits } from '@/types';

import type { FormColorPickerProps } from './type';

/**
 * FormColorPicker 组件核心逻辑
 * @param _props 组件 Props
 * @param emit 组件 Emits
 * @returns onInput 颜色选择处理函数
 */
export const useFormColorPicker = (
  _props: FormColorPickerProps,
  emit: FormComponentEmits<string>,
): {
  onInput: (e: Event) => void;
} => {
  const { handleInput } = useFormEvents<string>(emit);

  /** 处理颜色选择 */
  const onInput = (e: Event) => {
    handleInput((e.target as HTMLInputElement).value);
  };

  return { onInput };
};
