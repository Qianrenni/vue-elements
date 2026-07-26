import {
  shareMemoryCache,
  UseMemoryCache,
} from '@/business/useMemoryCache/useMemoryCache';
import { describe, expect, it, vi } from 'vitest';

describe('UseMemoryCache', () => {
  it('应该设置并获取缓存值', () => {
    const cache = new UseMemoryCache(60000);
    cache.set('key', 'value');

    expect(cache.get<string>('key')).toBe('value');
  });

  it('应该在缓存过期后返回 null', () => {
    vi.useFakeTimers();
    const cache = new UseMemoryCache(100);
    cache.set('key', 'value');

    vi.advanceTimersByTime(200);

    expect(cache.get<string>('key')).toBeNull();
    vi.useRealTimers();
  });

  it('应该在过期前返回有效值', () => {
    vi.useFakeTimers();
    const cache = new UseMemoryCache(1000);
    cache.set('key', 'value');

    vi.advanceTimersByTime(500);

    expect(cache.get<string>('key')).toBe('value');
    vi.useRealTimers();
  });

  it('应该检查缓存是否存在', () => {
    const cache = new UseMemoryCache(60000);
    cache.set('key', 'value');

    expect(cache.has('key')).toBe(true);
    expect(cache.has('nonexistent')).toBe(false);
  });

  it('应该删除缓存', () => {
    const cache = new UseMemoryCache(60000);
    cache.set('key', 'value');
    cache.delete('key');

    expect(cache.get<string>('key')).toBeNull();
  });

  it('应该清空所有缓存', () => {
    const cache = new UseMemoryCache(60000);
    cache.set('a', '1');
    cache.set('b', '2');
    cache.clear();

    expect(cache.size()).toBe(0);
  });

  it('应该返回当前缓存大小', () => {
    const cache = new UseMemoryCache(60000);
    expect(cache.size()).toBe(0);

    cache.set('a', '1');
    expect(cache.size()).toBe(1);
  });

  it('应该在获取时刷新过期时间（滑动窗口）', () => {
    vi.useFakeTimers();
    const cache = new UseMemoryCache(200);
    cache.set('key', 'value');

    vi.advanceTimersByTime(150);
    // 在过期前获取，应该刷新滑动窗口
    cache.get('key');
    vi.advanceTimersByTime(150);

    expect(cache.get<string>('key')).toBe('value');
    vi.useRealTimers();
  });

  it('共享实例 shareMemoryCache 应可正常工作', () => {
    shareMemoryCache.set('shared', 'data');
    expect(shareMemoryCache.get<string>('shared')).toBe('data');
  });
});
