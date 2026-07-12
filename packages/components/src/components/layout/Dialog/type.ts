/**
 * Dialog 组件 Props
 */
export interface DialogProps {
  /** 是否可见 */
  visible?: boolean;
  /** 标题 */
  title?: string;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否显示底部 */
  showFooter?: boolean;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 确认按钮文本 */
  confirmText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 点击遮罩层是否关闭 */
  closeOnClickOverlay?: boolean;
  /** 对话框宽度 */
  width?: string;
  /** 自定义类名 */
  customClass?: string;
}

/**
 * Dialog 组件 Emits
 */
export interface DialogEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}
