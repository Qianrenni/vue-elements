/** QNotification 类型 */
export type QNotificationType = 'success' | 'info' | 'warning' | 'error';

/** 通知弹出位置 */
export type QNotificationPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

/** QNotification 组件（单条通知卡片） Props */
export interface QNotificationProps {
  /**
   * @property type
   * @defaultValue 'info'
   * @description 通知类型
   */
  type?: QNotificationType;
  /**
   * @property title
   * @defaultValue 无
   * @description 通知标题
   */
  title?: string;
  /**
   * @property description
   * @defaultValue 无
   * @description 通知详情
   */
  description?: string;
  /**
   * @property closable
   * @defaultValue true
   * @description 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * @property showIcon
   * @defaultValue true
   * @description 是否显示类型图标
   */
  showIcon?: boolean;
  /**
   * @property onClose
   * @defaultValue 无
   * @description 点击关闭按钮回调
   */
  onClose?: () => void;
}
