import type { FormComponentProps, Options } from '@/types';

/**
 * FormRadioGroup 组件 Props
 */
export interface FormRadioGroupProps extends FormComponentProps<string> {
  /**
   * 选项列表
   */
  options: Options[];
}
