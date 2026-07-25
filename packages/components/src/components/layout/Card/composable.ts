import { computed, type ComputedRef } from 'vue';

import type { CardProps } from './type';

/**
 * Card 组件核心逻辑
 * @param props 组件 Props
 * @returns cardClass 卡片 CSS 类
 */
export const useCard = (
  props: CardProps,
): {
  cardClass: ComputedRef<Record<string, boolean>>;
} => {
  /** 卡片 CSS 类，根据 animation 属性计算 */
  const cardClass = computed(() => ({
    'card-animation': props.animation ?? false,
  }));

  return { cardClass };
};
