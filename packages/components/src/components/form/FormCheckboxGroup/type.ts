import type { FormComponentProps, Options } from '@/types';

/**
 * FormCheckboxGroup 组件 Props
 */
export interface FormCheckboxGroupProps extends FormComponentProps<string[]> {
  /**
   * 选项列表
   */
  options: Options[];
}
