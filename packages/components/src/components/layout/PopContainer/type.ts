/**
 * PopContainer 组件 Props
 */
export interface PopContainerProps {
  /** 是否可见 */
  visible?: boolean;
  /** 是否 hover 时显示 */
  hoverShow?: boolean;
  /** 弹出位置 */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-center'
    | 'right-center';
}
