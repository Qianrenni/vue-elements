import { describe, expect, it } from 'vitest';

import { useBadge } from '../composable';
import type { BadgeProps } from '../type';

describe('useBadge', () => {
  it('应该在 value 超过 max 时显示 99+', () => {
    const props: BadgeProps = { value: 100, max: 99 };
    const { displayValue } = useBadge(props);

    expect(displayValue.value).toBe('99+');
  });

  it('应该在 value 未超过 max 时显示原值（数值）', () => {
    const props: BadgeProps = { value: 50, max: 99 };
    const { displayValue } = useBadge(props);

    expect(displayValue.value).toBe(50);
  });

  it('应该在 value 为字符串且超过 max 时显示 99+', () => {
    const props: BadgeProps = { value: '100', max: 99 };
    const { displayValue } = useBadge(props);

    expect(displayValue.value).toBe('99+');
  });

  it('应该在 value 未超过 max 时显示原值（字符串）', () => {
    const props: BadgeProps = { value: '50', max: 99 };
    const { displayValue } = useBadge(props);

    expect(displayValue.value).toBe('50');
  });

  it('应该在 dot 模式时显示空字符串', () => {
    const props: BadgeProps = { value: 5, dot: true };
    const { displayValue, isDot } = useBadge(props);

    expect(displayValue.value).toBe('');
    expect(isDot.value).toBe(true);
  });

  it('应该使用默认 max 值 99', () => {
    const props: BadgeProps = { value: 200 };
    const { displayValue } = useBadge(props);

    expect(displayValue.value).toBe('99+');
  });

  it('应该正确计算 type CSS 类', () => {
    const props: BadgeProps = { type: 'success' };
    const { typeClass } = useBadge(props);

    expect(typeClass.value).toBe('q-badge--success');
  });

  it('应该在未传 type 时使用默认 info', () => {
    const props: BadgeProps = {};
    const { typeClass } = useBadge(props);

    expect(typeClass.value).toBe('q-badge--info');
  });
});
