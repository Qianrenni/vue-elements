import type { FormComponentProps } from '@/types';

/**
 * FormRangeSlider 组件 Props
 */
export interface FormRangeSliderProps extends FormComponentProps<number> {
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 步进值
   */
  step?: number;
  /**
   * 自定义显示值文本（用于 ARIA 和 output）
   */
  valueText?: string;
  /**
   * 自定义输出显示格式
   */
  formatter?: (value: number) => string;
}
