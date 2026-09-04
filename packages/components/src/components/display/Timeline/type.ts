/** 整体排布模式 */
export type TimelineMode = 'left' | 'right' | 'alternate';

/** alternate 模式下单条目的方向 */
export type TimelineItemPosition = 'left' | 'right';

/** 圆点颜色预设 */
export type TimelineDotPreset =
  | 'blue'
  | 'red'
  | 'green'
  | 'gray'
  | 'success'
  | 'error'
  | 'warning'
  | 'processing';

/** 时间轴条目 */
export interface TimelineItem {
  /** 内容（纯文本；复杂内容请使用 content 插槽按索引渲染） */
  content?: string;
  /** 时间/位置标签 */
  label?: string;
  /** 圆点颜色：CSS 颜色或预设（blue/red/green/gray…） */
  color?: TimelineDotPreset | string;
  /** 自定义圆点：QIcon 名称或任意文本（默认实心圆点） */
  dot?: string;
  /** alternate 模式下本条目的方向（覆盖全局左右分布） */
  position?: TimelineItemPosition;
}

/** QTimeline 组件 Props（对齐 Ant Design Timeline） */
export interface TimelineProps {
  /**
   * @property items
   * @defaultValue []
   * @description 时间轴条目：[{ content?, label?, color?, dot?, position? }]
   */
  items?: TimelineItem[];

  /**
   * @property mode
   * @defaultValue 'left'
   * @description 排布模式：left / right / alternate
   */
  mode?: TimelineMode;

  /**
   * @property reverse
   * @defaultValue false
   * @description 是否倒序排列（pending 幽灵条目始终置于末尾）
   */
  reverse?: boolean;

  /**
   * @property pending
   * @defaultValue false
   * @description 幽灵待定条目：true 显示占位，字符串作为其内容
   */
  pending?: boolean | string;
}
