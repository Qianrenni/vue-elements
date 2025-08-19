# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `input`     | `Date \| number \| string \| null \| undefined`             | `undefined` | 否  | 输入的时间数据，支持 Date 对象、时间戳、日期字符串等 |
| `locale`    | `string`                                                    | `'zh-CN'`   | 否  | 本地化语言设置，如 'zh-CN'、'en-US'、'ja-JP' 等 |

---

# Methods 方法

| 方法名          | 参数 | 返回值 | 说明 |
|---------------|------|--------|------|
| `format`       | `format?: string` | `string` | 格式化当前时间，支持自定义格式（如 YYYY-MM-DD HH:mm:ss） |
| `formatLocale` | `format?: string`, `locales?: string` | `string` | 使用 Intl API 进行国际化格式化，支持多种预设格式和语言 |
| `customFormatLocale` | `format: string`, `locales: string` | `string` | 自定义国际化格式，支持模板变量如 {weekday:long}、{month:long} 等 |
| `add`          | `amount: number`, `unit: 'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` | `this` | 增加指定单位的时间，支持链式调用 |
| `subtract`     | `amount: number`, `unit: 'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` | `this` | 减少指定单位的时间，内部调用 add 实现 |
| `toDate`       | — | `Date` | 返回原始 Date 对象副本 |
| `valueOf`      | — | `number` | 返回时间戳（毫秒级） |
| `toString`     | — | `string` | 返回默认格式的字符串（等同于 format()） |
| `year`         | — | `number` | 获取年份（1-9999） |
| `month`        | — | `number` | 获取月份（1-12） |
| `dateNum`      | — | `number` | 获取日期（1-31） |
| `hour`         | — | `number` | 获取小时（0-23） |
| `minute`       | — | `number` | 获取分钟（0-59） |
| `second`       | — | `number` | 获取秒数（0-59） |
| `millisecond`  | — | `number` | 获取毫秒数（0-999） |
| `day`          | — | `number` | 获取星期几（0-6，0 表示星期日） |
| `toUTC`        | — | `UTCTimeUtils` | 转换为 UTC 时间工具类实例 |

---

# Static Methods 静态方法

| 方法名         | 参数 | 返回值 | 说明 |
|--------------|------|--------|------|
| `now`        | `locale?: string` | `TimeUtils` | 创建当前时间的 TimeUtils 实例 |
| `from`       | `input: Date \| number \| string`, `locale?: string` | `TimeUtils` | 从输入创建 TimeUtils 实例 |
| `utc`        | `input?: Date \| number \| string`, `locale?: string` | `UTCTimeUtils` | 创建 UTC 时间工具类实例 |

---

# Expose 方法

> ✅ 注：该模块未使用 `defineExpose`，因此无显式暴露的方法。

---

# 示例用法

```ts
// 当前时间（中文）
const cn = TimeUtils.now('zh-CN');
console.log(cn.formatLocale('PPP')); // 2025年4月5日

// 指定时间
const date = new Date('2025-04-05T14:30:25');
const utils = TimeUtils.from(date, 'en-US');
console.log(utils.formatLocale('PPP p')); // April 5, 2025, 14:30

// 加减时间
utils.add(1, 'day').subtract(30, 'minute');
console.log(utils.format()); // 2025-04-06 14:00:25

// UTC 时间处理
const utc = TimeUtils.utc('2023-01-01T00:00:00Z', 'zh-CN');
console.log(utc.formatLocale('PPP')); // 2023年1月1日
```