/** QSplitter 分隔方向 */
export type QSplitterDirection = 'row' | 'column';

/** QSplitter 组件 Props */
export interface QSplitterProps {
  /**
   * @property direction
   * @defaultValue 'row'
   * @description 分隔方向：row 左右排列 / column 上下排列
   */
  direction?: QSplitterDirection;
  /**
   * @property size
   * @defaultValue 无
   * @description 首个面板尺寸（受控 v-model:size；数字为 px，字符串为 CSS 长度如 50%）
   */
  size?: number | string;
  /**
   * @property defaultSize
   * @defaultValue 300
   * @description 首个面板默认尺寸（px），未受控时使用
   */
  defaultSize?: number;
  /**
   * @property min
   * @defaultValue 60
   * @description 首个面板最小尺寸(px)
   */
  min?: number;
  /**
   * @property max
   * @defaultValue 无
   * @description 首个面板最大尺寸(px)，默认不超过容器减 min
   */
  max?: number;
  /**
   * @property resizable
   * @defaultValue true
   * @description 是否可拖拽调整
   */
  resizable?: boolean;
  /**
   * @property gutter
   * @defaultValue 8
   * @description 分隔条宽度/厚度(px)
   */
  gutter?: number;
}

/** QSplitter 组件 Emits */
export interface QSplitterEmits {
  /**
   * @property update:size
   * @description 尺寸变化时触发（受控 v-model:size）
   */
  (e: 'update:size', size: number): void;
  /**
   * @property resize-start
   * @description 开始拖拽时触发
   */
  (e: 'resize-start'): void;
  /**
   * @property resize-end
   * @description 拖拽结束时触发
   */
  (e: 'resize-end', size: number): void;
}
