import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { BreadcrumbItem, BreadcrumbProps } from './type';

/** useBreadcrumb 返回值接口 */
export interface UseBreadcrumbReturn {
  /** 归一化后的面包屑项 */
  items: ComputedRef<BreadcrumbItem[]>;
  /** 分隔符 */
  separator: ComputedRef<string>;
}

/**
 * QBreadcrumb 组件核心逻辑
 * @param props 组件 Props
 * @returns 渲染项与分隔符
 */
export const useBreadcrumb = (props: BreadcrumbProps): UseBreadcrumbReturn => {
  /** 面包屑项 */
  const items = computed<BreadcrumbItem[]>(() => props.items ?? []);

  /** 分隔符 */
  const separator = computed(() => props.separator ?? '/');

  return { items, separator };
};
