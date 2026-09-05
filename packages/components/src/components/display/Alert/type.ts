/** 提示类型 */
export type QAlertType = 'success' | 'info' | 'warning' | 'error';

/** QAlert 组件 Props */
export interface QAlertProps {
  /**
   * @property type
   * @defaultValue 'info'
   * @description 类型：success / info / warning / error
   */
  type?: QAlertType;
  /**
   * @property message
   * @defaultValue 无
   * @description 提示标题
   */
  message?: string;
  /**
   * @property description
   * @defaultValue 无
   * @description 详细描述（出现后标题与描述分两行）
   */
  description?: string;
  /**
   * @property closable
   * @defaultValue false
   * @description 是否可关闭（右侧 × 按钮）
   */
  closable?: boolean;
  /**
   * @property closeText
   * @defaultValue 无
   * @description 关闭按钮文案；提供后以文字按钮呈现
   */
  closeText?: string;
  /**
   * @property showIcon
   * @defaultValue true
   * @description 是否显示左侧类型图标
   */
  showIcon?: boolean;
  /**
   * @property banner
   * @defaultValue false
   * @description 是否作为顶部通栏（无圆角/内边距更紧凑）
   */
  banner?: boolean;
}

/** QAlert 组件 Emits */
export interface QAlertEmits {
  /**
   * @property close
   * @description 点击关闭后触发
   */
  (e: 'close'): void;
}
