import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QTooltipProps } from './type';

/** 从 placement 解析所在边 */
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

/** 从 placement 解析水平对齐（top/bottom 时有效） */
export type TooltipAlign = 'start' | 'center' | 'end';

/** useQTooltip 返回值接口 */
export interface UseQTooltipReturn {
  /** 提示所在边 */
  side: ComputedRef<TooltipSide>;
  /** 水平对齐（top/bottom 时） */
  align: ComputedRef<TooltipAlign>;
  /** 内容是否非空 */
  hasContent: ComputedRef<boolean>;
  /** 是否受控 */
  isControlled: ComputedRef<boolean>;
}

/**
 * QTooltip 组件核心逻辑
 * @param props 组件 Props
 * @returns placement 派生状态
 */
export const useQTooltip = (props: QTooltipProps): UseQTooltipReturn => {
  /** 所在边 */
  const side = computed<TooltipSide>(() => {
    const p = props.placement ?? 'top';
    if (p.startsWith('top')) return 'top';
    if (p.startsWith('bottom')) return 'bottom';
    if (p.startsWith('left')) return 'left';
    return 'right';
  });

  /** 水平对齐（top/bottom 时） */
  const align = computed<TooltipAlign>(() => {
    const p = props.placement ?? 'top';
    if (p.endsWith('Left')) return 'start';
    if (p.endsWith('Right')) return 'end';
    return 'center';
  });

  /** 内容是否非空 */
  const hasContent = computed(() => {
    const s = props.content ?? '';
    return s.trim().length > 0;
  });

  /** 是否受控 */
  const isControlled = computed(() => props.open !== undefined);

  return { side, align, hasContent, isControlled };
};
