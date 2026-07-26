# useTimeUtils

时间操作工具类，继承 `Date`，提供格式化和增减时间的能力。

---

## handleDateFormat

解析格式化字符串，提取关键词的重复次数，生成模板和位宽映射。

```typescript
function handleDateFormat(
  format: string,
  keyWords: string,
): { temp: string; p: Map<string, number> };
```

### 参数

| 参数     | 类型     | 必填 | 默认值 | 说明                   |
| -------- | -------- | ---- | ------ | ---------------------- |
| format   | `string` | 是   | —      | 格式化字符串           |
| keyWords | `string` | 是   | —      | 需要统计的关键字符集合 |

### 返回

`{ temp: string; p: Map<string, number> }` — `temp` 为去重后的模板字符串，`p` 为每个关键字符的出现次数映射。

### throws

无

---

## UseTimeUtils

继承 `Date` 的时间工具类，提供格式化和增减时间的方法。

### 职责

扩展原生 `Date`，支持链式调用的格式化输出与时间增减操作。

### 构造参数

与 `Date` 构造函数一致，支持传入时间戳、日期字符串、年月日等参数。不传参则默认当前时间。

### 公开方法

#### format

将日期格式化为指定格式的字符串。

```typescript
format(format?: string, padChar?: string): string
```

| 参数    | 类型     | 必填 | 默认值                  | 说明                     |
| ------- | -------- | ---- | ----------------------- | ------------------------ |
| format  | `string` | 否   | `'YYYY-MM-DD HH:mm:ss'` | 格式字符串，占位符见下表 |
| padChar | `string` | 否   | `'0'`                   | 用于补位的字符           |

| 占位符 | 含义                    |
| ------ | ----------------------- |
| `Y`    | 年份（如 2023）         |
| `M`    | 月份（01-12）           |
| `D`    | 日期（1-31）            |
| `H`    | 小时，24 小时制（0-23） |
| `h`    | 小时，12 小时制（1-12） |
| `m`    | 分钟（0-59）            |
| `s`    | 秒（0-59）              |
| `S`    | 毫秒（0-999）           |
| `d`    | 星期几（0-6）           |

- **返回**：`string` — 格式化后的日期字符串。

#### add

增加时间，支持链式调用。

```typescript
add(amount: number, unit: TimeUnit): this
```

| 参数   | 类型                                                                            | 必填 | 默认值 | 说明       |
| ------ | ------------------------------------------------------------------------------- | ---- | ------ | ---------- |
| amount | `number`                                                                        | 是   | —      | 增加的数量 |
| unit   | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second' \| 'millisecond'` | 是   | —      | 时间单位   |

- **返回**：`this` — 当前实例，支持链式调用。

#### subtract

减少时间，等价于 `add(-amount, unit)`，支持链式调用。

```typescript
subtract(amount: number, unit: TimeUnit): this
```

| 参数   | 类型                                                                            | 必填 | 默认值 | 说明       |
| ------ | ------------------------------------------------------------------------------- | ---- | ------ | ---------- |
| amount | `number`                                                                        | 是   | —      | 减少的数量 |
| unit   | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second' \| 'millisecond'` | 是   | —      | 时间单位   |

- **返回**：`this` — 当前实例，支持链式调用。

#### equals

判断是否与另一个 `UseTimeUtils` 实例表示同一时刻。

```typescript
equals(date: UseTimeUtils): boolean
```

| 参数 | 类型           | 必填 | 默认值 | 说明         |
| ---- | -------------- | ---- | ------ | ------------ |
| date | `UseTimeUtils` | 是   | —      | 要比较的实例 |

- **返回**：`boolean` — 时间戳相等返回 `true`。

### throws

无
