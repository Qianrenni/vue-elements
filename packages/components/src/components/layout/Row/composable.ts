import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { RowProps } from './type';

/** useRow 返回值接口 */
export interface UseRowReturn {
  /** 布局修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
  /** 内联样式（gap / 主轴、交叉轴） */
  inlineStyle: ComputedRef<Record<string, string>>;
}

/**
 * QRow 组件核心逻辑
 * @param props 组件 Props
 * @returns 布局类与内联样式
 */
export const useRow = (props: RowProps): UseRowReturn => {
  /** 水平 / 垂直间距 */
  const gaps = computed<[number, number]>(() => {
    const g = props.gutter ?? 0;
    return Array.isArray(g) ? g : [g, g];
  });

  /** 修饰类 */
  const classList = computed(() => ({
    [`q-row--justify-${props.justify ?? 'start'}`]: true,
    [`q-row--align-${props.align ?? 'top'}`]: true,
    'q-row--no-wrap': props.wrap === false,
  }));

  /** 内联样式 */
  const inlineStyle = computed(() => ({
    columnGap: `${gaps.value[0]}px`,
    rowGap: `${gaps.value[1]}px`,
  }));

  return { classList, inlineStyle };
};
