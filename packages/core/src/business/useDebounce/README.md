# useDebounce

函数防抖工具，延迟执行直到停止调用后触发。

---

## useDebounce

创建一个防抖后的函数，在最后一次调用后延迟指定时间执行原函数。

```typescript
const useDebounce = <T extends (...args: never[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void)
```

### 参数

| 参数  | 类型                                        | 必填 | 默认值 | 说明               |
| ----- | ------------------------------------------- | ---- | ------ | ------------------ |
| func  | `T`（继承 `(...args: never[]) => unknown`） | 是   | —      | 需要防抖的原始函数 |
| delay | `number`                                    | 是   | —      | 延迟时间，单位毫秒 |

### 返回

`(...args: Parameters<T>) => void` — 防抖后的函数，调用签名与原函数一致，无返回值。每次调用会重置延迟计时器。

### throws

无
