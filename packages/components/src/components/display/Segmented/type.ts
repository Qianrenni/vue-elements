/** 尺寸 */
export type SegmentedSize = 'small' | 'middle' | 'large';

/** 选项值 */
export type SegmentedValue = string | number;

/** 单个分段选项 */
export interface SegmentedOption {
  /** 显示文本 */
  label: string;
  /** 选项值 */
  value: SegmentedValue;
  /** 是否禁用 */
  disabled?: boolean;
  /** 图标名（QIcon 名称，如 "House"） */
  icon?: string;
}

/** 选项输入：字符串/数字（value = label）或对象 */
export type SegmentedOptionSource = SegmentedValue | SegmentedOption;

/** QSegmented 组件 Props（对齐 Ant Design Segmented） */
export interface SegmentedProps {
  /**
   * @property options
   * @defaultValue []
   * @description 选项：字符串/数字，或 { label, value, disabled?, icon? }
   */
  options?: SegmentedOptionSource[];

  /**
   * @property modelValue
   * @defaultValue 无
   * @description 当前选中值（支持 v-model）
   */
  modelValue?: SegmentedValue;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否整体禁用
   */
  disabled?: boolean;

  /**
   * @property block
   * @defaultValue false
   * @description 是否撑满整行（等分宽度）
   */
  block?: boolean;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: SegmentedSize;

  /**
   * @property vertical
   * @defaultValue false
   * @description 是否纵向排列
   */
  vertical?: boolean;
}

/** QSegmented 组件 Emits */
export interface SegmentedEmits {
  /**
   * @property update:modelValue
   * @description 选中值变化时触发
   */
  (e: 'update:modelValue', value: SegmentedValue): void;

  /**
   * @property change
   * @description 选中值变化时触发
   */
  (e: 'change', value: SegmentedValue): void;
}
