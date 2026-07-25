# useLRUCache

基于 `localStorage` 持久化的 LRU（最近最少使用）缓存实现类。当缓存超过最大容量时，自动淘汰最久未使用的数据。

---

## UseLRUCache\<T\>

LRU 缓存类，使用 `localStorage` 进行持久化存储，通过两个键分别存储数据和访问顺序。

### 职责

管理带容量限制的键值缓存，支持读取、写入、删除、清空等操作，超出容量时自动淘汰最久未访问的条目，数据持久化到 `localStorage`。

### 构造参数

```typescript
constructor(name: string, typeGuard: TypeGuard<T>, maxSize?: number)
```

| 参数      | 类型                                                  | 必填 | 默认值 | 说明                                               |
| --------- | ----------------------------------------------------- | ---- | ------ | -------------------------------------------------- |
| name      | `string`                                              | 是   | —      | 缓存名称，用于在 `localStorage` 中区分不同缓存实例 |
| typeGuard | `TypeGuard<T>`（即 `(value: unknown) => value is T`） | 是   | —      | 类型谓词函数，校验存储值是否符合预期类型           |
| maxSize   | `number`                                              | 否   | `8`    | 缓存最大容量，最小为 1                             |

> 构造时会从 `localStorage` 加载已有数据，若已有数据未通过 `typeGuard` 校验，将自动 `clear()` 并在控制台输出错误。

### 公开方法

#### getLatestKey

获取最近使用的一条记录的键。

```typescript
getLatestKey(): string | null
```

- **返回**：`string | null` — 最近使用的键，无数据时返回 `null`。

#### getLatestValue

获取最近使用的一条记录的值。

```typescript
getLatestValue(): T | null
```

- **返回**：`T | null` — 最近使用的值，无数据时返回 `null`。

#### getRecent

获取最近使用的前 N 条记录（按访问时间倒序：最近的在前）。

```typescript
getRecent(count?: number): Array<{ key: string; value: T }>
```

| 参数  | 类型     | 必填 | 默认值         | 说明         |
| ----- | -------- | ---- | -------------- | ------------ |
| count | `number` | 否   | `this.maxSize` | 要获取的数量 |

- **返回**：`Array<{ key: string; value: T }>` — 按最近使用排序的键值对数组。

#### get

获取指定键的缓存值，同时更新该键的访问顺序为最近使用。

```typescript
get(key: string): T | null
```

| 参数 | 类型     | 必填 | 默认值 | 说明       |
| ---- | -------- | ---- | ------ | ---------- |
| key  | `string` | 是   | —      | 要获取的键 |

- **返回**：`T | null` — 对应的值，不存在时返回 `null`。

#### set

设置缓存值，同时更新访问顺序；若超出容量则自动淘汰最久未使用的条目。

```typescript
set(key: string, value: T): void
```

| 参数  | 类型     | 必填 | 默认值 | 说明       |
| ----- | -------- | ---- | ------ | ---------- |
| key   | `string` | 是   | —      | 要设置的键 |
| value | `T`      | 是   | —      | 要设置的值 |

- **返回**：`void`

#### remove

删除指定键的缓存。

```typescript
remove(key: string): void
```

| 参数 | 类型     | 必填 | 默认值 | 说明       |
| ---- | -------- | ---- | ------ | ---------- |
| key  | `string` | 是   | —      | 要删除的键 |

- **返回**：`void`

#### clear

清空整个缓存（包括 `localStorage` 中的持久化数据）。

```typescript
clear(): void
```

- **返回**：`void`

#### size

获取当前缓存中的条目数量。

```typescript
size(): number
```

- **返回**：`number` — 缓存条目数。

#### capacity

获取缓存的最大容量。

```typescript
capacity(): number
```

- **返回**：`number` — 最大容量。

#### getName

获取缓存名称。

```typescript
getName(): string
```

- **返回**：`string` — 缓存名称。

#### keys

获取当前所有键（按访问顺序：从最久到最近）。

```typescript
keys(): string[]
```

- **返回**：`string[]` — 键的数组（副本）。

#### has

检查是否包含指定键。

```typescript
has(key: string): boolean
```

| 参数 | 类型     | 必填 | 默认值 | 说明       |
| ---- | -------- | ---- | ------ | ---------- |
| key  | `string` | 是   | —      | 要检查的键 |

- **返回**：`boolean` — 存在返回 `true`，否则返回 `false`。

### throws

无
