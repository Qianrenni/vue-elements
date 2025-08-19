# Props 参数

| 参数         | 类型          | 默认值  | 必填 | 说明                  |
|------------|-------------|------|----|---------------------|
| `name`     | `string`    | —    | 是  | 缓存名称，用于在 localStorage 中区分不同的缓存实例 |
| `maxSize`  | `number`    | `8`  | 否  | 缓存的最大容量，默认为 8 |

---

# Methods 方法

| 方法名         | 参数                | 返回值      | 说明                     |
|--------------|-------------------|-----------|--------------------------|
| `get`        | `key: string`     | `T \| null` | 获取指定键的缓存值，若不存在则返回 `null` |
| `set`        | `key: string, value: T` | `void`      | 设置指定键的缓存值，并更新访问顺序 |
| `remove`     | `key: string`     | `void`      | 删除指定键的缓存项               |
| `clear`      | —                 | `void`      | 清空整个缓存                   |
| `size`       | —                 | `number`    | 获取当前缓存中的项数             |
| `capacity`   | —                 | `number`    | 获取缓存的最大容量              |
| `getName`    | —                 | `string`    | 获取缓存名称                   |
| `keys`       | —                 | `string[]`  | 获取所有键（按访问顺序：从最久到最近） |
| `has`        | `key: string`     | `boolean`   | 检查是否包含指定键               |
| `getLatestKey` | —               | `string \| null` | 获取最近使用的一条记录的 key |
| `getLatestValue` | —             | `T \| null` | 获取最近使用的一条记录的 value |
| `getRecent`  | `count?: number`  | `Array<{ key: string; value: T }>` | 获取最近使用的前 N 条记录（最新的在前） |

---

# Expose 方法

> 💡 提示：该类未使用 `defineExpose`，因此无暴露方法。所有公共方法均可通过实例直接调用。

---

# 示例用法

```ts
const cache = new UseLRUCache<string>('userPreferences', 5);

cache.set('theme', 'dark');
cache.set('language', 'zh-CN');

console.log(cache.get('theme')); // 'dark'

console.log(cache.getRecent(2)); // [{ key: 'language', value: 'zh-CN' }, { key: 'theme', value: 'dark' }]
```