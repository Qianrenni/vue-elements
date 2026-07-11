import { computed, type ComputedRef } from 'vue';
import type { FormComponentEmits } from '@/types';
import type { FormRangeSliderProps } from './type';
import { useFormEvents } from '@/events';

/**
 * FormRangeSlider 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns 响应式状态和事件处理函数
 */
export const useFormRangeSlider = (
  props: FormRangeSliderProps,
  emit: FormComponentEmits<number>,
): {
  labelId: ComputedRef<string>;
  outputId: ComputedRef<string>;
  displayValue: ComputedRef<string>;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
} => {
  const { handleInput, handleChange, handleFocus, handleBlur } =
    useFormEvents<number>(emit);

  /** label 元素的唯一 ID */
  const labelId = computed(() => props.id || `${props.name}-label`);
  /** output 元素的唯一 ID */
  const outputId = computed(() => `${props.name}-output`);
  /** 格式化后的显示值 */
  const displayValue = computed(() => props.formatter!(props.modelValue ?? 0));

  /** 处理输入事件 */
  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    handleInput(target.valueAsNumber);
  };

  /** 处理变更事件 */
  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    handleChange(target.valueAsNumber);
  };

  /** 处理聚焦事件 */
  const onFocus = () => {
    handleFocus();
  };

  /** 处理失焦事件 */
  const onBlur = () => {
    handleBlur();
  };

  return {
    labelId,
    outputId,
    displayValue,
    onInput,
    onChange,
    onFocus,
    onBlur,
  };
};
