import type { FormComponentProps } from '@/types';
import type { Options } from '../FormSelect/type';

/**
 * FormRadioGroup 组件 Props
 */
export interface FormRadioGroupProps extends FormComponentProps<string> {
  /**
   * 选项列表
   */
  options: Options[];
}
