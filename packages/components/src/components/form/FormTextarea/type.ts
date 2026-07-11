import type { FormComponentProps } from '@/types';

/**
 * FormTextarea 组件 Props
 */
export interface FormTextareaProps extends FormComponentProps<string> {
  /**
   * 文本域行数
   */
  rows?: number;
  /**
   * 是否可拉伸调整大小
   */
  resizable?: boolean;
}
