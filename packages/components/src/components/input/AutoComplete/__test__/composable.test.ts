import { describe, expect, it } from 'vitest';

import {
  clampIndex,
  matchKeyword,
  normalizeOptions,
  useAutoComplete,
} from '../composable';
import type { AutoCompleteEmits, AutoCompleteProps } from '../type';

const noopEmit: AutoCompleteEmits = () => undefined;

function propsOf(
  overrides: Partial<AutoCompleteProps> = {},
): AutoCompleteProps {
  return {
    options: ['Apple', 'Banana', 'Cherry'],
    ...overrides,
  };
}

describe('AutoComplete 纯函数', () => {
  it('normalizeOptions 支持字符串与对象', () => {
    expect(
      normalizeOptions([
        'a',
        { value: 'b', label: 'Bee' },
        { value: 'c', disabled: true },
      ]),
    ).toEqual([
      { value: 'a', label: 'a', disabled: false },
      { value: 'b', label: 'Bee', disabled: false },
      { value: 'c', label: 'c', disabled: true },
    ]);
  });

  it('matchKeyword 默认忽略大小写包含', () => {
    const opt = { value: 'apple', label: 'Apple', disabled: false };
    expect(matchKeyword(opt, 'APP', undefined)).toBe(true);
    expect(matchKeyword(opt, 'xyz', undefined)).toBe(false);
    expect(matchKeyword(opt, '', undefined)).toBe(true);
  });

  it('filterOption=false 全部展示 / 函数走自定义', () => {
    const opt = { value: 'apple', label: 'Apple', disabled: false };
    expect(matchKeyword(opt, 'zzz', false)).toBe(true);
    expect(matchKeyword(opt, 'apple', (kw) => kw === 'apple')).toBe(true);
    expect(matchKeyword(opt, 'zzz', (kw) => kw === 'apple')).toBe(false);
  });

  it('clampIndex 边界', () => {
    expect(clampIndex(-1, 0)).toBe(-1);
    expect(clampIndex(-5, 3)).toBe(0);
    expect(clampIndex(9, 3)).toBe(2);
    expect(clampIndex(1, 3)).toBe(1);
  });
});

describe('useAutoComplete', () => {
  it('filtered 随关键词过滤', () => {
    const { filtered } = useAutoComplete(
      propsOf({ modelValue: 'an' }),
      noopEmit,
    );
    expect(filtered.value.map((o) => o.value)).toEqual(['Banana']);
  });

  it('moveActive 上下移动并夹取', () => {
    const { moveActive, activeIndex, ensureFirst } = useAutoComplete(
      propsOf(),
      noopEmit,
    );
    ensureFirst();
    expect(activeIndex.value).toBe(0);
    moveActive(1);
    expect(activeIndex.value).toBe(1);
    moveActive(-1);
    expect(activeIndex.value).toBe(0);
    moveActive(-1);
    expect(activeIndex.value).toBe(0);
    moveActive(1);
    moveActive(1);
    expect(activeIndex.value).toBe(2);
    moveActive(1);
    expect(activeIndex.value).toBe(2);
  });

  it('selectOption 派发并跳过禁用', () => {
    const events: unknown[][] = [];
    const emit: AutoCompleteEmits = (e, ...args) => events.push([e, ...args]);
    const { selectOption } = useAutoComplete(
      propsOf({ options: ['a', { value: 'b', disabled: true }] }),
      emit,
    );
    selectOption({ value: 'b', label: 'b', disabled: true });
    expect(events).toEqual([]);
    selectOption({ value: 'a', label: 'a', disabled: false });
    expect(events[0]).toEqual(['update:modelValue', 'a']);
    expect(events[1]).toEqual(['change', 'a']);
    expect(events[2]?.[0]).toBe('select');
  });

  it('clear 派发', () => {
    const events: unknown[][] = [];
    const emit: AutoCompleteEmits = (e, ...args) => events.push([e, ...args]);
    const { clear } = useAutoComplete(propsOf(), emit);
    clear();
    expect(events[0]).toEqual(['update:modelValue', '']);
    expect(events[1]).toEqual(['clear']);
  });
});
