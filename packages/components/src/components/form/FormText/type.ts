import type { FormComponentProps } from '@/types';

/** 输入框类型 */
export type TextType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * FormText 组件 Props
 */
export interface FormTextProps extends FormComponentProps<string> {
  /**
   * 输入框类型
   */
  type?: TextType;
  /**
   * 输入校验正则
   */
  pattern?: string | undefined;
  /**
   * 是否可编辑
   */
  editable?: boolean;
  /**
   * 前缀图标名称
   */
  prefixIcon?: string;
  /**
   * 自定义校验函数
   */
  validate?: (value: string) => boolean;
  /**
   * 校验失败提示文本
   */
  hint?: string;
}
