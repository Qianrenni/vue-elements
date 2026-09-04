import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { ColProps } from './type';

/** useCol 返回值接口 */
export interface UseColReturn {
  /** 元素宽度百分比字符串 */
  width: ComputedRef<string>;
  /** 左侧偏移百分比字符串 */
  marginLeft: ComputedRef<string>;
  /** flex 值（优先于栅格） */
  flexValue: ComputedRef<string | number | undefined>;
}

/**
 * QCol 组件核心逻辑
 * @param props 组件 Props
 * @returns 栅格样式派生值
 */
export const useCol = (props: ColProps): UseColReturn => {
  /** 归一化 span（0~24） */
  const span = computed(() => Math.min(Math.max(props.span ?? 24, 0), 24));

  /** 偏移 */
  const offset = computed(() => Math.min(Math.max(props.offset ?? 0, 0), 24));

  /** 宽度百分比 */
  const width = computed(() => `${(span.value / 24) * 100}%`);

  /** 左边距百分比 */
  const marginLeft = computed(() => `${(offset.value / 24) * 100}%`);

  /** 自定义 flex */
  const flexValue = computed(() => props.flex);

  return { width, marginLeft, flexValue };
};
