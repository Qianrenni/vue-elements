import { computed, type ComputedRef } from 'vue';

import type { QWatermarkFont, QWatermarkProps } from './type';

/** 默认间距 */
export const DEFAULT_WATERMARK_GAP: [number, number] = [100, 100];
/** 默认旋转 */
export const DEFAULT_WATERMARK_ROTATE = -22;
/** 默认字号 */
export const DEFAULT_WATERMARK_FONT_SIZE = 16;
/** 默认字色 */
export const DEFAULT_WATERMARK_COLOR = 'rgba(0, 0, 0, 0.12)';

/** 归一化内容为行数组 */
export function contentLines(content: string | string[] | undefined): string[] {
  if (content === undefined || content === null) return [];
  if (Array.isArray(content)) return content.filter((l) => l.trim().length > 0);
  const trimmed = content.trim();
  return trimmed ? [trimmed] : [];
}

/** 文本旋转后的外接矩形尺寸 */
export function rotatedBounds(
  width: number,
  height: number,
  rotate: number,
): { width: number; height: number } {
  const rad = (rotate * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  return {
    width: width * cos + height * sin,
    height: width * sin + height * cos,
  };
}

/** 解析字体配置 */
export function resolveWatermarkFont(
  font: QWatermarkFont | undefined,
): Required<
  Pick<QWatermarkFont, 'color' | 'fontSize' | 'fontWeight' | 'fontFamily'>
> {
  return {
    color: font?.color ?? DEFAULT_WATERMARK_COLOR,
    fontSize: font?.fontSize ?? DEFAULT_WATERMARK_FONT_SIZE,
    fontWeight: font?.fontWeight ?? 'normal',
    fontFamily: font?.fontFamily ?? 'sans-serif',
  };
}

/** useQWatermark 返回值 */
export interface UseQWatermarkReturn {
  /** 行文本 */
  lines: ComputedRef<string[]>;
  /** 间距 */
  gap: ComputedRef<[number, number]>;
  /** 旋转角 */
  rotate: ComputedRef<number>;
  /** 字体配置 */
  font: ComputedRef<
    Required<
      Pick<QWatermarkFont, 'color' | 'fontSize' | 'fontWeight' | 'fontFamily'>
    >
  >;
}

/**
 * QWatermark 组件核心逻辑（绘制在 .vue 中执行）
 * @param props 组件 Props
 * @returns 派生配置
 */
export const useQWatermark = (props: QWatermarkProps): UseQWatermarkReturn => {
  const lines = computed(() => contentLines(props.content));
  const gap = computed<[number, number]>(
    () => props.gap ?? DEFAULT_WATERMARK_GAP,
  );
  const rotate = computed(() => props.rotate ?? DEFAULT_WATERMARK_ROTATE);
  const font = computed(() => resolveWatermarkFont(props.font));
  return { lines, gap, rotate, font };
};
