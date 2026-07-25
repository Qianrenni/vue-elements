# useScreenSize

屏幕尺寸响应式查询工具，基于 `useWindowResize` 提供响应式的宽度/高度判断。采用缓存策略，相同阈值参数只创建一个响应式引用。

---

## useScreenSize

### getWidth

获取一个响应式引用，表示当前窗口宽度是否 ≤ 指定值。

```typescript
getWidth(width: number): Ref<boolean>
```

| 参数  | 类型     | 必填 | 默认值 | 说明               |
| ----- | -------- | ---- | ------ | ------------------ |
| width | `number` | 是   | —      | 宽度阈值，单位像素 |

- **返回**：`Ref<boolean>` — 响应式布尔值，`window.innerWidth <= width` 时为 `true`。

### getHeight

获取一个响应式引用，表示当前窗口高度是否 ≤ 指定值。

```typescript
getHeight(height: number): Ref<boolean>
```

| 参数   | 类型     | 必填 | 默认值 | 说明               |
| ------ | -------- | ---- | ------ | ------------------ |
| height | `number` | 是   | —      | 高度阈值，单位像素 |

- **返回**：`Ref<boolean>` — 响应式布尔值，`window.innerHeight <= height` 时为 `true`。

### throws

无
