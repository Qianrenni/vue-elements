# QFormCheckboxGroup

## 用途

按选项列表渲染多选框组，并以字符串数组维护选中值。

## 基本用法

```vue
<QFormCheckboxGroup v-model="values" :options="[{ label: 'A', value: 'a' }]" />
```

## Props

继承 `FormComponentProps<string[]>`：`modelValue?: string[] | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: 'small' | 'middle' | 'large'`、`status?: 'default' | 'success' | 'warning' | 'error'`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性          | 类型                         | 必填 | 默认值         | 说明                                                    |
| ------------- | ---------------------------- | ---- | -------------- | ------------------------------------------------------- |
| `options`     | `Options[]`                  | 是   | —              | 选项；`Options` 为 `{ label: string; value: string }`。 |
| `modelValue`  | `string[] \| null`           | 否   | 无             | 当前选中值。                                            |
| `required`    | `boolean`                    | 否   | `true`         | 标记标签为必填。                                        |
| `direction`   | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 选项组排列方向。                                        |
| `disabled`    | `boolean`                    | 否   | `false`        | 禁用全部选项。                                          |
| `autofocus`   | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。                                  |
| `readonly`    | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。                                  |
| `size`        | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。                                        |
| `placeholder` | `string`                     | 否   | `''`           | 当前不影响渲染。                                        |
| `clearable`   | `boolean`                    | 否   | `true`         | 当前不影响渲染。                                        |

未列出的继承属性没有组件默认值，且当前不影响渲染。

## Emits

| 事件                | 参数       | 触发时机                                          |
| ------------------- | ---------- | ------------------------------------------------- |
| `update:modelValue` | `string[]` | 勾选状态变化时。                                  |
| `input`             | `string[]` | 勾选状态变化时，与 `update:modelValue` 同时触发。 |

`FormComponentEmits<string[]>` 声明的 `change`、`focus`、`blur`、`clear` 在当前组件中不会触发。

## Slots

无。

## Exposes

无。
