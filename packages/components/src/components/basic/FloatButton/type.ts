/** 悬浮按钮语义类型 */
export type QFloatButtonType = 'default' | 'primary';
/** 悬浮按钮形状 */
export type QFloatButtonShape = 'circle' | 'square';

/** 悬浮按钮角标配置 */
export interface QFloatButtonBadge {
  /** 计数；超过 max 显示 max+ */
  count?: number | string;
  /** 是否为红点（优先级高于 count 显示） */
  dot?: boolean;
  /** 角标颜色 */
  color?: string;
  /** 计数上限 */
  max?: number;
}

/** QFloatButton 组件 Props */
export interface QFloatButtonProps {
  /**
   * @property type
   * @defaultValue 'default'
   * @description 语义类型：primary 使用主题色填充
   */
  type?: QFloatButtonType;
  /**
   * @property shape
   * @defaultValue 'circle'
   * @description 形状：circle 圆形 / square 圆角方形
   */
  shape?: QFloatButtonShape;
  /**
   * @property description
   * @defaultValue 无
   * @description 方形按钮下方文字（可放简短说明/字母）
   */
  description?: string;
  /**
   * @property tooltip
   * @defaultValue 无
   * @description 悬停气泡提示文案
   */
  tooltip?: string;
  /**
   * @property href
   * @defaultValue 无
   * @description 传入后渲染为 <a> 链接悬浮按钮
   */
  href?: string;
  /**
   * @property target
   * @defaultValue 无
   * @description 链接打开方式（配合 href）
   */
  target?: string;
  /**
   * @property backTop
   * @defaultValue false
   * @description 返回顶部模式：点按平滑回顶，滚动超过 visibilityHeight 时显示
   */
  backTop?: boolean;
  /**
   * @property visibilityHeight
   * @defaultValue 400
   * @description backTop 模式下出现/隐藏的滚动阈值(px)
   */
  visibilityHeight?: number;
  /**
   * @property disabled
   * @defaultValue false
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @property badge
   * @defaultValue 无
   * @description 角标配置（count / dot / color / max）
   */
  badge?: QFloatButtonBadge;
}

/** QFloatButton 组件 Emits */
export interface QFloatButtonEmits {
  /**
   * @property click
   * @description 点击时触发（disabled 或未显示时不触发）
   */
  (e: 'click', ev: MouseEvent): void;
}
