import type { FormComponentProps } from '@/types';

/** 支持的日期类型 */
export type DateType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

/**
 * FormDatePicker 组件 Props
 */
export interface FormDatePickerProps extends FormComponentProps<string> {
  /**
   * 日期选择类型
   */
  type?: DateType;
}
