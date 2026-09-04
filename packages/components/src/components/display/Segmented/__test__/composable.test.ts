import { describe, expect, it } from 'vitest';

import {
  findIndexByValue,
  firstEnabledIndex,
  lastEnabledIndex,
  moveIndex,
  normalizeSegmentedOptions,
  useSegmented,
} from '../composable';
import type { SegmentedEmits, SegmentedProps } from '../type';

function propsOf(overrides: Partial<SegmentedProps> = {}): SegmentedProps {
  return {
    options: ['a', 'b', 'c'],
    modelValue: 'a',
    disabled: false,
    block: false,
    size: 'middle',
    vertical: false,
    ...overrides,
  };
}

describe('normalizeSegmentedOptions', () => {
  it('字符串/数字选项归一化', () => {
    const out = normalizeSegmentedOptions(['a', 2, { label: 'x', value: 'x' }]);
    expect(out).toEqual([
      { label: 'a', value: 'a' },
      { label: '2', value: 2 },
      { label: 'x', value: 'x' },
    ]);
  });

  it('对象选项原样保留 disabled/icon', () => {
    const out = normalizeSegmentedOptions([
      { label: 'A', value: 1, disabled: true, icon: 'House' },
    ]);
    expect(out[0].disabled).toBe(true);
    expect(out[0].icon).toBe('House');
  });

  it('缺省返回空数组', () => {
    expect(normalizeSegmentedOptions(undefined)).toEqual([]);
  });
});

describe('索引定位与移动', () => {
  const opts = normalizeSegmentedOptions([
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b', disabled: true },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ]);

  it('findIndexByValue', () => {
    expect(findIndexByValue(opts, 'c')).toBe(2);
    expect(findIndexByValue(opts, 'zz')).toBe(-1);
    expect(findIndexByValue(opts, undefined)).toBe(-1);
  });

  it('moveIndex 跳过禁用项并环绕', () => {
    expect(moveIndex(0, 1, opts)).toBe(2); // 0→1 禁用→2
    expect(moveIndex(3, 1, opts)).toBe(0); // 环绕
    expect(moveIndex(2, -1, opts)).toBe(0); // 回退跳过禁用
    expect(moveIndex(0, -1, opts)).toBe(3); // 反向环绕
  });

  it('全禁用/空列表返回 -1', () => {
    expect(
      moveIndex(
        0,
        1,
        normalizeSegmentedOptions(
          ['a', 'b'].map((x) => ({ label: x, value: x, disabled: true })),
        ),
      ),
    ).toBe(-1);
    expect(moveIndex(0, 1, [])).toBe(-1);
    expect(firstEnabledIndex([])).toBe(-1);
    expect(lastEnabledIndex([])).toBe(-1);
  });

  it('首末可用项', () => {
    expect(firstEnabledIndex(opts)).toBe(0);
    expect(lastEnabledIndex(opts)).toBe(3);
  });
});

describe('useSegmented', () => {
  it('点击选项触发 update/change（受控父回写后重复点同值不再触发）', () => {
    const events: unknown[][] = [];
    const emit: SegmentedEmits = (e, v) => events.push([e, v]);
    const { onSelect, selectedIndex } = useSegmented(propsOf(), emit);
    expect(selectedIndex.value).toBe(0);
    onSelect(2); // a → c
    expect(events[0]).toEqual(['update:modelValue', 'c']);
    expect(events[1]).toEqual(['change', 'c']);

    // 父组件已把 modelValue 回写为 c → 再点 c 不触发
    const { onSelect: onSelect2 } = useSegmented(
      propsOf({ modelValue: 'c' }),
      emit,
    );
    onSelect2(2);
    expect(events).toHaveLength(2);
  });

  it('禁用项不可选中', () => {
    const events: unknown[] = [];
    const emit: SegmentedEmits = (e) => events.push(e);
    const { onSelect } = useSegmented(
      propsOf({
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
        ],
      }),
      emit,
    );
    onSelect(1);
    expect(events).toEqual([]);
  });

  it('整体禁用', () => {
    const { isDisabledAll, optionDisabled } = useSegmented(
      propsOf({ disabled: true }),
      emitNoop,
    );
    expect(isDisabledAll.value).toBe(true);
    expect(optionDisabled(0)).toBe(true);
  });

  it('修饰类随 props', () => {
    const { classList } = useSegmented(
      propsOf({ block: true, size: 'large' }),
      emitNoop,
    );
    expect(classList.value['q-segmented--block']).toBe(true);
    expect(classList.value['q-segmented--large']).toBe(true);
  });
});

const emitNoop: SegmentedEmits = () => undefined;
