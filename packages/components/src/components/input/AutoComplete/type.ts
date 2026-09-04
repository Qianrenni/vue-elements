import type { FormSize } from '@/types';

/** 自动完成候选源（字符串或对象） */
export type AutoCompleteOptionSource = string | AutoCompleteSourceObject;

/** 对象形式候选 */
export interface AutoCompleteSourceObject {
  /** 选项值（选中后回填到输入框） */
  value: string;
  /** 显示文本（缺省用 value） */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 标准化后的候选项 */
export interface AutoCompleteOption {
  /** 选项值 */
  value: string;
  /** 显示文本 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
}

/** QAutoComplete 组件 Props（对齐 Ant Design AutoComplete 常用能力） */
export interface AutoCompleteProps {
  /**
   * @property modelValue
   * @defaultValue ''
   * @description 输入框文本（支持 v-model）
   */
  modelValue?: string;

  /**
   * @property options
   * @defaultValue []
   * @description 候选项：字符串数组或 { value, label?, disabled? } 数组
   */
  options?: AutoCompleteOptionSource[];

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
   * @defaultValue true
   * @description 有文本时是否显示清空按钮
   */
  allowClear?: boolean;

  /**
   * @property open
   * @defaultValue 无
   * @description 下拉是否展开（支持 v-model:open；缺省为内部受控）
   */
  open?: boolean;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: FormSize;

  /**
   * @property filterOption
   * @defaultValue 默认过滤
   * @description 过滤规则：true/缺省=按 label 忽略大小写包含匹配；false=不过滤全部展示；函数=自定义
   */
  filterOption?:
    | boolean
    | ((keyword: string, option: AutoCompleteOption) => boolean);
}

/** QAutoComplete 组件 Emits */
export interface AutoCompleteEmits {
  /**
   * @property update:modelValue
   * @description 输入/选中文本变化时触发
   */
  (e: 'update:modelValue', value: string): void;

  /**
   * @property update:open
   * @description 展开状态变化时触发
   */
  (e: 'update:open', open: boolean): void;

  /**
   * @property change
   * @description 文本提交变化时触发
   */
  (e: 'change', value: string): void;

  /**
   * @property select
   * @description 选中某候选项时触发
   */
  (e: 'select', value: string, option: AutoCompleteOption): void;

  /**
   * @property search
   * @description 输入过程中触发（可用于远程搜索）
   */
  (e: 'search', value: string): void;

  /**
   * @property focus
   * @description 聚焦时触发
   */
  (e: 'focus', ev: FocusEvent): void;

  /**
   * @property blur
   * @description 失焦时触发
   */
  (e: 'blur', ev: FocusEvent): void;

  /**
   * @property clear
   * @description 清空时触发
   */
  (e: 'clear'): void;
}
