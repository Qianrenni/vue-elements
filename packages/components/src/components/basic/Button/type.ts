import type { FormSize } from '@/types';

/** 按钮语义类型（对齐 Ant Design） */
export type QButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';

/** 按钮尺寸（兼容旧 API，将被 level 取代） */
export type QButtonSize = FormSize;

/** 按钮大小档位：1 最小 → 6 最大 */
export type QButtonLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** 原生 button 类型 */
export type QButtonHtmlType = 'button' | 'submit' | 'reset';

/** QButton 组件 Props */
export interface QButtonProps {
  /**
   * @property type
   * @defaultValue 'default'
   * @description 按钮语义类型：primary 主按钮 / default 默认 / dashed 虚线 / text 文本 / link 链接
   */
  type?: QButtonType;

  /**
   * @property level
   * @defaultValue 3
   * @description 按钮大小档位（1~6，1 最小 6 最大），默认 3；同时传入 level 与 size 时以 level 为准
   */
  level?: QButtonLevel;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 兼容旧 API 的尺寸：small / middle / large 分别映射到 level 2 / 3 / 4；传入 level 时忽略
   */
  size?: QButtonSize;

  /**
   * @property htmlType
   * @defaultValue 'button'
   * @description 原生 button 的 type，用于表单提交或重置
   */
  htmlType?: QButtonHtmlType;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用按钮
   */
  disabled?: boolean;

  /**
   * @property loading
   * @defaultValue false
   * @description 是否加载中；加载时禁用点击并显示加载指示器
   */
  loading?: boolean;

  /**
   * @property danger
   * @defaultValue false
   * @description 危险按钮（使用红色系）
   */
  danger?: boolean;

  /**
   * @property ghost
   * @defaultValue false
   * @description 幽灵按钮（透明背景 + 主题色描边/文字），适合深色背景
   */
  ghost?: boolean;

  /**
   * @property block
   * @defaultValue false
   * @description 块级按钮，占满父容器整行
   */
  block?: boolean;

  /**
   * @property autofocus
   * @defaultValue false
   * @description 页面加载后是否自动聚焦
   */
  autofocus?: boolean;

  /**
   * @property href
   * @defaultValue 无
   * @description 传入后渲染为 <a> 链接按钮
   */
  href?: string;

  /**
   * @property target
   * @defaultValue 无
   * @description 链接按钮的打开方式（配合 href 使用，如 _blank）
   */
  target?: string;
}

/** QButton 组件 Emits */
export interface QButtonEmits {
  /**
   * @property click
   * @description 点击按钮时触发；disabled 或 loading 状态下不触发
   */
  (e: 'click', ev: MouseEvent): void;
}
