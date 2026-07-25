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

  it('loadFromStorage 解析失败时应返回 null 并记录警告', () => {
    // 存入非法 JSON，构造时 loadFromStorage 会进入 catch 分支
    const store = createMockStorage();
    store.set('__LRUCacheData__bad', '{invalid json');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const cache = new UseLRUCache<string>('bad', (_v): _v is string => {
      void _v;
      return true;
    });
    // 解析失败 => data/order 均为 null，兜底为空
    expect(cache.size()).toBe(0);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('saveToStorage 写入失败时应记录错误且不抛出', () => {
    const cache = new UseLRUCache<string>('fail', (_v): _v is string => {
      void _v;
      return true;
    });
    // 让 localStorage.setItem 抛错，触发 saveToStorage 的 catch 分支
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota exceeded');
      },
      removeItem: () => {},
      clear: () => {},
    });
    expect(() => cache.set('a', '1')).not.toThrow();
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('remove 不存在的键时应为空操作', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('a', '1');
    // 移除不存在的键，不应抛错也不应影响已有数据
    expect(() => cache.remove('nonexistent')).not.toThrow();
    expect(cache.size()).toBe(1);
    expect(cache.has('a')).toBe(true);
  });

  it('keys 应返回按访问顺序排列的键副本', () => {
    const cache = new UseLRUCache<string>('test', (_v): _v is string => {
      void _v;
      return true;
    });
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');

    const keys = cache.keys();
    expect(keys).toEqual(['a', 'b', 'c']);

    // 修改返回的副本不应影响内部状态
    keys.push('d');
    expect(cache.keys()).toEqual(['a', 'b', 'c']);
  });

  it('getRecent 不传 count 时应返回最多 maxSize 条', () => {
    const cache = new UseLRUCache<string>(
      'test',
      (_v): _v is string => {
        void _v;
        return true;
      },
      3,
    );
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');

    const recent = cache.getRecent();
    expect(recent).toHaveLength(3);
    expect(recent[0].key).toBe('c');
    expect(recent[2].key).toBe('a');
  });

  it('应从 localStorage 恢复已有数据', () => {
    const store = createMockStorage();
    // 预置合法数据与顺序
    store.set('__LRUCacheData__persist', JSON.stringify({ a: '1', b: '2' }));
    store.set('__LRUCacheOrder__persist', JSON.stringify(['a', 'b']));

    const cache = new UseLRUCache<string>(
      'persist',
      (v): v is string => typeof v === 'string',
    );
    expect(cache.size()).toBe(2);
    expect(cache.get('a')).toBe('1');
    expect(cache.get('b')).toBe('2');
    expect(cache.getLatestKey()).toBe('b');
  });

  it('set 更新已存在的键应移动到最近位置', () => {
    const cache = new UseLRUCache<string>(
      'test',
      (_v): _v is string => {
        void _v;
        return true;
      },
      3,
    );
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3');
    // 更新已存在的键 a，应移到末尾（最近使用）
    cache.set('a', '1-updated');

    expect(cache.keys()).toEqual(['b', 'c', 'a']);
    expect(cache.get('a')).toBe('1-updated');
    expect(cache.getLatestKey()).toBe('a');
  });

  it('构造时类型守卫全部通过时应保留数据', () => {
    const store = createMockStorage();
    store.set('__LRUCacheData__valid', JSON.stringify({ a: '1', b: '2' }));
    store.set('__LRUCacheOrder__valid', JSON.stringify(['a', 'b']));

    const cache = new UseLRUCache<string>(
      'valid',
      (v): v is string => typeof v === 'string',
    );
    // 类型守卫通过，不清除缓存
    expect(cache.size()).toBe(2);
    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(true);
  });

  it('evictIfFull 淘汰后应同步更新 localStorage 中的数据', () => {
    const store = createMockStorage();
    const cache = new UseLRUCache<string>(
      'evict',
      (_v): _v is string => {
        void _v;
        return true;
      },
      2,
    );
    cache.set('a', '1');
    cache.set('b', '2');
    cache.set('c', '3'); // 触发淘汰 a

    // localStorage 中数据应已移除 a
    const stored = JSON.parse(store.get('__LRUCacheData__evict')!) as Record<
      string,
      string
    >;
    expect(stored.a).toBeUndefined();
    expect(stored.b).toBe('2');
    expect(stored.c).toBe('3');
  });
});
