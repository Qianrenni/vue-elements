# useClip

字符串截断工具函数。

## 用法

```typescript
import { clipString } from 'qyani-components';

const result = clipString(text, length, isElipse);
```

## 参数

| 参数       | 类型      | 默认值 | 必填 | 说明           |
| ---------- | --------- | ------ | ---- | -------------- |
| `text`     | `string`  | —      | 是   | 原始文本       |
| `length`   | `number`  | —      | 是   | 截取长度       |
| `isElipse` | `boolean` | `true` | 否   | 是否添加省略号 |

## 返回值

`string` - 截断后的字符串
