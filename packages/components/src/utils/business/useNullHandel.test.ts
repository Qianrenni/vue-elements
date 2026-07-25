import { describe, expect, it } from 'vitest';

import { letIfNotNull } from './useNullHandel';

describe('letIfNotNull', () => {
  it('应该在值非空时执行回调函数', () => {
    const result = letIfNotNull('hello', (v) => v.toUpperCase());
    expect(result).toBe('HELLO');
  });

  it('应该在值为 null 时返回 undefined', () => {
    const result = letIfNotNull(null, (v) => v);
    expect(result).toBeUndefined();
  });

  it('应该在值为 undefined 时返回 undefined', () => {
    const result = letIfNotNull(undefined, (v) => v);
    expect(result).toBeUndefined();
  });

  it('应该支持数值类型的非空值', () => {
    const result = letIfNotNull(42, (v) => v * 2);
    expect(result).toBe(84);
  });

  it('应该支持零值（falsy 但非空）', () => {
    const result = letIfNotNull(0, (v) => `value: ${v}`);
    expect(result).toBe('value: 0');
  });
});
