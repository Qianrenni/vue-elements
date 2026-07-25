import { computed, type ComputedRef } from 'vue';

/**
 * Divider 组件核心逻辑
 * @returns containerClass 分割线容器类名
 */
export const useDivider = (): {
  containerClass: ComputedRef<string>;
} => {
  const containerClass = computed(() => 'divider');

  return { containerClass };
};
