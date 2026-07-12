import type { FormComponentProps } from '@/types';
import type { Options } from '../FormSelect/type';

/**
 * FormCheckboxGroup 组件 Props
 */
export interface FormCheckboxGroupProps extends FormComponentProps<string[]> {
  /**
   * 选项列表
   */
  options: Options[];
}
