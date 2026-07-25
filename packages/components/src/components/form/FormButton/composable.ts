import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { FormButtonProps } from './type';

/** useFormButton 返回值接口 */
interface UseFormButtonReturn {
  buttonClass: ComputedRef<Record<string, boolean>>;
  componentDisabled: ComputedRef<boolean | undefined>;
}

/**
 * FormButton 组件核心逻辑
 * @param props 组件 Props
 * @returns buttonClass 按钮 CSS 类，componentDisabled 是否禁用
 */
export const useFormButton = (props: FormButtonProps): UseFormButtonReturn => {
  /** 按钮 CSS 类，根据 size 和 disabled 状态计算 */
  const buttonClass = computed(() => ({
    'mouse-cursor-disable': props.disabled ?? false,
    'text-12rem': props.size === 'large',
    'text-08rem': props.size === 'small',
  }));

  /** 是否禁用 */
  const componentDisabled = computed(() => props.disabled);

  return { buttonClass, componentDisabled };
};
