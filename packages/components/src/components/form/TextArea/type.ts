/** 输入框状态 */
export type TextAreaStatus = 'error' | 'warning';

/** 自动高度配置 */
export interface TextAreaAutoSize {
  /** 最小行数 */
  minRows?: number;
  /** 最大行数，超出后出现滚动条 */
  maxRows?: number;
}

/** QTextArea 组件 Props */
export interface QTextAreaProps {
  /**
   * @property value
   * @defaultValue 无
   * @description 文本值（v-model:value）
   */
  value?: string;
  /**
   * @property placeholder
   * @defaultValue 无
   * @description 占位文本
   */
  placeholder?: string;
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @property readonly
   * @defaultValue false
   * @description 是否只读
   */
  readonly?: boolean;
  /**
   * @property rows
   * @defaultValue 3
   * @description 默认行数
   */
  rows?: number;
  /**
   * @property autoSize
   * @defaultValue false
   * @description 是否自适应内容高度，传入对象可限制最小/最大行数
   */
  autoSize?: boolean | TextAreaAutoSize;
  /**
   * @property showCount
   * @defaultValue false
   * @description 是否展示字数统计
   */
  showCount?: boolean;
  /**
   * @property maxLength
   * @defaultValue 无
   * @description 最大长度限制
   */
  maxLength?: number;
  /**
   * @property allowClear
   * @defaultValue false
   * @description 是否展示清除按钮
   */
  allowClear?: boolean;
  /**
   * @property status
   * @defaultValue 无
   * @description 校验状态：error 错误 / warning 警告
   */
  status?: TextAreaStatus;
  /**
   * @property autofocus
   * @defaultValue false
   * @description 是否自动聚焦
   */
  autofocus?: boolean;
  /**
   * @property name
   * @defaultValue 无
   * @description 原生 name，用于表单提交
   */
  name?: string;
}

/** QTextArea 组件 Emits */
export interface QTextAreaEmits {
  /**
   * @property update:value
   * @description 文本变化（v-model:value）
   */
  (e: 'update:value', value: string): void;
  /**
   * @property change
   * @description 文本变化
   */
  (e: 'change', value: string): void;
  /**
   * @property pressEnter
   * @description 按下回车
   */
  (e: 'pressEnter', ev: KeyboardEvent): void;
  /**
   * @property focus
   * @description 获得焦点
   */
  (e: 'focus', ev: FocusEvent): void;
  /**
   * @property blur
   * @description 失去焦点
   */
  (e: 'blur', ev: FocusEvent): void;
  /**
   * @property clear
   * @description 点击清除按钮
   */
  (e: 'clear'): void;
}
