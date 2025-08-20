# Expose 方法

该类为通用 LRU 缓存实现，未使用 Vue Composition API 中的 `defineExpose`，因此无对外暴露的特定方法。

# Props 参数

该类为 TypeScript 实现的通用数据结构，不涉及 Vue 组件 props 参数。

# Events 事件

该类为纯逻辑实现，不涉及事件触发机制，因此无相关事件。

# Slots 插槽

该类为 TypeScript 类实现，不涉及 Vue 插槽机制，因此无相关插槽。

# Methods 方法

| 方法名         | 参数                        | 返回值类型             | 说明                                                         |
|--------------|---------------------------|---------------------|------------------------------------------------------------|
| `get`        | `key: string`             | `T \| null`         | 获取缓存值，若存在则更新访问顺序                                       |
| `set`        | `key: string, value: T`   | `void`              | 设置缓存值，并更新访问顺序或执行淘汰策略                                   |
| `remove`     | `key: string`             | `void`              | 删除指定键的缓存                                                     |
| `clear`      | —                         | `void`              | 清空整个缓存                                                         |
| `getLatestKey` | —                       | `string \| null`    | 获取最近使用的一条记录的 key                                           |
| `getLatestValue` | —                     | `T \| null`         | 获取最近使用的一条记录的 value                                          |
| `getRecent`  | `count: number`           | `Array<{ key: string; value: T }>` | 获取最近使用的前 N 条记录（最新的在前）                                    |
| `size`       | —                         | `number`            | 获取当前缓存中的项数                                                  |
| `capacity`   | —                         | `number`            | 获取缓存的最大容量                                                  |
| `getName`    | —                         | `string`            | 获取缓存名称                                                       |
| `keys`       | —                         | `string[]`          | 获取当前所有键（按访问顺序：从最久到最近）                                    |
| `has`        | `key: string`             | `boolean`           | 检查是否包含某个键                                                   |

# Usage 示例

```ts
const cache = new UseLRUCache<number>('myCache', 3);

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);

console.log(cache.get('a')); // 输出 1，并更新 a 的访问顺序

cache.set('d', 4); // 此时超过容量，最久未使用的 b 将被移除

console.log(cache.keys()); // ['c', 'a', 'd']
```