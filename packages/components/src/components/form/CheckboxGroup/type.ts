/** 复选框选项值类型 */
export type CheckboxValue = string | number;

/** 复选框选项配置 */
export interface CheckboxOption {
  /**
   * @property value
   * @defaultValue 无
   * @description 选项值
   */
  value: CheckboxValue;
  /**
   * @property label
   * @defaultValue 无
   * @description 选项文案，缺省时回退为 value
   */
  label?: string;
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用该选项
   */
  disabled?: boolean;
}

/** QCheckboxGroup 组件 Props */
export interface QCheckboxGroupProps {
  /**
   * @property options
   * @defaultValue []
   * @description 选项列表，支持字符串/数字简写或 { label, value, disabled } 对象
   */
  options?: (CheckboxOption | CheckboxValue)[];
  /**
   * @property value
   * @defaultValue []
   * @description 选中值数组（v-model:value）
   */
  value?: CheckboxValue[];
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否整体禁用
   */
  disabled?: boolean;
  /**
   * @property name
   * @defaultValue 无
   * @description 原生 name，用于表单提交
   */
  name?: string;
}

/** QCheckboxGroup 组件 Emits */
export interface QCheckboxGroupEmits {
  /**
   * @property update:value
   * @description 选中值变化时触发（v-model:value）
   */
  (e: 'update:value', value: CheckboxValue[]): void;
  /**
   * @property change
   * @description 选中值变化时触发
   */
  (e: 'change', value: CheckboxValue[]): void;
}
