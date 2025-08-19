# TimeUtils API 文档

## 构造函数

```ts
new TimeUtils(input?: Date | number | string | null, locale: string = 'zh-CN')
```

| 参数    | 类型                             | 默认值   | 必填 | 说明                           |
|---------|----------------------------------|----------|------|--------------------------------|
| input   | `Date | number | string | null` | `null` | 初始化时间，支持多种格式       |
| locale  | `string`                         | `zh-CN`| 否    | 本地化语言设置（如 'en-US'）   |

> ⚠️ 如果输入无效日期格式或时间戳，将抛出错误 `Error('Invalid date string or timestamp')`

---

## 实例方法

### `format(format: string = 'YYYY-MM-DD HH:mm:ss'): string`

| 参数   | 类型   | 默认值           | 必填 | 说明                   |
|--------|--------|------------------|------|------------------------|
| format | string | `YYYY-MM-DD HH:mm:ss` | 否    | 自定义日期格式字符串       |

将当前日期格式化为指定格式的字符串，支持以下占位符：

- `YYYY`: 四位年份
- `MM`: 两位月份（补零）
- `DD`: 两位日期（补零）
- `HH`: 两位小时（24小时制）
- `mm`: 两位分钟
- `ss`: 两位秒数
- `SSS`: 三位毫秒
- `ddd`: 0-6 星期几（0为星期日）

---

### `formatLocale(format: string = 'PPP p', locales?: string): string`

| 参数    | 类型   | 默认值     | 必填 | 说明                           |
|---------|--------|------------|------|--------------------------------|
| format  | string | `PPP p`    | 否    | 内置格式模板（如 'PPP p'）     |
| locales | string | `this.locale` | 否    | 本地化语言（如 'en-US'）       |

支持的内置格式：

- `'PPPP'`: "2025年4月5日 星期五" 或 "Friday, April 5, 2025"
- `'PPP'`: "2025年4月5日" 或 "April 5, 2025"
- `'PP'`: "Apr 5, 2025"
- `'pp'`: "14:30:25"
- `'PPP p'`: "April 5, 2025, 14:30"

---

### `customFormatLocale(format: string, locales: string): string`

| 参数    | 类型   | 默认值 | 必填 | 说明                       |
|---------|--------|--------|------|----------------------------|
| format  | string | —      | 是    | 自定义国际化格式字符串       |
| locales | string | —      | 是    | 指定本地化语言（如 'en-US'） |

支持自定义格式，例如：

```ts
'{YYYY}年{MM}月{DD}日 {weekday:long}'
// 输出：2025年04月05日 星期六
```

支持的占位符：

- `{YYYY}`: 四位年份
- `{MM}`: 两位月份（补零）
- `{DD}`: 两位日期（补零）
- `{HH}`: 两位小时（24小时制）
- `{mm}`: 两位分钟
- `{ss}`: 两位秒数
- `{weekday:long}`: 完整星期名称（如 "Saturday"）
- `{weekday:short}`: 简写星期名称（如 "Sat"）
- `{month:long}`: 完整月份名称（如 "April"）
- `{month:short}`: 简写月份名称（如 "Apr"）

---

### `year(): number`

获取年份（本地时间）

---

### `month(): number`

获取月份（1-12，本地时间）

---

### `dateNum(): number`

获取日期（1-31，本地时间）

---

### `hour(): number`

获取小时（0-23，本地时间）

---

### `minute(): number`

获取分钟（0-59，本地时间）

---

### `second(): number`

获取秒数（0-59，本地时间）

---

### `millisecond(): number`

获取毫秒数（0-999，本地时间）

---

### `day(): number`

获取星期几（0-6，0表示星期日，本地时间）

---

### `toUTC(): UTCTimeUtils`

返回一个基于 UTC 时间的 `UTCTimeUtils` 实例。

---

### `add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this`

| 参数   | 类型   | 默认值 | 必填 | 说明                     |
|--------|--------|--------|------|--------------------------|
| amount | number | —      | 是    | 要增加的时间数量           |
| unit   | string | —      | 是    | 时间单位（年/月/日/时/分/秒） |

链式调用支持，可连续操作。

---

### `subtract(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this`

| 参数   | 类型   | 默认值 | 必填 | 说明                     |
|--------|--------|--------|------|--------------------------|
| amount | number | —      | 是    | 要减少的时间数量           |
| unit   | string | —      | 是    | 时间单位（年/月/日/时/分/秒） |

基于 `add(-amount, unit)` 实现。

---

### `toDate(): Date`

返回当前日期的 `Date` 对象副本。

---

### `valueOf(): number`

返回当前时间的时间戳（毫秒）。

---

### `toString(): string`

返回默认格式化字符串（`YYYY-MM-DD HH:mm:ss`）。

---

## 静态方法

### `static now(locale?: string): TimeUtils`

| 参数   | 类型   | 默认值 | 必填 | 说明               |
|--------|--------|--------|------|--------------------|
| locale | string | —      | 否    | 本地化语言设置       |

返回当前时间的 `TimeUtils` 实例。

---

### `static from(input: Date | number | string, locale?: string): TimeUtils`

| 参数   | 类型                 | 默认值 | 必填 | 说明                   |
|--------|----------------------|--------|------|------------------------|
| input  | `Date | number | string` | —      | 支持多种格式的时间输入   |
| locale | string               | —      | 否    | 本地化语言设置           |

返回指定时间的 `TimeUtils` 实例。

---

### `static utc(input?: Date | number | string, locale?: string): UTCTimeUtils`

| 参数   | 类型                             | 默认值   | 必填 | 说明                       |
|--------|----------------------------------|----------|------|----------------------------|
| input  | `Date | number | string | null` | `null` | 支持多种格式的时间输入     |
| locale | string                           | —        | 否    | 本地化语言设置（如 'en-US'） |

返回基于 UTC 时间的 `UTCTimeUtils` 实例。

---

## UTCTimeUtils 类

### 构造函数

```ts
new UTCTimeUtils(input?: Date | number | string | null, locale: string = 'en-US')
```

| 参数    | 类型                             | 默认值   | 必填 | 说明                           |
|---------|----------------------------------|----------|------|--------------------------------|
| input   | `Date | number | string | null` | `null` | 初始化时间，支持多种格式       |
| locale  | `string`                         | `en-US`| 否    | 本地化语言设置（如 'zh-CN'）   |

> ⚠️ 如果输入无效日期格式或时间戳，将抛出错误 `Error('Invalid date')`

---

### `format(format: string = 'YYYY-MM-DD HH:mm:ss'): string`

与 `TimeUtils.format` 类似，但输出基于 UTC 时间。

---

### `formatLocale(format: string = 'PPP p', locales?: string): string`

与 `TimeUtils.formatLocale` 类似，但输出基于 UTC 时间。

---

### `customFormatLocale(format: string, locales: string): string`

与 `TimeUtils.customFormatLocale` 类似，但输出基于 UTC 时间。

---

### `year(): number`、`month(): number`、`dateNum(): number` 等

与 `TimeUtils` 中对应方法类似，但返回的是 UTC 时间值。

---

### `toDate(): Date`、`valueOf(): number`、`toString(): string`

与 `TimeUtils` 中对应方法类似。