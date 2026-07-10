import { describe, it, expect } from 'vitest';
import { isPlainObject, deepMerge } from '@/utils/business/useObject';

describe('isPlainObject', () => {
  it('应识别普通对象为 true', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);  
  });

  it('应识别数组为 false', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('应识别 null 为 false', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('应识别基本类型为 false', () => {
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(Symbol('test'))).toBe(false);
  });

  it('应识别函数为 false', () => {
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(function () {})).toBe(false);  
  });

  it('应识别内置对象为 false', () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new RegExp(''))).toBe(false);
  });
});

describe('deepMerge', () => {
  it('应合并简单平面对象（override 覆盖 base）', () => {
    const base = { a: 1, b: 2 };
    const override = { b: 3, c: 4 };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('应深度合并嵌套对象', () => {
    const base = { a: { x: 1, y: 2 }, b: 3 };
    const override = { a: { y: 99, z: 100 } };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: { x: 1, y: 99, z: 100 }, b: 3 });
  });

  it('应跳过 override 中的 undefined 值，保留 base 的值', () => {
    const base = { a: 1, b: 2 };
    const override = { a: undefined, b: 3 };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: 1, b: 3 });
  });

  it('应使用 override 覆盖数组（不递归合并数组）', () => {
    const base = { arr: [1, 2, 3] };
    const override = { arr: [4, 5] };
    const result = deepMerge(base, override);
    expect(result).toEqual({ arr: [4, 5] });
  });

  it('应使用 override 覆盖 null 值', () => {
    const base = { a: { nested: 'value' } };
    const override = { a: null };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: null });
  });

  it('应处理空对象 override', () => {
    const base = { a: 1, b: 2 };
    const result = deepMerge(base, {});
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('应处理空 base', () => {
    const base = {};
    const override = { a: 1, b: { c: 2 } };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: 1, b: { c: 2 } });
  });

  it('不应修改原 base 对象（不可变性）', () => {
    const base = { a: { x: 1, y: 2 }, b: 3 };
    const override = { a: { y: 99 } };
    const frozenBase = JSON.parse(JSON.stringify(base));
    deepMerge(base, override);
    expect(base).toEqual(frozenBase);
  });

  it('不应修改原 override 对象', () => {
    const base = { a: { x: 1 } };
    const override = { a: { y: 2 }, b: 3 };
    const frozenOverride = JSON.parse(JSON.stringify(override));
    deepMerge(base, override);
    expect(override).toEqual(frozenOverride);
  });

  it('应处理多层嵌套深度合并', () => {
    const base = {
      level1: {
        level2: {
          level3: {
            a: 1,
            b: 2,
          },
        },
      },
    };
    const override = {
      level1: {
        level2: {
          level3: {
            b: 999,
            c: 3,
          },
        },
      },
    };
    const result = deepMerge(base, override);
    expect(result).toEqual({
      level1: {
        level2: {
          level3: { a: 1, b: 999, c: 3 },
        },
      },
    });
  });

  it('应处理复杂嵌套结构（对象、数组、基本类型混合）', () => {
    const base = {
      config: {
        theme: 'dark',
        layout: {
          header: true,
          sidebar: { width: 200, collapsed: false },
        },
        items: [1, 2, 3],
      },
      version: 1,
    };
    const override = {
      config: {
        theme: 'light',
        layout: {
          sidebar: { collapsed: true },
        },
      },
    };
    const result = deepMerge(base, override);
    expect(result).toEqual({
      config: {
        theme: 'light',
        layout: {
          header: true,
          sidebar: { width: 200, collapsed: true },
        },
        items: [1, 2, 3],
      },
      version: 1,
    });
  });

  it('override 新增 base 中没有的键时应追加', () => {
    const base = { a: 1 };
    const override = { b: 2, c: { d: 3 } };
    const result = deepMerge(base, override);
    expect(result).toEqual({ a: 1, b: 2, c: { d: 3 } });
  });

  it('base 和 override 都是空对象时应返回空对象', () => {
    const result = deepMerge({}, {});
    expect(result).toEqual({});
  });

  it('应正确处理 override 为布尔值和数字的情况', () => {
    const base = { flag: false, count: 0, name: 'default' };
    const override = { flag: true, count: 42 };
    const result = deepMerge(base, override);
    expect(result).toEqual({ flag: true, count: 42, name: 'default' });
  });
});
