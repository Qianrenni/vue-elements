import type { FormComponentProps } from '@/types';

/**
 * FormButton 组件 Props
 */
export interface FormButtonProps extends FormComponentProps<null> {
  /**
   * 按钮类型
   */
  type?: 'button' | 'submit' | 'reset';
}
