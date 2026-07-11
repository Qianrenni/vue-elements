import { ref, type Ref } from 'vue';
import type { FormComponentEmits } from '@/types';
import type { FormTextProps } from './type';
import { useFormEvents } from '@/events';

/**
 * FormText 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns 响应式状态和事件处理函数
 */
export const useFormText = (
  props: FormTextProps,
  emit: FormComponentEmits<string>,
): {
  showHint: Ref<boolean>;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
} => {
  /** 是否显示校验提示 */
  const showHint = ref(false);

  const { handleInput, handleChange, handleFocus, handleBlur } =
    useFormEvents<string>(emit);

  /** 处理输入事件 */
  const onInput = (e: Event) => {
    handleInput((e.target as HTMLInputElement).value as string);
  };

  /** 处理变更事件 */
  const onChange = (e: Event) => {
    handleChange((e.target as HTMLInputElement).value as string);
  };

  /** 处理聚焦事件，隐藏校验提示 */
  const onFocus = () => {
    showHint.value = false;
    handleFocus();
  };

  /** 处理失焦事件，执行校验 */
  const onBlur = () => {
    if (
      props.required &&
      !props.validate?.((props.modelValue as string) || '')
    ) {
      showHint.value = true;
    }
    handleBlur();
  };

  return { showHint, onInput, onChange, onFocus, onBlur };
};
