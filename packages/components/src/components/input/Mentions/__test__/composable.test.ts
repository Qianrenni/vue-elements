import { describe, expect, it } from 'vitest';

import {
  filterMentions,
  findTriggerAtEnd,
  optionLabel,
  replaceTrigger,
} from '../composable';

describe('QMentions 纯逻辑', () => {
  const opts = [
    { value: 'Alice' },
    { value: 'Bob', label: 'Bob 波比' },
    { value: 'Carol', disabled: true },
  ];

  it('findTriggerAtEnd：命中 @ 词尾 / 未命中', () => {
    expect(findTriggerAtEnd('hello @Ali', '@')).toEqual({
      start: 7,
      end: 10,
      query: 'Ali',
    });
    expect(findTriggerAtEnd('hello Ali', '@')).toBeNull();
    expect(findTriggerAtEnd('no space', '@')).toBeNull();
  });

  it('filterMentions 按 label/value 模糊过滤', () => {
    expect(filterMentions(opts, 'bo')).toEqual([opts[1]]);
    expect(filterMentions(opts, '')).toHaveLength(3);
  });

  it('replaceTrigger 替换 @query 为 @value', () => {
    expect(
      replaceTrigger('hi @Ali', { start: 4, end: 7, query: 'Ali' }, 'Alice'),
    ).toBe('hi @Alice ');
  });

  it('optionLabel 回退 value', () => {
    expect(optionLabel(opts[1])).toBe('Bob 波比');
    expect(optionLabel(opts[0])).toBe('Alice');
  });
});
