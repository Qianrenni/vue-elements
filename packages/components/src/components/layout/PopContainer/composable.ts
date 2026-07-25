import { computed, type ComputedRef } from 'vue';

import type { PopContainerProps } from './type';

/**
 * PopContainer 组件核心逻辑
 * @param props 组件 Props
 * @returns popClass 弹出内容 CSS 类
 */
export const usePopContainer = (
  props: PopContainerProps,
): {
  popClass: ComputedRef<Record<string, boolean>>;
} => {
  /** 弹出内容 CSS 类 */
  const popClass = computed(() => ({
    'hover-show': props.hoverShow ?? false,
    [props.position ?? 'bottom-center']: true,
    visible: props.visible ?? false,
  }));

  return { popClass };
};
