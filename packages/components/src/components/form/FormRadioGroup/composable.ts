import { useFormEvents } from '@/events';
import type { FormComponentEmits } from '@/types';

import type { FormRadioGroupProps } from './type';

/**
 * FormRadioGroup 组件核心逻辑
 * @param _props 组件 Props
 * @param emit 组件 Emits
 * @returns onChange 选项变更处理函数
 */
export const useFormRadioGroup = (
  _props: FormRadioGroupProps,
  emit: FormComponentEmits<string>,
): {
  onChange: (e: Event) => void;
} => {
  const { handleInput } = useFormEvents<string>(emit);

  /** 处理选项变更 */
  const onChange = (e: Event) => {
    handleInput((e.target as HTMLInputElement).value as string);
  };

  return { onChange };
};
