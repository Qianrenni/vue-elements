import { computed } from 'vue';
import type { ComputedRef } from 'vue';

/** useFooter 返回值接口 */
export interface UseFooterReturn {
  /** 底部栏根元素 class */
  containerClass: ComputedRef<string>;
}

/**
 * QFooter 组件核心逻辑
 * @returns 底部栏容器 class
 */
export const useFooter = (): UseFooterReturn => {
  /** 底部栏根元素 class */
  const containerClass = computed<string>(() => 'q-layout-footer');

  return { containerClass };
};
