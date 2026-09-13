/** 颜色展示格式 */
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsl';

/** 颜色选择器状态 */
export type ColorPickerStatus = 'error' | 'warning';

/** 预设色板分组 */
export interface ColorPickerPreset {
  /**
   * @property label
   * @defaultValue 无
   * @description 分组名称
   */
  label: string;
  /**
   * @property colors
   * @defaultValue 无
   * @description 分组内的颜色列表（hex）
   */
  colors: string[];
}

/** QColorPicker 组件 Props */
export interface QColorPickerProps {
  /**
   * @property value
   * @defaultValue '#000000'
   * @description 颜色值（v-model:value），hex 格式
   */
  value?: string;
  /**
   * @property presets
   * @defaultValue 无
   * @description 预设色板，按分组展示
   */
  presets?: ColorPickerPreset[];
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
   * @property showText
   * @defaultValue false
   * @description 是否在色块旁展示当前色值文本
   */
  showText?: boolean;
  /**
   * @property format
   * @defaultValue 'hex'
   * @description 展示格式，仅影响展示文案
   */
  format?: ColorPickerFormat;
  /**
   * @property open
   * @defaultValue 无
   * @description 是否展开面板（受控），缺省时由内部状态自管理
   */
  open?: boolean;
  /**
   * @property status
   * @defaultValue 无
   * @description 校验状态：error 错误 / warning 警告
   */
  status?: ColorPickerStatus;
}

/** QColorPicker 组件 Emits */
export interface QColorPickerEmits {
  /**
   * @property update:value
   * @description 颜色值变化（v-model:value）
   */
  (e: 'update:value', value: string): void;
  /**
   * @property change
   * @description 颜色值变化，返回颜色值与 hex
   */
  (e: 'change', color: string, hex: string): void;
  /**
   * @property clear
   * @description 点击清除按钮
   */
  (e: 'clear'): void;
  /**
   * @property openChange
   * @description 面板展开状态变化
   */
  (e: 'openChange', open: boolean): void;
}
