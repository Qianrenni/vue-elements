# useDebounce

防抖函数。

## 用法

```typescript
import { useDebounce } from 'qyani-components';

const debouncedFn = useDebounce(func, delay);
```

## 参数

| 参数    | 类型       | 默认值 | 必填 | 说明             |
| ------- | ---------- | ------ | ---- | ---------------- |
| `func`  | `Function` | —      | 是   | 需要防抖的函数   |
| `delay` | `number`   | —      | 是   | 延迟时间（毫秒） |

## 返回值

`Function` - 防抖后的函数
