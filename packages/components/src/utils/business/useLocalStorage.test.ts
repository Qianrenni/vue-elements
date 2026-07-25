import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UseLocalStorage } from './useLocalStorage';

/** 创建一个内存存储用于模拟 localStorage */
const createMockStorage = () => {
  const store = new Map<string, string>();
  vi.stubGlobal(
    'localStorage',
    new (class {
      getItem(key: string) {
        return store.get(key) ?? null;
      }
      setItem(key: string, value: string) {
        store.set(key, value);
      }
      removeItem(key: string) {
        store.delete(key);
      }
      get length() {
        return store.size;
      }
      key(index: number) {
        return [...store.keys()][index] ?? null;
      }
      clear() {
        store.clear();
      }
    })(),
  );
  return store;
};

describe('UseLocalStorage', () => {
  beforeEach(() => {
    createMockStorage();
  });

  it('应该存储并获取值', () => {
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('key1', 'hello');

    expect(storage.getItem('key1')).toBe('hello');
  });

  it('应该支持过期时间', () => {
    vi.useFakeTimers();
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('key', 'value', 100);

    vi.advanceTimersByTime(200);

    expect(storage.getItem('key')).toBeNull();
    vi.useRealTimers();
  });

  it('应该在未过期时返回有效值', () => {
    vi.useFakeTimers();
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('key', 'value', 1000);

    vi.advanceTimersByTime(500);

    expect(storage.getItem('key')).toBe('value');
    vi.useRealTimers();
  });

  it('应该删除指定键', () => {
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('key', 'value');
    storage.removeItem('key');

    expect(storage.getItem('key')).toBeNull();
  });

  it('应该清空所有带前缀的存储项', () => {
    const storageA = new UseLocalStorage<string>('a_');
    const storageB = new UseLocalStorage<string>('b_');
    storageA.setItem('x', '1');
    storageB.setItem('y', '2');

    storageA.clear();

    expect(storageA.getItem('x')).toBeNull();
    expect(storageB.getItem('y')).toBe('2');
  });

  it('应该检查键是否存在', () => {
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('key', 'value');

    expect(storage.hasItem('key')).toBe(true);
    expect(storage.hasItem('nonexistent')).toBe(false);
  });

  it('应该获取所有键（不含前缀）', () => {
    const storage = new UseLocalStorage<string>('test_');
    storage.setItem('a', '1');
    storage.setItem('b', '2');

    expect(storage.getKeys()).toEqual(['a', 'b']);
  });

  it('应该使用类型守卫校验值类型', () => {
    const storage = new UseLocalStorage<number>(
      'test_',
      (v): v is number => typeof v === 'number',
    );
    storage.setItem('num', 42);

    expect(storage.getItem('num')).toBe(42);
  });

  it('应该在校验失败时返回 null 并清理数据', () => {
    const storage = new UseLocalStorage<string>(
      'test_',
      (v): v is string => typeof v === 'string',
    );
    // 直接存入非字符串数据模拟类型异常
    localStorage.setItem('test_bad', JSON.stringify({ value: 123 }));

    expect(storage.getItem('bad')).toBeNull();
  });

  it('应该在校验失败时抛出错误', () => {
    const storage = new UseLocalStorage<number>(
      'test_',
      (v): v is number => typeof v === 'number',
    );
    expect(() => storage.setItem('n', 'abc' as unknown as number)).toThrow();
  });
});
