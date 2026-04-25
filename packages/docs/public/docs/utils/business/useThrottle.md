# useThrottle

节流函数。

## 用法

```typescript
import { useThrottle } from 'qyani-components';

const throttledFn = useThrottle(func, interval);
```

## 参数

| 参数       | 类型       | 默认值 | 必填 | 说明             |
| ---------- | ---------- | ------ | ---- | ---------------- |
| `func`     | `Function` | —      | 是   | 需要节流的函数   |
| `interval` | `number`   | `16`   | 否   | 节流间隔（毫秒） |

## 返回值

`Function` - 节流后的函数
