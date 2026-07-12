import type { FormComponentProps } from '@/types';

export interface Options {
  label: string;
  value: string;
}

/**
 * FormSelect 组件 Props
 */
export interface FormSelectProps extends FormComponentProps<string> {
  /**
   * 选项列表
   */
  options: Options[];
  /**
   * 是否可搜索
   */
  searchable?: boolean;
  /**
   * 下拉选项区域的最大高度
   */
  optionsHeight?: string;
}
