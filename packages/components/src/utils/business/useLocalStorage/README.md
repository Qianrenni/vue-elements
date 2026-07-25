# useLocalStorage

基于 `localStorage` 的类型安全存储类，支持过期时间和类型守卫校验。

---

## UseLocalStorage\<T\>

为 `localStorage` 提供带前缀、类型守卫、过期时间的封装。

### 职责

管理带键前缀的 `localStorage` 存储项，支持设置/获取/删除/清空/查询等操作，可选配类型守卫和过期时间。

### 构造参数

```typescript
constructor(prefix?: string, typeGuard?: TypeGuard<T>)
```

| 参数      | 类型                                                  | 必填 | 默认值      | 说明                                     |
| --------- | ----------------------------------------------------- | ---- | ----------- | ---------------------------------------- |
| prefix    | `string`                                              | 否   | `''`        | 存储键前缀，用于隔离不同业务的数据       |
| typeGuard | `TypeGuard<T>`（即 `(value: unknown) => value is T`） | 否   | `undefined` | 类型守卫函数，校验存储值是否符合预期类型 |

### 公开方法

#### setItem

设置存储项，支持可选过期时间。

```typescript
setItem(key: string, value: T, expires?: number): void
```

| 参数    | 类型     | 必填 | 默认值      | 说明                                               |
| ------- | -------- | ---- | ----------- | -------------------------------------------------- |
| key     | `string` | 是   | —           | 存储键                                             |
| value   | `T`      | 是   | —           | 存储值                                             |
| expires | `number` | 否   | `undefined` | 过期时间，单位毫秒（相对时间，内部转为绝对时间戳） |

- **返回**：`void`
- **throws**：`Error` — 当配置了 `typeGuard` 且 `value` 未通过校验时，抛出 `Error('value is not a valid type')`。

#### getItem

获取存储项，自动检查过期和类型。

```typescript
getItem(key: string): T | null
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 存储键 |

- **返回**：`T | null` — 存储值；不存在、已过期或类型校验失败时返回 `null`（已过期的项会被自动清理）。

#### removeItem

删除指定存储项。

```typescript
removeItem(key: string): void
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 存储键 |

- **返回**：`void`

#### clear

清空所有带当前前缀的存储项。

```typescript
clear(): void
```

- **返回**：`void`

#### hasItem

检查指定键是否存在且未过期。

```typescript
hasItem(key: string): boolean
```

| 参数 | 类型     | 必填 | 默认值 | 说明   |
| ---- | -------- | ---- | ------ | ------ |
| key  | `string` | 是   | —      | 存储键 |

- **返回**：`boolean` — 存在且未过期返回 `true`，否则返回 `false`。

#### getKeys

获取所有带当前前缀的键（返回去除前缀后的原始键名）。

```typescript
getKeys(): string[]
```

- **返回**：`string[]` — 键数组。

### 导出类型

#### TypeGuard\<T\>

```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

类型谓词函数，用于检查存储值是否符合预期类型。

### throws

- `setItem`：当配置了 `typeGuard` 且 `value` 未通过校验时，抛出 `Error('value is not a valid type')`。
- 其他方法：无主动 throw。
