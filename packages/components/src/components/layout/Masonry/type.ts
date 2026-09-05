/** QMasonry 组件 Props */
export interface QMasonryProps<T = unknown> {
  /**
   * @property items
   * @defaultValue []
   * @description 数据源（数组顺序决定内容，采用多列填充）
   */
  items?: T[];
  /**
   * @property columns
   * @defaultValue 4
   * @description 列数
   */
  columns?: number;
  /**
   * @property gap
   * @defaultValue 16
   * @description 列/行间距(px)
   */
  gap?: number;
  /**
   * @property itemKey
   * @defaultValue 无
   * @description 子项 key 取值函数
   */
  itemKey?: (item: T, index: number) => string | number;
}

/** QMasonry 暴露 */
export interface QMasonryExpose {
  /** 重新布局 */
  refresh: () => void;
}
