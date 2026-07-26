# useThrottle

函数节流工具，在指定间隔内最多执行一次。

---

## useThrottle

创建一个节流后的函数，在指定时间间隔内最多执行一次原函数。

```typescript
const useThrottle = <T extends (...args: never[]) => unknown>(
  func: T,
  interval?: number,
): ((this: unknown, ...args: Parameters<T>) => void)
```

### 参数

| 参数     | 类型                                        | 必填 | 默认值 | 说明                               |
| -------- | ------------------------------------------- | ---- | ------ | ---------------------------------- |
| func     | `T`（继承 `(...args: never[]) => unknown`） | 是   | —      | 需要节流的原始函数                 |
| interval | `number`                                    | 否   | `16`   | 节流间隔，单位毫秒（默认约 60fps） |

### 返回

`(this: unknown, ...args: Parameters<T>) => void` — 节流后的函数，调用签名与原函数参数一致，无返回值。

### throws

无
