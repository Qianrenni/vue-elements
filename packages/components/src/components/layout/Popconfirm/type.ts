import type {
  QPopoverPlacement,
  QPopoverTrigger,
} from '@/components/layout/Popover/type';

/** QPopconfirm 组件 Props */
export interface QPopconfirmProps {
  /**
   * @property title
   * @defaultValue 无
   * @description 提示标题
   */
  title?: string;
  /**
   * @property description
   * @defaultValue 无
   * @description 详细描述（可选）
   */
  description?: string;
  /**
   * @property trigger
   * @defaultValue 'click'
   * @description 触发方式：hover / focus / click
   */
  trigger?: QPopoverTrigger;
  /**
   * @property placement
   * @defaultValue 'top'
   * @description 弹出位置（同 QPopover 12 方向）
   */
  placement?: QPopoverPlacement;
  /**
   * @property open
   * @defaultValue 无
   * @description 受控显隐（v-model:open）
   */
  open?: boolean;
  /**
   * @property arrow
   * @defaultValue true
   * @description 是否显示箭头
   */
  arrow?: boolean;
  /**
   * @property disabled
   * @defaultValue false
   * @description 禁用弹出
   */
  disabled?: boolean;
  /**
   * @property okText
   * @defaultValue '确定'
   * @description 确认按钮文案
   */
  okText?: string;
  /**
   * @property cancelText
   * @defaultValue '取消'
   * @description 取消按钮文案
   */
  cancelText?: string;
  /**
   * @property showCancel
   * @defaultValue true
   * @description 是否显示取消按钮
   */
  showCancel?: boolean;
  /**
   * @property showIcon
   * @defaultValue true
   * @description 是否显示标题前的提示图标
   */
  showIcon?: boolean;
  /**
   * @property mouseEnterDelay
   * @defaultValue 0
   * @description hover 显示延时(ms)
   */
  mouseEnterDelay?: number;
  /**
   * @property mouseLeaveDelay
   * @defaultValue 120
   * @description hover 隐藏延时(ms)
   */
  mouseLeaveDelay?: number;
  /**
   * @property onConfirm
   * @defaultValue 无
   * @description 确认回调；返回 Promise 时按钮进入加载态，resolve 后关闭
   */
  onConfirm?: () => void | Promise<unknown>;
  /**
   * @property onCancel
   * @defaultValue 无
   * @description 取消回调
   */
  onCancel?: () => void;
}

/** QPopconfirm 组件 Emits */
export interface QPopconfirmEmits {
  /**
   * @property update:open
   * @description 显隐变化时触发
   */
  (e: 'update:open', open: boolean): void;
  /**
   * @property confirm
   * @description 点击确认时触发（onConfirm 之前）
   */
  (e: 'confirm'): void;
  /**
   * @property cancel
   * @description 点击取消时触发（onCancel 之前）
   */
  (e: 'cancel'): void;
}
