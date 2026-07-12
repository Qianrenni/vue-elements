/**
 * Drawer 组件 Props
 */
export interface DrawerProps {
  /** 是否可见 */
  visible?: boolean;
  /** 标题 */
  title?: string;
  /** 抽屉弹出方向 */
  direction?: 'top' | 'right' | 'bottom' | 'left';
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnClickOverlay?: boolean;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 是否追加到 body */
  appendToBody?: boolean;
}

/**
 * Drawer 组件 Emits
 */
export interface DrawerEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'close'): void;
}
