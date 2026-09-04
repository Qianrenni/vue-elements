/** 弹出方向 + 对齐（对齐 Ant Design 命名） */
export type QTooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right';

/** 触发方式 */
export type QTooltipTrigger = 'hover' | 'focus' | 'click';

/** QTooltip 组件 Props */
export interface QTooltipProps {
  /**
   * @property content
   * @defaultValue 无
   * @description 提示内容（也可用 content 插槽）
   */
  content?: string;

  /**
   * @property placement
   * @defaultValue 'top'
   * @description 弹出位置：top / topLeft / topRight / bottom / bottomLeft / bottomRight / left / right
   */
  placement?: QTooltipPlacement;

  /**
   * @property open
   * @defaultValue 无
   * @description 受控显隐（v-model:open）；缺省时由 trigger 自动管理
   */
  open?: boolean;

  /**
   * @property trigger
   * @defaultValue 'hover'
   * @description 触发方式：hover（含 focus）/ focus / click
   */
  trigger?: QTooltipTrigger;

  /**
   * @property arrow
   * @defaultValue true
   * @description 是否显示箭头
   */
  arrow?: boolean;

  /**
   * @property color
   * @defaultValue 无
   * @description 提示气泡背景色；缺省用深色
   */
  color?: string;

  /**
   * @property disabled
   * @defaultValue false
   * @description 禁用提示（不显示）
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
   * @defaultValue 0
   * @description 移出后延时(ms)隐藏
   */
  mouseLeaveDelay?: number;
}

/** QTooltip 组件 Emits */
export interface QTooltipEmits {
  /**
   * @property update:open
   * @description 显隐变化时触发（配合 v-model:open）
   */
  (e: 'update:open', open: boolean): void;
}
