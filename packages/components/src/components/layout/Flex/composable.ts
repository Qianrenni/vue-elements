import { computed, type ComputedRef } from 'vue';
import type { CSSProperties } from 'vue';

import type { QFlexGap, QFlexProps } from './type';

/** gap 档位 → px */
export const FLEX_GAP_MAP: Record<string, string> = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

/** 默认间距 */
export const DEFAULT_FLEX_GAP = '16px';

/**
 * 归一化 gap
 * @param gap 间距值
 */
export function normalizeFlexGap(gap: QFlexGap | undefined): string {
  if (gap === undefined || gap === null) return DEFAULT_FLEX_GAP;
  if (typeof gap === 'number') return `${gap}px`;
  if (gap in FLEX_GAP_MAP) return FLEX_GAP_MAP[gap];
  return gap;
}

/** useQFlex 返回值 */
export interface UseQFlexReturn {
  /** 渲染标签 */
  tag: ComputedRef<string>;
  /** 容器样式 */
  style: ComputedRef<CSSProperties>;
}

/**
 * QFlex 核心逻辑：由 props 派生容器样式
 * @param props 组件 Props
 */
export const useQFlex = (props: QFlexProps): UseQFlexReturn => {
  const tag = computed(() => props.tag ?? 'div');
  const style = computed<CSSProperties>(() => ({
    display: 'flex',
    flexDirection: props.vertical ? 'column' : 'row',
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    justifyContent: props.justify ?? 'flex-start',
    alignItems: props.align ?? 'flex-start',
    gap: normalizeFlexGap(props.gap),
    flex: props.flex !== undefined ? String(props.flex) : undefined,
  }));
  return { tag, style };
};
