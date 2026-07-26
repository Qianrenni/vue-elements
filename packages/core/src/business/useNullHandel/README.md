# useNullHandel

空值安全调用工具，在值非空时执行回调函数，避免繁琐的空值判断。

---

## letIfNotNull

当值不为 `null` 或 `undefined` 时，将其传入回调函数执行并返回结果；否则返回 `undefined`。

```typescript
function letIfNotNull<T, R>(
  value: T | null | undefined,
  fn: (_: T) => R,
): R | undefined;
```

### 参数

| 参数  | 类型                     | 必填 | 默认值 | 说明                                                          |
| ----- | ------------------------ | ---- | ------ | ------------------------------------------------------------- |
| value | `T \| null \| undefined` | 是   | —      | 待检查的值，可能为 `null` 或 `undefined`                      |
| fn    | `(_: T) => R`            | 是   | —      | 值非空时执行的回调函数，参数为去除 `null \| undefined` 后的值 |

### 返回

`R | undefined` — 值非空时返回 `fn(value)` 的结果，值为 `null` 或 `undefined` 时返回 `undefined`。

### throws

无
