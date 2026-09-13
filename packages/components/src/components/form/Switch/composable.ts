import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QSwitchProps } from './type';

/** useSwitch 返回值接口 */
export interface UseSwitchReturn {
  /** 当前开关状态 */
  checked: ComputedRef<boolean>;
  /** 是否不可交互（禁用或加载中） */
  isDisabled: ComputedRef<boolean>;
}

/**
 * Switch 组件核心逻辑
 * @param props 组件 Props
 * @returns checked 开关状态，isDisabled 是否不可交互
 */
export const useSwitch = (props: QSwitchProps): UseSwitchReturn => {
  /** 开关状态，默认关闭 */
  const checked = computed(() => props.value ?? false);

  /** 禁用或加载中均不可交互 */
  const isDisabled = computed(
    () => (props.disabled ?? false) || (props.loading ?? false),
  );

  return { checked, isDisabled };
};
