import type { FormComponentEmits } from '@/types';
import type { FormCheckboxGroupProps } from './type';
import { useFormEvents } from '@/events';

/**
 * FormCheckboxGroup 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns onChange 勾选变更处理函数
 */
export const useFormCheckboxGroup = (
  props: FormCheckboxGroupProps,
  emit: FormComponentEmits<string[]>,
): {
  onChange: (e: Event) => void;
} => {
  const { handleInput } = useFormEvents<string[]>(emit);

  /**
   * 处理勾选变更
   */
  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;
    const newValue = [...(props.modelValue ?? [])];

    if (checked) {
      newValue.push(value);
    } else {
      const index = newValue.indexOf(value);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    }
    handleInput(newValue);
  };

  return { onChange };
};
