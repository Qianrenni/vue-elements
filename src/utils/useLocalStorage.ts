interface StorageItem<T> {
  value: T;
  expires?: number; // 过期时间戳（毫秒）
}
export type TypeGuard<T> = (value: any) => value is T;
export class UseLocalStorage<T> {
  private readonly prefix: string;
  private readonly typeGuard: TypeGuard<T>|undefined;

  /*
   * @param prefix 存储键前缀
   * @param typeGuard 类型守卫函数，用于检查存储值是否符合预期类型
   */
  constructor(prefix: string = '',typeGuard?:TypeGuard<T>){
    this.prefix = prefix;
    this.typeGuard = typeGuard;
  }

  /**
   * 设置存储项（支持过期时间）
   * @param key 存储键
   * @param value 存储值
   * @param expires 过期时间（毫秒），可选
   */
  setItem(key: string, value: T, expires?: number): void {
    try {
      if(this.typeGuard&&!this.typeGuard(value)){
        throw new Error('value is not a valid type');
      }
      const storageKey = this.getStorageKey(key);
      const item: StorageItem<T> = {
        value,
        expires: expires ? Date.now() + expires : undefined
      };

      localStorage.setItem(storageKey, JSON.stringify(item));
    } catch (error) {
      console.error('LocalStorage setItem error:', error);
      throw error;
    }
  }

  /**
   * 获取存储项
   * @param key 存储键
   * @returns 存储值，如果不存在或已过期则返回 null
   */
  getItem(key: string): T | null {
    try {
      const storageKey = this.getStorageKey(key);
      const itemStr = localStorage.getItem(storageKey);
      
      if (itemStr === null) {
        return null;
      }

      const item: StorageItem<T> = JSON.parse(itemStr);
      // 基本结构校验（防御性编程）
      if (typeof item !== 'object' || item === null || !('value' in item)) {
        this.removeItem(key);
        return null;
      }
      // 检查是否过期
      if (item.expires && Date.now() > item.expires) {
        this.removeItem(key);
        return null;
      }
      // 类型守卫校验
      if (this.typeGuard && !this.typeGuard(item.value)) {
        console.warn(`Type guard failed for key: ${key}`);
        this.removeItem(key); // 可选：自动清理无效数据
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('LocalStorage getItem error:', error);
      // 可选：清理损坏数据
      this.removeItem(key);
      return null;
    }
  }

  /**
   * 删除存储项
   * @param key 存储键
   */
  removeItem(key: string): void {
    try {
      const storageKey = this.getStorageKey(key);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('LocalStorage removeItem error:', error);
    }
  }

  /**
   * 清空所有存储项（带前缀的）
   */
  clear(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('LocalStorage clear error:', error);
    }
  }

  /**
   * 检查是否存在指定键
   * @param key 存储键
   * @returns 是否存在且未过期
   */
  hasItem(key: string): boolean {
    // 复用 getItem 逻辑更安全（包含类型和过期检查）
    return this.getItem(key) !== null;
  }

  /**
   * 获取所有键（带前缀的）
   * @returns 键数组
   */
  getKeys(): string[] {
    try {
      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          // 移除前缀后返回原始键名
          keys.push(key.slice(this.prefix.length));
        }
      }
      
      return keys;
    } catch (error) {
      console.error('LocalStorage getKeys error:', error);
      return [];
    }
  }

  /**
   * 获取带前缀的实际存储键
   * @param key 原始键
   * @returns 带前缀的存储键
   */
  private getStorageKey(key: string): string {
    return `${this.prefix}${key}`;
  }
};