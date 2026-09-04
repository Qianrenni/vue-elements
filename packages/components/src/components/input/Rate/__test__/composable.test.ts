import { describe, expect, it } from 'vitest';

import { isFull, isHalf, useRate } from '../composable';
import type { RateEmits, RateProps } from '../type';

const noopEmit: RateEmits = () => undefined;

function propsOf(overrides: Partial<RateProps> = {}): RateProps {
  return {
    modelValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    disabled: false,
    ...overrides,
  };
}

describe('Rate 星态判定', () => {
  it('isFull', () => {
    expect(isFull(3, 0)).toBe(true);
    expect(isFull(3, 2)).toBe(true);
    expect(isFull(3, 3)).toBe(false);
  });

  it('isHalf 仅半星配置生效', () => {
    expect(isHalf(2.5, 2, true)).toBe(true);
    expect(isHalf(2.5, 1, true)).toBe(false);
    expect(isHalf(2.5, 2, false)).toBe(false);
  });
});

describe('useRate', () => {
  it('整数点击', () => {
    const events: unknown[][] = [];
    const emit: RateEmits = (e, v) => events.push([e, v]);
    const { onPick } = useRate(propsOf(), emit);
    onPick(2, false);
    expect(events[0]).toEqual(['update:modelValue', 3]);
    expect(events[1]).toEqual(['change', 3]);
  });

  it('半星点击', () => {
    let val = 0;
    const emit: RateEmits = (e, v) => {
      if (e === 'update:modelValue') val = v as number;
    };
    const r = useRate(propsOf({ allowHalf: true, modelValue: 0 }), emit);
    r.onPick(2, true);
    expect(val).toBe(2.5);
  });

  it('清除：点同一值归零', () => {
    const events: unknown[][] = [];
    const emit: RateEmits = (e, v) => events.push([e, v]);
    const { onPick } = useRate(propsOf({ modelValue: 3 }), emit);
    onPick(2, false); // 目标也是 3，与当前相同 → 归零
    expect(events[0]).toEqual(['update:modelValue', 0]);
  });

  it('allowClear=false 时重复点击不清零', () => {
    const events: unknown[][] = [];
    const emit: RateEmits = (e, v) => events.push([e, v]);
    const { onPick } = useRate(
      propsOf({ modelValue: 3, allowClear: false }),
      emit,
    );
    onPick(2, false);
    expect(events[0]).toEqual(['update:modelValue', 3]);
  });

  it('disabled 时不响应', () => {
    const events: unknown[] = [];
    const emit: RateEmits = (e) => events.push(e);
    const { onPick, onHover } = useRate(propsOf({ disabled: true }), emit);
    onPick(2, false);
    onHover(1);
    expect(events).toEqual([]);
  });

  it('悬停预览影响展示值', () => {
    const { onHover, displayValue } = useRate(
      propsOf({ modelValue: 2 }),
      noopEmit,
    );
    expect(displayValue.value).toBe(2);
    onHover(3);
    expect(displayValue.value).toBe(4);
  });
});
