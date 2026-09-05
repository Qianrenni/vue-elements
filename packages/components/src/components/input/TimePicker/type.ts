/** QTimePicker 组件 Props */
export interface QTimePickerProps {
  /**
   * @property modelValue
   * @defaultValue 无
   * @description 选中时间字符串（如 '12:30:45'，v-model）
   */
  modelValue?: string;
  /**
   * @property format
   * @defaultValue 'HH:mm:ss'
   * @description 展示/输出格式，支持 HH/mm/ss（24 小时制）
   */
  format?: string;
  /**
   * @property placeholder
   * @defaultValue '请选择时间'
   * @description 占位文案
   */
  placeholder?: string;
  /**
   * @property disabled
   * @defaultValue false
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @property allowClear
   * @defaultValue true
   * @description 是否允许清除
   */
  allowClear?: boolean;
  /**
   * @property hourStep
   * @defaultValue 1
   * @description 小时步长
   */
  hourStep?: number;
  /**
   * @property minuteStep
   * @defaultValue 1
   * @description 分钟步长
   */
  minuteStep?: number;
  /**
   * @property secondStep
   * @defaultValue 1
   * @description 秒步长
   */
  secondStep?: number;
  /**
   * @property open
   * @defaultValue 无
   * @description 受控展开（v-model:open）
   */
  open?: boolean;
}

/** QTimePicker 组件 Emits */
export interface QTimePickerEmits {
  /**
   * @property update:modelValue
   * @description 确认时输出新值
   */
  (e: 'update:modelValue', value: string): void;
  /**
   * @property change
   * @description 确认变化时触发
   */
  (e: 'change', value: string): void;
  /**
   * @property update:open
   * @description 展开状态变化
   */
  (e: 'update:open', open: boolean): void;
}
