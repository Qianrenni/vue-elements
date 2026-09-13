/** 单选框选项值类型 */
export type RadioValue = string | number;

/** 单选框选项配置 */
export interface RadioOption {
  /**
   * @property value
   * @defaultValue 无
   * @description 选项值
   */
  value: RadioValue;
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

/** QRadioGroup 组件 Props */
export interface QRadioGroupProps {
  /**
   * @property options
   * @defaultValue []
   * @description 选项列表，支持字符串/数字简写或 { label, value, disabled } 对象
   */
  options?: (RadioOption | RadioValue)[];
  /**
   * @property value
   * @defaultValue 无
   * @description 当前选中值（v-model:value）
   */
  value?: RadioValue;
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
  /**
   * @property optionType
   * @defaultValue 'default'
   * @description 选项展示形式：default 圆点单选 / button 按钮组
   */
  optionType?: 'default' | 'button';
  /**
   * @property buttonStyle
   * @defaultValue 'outline'
   * @description 按钮形式的外观：outline 描边 / solid 实心
   */
  buttonStyle?: 'outline' | 'solid';
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸，按钮形式下生效
   */
  size?: 'small' | 'middle' | 'large';
}

/** QRadioGroup 组件 Emits */
export interface QRadioGroupEmits {
  /**
   * @property update:value
   * @description 选中值变化时触发（v-model:value）
   */
  (e: 'update:value', value: RadioValue): void;
  /**
   * @property change
   * @description 选中值变化时触发
   */
  (e: 'change', value: RadioValue): void;
}
