/** QBorderBeam 光束颜色（单色） */
export type QBorderBeamColor = string;

/** QBorderBeam 组件 Props */
export interface QBorderBeamProps {
  /**
   * @property color
   * @defaultValue 'var(--q-color-primary)'
   * @description 光束颜色（支持任意 CSS 颜色 / var()）
   */
  color?: QBorderBeamColor;
  /**
   * @property count
   * @defaultValue 1
   * @description 光束数量（沿边框均匀分布）
   */
  count?: number;
  /**
   * @property duration
   * @defaultValue 6
   * @description 光束环绕一圈所需秒数
   */
  duration?: number;
  /**
   * @property size
   * @defaultValue 100
   * @description 可见光束弧长（数字视为 px，内部换算为角度）
   */
  size?: number | string;
  /**
   * @property lineWidth
   * @defaultValue 1
   * @description 光束线宽（数字视为 px）
   */
  lineWidth?: number | string;
  /**
   * @property outset
   * @defaultValue 0
   * @description 光束层相对容器外扩距离（数字视为 px）
   */
  outset?: number | string;
  /**
   * @property hover
   * @defaultValue false
   * @description 仅悬停容器时显示光束
   */
  hover?: boolean;
}
