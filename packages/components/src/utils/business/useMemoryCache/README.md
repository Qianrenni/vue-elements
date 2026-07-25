# useMemoryCache

基于内存的 TTL 缓存实现类，支持滑动过期和定时清理。

---

## UseMemoryCache

内存缓存类，提供缓存的设置、获取、删除、清空等功能，支持滑动过期窗口（每次 `get` 会重置 TTL）。

### 职责

在内存中管理带过期时间的键值缓存，定期自动清理过期条目。

### 构造参数

```typescript
constructor(ttlMs?: number)
```

| 参数  | 类型     | 必填 | 默认值             | 说明                           |
| ----- | -------- | ---- | ------------------ | ------------------------------ |
| ttlMs | `number` | 否   | `300000`（5 分钟） | 缓存项的默认存活时间，单位毫秒 |

> 构造时会启动每分钟执行一次的定时清理器。

### 公开方法

#### set

设置缓存项，使用构造时指定的默认 TTL。

```typescript
set<T>(key: string, value: T): void
```

| 参数  | 类型     | 必填 | 默认值 | 说明   |
| ----- | -------- | ---- | ------ | ------ |
| key   | `string` | 是   | —      | 缓存键 |
| value | `T`      | 是   | —      | 缓存值 |

- **返回**：`void`

#### get

获取缓存值。若未过期，重置其过期时间（滑动窗口）；若已过期，自动删除并返回 `null`。

```typescript
get<T>(key: string): T | null
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 缓存键 |

- **返回**：`T | null` — 缓存值；不存在或已过期返回 `null`。

#### has

检查缓存是否存在且未过期。

```typescript
has(key: string): boolean
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 缓存键 |

- **返回**：`boolean` — 存在且未过期返回 `true`，否则返回 `false`。

#### delete

删除指定缓存项。

```typescript
delete(key: string): void
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 缓存键 |

- **返回**：`void`

#### clear

清空所有缓存项。

```typescript
clear(): void
```

- **返回**：`void`

#### size

获取当前缓存条目数量。

```typescript
size(): number
```

- **返回**：`number` — 缓存条目数。

### 导出常量

#### shareMemoryCache

```typescript
const shareMemoryCache: UseMemoryCache;
```

预创建的共享 `UseMemoryCache` 实例（使用默认 TTL 5 分钟），可直接使用。

### throws

无
