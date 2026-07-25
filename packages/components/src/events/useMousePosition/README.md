# useMousePosition

鼠标位置跟踪 Vue 3 组合式函数，实时返回鼠标坐标。采用单例模式，多个组件共用同一份状态和事件监听。

---

## useMousePosition

监听鼠标移动事件，返回实时的页面坐标。需在 Vue 组件的 `setup` 中调用（内部使用 `onMounted` / `onUnmounted`）。

```typescript
const useMousePosition = (): { x: Ref<number>; y: Ref<number> }
```

### 参数

无

### 返回

`{ x, y }`

| 属性 | 类型          | 说明                                 |
| ---- | ------------- | ------------------------------------ |
| x    | `Ref<number>` | 鼠标的页面 X 坐标（`pageX`），响应式 |
| y    | `Ref<number>` | 鼠标的页面 Y 坐标（`pageY`），响应式 |

### 行为说明

- 首个组件挂载时绑定 `window.mousemove` 监听；最后一个组件卸载时解绑。
- 多次调用返回相同的响应式引用（单例共享）。
- 初始值为 `(0, 0)`，鼠标移动后实时更新。

### throws

无
