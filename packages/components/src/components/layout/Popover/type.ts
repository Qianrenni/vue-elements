/** 弹出方向 + 对齐（12 方向，对齐 Ant Design 命名） */
export type QPopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

/** 触发方式 */
export type QPopoverTrigger = 'hover' | 'focus' | 'click';

/** QPopover 组件 Props */
export interface QPopoverProps {
  /**
   * @property title
   * @defaultValue 无
   * @description 卡片标题（也可用 title 插槽）
   */
  title?: string;
  /**
   * @property content
   * @defaultValue 无
   * @description 卡片内容（也可用 content 插槽）
   */
  content?: string;
  /**
   * @property placement
   * @defaultValue 'top'
   * @description 弹出位置：top / topLeft / topRight / bottom / bottomLeft / bottomRight / left / leftTop / leftBottom / right / rightTop / rightBottom
   */
  placement?: QPopoverPlacement;
  /**
   * @property trigger
   * @defaultValue 'hover'
   * @description 触发方式：hover（含 focus）/ focus / click
   */
  trigger?: QPopoverTrigger;
  /**
   * @property open
   * @defaultValue 无
   * @description 受控显隐（v-model:open）；缺省时按 trigger 自动管理
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
   * @property mouseEnterDelay
   * @defaultValue 0
   * @description 悬停后延时(ms)显示
   */
  mouseEnterDelay?: number;
  /**
   * @property mouseLeaveDelay
   * @defaultValue 120
   * @description 移出后延时(ms)隐藏（允许移动到卡片内容）
   */
  mouseLeaveDelay?: number;
  /**
   * @property width
   * @defaultValue 无
   * @description 卡片宽度（CSS 长度）
   */
  width?: string;
}

/** QPopover 组件 Emits */
export interface QPopoverEmits {
  /**
   * @property update:open
   * @description 显隐变化时触发（配合 v-model:open）
   */
  (e: 'update:open', open: boolean): void;
  /**
   * @property open-change
   * @description 显隐变化时触发
   */
  (e: 'open-change', open: boolean): void;
}
