import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { StatisticProps, StatisticValueType } from './type';

/**
 * 将输入值转为有限数值；无法解析返回 null。
 * @param raw 原始值
 * @returns 数值或 null
 */
export function toNumber(
  raw: StatisticValueType | null | undefined,
): number | null {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = typeof raw === 'number' ? raw : Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * 为整数部分添加千分位分组（保留符号）。
 * @param intPart 整数部分字符串（可含前导负号）
 * @param group 分组分隔符
 * @returns 分组后的整数部分
 */
export function groupIntegerPart(intPart: string, group: string): string {
  if (!group) return intPart;
  const sign = intPart.startsWith('-') ? '-' : '';
  const digits = sign ? intPart.slice(1) : intPart;
  if (digits.length < 4) return intPart;
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, group);
}

/**
 * 格式化数值（千分位 + 精度 + 自定义小数点）。
 * @param value 数值（null 返回空串）
 * @param precision 小数位数；缺省保留原样
 * @param groupSeparator 千分位分隔符（默认 ','）
 * @param decimalSeparator 小数点（默认 '.'）
 * @returns 格式化字符串
 */
export function formatStatistic(
  value: number | null,
  precision?: number,
  groupSeparator?: string,
  decimalSeparator?: string,
): string {
  if (value === null || Number.isNaN(value)) return '';
  const group = groupSeparator ?? ',';
  const dec = decimalSeparator ?? '.';
  const p =
    precision === undefined || precision === null
      ? null
      : Math.max(0, Math.floor(precision));
  const fixed = p === null ? String(value) : value.toFixed(p);
  const dotIdx = fixed.indexOf('.');
  if (dotIdx === -1) return groupIntegerPart(fixed, group);
  const intPart = groupIntegerPart(fixed.slice(0, dotIdx), group);
  return `${intPart}${dec}${fixed.slice(dotIdx + 1)}`;
}

/** useStatistic 返回值接口 */
export interface UseStatisticReturn {
  /** 展示中的数值（countUp 时随动画变化） */
  displayValue: Ref<string>;
  /** 最终格式化值 */
  formatted: ComputedRef<string>;
  /** 是否加载中 */
  isLoading: ComputedRef<boolean>;
  /** 是否开启滚动动画 */
  isCountUp: ComputedRef<boolean>;
  /** 触发滚动动画 */
  startCountUp: () => void;
  /** 取消滚动动画 */
  cancelCountUp: () => void;
}

/**
 * QStatistic 组件核心逻辑：解析/格式化 + countUp 滚动动画。
 * @param props 组件 Props
 * @returns 状态与处理器
 */
export const useStatistic = (props: StatisticProps): UseStatisticReturn => {
  const numeric = computed(() => toNumber(props.value));
  const isCountUp = computed(() => props.countUp === true);
  const isLoading = computed(() => props.loading === true);
  const hasRaf = typeof requestAnimationFrame === 'function';

  /** 依据当前 props 格式化某数值 */
  const format = (n: number | null): string =>
    formatStatistic(
      n,
      props.precision,
      props.groupSeparator,
      props.decimalSeparator,
    );

  const displayValue = ref<string>(format(numeric.value));
  let rafId = 0;

  function cancelCountUp() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  /** 从 0 滚动到目标值（easeOutCubic）；无 rAF 环境直接落到终值 */
  function startCountUp() {
    cancelCountUp();
    const target = numeric.value;
    if (!isCountUp.value || target === null || !hasRaf) {
      displayValue.value = format(target);
      return;
    }
    const duration = Math.max(0, props.countDuration ?? 2000);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      displayValue.value = format(target * eased);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };
    rafId = requestAnimationFrame(tick);
  }

  /** 最终格式化值 */
  const formatted = computed(() => format(numeric.value));

  // 数值 / 动画开关变化
  watch([numeric, isCountUp], () => {
    if (isCountUp.value) {
      startCountUp();
    } else {
      cancelCountUp();
      displayValue.value = format(numeric.value);
    }
  });

  // 初始化
  if (isCountUp.value) startCountUp();

  return {
    displayValue,
    formatted,
    isLoading,
    isCountUp,
    startCountUp,
    cancelCountUp,
  };
};
