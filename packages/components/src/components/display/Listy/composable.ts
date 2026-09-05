/** 虚拟窗口计算结果 */
export interface ListWindow {
  /** 起始渲染索引 */
  start: number;
  /** 结束渲染索引（不含） */
  end: number;
  /** 顶部占位高度(px) */
  offset: number;
  /** 渲染条目 */
  count: number;
}

/**
 * 计算可视窗口
 * @param scrollTop 滚动位置
 * @param viewportHeight 视口高度
 * @param itemHeight 行高
 * @param total 总条目
 * @param overscan 额外行
 */
export function computeListWindow(
  scrollTop: number,
  viewportHeight: number,
  itemHeight: number,
  total: number,
  overscan = 4,
): ListWindow {
  const safe = Math.max(itemHeight, 1);
  const first = Math.floor(scrollTop / safe);
  const visibleCount = Math.ceil(viewportHeight / safe);
  const maxStart = Math.max(0, total - Math.max(1, visibleCount));
  const startRaw = Math.max(0, first - overscan);
  const start = Math.min(maxStart, startRaw);
  const end = Math.min(total, start + visibleCount + overscan * 2);
  const offset = start * safe;
  return { start, end, offset, count: Math.max(0, end - start) };
}
