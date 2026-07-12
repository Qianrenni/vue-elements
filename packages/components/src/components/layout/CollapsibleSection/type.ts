/**
 * CollapsibleSection 组件 Props
 */
export interface CollapsibleSectionProps {
  /** 是否显示箭头 */
  isShowArrow?: boolean;
  /** 初始展开状态 */
  initialExpanded?: boolean;
  /** 展开方向 */
  direction?: 'up' | 'down' | 'left' | 'right';
}
