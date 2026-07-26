# QFormDatePicker

## 用途

基于原生日期类输入框选择日期或时间值。

## 基本用法

```vue
<QFormDatePicker v-model="date" type="date" label="日期" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`，及公共 `name`、`label`、`disabled`、`readonly`、`size`、`status`、`required`、`placeholder`、`clearable`、`autofocus`、`id`、`direction`、`errorMessage` 属性（类型分别与 `FormComponentProps` 定义一致）。

| 属性                     | 类型                                                        | 必填 | 默认值         | 说明                   |
| ------------------------ | ----------------------------------------------------------- | ---- | -------------- | ---------------------- |
| `type`                   | `'date' \| 'time' \| 'datetime-local' \| 'month' \| 'week'` | 否   | `'date'`       | 原生输入框类型。       |
| `required`               | `boolean`                                                   | 否   | `true`         | 传递给原生输入框。     |
| `direction`              | `'vertical' \| 'horizontal'`                                | 否   | `'horizontal'` | 布局方向。             |
| `disabled`               | `boolean`                                                   | 否   | `false`        | 禁用输入框。           |
| `autofocus` / `readonly` | `boolean`                                                   | 否   | `false`        | 当前未绑定到原生控件。 |
| `size`                   | `FormSize`                                                  | 否   | `'middle'`     | 当前不影响渲染。       |
| `placeholder`            | `string`                                                    | 否   | `'请选择日期'` | 传递给原生输入框。     |
| `clearable`              | `boolean`                                                   | 否   | `true`         | 当前不影响渲染。       |

未列出的继承属性没有组件默认值；`name`、`label` 会传递或显示，其余当前不影响渲染。

## Emits

| 事件                | 参数     | 触发时机                        |
| ------------------- | -------- | ------------------------------- |
| `update:modelValue` | `string` | 原生输入的 `input` 事件发生时。 |
| `input`             | `string` | 同上。                          |

声明继承的 `change`、`focus`、`blur`、`clear`，但当前不会触发。

## Slots

无。

## Exposes

无。
