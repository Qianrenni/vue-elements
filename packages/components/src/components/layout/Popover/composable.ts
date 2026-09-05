import { computed, type ComputedRef } from 'vue';

import type { QPopoverProps } from './type';

/** 弹层所在边 */
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
/** 弹层在主轴（沿 trigger）上的对齐：start=贴起点 / end=贴终点 / center=居中 */
export type PopoverAlign = 'start' | 'center' | 'end';

/** 支持的 12 个方向 */
export const POPOVER_PLACEMENTS: QPopoverProps['placement'][] = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
];

/** 从 placement 解析所在边 */
export function placementSide(placement: string): PopoverSide {
  if (placement.startsWith('top')) return 'top';
  if (placement.startsWith('bottom')) return 'bottom';
  if (placement.startsWith('left')) return 'left';
  return 'right';
}

/** 从 placement 解析沿 trigger 的对齐 */
export function placementAlign(placement: string): PopoverAlign {
  const p = placement;
  if (p.endsWith('Left') || p.endsWith('Top')) return 'start';
  if (p.endsWith('Right') || p.endsWith('Bottom')) return 'end';
  return 'center';
}

/** useQPopover 返回值 */
export interface UseQPopoverReturn {
  /** 所在边 */
  side: ComputedRef<PopoverSide>;
  /** 对齐 */
  align: ComputedRef<PopoverAlign>;
  /** 是否受控 */
  isControlled: ComputedRef<boolean>;
  /** 标题 / 内容是否非空（用于可展示判定） */
  hasContent: ComputedRef<boolean>;
}

/**
 * QPopover 组件核心逻辑（placement 派生；事件与定位在 .vue 维护）
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useQPopover = (props: QPopoverProps): UseQPopoverReturn => {
  const side = computed(() => placementSide(props.placement ?? 'top'));
  const align = computed(() => placementAlign(props.placement ?? 'top'));
  const isControlled = computed(() => props.open !== undefined);
  const hasContent = computed(() => {
    const content = (props.content ?? '').trim();
    const title = (props.title ?? '').trim();
    return content.length > 0 || title.length > 0;
  });
  return { side, align, isControlled, hasContent };
};
