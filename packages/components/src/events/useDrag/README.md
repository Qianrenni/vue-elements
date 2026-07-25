# useDrag

元素拖拽工具，基于 Pointer Events 实现，内置节流和移动阈值检测，适用于可拖拽浮动元素。

---

## useDrag

为指定 DOM 元素绑定拖拽行为，通过修改 `bottom` / `right` 样式属性实现位移。

```typescript
const useDrag = (
  elementRef: HTMLElement,
  onMove?: () => void,
  interval?: number,
  threshold?: number,
): {
  destroy: () => void;
  isMove: () => boolean;
}
```

### 参数

| 参数       | 类型          | 必填 | 默认值      | 说明                                                             |
| ---------- | ------------- | ---- | ----------- | ---------------------------------------------------------------- |
| elementRef | `HTMLElement` | 是   | —           | 目标拖拽元素（需有 `position` 定位且使用 `bottom`/`right` 布局） |
| onMove     | `() => void`  | 否   | `undefined` | 拖拽移动时的回调函数                                             |
| interval   | `number`      | 否   | `16`        | 节流间隔，单位毫秒，最小值 16                                    |
| threshold  | `number`      | 否   | `10`        | 移动阈值，单位像素；拖拽距离小于此值视为未移动                   |

### 返回

`{ destroy, isMove }`

| 属性    | 类型            | 说明                                               |
| ------- | --------------- | -------------------------------------------------- |
| destroy | `() => void`    | 销毁拖拽行为，移除所有事件监听并清理状态           |
| isMove  | `() => boolean` | 获取当前是否产生了有效拖拽移动（距离 ≥ threshold） |

### 行为说明

- 仅响应主按键（左键）的 `pointerdown`，触控设备不受限制。
- 拖拽过程中禁用页面文本选择（`userSelect: 'none'`），结束后恢复。
- 若拖拽距离未达到 `threshold`，松手时会在原始点击目标上派发 `click` 事件，保证按钮等子元素可正常点击。
- 使用 `setPointerCapture` 确保拖拽不会因指针离开元素而中断。

### throws

无
