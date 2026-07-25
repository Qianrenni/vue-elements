# QFormRadioGroup

## 用途

按选项列表渲染单选框组，并以字符串维护选中值。

## 基本用法

```vue
<QFormRadioGroup v-model="value" :options="[{ label: '是', value: 'yes' }]" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                     | 类型                         | 必填 | 默认值         | 说明                                                    |
| ------------------------ | ---------------------------- | ---- | -------------- | ------------------------------------------------------- |
| `options`                | `Options[]`                  | 是   | —              | 选项；`Options` 为 `{ label: string; value: string }`。 |
| `required`               | `boolean`                    | 否   | `true`         | 标记标签并传递给每个原生单选框。                        |
| `direction`              | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 布局方向。                                              |
| `disabled`               | `boolean`                    | 否   | `false`        | 禁用所有选项。                                          |
| `autofocus` / `readonly` | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。                                  |
| `size`                   | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。                                        |
| `placeholder`            | `string`                     | 否   | `''`           | 当前不影响渲染。                                        |
| `clearable`              | `boolean`                    | 否   | `true`         | 当前不影响渲染。                                        |

其余继承属性没有组件默认值；`modelValue`、`name`、`label` 用于选中状态、原生名称和显示。

## Emits

| 事件                | 参数     | 触发时机                         |
| ------------------- | -------- | -------------------------------- |
| `update:modelValue` | `string` | 所选原生单选框发生 `change` 时。 |
| `input`             | `string` | 同上。                           |

声明继承的 `change`、`focus`、`blur`、`clear`，但当前不会触发。

## Slots

无。

## Exposes

无。
