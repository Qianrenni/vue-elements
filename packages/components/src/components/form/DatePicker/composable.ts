import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { DatePickerType, QDatePickerProps } from './type';

/** useDatePicker 返回值接口 */
export interface UseDatePickerReturn {
  /** 原生输入框 type */
  nativeType: ComputedRef<string>;
  /** 原生输入框绑定值（按 picker 归一化后） */
  text: ComputedRef<string>;
  /** 是否展示清除按钮 */
  showClear: ComputedRef<boolean>;
  /** 状态修饰类 */
  statusClass: ComputedRef<string>;
  /** 尺寸修饰类 */
  sizeClass: ComputedRef<string>;
}

/** picker 与原生 input type 的映射（quarter 无原生类型，退化为 month） */
const NATIVE_TYPE_MAP: Record<DatePickerType, string> = {
  date: 'date',
  week: 'week',
  month: 'month',
  quarter: 'month',
  year: 'date',
};

/** 年份补全为原生 date 需要的完整格式：'2026' → '2026-01-01' */
function normalizeYear(value: string): string {
  return /^\d{4}$/.test(value) ? `${value}-01-01` : value;
}

/** 季度换算为原生 month 需要的格式：'2026-Q2' → '2026-04' */
function normalizeQuarter(value: string): string {
  const matched = /^(\d{4})-[Qq]([1-4])$/.exec(value);
  if (!matched) return value;
  const month = (Number(matched[2]) - 1) * 3 + 1;
  return `${matched[1]}-${String(month).padStart(2, '0')}`;
}

/**
 * DatePicker 组件核心逻辑
 * @param props 组件 Props
 * @returns nativeType 原生类型，text 绑定值，showClear 清除按钮，statusClass 状态类，sizeClass 尺寸类
 */
export const useDatePicker = (props: QDatePickerProps): UseDatePickerReturn => {
  /** 原生输入框 type：showTime 优先于 picker */
  const nativeType = computed(() =>
    props.showTime ? 'datetime-local' : NATIVE_TYPE_MAP[props.picker ?? 'date'],
  );

  /** 绑定值：按 picker 归一化为原生输入框可识别的格式 */
  const text = computed(() => {
    const value = props.value ?? '';
    if (!value || props.showTime) return value;
    if (props.picker === 'year') return normalizeYear(value);
    if (props.picker === 'quarter') return normalizeQuarter(value);
    return value;
  });

  /** 是否展示清除按钮：开启 allowClear 且有值 */
  const showClear = computed(
    () => (props.allowClear ?? false) && (props.value ?? '').length > 0,
  );

  /** 状态修饰类 */
  const statusClass = computed(() =>
    props.status ? `q-date-picker--${props.status}` : '',
  );

  /** 尺寸修饰类 */
  const sizeClass = computed(() => `q-date-picker--${props.size ?? 'middle'}`);

  return { nativeType, text, showClear, statusClass, sizeClass };
};
