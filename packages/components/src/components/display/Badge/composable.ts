import { computed, type ComputedRef } from 'vue';

import type { BadgeProps } from './type';

/**
 * Badge 组件核心逻辑
 * @param props 组件 Props
 * @returns displayValue 显示的文本内容，isDot 是否为小圆点模式
 */
export const useBadge = (
  props: BadgeProps,
): {
  displayValue: ComputedRef<string | number>;
  typeClass: ComputedRef<string>;
  isDot: ComputedRef<boolean>;
} => {
  /** 显示的文本值，超过 max 时显示 99+ */
  const displayValue = computed(() => {
    if (props.dot) return '';
    const value = props.value ?? 0;
    const max = props.max ?? 99;
    if (
      (typeof value === 'number' && value > max) ||
      (typeof value === 'string' && parseInt(value) > max)
    ) {
      return '99+';
    }
    return value;
  });

  /** 徽章类型 CSS 类 */
  const typeClass = computed(() => `text-${props.type ?? 'info'}`);

  /** 是否为小圆点模式 */
  const isDot = computed(() => props.dot ?? false);

  return { displayValue, typeClass, isDot };
};
