// Cache.ts
/**
 * 缓存项类，用于存储缓存值和过期时间
 * @template T 缓存值的类型
 */
class CacheItem<T> {
    value: T; // 缓存的值
    expireAt: number; // 过期时间戳（毫秒）

    /**
     * 构造函数
     * @param value 缓存的值
     * @param ttl 存活时间（毫秒）
     */
    constructor(value: T, ttl: number) {
        this.value = value;
        this.expireAt = Date.now() + ttl;
    }

    /**
     * 检查缓存项是否已过期
     * @returns 如果当前时间超过过期时间，返回true；否则返回false
     */
    isExpired(): boolean {
        return Date.now() > this.expireAt;
    }

    /**
     * 刷新缓存项的过期时间
     * @param ttl 新的存活时间（毫秒）
     */
    refresh(ttl: number): void {
        this.expireAt = Date.now() + ttl;
    }
}

/**
 * 内存缓存类，提供缓存的设置、获取、删除等功能
 */
export class UseMemoryCache {
    private cache = new Map<string, CacheItem<any>>(); // 缓存存储
    private ttl: number = 5 * 60 * 1000; // 默认存活时间：5分钟（毫秒）

    /**
     * 构造函数
     * @param ttlMs 缓存项的默认存活时间（毫秒）
     */
    constructor(ttlMs: number = 5 * 60 * 1000) {
        this.ttl = ttlMs;
        // 启动定时清理过期项，每分钟执行一次
        setInterval(() => this.cleanup(), 60 * 1000);
    }

    /**
     * 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @template T 缓存值的类型
     */
    set<T>(key: string, value: T): void {
        this.cache.set(key, new CacheItem(value, this.ttl));
    }

    /**
     * 获取缓存值
     * @param key 缓存键
     * @returns 如果缓存存在且未过期，返回缓存值；否则返回null
     * @template T 缓存值的类型
     */
    get<T>(key: string): T | null {
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        if (item.isExpired()) {
            this.cache.delete(key);
            return null;
        }

        // 重置过期时间（滑动窗口）
        item.refresh(this.ttl);
        return item.value as T;
    }

    /**
     * 检查缓存是否存在且未过期
     * @param key 缓存键
     * @returns 如果缓存存在且未过期，返回true；否则返回false
     */
    has(key: string): boolean {
        return this.get(key) !== null;
    }

    /**
     * 删除缓存
     * @param key 缓存键
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * 清空所有缓存
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * 获取当前缓存的大小（缓存项的数量）
     * @returns 缓存项的数量
     */
    size(): number {
        return this.cache.size;
    }

    /**
     * 清理过期的缓存项
     */
    private cleanup(): void {
        for (const [key, item] of this.cache) {
            if (item.isExpired()) {
                this.cache.delete(key);
            }
        }
    }
}
