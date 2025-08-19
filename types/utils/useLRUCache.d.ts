/**
 * LRU（最近最少使用）缓存实现类
 * 使用localStorage进行持久化存储，通过两个键分别存储数据和访问顺序
 * 当缓存超过最大容量时，自动淘汰最久未使用的数据
 * @template T 缓存值的类型
 */
export declare class UseLRUCache<T> {
    private readonly name;
    private readonly maxSize;
    private readonly storageKey;
    private readonly orderKey;
    private data;
    private order;
    /**
     * 创建一个LRUCache实例
     * @param name 缓存名称，用于在localStorage中区分不同的缓存
     * @param maxSize 缓存的最大容量，默认10
     */
    constructor(name: string, maxSize?: number);
    /**
     * 获取最近使用的一条记录的 key
     * @returns 最近使用的 key，如果没有则返回 null
     */
    getLatestKey(): string | null;
    /**
     * 获取最近使用的一条记录的 value
     * @returns 最近使用的 value，如果没有则返回 null
     */
    getLatestValue(): T | null;
    /**
     * 获取最近使用的前 N 条（倒序：最近的在前）
     * @param count 要获取的数量
     * @returns 数组，按“最近使用”排序（最新的在前）
     */
    getRecent(count?: number): Array<{
        key: string;
        value: T;
    }>;
    /**
     * 获取缓存值
     * @param key 要获取的键
     * @returns 对应的值，如果不存在则返回null
     */
    get(key: string): T | null;
    /**
     * 设置缓存值
     * @param key 要设置的键
     * @param value 要设置的值
     */
    set(key: string, value: T): void;
    /**
     * 删除指定键的缓存
     * @param key 要删除的键
     */
    remove(key: string): void;
    /**
     * 清空整个缓存
     */
    clear(): void;
    /**
     * 获取当前缓存中的项数
     * @returns 缓存中的项数
     */
    size(): number;
    /**
     * 获取缓存的最大容量
     * @returns 缓存的最大容量
     */
    capacity(): number;
    /**
     * 获取缓存名称
     * @returns 缓存名称
     */
    getName(): string;
    /**
     * 获取当前所有键（按访问顺序：从最久到最近）
     * @returns 键的数组
     */
    keys(): string[];
    /**
     * 检查是否包含某个键
     * @param key 要检查的键
     * @returns 如果包含则返回true，否则返回false
     */
    has(key: string): boolean;
    /**
     * 从localStorage加载数据
     * @param key 存储键名
     * @returns 解析后的数据，如果解析失败或不存在则返回null
     */
    private loadFromStorage;
    /**
     * 保存数据到localStorage
     * @param key 存储键名
     * @param value 要存储的值
     */
    private saveToStorage;
    /**
     * 更新访问顺序：将指定键移动到末尾（表示最近使用）
     * @param key 要更新的键
     */
    private updateOrder;
    /**
     * 如果超出最大容量，淘汰最久未使用的项
     */
    private evictIfFull;
}
