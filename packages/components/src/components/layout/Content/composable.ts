import { computed } from 'vue';
import type { ComputedRef } from 'vue';

/** useContent 返回值接口 */
export interface UseContentReturn {
  /** 内容区根元素 class */
  containerClass: ComputedRef<string>;
}

/**
 * QContent 组件核心逻辑
 * @returns 内容区容器 class
 */
export const useContent = (): UseContentReturn => {
  /** 内容区根元素 class */
  const containerClass = computed<string>(() => 'q-layout-content');

  return { containerClass };
};
