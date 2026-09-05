import type { CSSProperties } from 'vue';

/** 默认列数 */
export const DEFAULT_MASONRY_COLUMNS = 4;
/** 默认间距 */
export const DEFAULT_MASONRY_GAP = 16;

/** 归一化列数（>=1 整数） */
export function normalizeColumns(columns?: number): number {
  return Math.max(1, Math.floor(columns ?? DEFAULT_MASONRY_COLUMNS));
}

/** 间距数字 → px 字符串 */
export function masonryGap(gap?: number): string {
  return `${Math.max(0, gap ?? DEFAULT_MASONRY_GAP)}px`;
}

/** 容器样式 */
export function masonryContainerStyle(
  columns?: number,
  gap?: number,
): CSSProperties {
  return {
    columnCount: normalizeColumns(columns),
    columnGap: masonryGap(gap),
  };
}

/** 子项样式（避免跨列截断） */
export function masonryItemStyle(gap?: number): CSSProperties {
  return { breakInside: 'avoid', marginBottom: masonryGap(gap) };
}
