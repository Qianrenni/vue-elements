# useFormEvents

表单事件处理的 Composable。

## 用法

```typescript
import { useFormEvents } from 'qyani-components';

const { handleInput, handleChange, handleFocus, handleBlur, handleClear } =
  useFormEvents(emit);
```

## 参数

| 参数   | 类型                 | 默认值 | 必填 | 说明              |
| ------ | -------------------- | ------ | ---- | ----------------- |
| `emit` | `FormComponentEmits` | —      | 是   | defineEmits返回值 |

## 返回值

| 方法           | 参数       | 返回值 | 说明         |
| -------------- | ---------- | ------ | ------------ |
| `handleInput`  | `value: T` | —      | 处理输入事件 |
| `handleChange` | `value: T` | —      | 处理改变事件 |
| `handleFocus`  | —          | —      | 处理聚焦事件 |
| `handleBlur`   | —          | —      | 处理失焦事件 |
| `handleClear`  | `value: T` | —      | 处理清空事件 |
