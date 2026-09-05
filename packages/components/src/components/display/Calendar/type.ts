/** QCalendar 组件 Props */
export interface QCalendarProps {
  /**
   * @property modelValue
   * @defaultValue 无
   * @description 选中日期（Date，v-model）
   */
  modelValue?: Date | null;
  /**
   * @property disabledDate
   * @defaultValue 无
   * @description 禁用日期判断函数
   */
  disabledDate?: (date: Date) => boolean;
  /**
   * @property allowClear
   * @defaultValue true
   * @description 点击已选中日期是否可取消选择
   */
  allowClear?: boolean;
}

/** QCalendar 组件 Emits */
export interface QCalendarEmits {
  /**
   * @property update:modelValue
   * @description 选中日期变化
   */
  (e: 'update:modelValue', date: Date | null): void;
  /**
   * @property change
   * @description 选中变化时触发
   */
  (e: 'change', date: Date | null): void;
  /**
   * @property panel-change
   * @description 切换月份面板时触发
   */
  (e: 'panel-change', year: number, month: number): void;
}
