/**
 * Badge 组件 Props
 */
export interface BadgeProps {
  /** 徽章类型，控制颜色样式 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'info';
  /** 显示的数字或文本值 */
  value?: number | string;
  /** 最大值，超过时显示 99+，默认 99 */
  max?: number;
  /** 是否显示为小圆点模式 */
  dot?: boolean;
}
