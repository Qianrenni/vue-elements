import { computed, type ComputedRef } from 'vue';

import type { QImageProps } from './type';

/** 默认预览最小/最大缩放倍率 */
export const MIN_SCALE = 0.2;
/** 最大缩放倍率 */
export const MAX_SCALE = 6;
/** 默认滚轮/按钮步进（1 + step 倍） */
export const ZOOM_STEP = 0.5;
/** 单次旋转角度 */
export const ROTATE_STEP = 90;

/** 尺寸值转 CSS（数字=px） */
export function cssLength(
  value: string | number | undefined,
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

/** 夹取缩放倍率到 [min, max] */
export function clampScale(
  scale: number,
  min = MIN_SCALE,
  max = MAX_SCALE,
): number {
  if (!Number.isFinite(scale)) return 1;
  return Math.min(Math.max(scale, min), max);
}

/** 缩放（当前 scale × (1±step)），夹取范围 */
export function zoomAt(scale: number, direction: 1 | -1): number {
  const base = scale * (1 + ZOOM_STEP * direction);
  return clampScale(base);
}

/** 旋转角累加（每次 ±90°，归一化到 0..360） */
export function turnAngle(current: number, direction: 1 | -1): number {
  const next = (current + ROTATE_STEP * direction) % 360;
  return next >= 0 ? next : next + 360;
}

/** useQImage 返回值 */
export interface UseQImageReturn {
  /** 宽度 CSS */
  widthStyle: ComputedRef<string | undefined>;
  /** 高度 CSS */
  heightStyle: ComputedRef<string | undefined>;
  /** 是否可预览 */
  previewable: ComputedRef<boolean>;
  /** 预览图地址 */
  previewSrc: ComputedRef<string>;
  /** 缩略图是否受控 */
  openControlled: ComputedRef<boolean>;
  /** object-fit 值 */
  fit: ComputedRef<string>;
}

/**
 * QImage 组件核心逻辑（状态/事件在 .vue 中维护）
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useQImage = (props: QImageProps): UseQImageReturn => {
  const widthStyle = computed(() => cssLength(props.width));
  const heightStyle = computed(() => cssLength(props.height));
  const previewable = computed(() => props.preview !== false);
  const previewSrc = computed(() => props.previewSrc || props.src || '');
  const openControlled = computed(() => props.previewOpen !== undefined);
  const fit = computed(() => props.fit ?? 'fill');
  return {
    widthStyle,
    heightStyle,
    previewable,
    previewSrc,
    openControlled,
    fit,
  };
};
