# useDrag

拖动元素的 Composable。

## 用法

```typescript
import { useDrag } from 'qyani-components';

const { destroy, isMove } = useDrag(elementRef, onMove, interval, threshold);
```

## 参数

| 参数         | 类型          | 默认值 | 必填 | 说明             |
| ------------ | ------------- | ------ | ---- | ---------------- |
| `elementRef` | `HTMLElement` | —      | 是   | 目标元素引用     |
| `onMove`     | `() => void`  | —      | 否   | 移动回调函数     |
| `interval`   | `number`      | `16`   | 否   | 节流间隔（毫秒） |
| `threshold`  | `number`      | `10`   | 否   | 移动阈值（像素） |

## 返回值

| 属性      | 类型            | 说明           |
| --------- | --------------- | -------------- |
| `destroy` | `() => void`    | 清理事件监听   |
| `isMove`  | `() => boolean` | 是否发生了移动 |
