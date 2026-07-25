import { useFormEvents } from '@/events';
import type { FormComponentEmits } from '@/types';

import type { FormTextareaProps } from './type';

/**
 * FormTextarea 组件核心逻辑
 * @param _props 组件 Props
 * @param emit 组件 Emits
 * @returns onInput 文本输入处理函数
 */
export const useFormTextarea = (
  _props: FormTextareaProps,
  emit: FormComponentEmits<string>,
): {
  onInput: (e: Event) => void;
} => {
  const { handleInput } = useFormEvents<string>(emit);

  /** 处理文本输入 */
  const onInput = (e: Event) => {
    handleInput((e.target as HTMLInputElement).value as string);
  };

  return { onInput };
};
