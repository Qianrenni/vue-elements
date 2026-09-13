/** 选项原始值类型 */
export type SelectRawValue = string | number;

/** 选中值：单选为单个值，多选为值数组 */
export type SelectModelValue = SelectRawValue | SelectRawValue[] | undefined;

/** 选择器模式 */
export type SelectMode = 'default' | 'multiple';

/** 选择器状态 */
export type SelectStatus = 'error' | 'warning';

/** 选择器尺寸 */
export type SelectSize = 'small' | 'middle' | 'large';

/** 选择器选项配置 */
export interface SelectOption {
  /**
   * @property value
   * @defaultValue 无
   * @description 选项值
   */
  value: SelectRawValue;
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

/** 规范化后的选项 */
export interface NormalizedSelectOption {
  /** 选项值 */
  value: SelectRawValue;
  /** 选项文案 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
}

/** QSelect 组件 Props */
export interface QSelectProps {
  /**
   * @property options
   * @defaultValue []
   * @description 选项列表，支持字符串/数字简写或 { label, value, disabled } 对象
   */
  options?: (SelectOption | SelectRawValue)[];
  /**
   * @property value
   * @defaultValue 无
   * @description 选中值，单选为单值、多选为数组（v-model:value）
   */
  value?: SelectModelValue;
  /**
   * @property mode
   * @defaultValue 'default'
   * @description 选择模式：default 单选 / multiple 多选
   */
  mode?: SelectMode;
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
   * @property showSearch
   * @defaultValue false
   * @description 是否可搜索
   */
  showSearch?: boolean;
  /**
   * @property filterOption
   * @defaultValue 无
   * @description 自定义搜索过滤，缺省按 label 不区分大小写匹配
   */
  filterOption?: (input: string, option: NormalizedSelectOption) => boolean;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸
   */
  size?: SelectSize;
  /**
   * @property status
   * @defaultValue 无
   * @description 校验状态：error 错误 / warning 警告
   */
  status?: SelectStatus;
  /**
   * @property loading
   * @defaultValue false
   * @description 是否加载中
   */
  loading?: boolean;
  /**
   * @property open
   * @defaultValue 无
   * @description 下拉展开状态（受控）
   */
  open?: boolean;
  /**
   * @property name
   * @defaultValue 无
   * @description 原生 name，用于表单提交
   */
  name?: string;
}

/** QSelect 组件 Emits */
export interface QSelectEmits {
  /**
   * @property update:value
   * @description 选中值变化（v-model:value）
   */
  (e: 'update:value', value: SelectModelValue): void;
  /**
   * @property change
   * @description 选中值变化，附带选中项
   */
  (
    e: 'change',
    value: SelectModelValue,
    option: NormalizedSelectOption | NormalizedSelectOption[],
  ): void;
  /**
   * @property search
   * @description 搜索关键字变化
   */
  (e: 'search', value: string): void;
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
  /**
   * @property dropdownVisibleChange
   * @description 下拉展开状态变化
   */
  (e: 'dropdownVisibleChange', open: boolean): void;
}
