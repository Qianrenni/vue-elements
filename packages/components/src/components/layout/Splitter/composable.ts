import { computed } from 'vue';
import type { ComputedRef, CSSProperties } from 'vue';

import type { QSplitterDirection, QSplitterProps } from './type';

/** 默认最小尺寸 */
export const DEFAULT_SPLITTER_MIN = 60;
/** 默认首个面板尺寸 */
export const DEFAULT_SPLITTER_SIZE = 300;
/** 默认分隔条宽 */
export const DEFAULT_SPLITTER_GUTTER = 8;

/**
 * 解析受控/默认 size 为 CSS 长度
 * @param size 受控 size（px 数字或 CSS 长度）
 * @param defaultSize 默认 px
 */
export function resolvePanelBasis(
  size: number | string | undefined,
  defaultSize: number,
): string {
  if (typeof size === 'number') return `${size}px`;
  if (typeof size === 'string' && size.trim()) return size;
  return `${defaultSize}px`;
}

/**
 * 钳制面板尺寸
 * @param value 期望值(px)
 * @param min 最小值(px)
 * @param max 最大值(px)，null 表示不限制
 */
export function clampPanelSize(
  value: number,
  min: number,
  max: number | null,
): number {
  if (Number.isNaN(value)) return min;
  if (max !== null) return Math.min(max, Math.max(min, value));
  return Math.max(min, value);
}

/** 把百分比 CSS 长度换算为 px */
export function percentToPx(basis: string, containerPx: number): number {
  const match = /^\s*([\d.]+)%\s*$/.exec(basis);
  if (!match) return Number.NaN;
  return (parseFloat(match[1]) / 100) * containerPx;
}

/** 方向对应的主轴样式属性 */
export function directionAxis(direction: QSplitterDirection): {
  sizeProp: 'width' | 'height';
  posProp: 'clientX' | 'clientY';
} {
  return direction === 'row'
    ? { sizeProp: 'width', posProp: 'clientX' }
    : { sizeProp: 'height', posProp: 'clientY' };
}

/** useQSplitter 返回值 */
export interface UseQSplitterReturn {
  /** 主轴尺寸属性 */
  sizeProp: 'width' | 'height';
  /** 指针坐标属性 */
  posProp: 'clientX' | 'clientY';
  /** 首个面板样式 */
  paneStyle: ComputedRef<CSSProperties>;
  /** 分隔条样式 */
  gutterStyle: ComputedRef<CSSProperties>;
  /** 面板基准尺寸 */
  basis: ComputedRef<string>;
}

/**
 * QSplitter 派生（纯计算面板/分隔条样式）
 * @param props 组件 Props
 * @param direction 方向
 */
export function useQSplitter(
  props: QSplitterProps,
  basisValue: ComputedRef<string>,
): UseQSplitterReturn {
  const axis = directionAxis(props.direction ?? 'row');
  const { sizeProp, posProp } = axis;
  const basis = basisValue;
  const paneStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
      flex: '0 0 auto',
      minWidth: 0,
      minHeight: 0,
      overflow: 'hidden',
    };
    style[sizeProp] = basis.value;
    return style;
  });
  const gutterStyle = computed<CSSProperties>(() => {
    const g = props.gutter ?? DEFAULT_SPLITTER_GUTTER;
    const style: CSSProperties = {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    if (sizeProp === 'width') style.width = `${g}px`;
    else style.height = `${g}px`;
    return style;
  });
  return { sizeProp, posProp, paneStyle, gutterStyle, basis };
}
