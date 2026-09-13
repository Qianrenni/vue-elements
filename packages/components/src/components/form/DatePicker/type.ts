/** 日期选择粒度 */
export type DatePickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';

/** 日期选择器状态 */
export type DatePickerStatus = 'error' | 'warning';

/** 日期选择器尺寸 */
export type DatePickerSize = 'small' | 'middle' | 'large';

/** QDatePicker 组件 Props */
export interface QDatePickerProps {
  /**
   * @property value
   * @defaultValue 无
   * @description 日期值（v-model:value），为原生输入框字符串
   */
  value?: string;
  /**
   * @property picker
   * @defaultValue 'date'
   * @description 选择粒度：date 日期 / week 周 / month 月 / quarter 季度 / year 年
   */
  picker?: DatePickerType;
  /**
   * @property showTime
   * @defaultValue false
   * @description 是否同时选择时间，开启后底层使用 datetime-local
   */
  showTime?: boolean;
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
  status?: DatePickerStatus;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small 小号 / middle 中号 / large 大号
   */
  size?: DatePickerSize;
  /**
   * @property name
   * @defaultValue 无
   * @description 原生 name，用于表单提交
   */
  name?: string;
  /**
   * @property autofocus
   * @defaultValue false
   * @description 是否自动聚焦
   */
  autofocus?: boolean;
}

/** QDatePicker 组件 Emits */
export interface QDatePickerEmits {
  /**
   * @property update:value
   * @description 日期值变化（v-model:value）
   */
  (e: 'update:value', value: string): void;
  /**
   * @property change
   * @description 日期值变化，返回原始值与展示字符串
   */
  (e: 'change', value: string, dateString: string): void;
  /**
   * @property clear
   * @description 点击清除按钮
   */
  (e: 'clear'): void;
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
}
