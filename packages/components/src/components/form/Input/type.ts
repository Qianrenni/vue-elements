/** 输入框类型 */
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

/** 输入框状态 */
export type InputStatus = 'error' | 'warning';

/** 输入框尺寸 */
export type InputSize = 'small' | 'middle' | 'large';

/** QInput 组件 Props */
export interface QInputProps {
  /**
   * @property value
   * @defaultValue ''
   * @description 输入值（v-model:value）
   */
  value?: string;
  /**
   * @property type
   * @defaultValue 'text'
   * @description 原生输入类型
   */
  type?: InputType;
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
   * @property allowClear
   * @defaultValue false
   * @description 是否展示清除按钮
   */
  allowClear?: boolean;
  /**
   * @property maxLength
   * @defaultValue 无
   * @description 最大长度限制
   */
  maxLength?: number;
  /**
   * @property showCount
   * @defaultValue false
   * @description 是否展示字数统计
   */
  showCount?: boolean;
  /**
   * @property prefix
   * @defaultValue 无
   * @description 前缀图标名（QIcon 的 icon 名称）
   */
  prefix?: string;
  /**
   * @property suffix
   * @defaultValue 无
   * @description 后缀图标名（QIcon 的 icon 名称）
   */
  suffix?: string;
  /**
   * @property status
   * @defaultValue 无
   * @description 校验状态：error 错误 / warning 警告
   */
  status?: InputStatus;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸
   */
  size?: InputSize;
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

/** QInput 组件 Emits */
export interface QInputEmits {
  /**
   * @property update:value
   * @description 输入值变化（v-model:value）
   */
  (e: 'update:value', value: string): void;
  /**
   * @property change
   * @description 输入值变化
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
