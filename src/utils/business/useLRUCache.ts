/**
 * 存储数据的接口
 * @template T 存储值的类型
 */
interface StorageData<T> {
    [key: string]: T;
}

/*
 * 类型谓词，用于检查一个值是否为指定类型
 * @param value 要检查的值
 * @returns 是否为指定类型
 */
type TypeGuard<T> = (value: any) => value is T;

/**
 * LRU（最近最少使用）缓存实现类
 * 使用localStorage进行持久化存储，通过两个键分别存储数据和访问顺序
 * 当缓存超过最大容量时，自动淘汰最久未使用的数据
 * @template T 缓存值的类型
 */
export class UseLRUCache<T> {
    private readonly name: string; // 缓存名称，用于区分不同的缓存实例
    private readonly maxSize: number; // 缓存的最大容量
    private readonly storageKey: string; // 用于存储数据的localStorage键
    private readonly orderKey: string; // 用于存储访问顺序的localStorage键

    private data: StorageData<T>; // 存储缓存数据
    private order: string[]; // 存储键的访问顺序，按访问时间从早到晚排列
    private typeGuard: TypeGuard<T>;

    /**
     * 创建一个LRUCache实例
     * @param name 缓存名称，用于在localStorage中区分不同的缓存
     * @param typeGuard 类型谓词，用于检查数据是否为指定类型
     * @param maxSize 缓存的最大容量，默认10
     */
    constructor(name: string, typeGuard: TypeGuard<T>, maxSize = 8) {
        this.name = name;
        this.maxSize = Math.max(1, maxSize); // 确保容量至少为1

        // 生成localStorage中使用的键名
        this.storageKey = `__LRUCacheData__${this.name}`;
        this.orderKey = `__LRUCacheOrder__${this.name}`;

        // 从localStorage加载已有数据
        this.data = this.loadFromStorage<StorageData<T>>(this.storageKey) || {};
        this.order = this.loadFromStorage<string[]>(this.orderKey) || [];
        this.typeGuard = typeGuard;
        for (const [key, value] of Object.entries(this.data)) {
            if (!this.typeGuard(value)) {
                this.clear();
                console.error(`LRUCache: ${this.name} 数据类型错误，已清除缓存`);
                break;
            }
        }
    }

    /**
     * 获取最近使用的一条记录的 key
     * @returns 最近使用的 key，如果没有则返回 null
     */
    getLatestKey(): string | null {
        const len = this.order.length;
        return len > 0 ? this.order[len - 1] : null;
    }

    /**
     * 获取最近使用的一条记录的 value
     * @returns 最近使用的 value，如果没有则返回 null
     */
    getLatestValue(): T | null {
        const key = this.getLatestKey();
        return key ? this.data[key] : null;
    }

    /**
     * 获取最近使用的前 N 条（倒序：最近的在前）
     * @param count 要获取的数量
     * @returns 数组，按“最近使用”排序（最新的在前）
     */
    getRecent(count: number = this.maxSize): Array<{ key: string; value: T }> {
        const recentKeys = this.order.slice(-count).reverse(); // 取最后 N 个，反转成“新→旧”
        return recentKeys.map((key) => ({
            key,
            value: this.data[key],
        }));
    }

    /**
     * 获取缓存值
     * @param key 要获取的键
     * @returns 对应的值，如果不存在则返回null
     */
    get(key: string): T | null {
        if (Object.hasOwn(this.data, key)) {
            // 更新访问顺序
            this.updateOrder(key);
            // 保存更新后的顺序到localStorage
            this.saveToStorage(this.orderKey, this.order);
            return this.data[key];
        }
        return null;
    }

    /**
     * 设置缓存值
     * @param key 要设置的键
     * @param value 要设置的值
     */
    set(key: string, value: T): void {
        // 存储值
        this.data[key] = value;
        // 更新访问顺序
        this.updateOrder(key);
        // 检查并执行淘汰策略
        this.evictIfFull();

        // 保存更新后的数据和顺序到localStorage
        this.saveToStorage(this.storageKey, this.data);
        this.saveToStorage(this.orderKey, this.order);
    }

    /**
     * 删除指定键的缓存
     * @param key 要删除的键
     */
    remove(key: string): void {
        if (Object.hasOwn(this.data, key)) {
            // 从数据中删除
            delete this.data[key];
            // 从顺序数组中删除
            this.order = this.order.filter((k) => k !== key);
            // 更新localStorage
            this.saveToStorage(this.storageKey, this.data);
            this.saveToStorage(this.orderKey, this.order);
        }
    }

    /**
     * 清空整个缓存
     */
    clear(): void {
        // 重置数据和顺序
        this.data = {};
        this.order = [];
        // 从localStorage中移除相关项
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.orderKey);
    }

    /**
     * 获取当前缓存中的项数
     * @returns 缓存中的项数
     */
    size(): number {
        return this.order.length;
    }

    /**
     * 获取缓存的最大容量
     * @returns 缓存的最大容量
     */
    capacity(): number {
        return this.maxSize;
    }

    /**
     * 获取缓存名称
     * @returns 缓存名称
     */
    getName(): string {
        return this.name;
    }

    /**
     * 获取当前所有键（按访问顺序：从最久到最近）
     * @returns 键的数组
     */
    keys(): string[] {
        // 返回顺序数组的副本，避免外部修改内部状态
        return [...this.order];
    }

    /**
     * 检查是否包含某个键
     * @param key 要检查的键
     * @returns 如果包含则返回true，否则返回false
     */
    has(key: string): boolean {
        return Object.hasOwn(this.data, key);
    }

    /**
     * 从localStorage加载数据
     * @param key 存储键名
     * @returns 解析后的数据，如果解析失败或不存在则返回null
     */
    private loadFromStorage<U>(key: string): U | null {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn(`LRUCache "${this.name}": Failed to load from localStorage`, e);
            return null;
        }
    }

    /**
     * 保存数据到localStorage
     * @param key 存储键名
     * @param value 要存储的值
     */
    private saveToStorage(key: string, value: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`LRUCache "${this.name}": Failed to save to localStorage`, e);
        }
    }

    /**
     * 更新访问顺序：将指定键移动到末尾（表示最近使用）
     * @param key 要更新的键
     */
    private updateOrder(key: string): void {
        // 从当前顺序中移除该键（如果存在）
        this.order = this.order.filter((k) => k !== key);
        // 将键添加到末尾（最近使用）
        this.order.push(key);
    }

    /**
     * 如果超出最大容量，淘汰最久未使用的项
     */
    private evictIfFull(): void {
        // 检查是否超出容量限制
        if (this.order.length > this.maxSize) {
            // 移除最久未使用的键（数组第一个元素）
            const oldestKey = this.order.shift()!;
            // 从数据中删除对应的项
            delete this.data[oldestKey];
            // 更新localStorage中的数据
            this.saveToStorage(this.storageKey, this.data);
        }
    }
}
