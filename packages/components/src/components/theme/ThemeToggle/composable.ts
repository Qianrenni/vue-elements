import { computed, type ComputedRef } from 'vue';

import type { ThemeToggleProps } from './type';

/**
 * ThemeToggle 组件核心逻辑
 * @param props 组件 Props
 * @returns iconSize 图标尺寸
 */
export const useThemeToggle = (
  props: ThemeToggleProps,
): {
  iconSize: ComputedRef<string | number>;
  iconName: ComputedRef<string>;
} => {
  /** 图标尺寸 */
  const iconSize = computed(() => props.size ?? 20);

  /** 日间图标 */
  const iconName = computed(() => props.dayIcon ?? 'Sun');

  return { iconSize, iconName };
};
