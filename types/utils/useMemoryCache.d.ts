/**
 * 内存缓存类，提供缓存的设置、获取、删除等功能
 */
declare class UseMemoryCache {
    private cache;
    private ttl;
    /**
     * 构造函数
     * @param ttlMs 缓存项的默认存活时间（毫秒）
     */
    constructor(ttlMs?: number);
    /**
     * 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @template T 缓存值的类型
     */
    set<T>(key: string, value: T): void;
    /**
     * 获取缓存值
     * @param key 缓存键
     * @returns 如果缓存存在且未过期，返回缓存值；否则返回null
     * @template T 缓存值的类型
     */
    get<T>(key: string): T | null;
    /**
     * 检查缓存是否存在且未过期
     * @param key 缓存键
     * @returns 如果缓存存在且未过期，返回true；否则返回false
     */
    has(key: string): boolean;
    /**
     * 删除缓存
     * @param key 缓存键
     */
    delete(key: string): void;
    /**
     * 清空所有缓存
     */
    clear(): void;
    /**
     * 获取当前缓存的大小（缓存项的数量）
     * @returns 缓存项的数量
     */
    size(): number;
    /**
     * 清理过期的缓存项
     */
    private cleanup;
}
export declare const cache: UseMemoryCache;
export default UseMemoryCache;
