import type { QButtonHtmlType } from '@/components/basic/Button';
import type { FormComponentProps } from '@/types';

/**
 * FormButton 组件 Props
 * @deprecated 已废弃，请改用 QButtonProps（basic/Button）
 */
export interface FormButtonProps extends FormComponentProps<null> {
  /**
   * @property type
   * @defaultValue 'button'
   * @description 原生按钮类型：button 普通 / submit 提交 / reset 重置（旧 API，等价于 htmlType）
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * @property htmlType
   * @defaultValue 无
   * @description 原生 button 的 type，对齐 QButton；同时传入时优先于 type
   */
  htmlType?: QButtonHtmlType;
}
