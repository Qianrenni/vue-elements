# useShowLoading

全局全屏加载遮罩工具，基于 Vue 3 渲染 `QLoading` 组件，单例模式。

---

## useShowLoading

### show

显示全屏加载遮罩，超时后自动隐藏。

```typescript
show(delay?: number): void
```

| 参数  | 类型     | 必填 | 默认值 | 说明                         |
| ----- | -------- | ---- | ------ | ---------------------------- |
| delay | `number` | 否   | `5000` | 自动隐藏的延迟时间，单位毫秒 |

- **返回**：`void`
- 已显示时再次调用不会重复创建。

### hide

手动关闭加载遮罩。

```typescript
hide(): void
```

- **返回**：`void`

### throws

无
