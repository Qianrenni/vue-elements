# QFormRangeSlider

## 用途

使用原生范围输入框选择数值，并显示格式化后的当前值。

## 基本用法

```vue
<QFormRangeSlider v-model="volume" :min="0" :max="100" />
```

## Props

继承 `FormComponentProps<number>`：`modelValue?: number | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                    | 类型                         | 必填 | 默认值                 | 说明                                 |
| ----------------------- | ---------------------------- | ---- | ---------------------- | ------------------------------------ |
| `min`                   | `number`                     | 否   | `0`                    | 允许的最小值。                       |
| `max`                   | `number`                     | 否   | `100`                  | 允许的最大值。                       |
| `step`                  | `number`                     | 否   | `1`                    | 步进值。                             |
| `valueText`             | `string`                     | 否   | 无                     | 覆盖滑块的 ARIA 文本；不改变显示值。 |
| `formatter`             | `(value: number) => string`  | 否   | `(val) => String(val)` | 格式化输出区域显示的数值。           |
| `required`              | `boolean`                    | 否   | `true`                 | 传递给原生输入框。                   |
| `direction`             | `'vertical' \| 'horizontal'` | 否   | `'horizontal'`         | 布局方向。                           |
| `disabled` / `readonly` | `boolean`                    | 否   | `false`                | 分别传递给原生输入框。               |
| `size`                  | `FormSize`                   | 否   | `'middle'`             | 影响输出文字尺寸。                   |
| `clearable`             | `boolean`                    | 否   | `false`                | 当前不影响渲染。                     |

未列出的继承属性没有组件默认值；`name`、`label`、`id` 会用于原生属性或辅助功能关联，其余当前不影响渲染。

## Emits

| 事件                | 参数     | 触发时机                   |
| ------------------- | -------- | -------------------------- |
| `update:modelValue` | `number` | 滑块发生原生 `input` 时。  |
| `input`             | `number` | 同上。                     |
| `change`            | `number` | 滑块发生原生 `change` 时。 |
| `focus`             | 无       | 滑块获得焦点时。           |
| `blur`              | 无       | 滑块失去焦点时。           |

声明继承的 `clear`，但当前不会触发。

## Slots

无。

## Exposes

无。
