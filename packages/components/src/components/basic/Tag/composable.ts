import { computed, type ComputedRef } from 'vue';

import type { TagProps } from './type';

/**
 * Tag 组件核心逻辑
 * @param props 组件 Props
 * @returns styles 标签内联样式
 */
export const useTag = (
  props: TagProps,
): {
  styles: ComputedRef<{
    color: string | undefined;
    background: string | undefined;
  }>;
} => {
  /** 标签内联样式 */
  const styles = computed(() => ({
    color: props.color,
    background: props.background,
  }));

  return { styles };
};
