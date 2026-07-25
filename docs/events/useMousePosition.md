# useMousePosition

鼠标位置跟踪的 Composable。

## 用法

```typescript
import { useMousePosition } from 'qyani-components';

const { x, y } = useMousePosition();
```

## 参数

无

## 返回值

| 属性 | 类型          | 说明      |
| ---- | ------------- | --------- |
| `x`  | `Ref<number>` | 鼠标X坐标 |
| `y`  | `Ref<number>` | 鼠标Y坐标 |
