# useWindowResize

窗口尺寸变化监听工具，统一管理 `resize` 事件处理器的注册与移除，自动绑定/解绑事件监听器。

---

## useWindowResize

### addHandler

添加一个窗口尺寸变化处理器。首次添加时自动绑定 `window` 的 `resize` 事件监听器，并立即触发一次。

```typescript
addHandler(handler: (width: number, height: number) => void): void
```

| 参数    | 类型                                      | 必填 | 默认值 | 说明                             |
| ------- | ----------------------------------------- | ---- | ------ | -------------------------------- |
| handler | `(width: number, height: number) => void` | 是   | —      | 处理函数，接收当前窗口宽度和高度 |

- **返回**：`void`

### removeHandler

移除一个已注册的处理器。当最后一个处理器被移除时，自动解绑 `resize` 事件监听器。

```typescript
removeHandler(handler: (width: number, height: number) => void): void
```

| 参数    | 类型                                      | 必填 | 默认值 | 说明                                 |
| ------- | ----------------------------------------- | ---- | ------ | ------------------------------------ |
| handler | `(width: number, height: number) => void` | 是   | —      | 要移除的处理函数（必须是原函数引用） |

- **返回**：`void`

### getHandlerCount

获取当前已注册的处理器数量，便于调试。

```typescript
getHandlerCount(): number
```

- **返回**：`number` — 处理器数量。

### triggerResize

手动触发一次 resize 事件处理（所有已注册的处理器将被调用一次）。

```typescript
triggerResize(): void
```

- **返回**：`void`

### throws

无
