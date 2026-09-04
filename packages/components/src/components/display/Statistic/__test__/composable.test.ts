import { describe, expect, it } from 'vitest';

import {
  formatStatistic,
  groupIntegerPart,
  toNumber,
  useStatistic,
} from '../composable';

describe('toNumber', () => {
  it('数字与数字字符串', () => {
    expect(toNumber(42)).toBe(42);
    expect(toNumber('3.14')).toBe(3.14);
    expect(toNumber('-7')).toBe(-7);
  });

  it('非法输入返回 null', () => {
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber(null)).toBeNull();
    expect(toNumber('')).toBeNull();
    expect(toNumber('abc')).toBeNull();
    expect(toNumber(Number.NaN)).toBeNull();
    expect(toNumber(Number.POSITIVE_INFINITY)).toBeNull();
  });
});

describe('groupIntegerPart', () => {
  it('千分位分组', () => {
    expect(groupIntegerPart('1234567', ',')).toBe('1,234,567');
    expect(groupIntegerPart('123', ',')).toBe('123');
  });

  it('保留负号', () => {
    expect(groupIntegerPart('-1234567', ',')).toBe('-1,234,567');
  });

  it('空分隔符禁用分组', () => {
    expect(groupIntegerPart('1234567', '')).toBe('1234567');
  });
});

describe('formatStatistic', () => {
  it('空值返回空串', () => {
    expect(formatStatistic(null)).toBe('');
  });

  it('千分位 + 小数', () => {
    expect(formatStatistic(1234567.89, 2)).toBe('1,234,567.89');
  });

  it('自定义小数分隔符', () => {
    expect(formatStatistic(12.5, 1, ',', '.')).toBe('12.5');
    expect(formatStatistic(12.5, 1, ',', ',')).toBe('12,5');
  });

  it('未指定精度保留原小数', () => {
    expect(formatStatistic(3.1415)).toBe('3.1415');
    expect(formatStatistic(42)).toBe('42');
  });

  it('负数保留符号', () => {
    expect(formatStatistic(-1234.5, 1)).toBe('-1,234.5');
  });
});

describe('useStatistic', () => {
  it('非动画：展示即终值', () => {
    const { displayValue, formatted } = useStatistic({
      value: 1234.5,
      precision: 2,
    });
    expect(displayValue.value).toBe('1,234.50');
    expect(formatted.value).toBe('1,234.50');
  });

  it('计数动画开关为真但无 rAF：直接落终值', () => {
    const { displayValue, startCountUp } = useStatistic({
      value: 100,
      countUp: true,
    });
    // node 环境无 requestAnimationFrame → startCountUp 同步落到终值
    startCountUp();
    expect(displayValue.value).toBe('100');
  });

  it('loading 透传', () => {
    const { isLoading } = useStatistic({ value: 1, loading: true });
    expect(isLoading.value).toBe(true);
  });

  it('缺省 title/value 容错', () => {
    const { displayValue } = useStatistic({});
    expect(displayValue.value).toBe('');
  });
});
