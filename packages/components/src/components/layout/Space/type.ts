/** 排列方向 */
export type QSpaceDirection = 'horizontal' | 'vertical';

/** 交叉轴对齐（水平模式生效） */
export type QSpaceAlign = 'start' | 'end' | 'center' | 'baseline';

/** 间距：预设档位 / 数值(px) / CSS 长度 */
export type QSpaceSize = 'small' | 'middle' | 'large' | number | string;

/** QSpace 组件 Props（对齐 Ant Design Space） */
export interface QSpaceProps {
  /**
   * @property direction
   * @defaultValue 'horizontal'
   * @description 排列方向：horizontal 水平 / vertical 垂直
   */
  direction?: QSpaceDirection;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 间距：small / middle / large；或数值（px）与任意 CSS 长度
   */
  size?: QSpaceSize;

  /**
   * @property align
   * @defaultValue 'center'
   * @description 水平排列时的垂直对齐：start / end / center / baseline
   */
  align?: QSpaceAlign;

  /**
   * @property wrap
   * @defaultValue false
   * @description 是否允许换行（水平模式）
   */
  wrap?: boolean;

  /**
   * @property split
   * @defaultValue 无
   * @description 是否在子项之间插入分隔：true 为分隔条；传入字符串则作为分隔文本（适合文本/行内子项）
   */
  split?: boolean | string;
}
