import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UseLRUCache } from './useLRUCache';

/** 创建内存模拟 localStorage */
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
      clear() {
        store.clear();
      }
    })(),
  );
  return store;
};

describe('UseLRUCache', () => {
  beforeEach(() => {
    createMockStorage();
  });

  it('应该存储并获取值', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('key1', 'value1');

    expect(cache.get('key1')).toBe('value1');
  });

  it('应该在获取不存在键时返回 null', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });

    expect(cache.get('nonexistent')).toBeNull();
  });

  it('应该淘汰最久未使用的项', () => {
    const cache = new UseLRUCache<string>(
      'test',
      (_v): _v is string => {
        void _v;
        return true;
      },
      2,
    );
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');

    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBe('2');
    expect(cache.get('c')).toBe('3');
  });

  it('应该在访问时更新顺序', () => {
    const cache = new UseLRUCache<string>(
      'test',
      (_v): _v is string => {
        void _v;
        return true;
      },
      2,
    );
    cache.set('a', '1');
    cache.set('b', '2');
    cache.get('a'); // 更新访问顺序，a 变为最近使用
    cache.set('c', '3'); // 淘汰 b

    expect(cache.get('a')).toBe('1');
    expect(cache.get('b')).toBeNull();
    expect(cache.get('c')).toBe('3');
  });

  it('应该删除指定键', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('key', 'value');
    cache.remove('key');

    expect(cache.get('key')).toBeNull();
  });

  it('应该清空整个缓存', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('a', '1');
    cache.set('b', '2');
    cache.clear();

    expect(cache.size()).toBe(0);
    expect(cache.get('a')).toBeNull();
  });

  it('应该返回缓存大小', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    expect(cache.size()).toBe(0);

    cache.set('a', '1');
    expect(cache.size()).toBe(1);

    cache.set('b', '2');
    expect(cache.size()).toBe(2);
  });

  it('应该返回最新使用的键与值', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('a', '1');
    cache.set('b', '2');

    expect(cache.getLatestKey()).toBe('b');
    expect(cache.getLatestValue()).toBe('2');

    cache.get('a');
    expect(cache.getLatestKey()).toBe('a');
  });

  it('应该在空缓存时 getLatestKey/Value 返回 null', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });

    expect(cache.getLatestKey()).toBeNull();
    expect(cache.getLatestValue()).toBeNull();
  });

  it('应该返回最近使用的 N 条', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');

    const recent = cache.getRecent(2);
    expect(recent).toHaveLength(2);
    expect(recent[0].key).toBe('c');
    expect(recent[1].key).toBe('b');
  });

  it('应该检查键是否存在', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('key', 'value');

    expect(cache.has('key')).toBe(true);
    expect(cache.has('nonexistent')).toBe(false);
  });

  it('应该使用类型守卫验证数据', () => {
    // 构造时存入无效数据应触发 clear
    const store = new Map<string, string>();
    store.set('__LRUCacheData__test', JSON.stringify({ a: 123 }));
    store.set('__LRUCacheOrder__test', JSON.stringify(['a']));
    const cache = new UseLRUCache<string>(
      'test',
      (v): v is string => typeof v === 'string',
    );

    expect(cache.size()).toBe(0);
  });

  it('应该返回容量与名称', () => {
    const cache = new UseLRUCache<string>('myCache', (_v): _v is string => {
      void _v;
      return true;
    });
    expect(cache.capacity()).toBe(8);
    expect(cache.getName()).toBe('myCache');
  });

  it('应该确保容量至少为 1', () => {
    const cache = new UseLRUCache<string>(
      'test',
      (_v): _v is string => {
        void _v;
        return true;
      },
      0,
    );
    expect(cache.capacity()).toBe(1);
  });
});
