import type { FormComponentEmits } from '@/types';
import type { FormSwitchProps } from './type';
import { useFormEvents } from '@/events';

/**
 * FormSwitch 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns toggle 切换方法
 */
export const useFormSwitch = (
  props: FormSwitchProps,
  emit: FormComponentEmits<boolean>,
): {
  toggle: () => void;
} => {
  const { handleChange } = useFormEvents(emit);

  /**
   * 切换开关状态
   */
  const toggle = () => {
    if (!props.disabled) {
      handleChange(!props.modelValue);
    }
  };

  return { toggle };
};
