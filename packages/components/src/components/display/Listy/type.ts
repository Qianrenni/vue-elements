/** QListy 组件 Props */
export interface QListyProps<T = unknown> {
  /**
   * @property items
   * @defaultValue []
   * @description 数据源
   */
  items?: T[];
  /**
   * @property itemHeight
   * @defaultValue 40
   * @description 行高(px)，定高虚拟列表
   */
  itemHeight?: number;
  /**
   * @property height
   * @defaultValue 400
   * @description 视口高度(px)
   */
  height?: number;
  /**
   * @property overscan
   * @defaultValue 4
   * @description 预渲染额外行数
   */
  overscan?: number;
  /**
   * @property itemKey
   * @defaultValue 无
   * @description 行 key 取值函数
   */
  itemKey?: (item: T, index: number) => string | number;
}

/** QListy 暴露方法 */
export interface QListyExpose {
  /** 滚动到指定索引 */
  scrollTo: (index: number) => void;
}
