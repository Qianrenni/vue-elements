# QFormSelect

## 用途

以输入框和下拉选项实现字符串单选。

## 基本用法

```vue
<QFormSelect v-model="city" :options="[{ label: '北京', value: 'beijing' }]" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                     | 类型                         | 必填 | 默认值         | 说明                                                    |
| ------------------------ | ---------------------------- | ---- | -------------- | ------------------------------------------------------- |
| `options`                | `Options[]`                  | 是   | —              | 选项；`Options` 为 `{ label: string; value: string }`。 |
| `modelValue`             | `string \| null`             | 否   | `null`         | 已选项的 `value`。                                      |
| `searchable`             | `boolean`                    | 否   | `false`        | 当前不影响渲染；输入框仍禁止修改文本。                  |
| `optionsHeight`          | `string`                     | 否   | `'auto'`       | 下拉区域的最大高度。                                    |
| `placeholder`            | `string`                     | 否   | `'请选择'`     | 输入框占位文本。                                        |
| `required`               | `boolean`                    | 否   | `true`         | 当前不绑定到原生输入框。                                |
| `direction`              | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 布局方向。                                              |
| `disabled`               | `boolean`                    | 否   | `false`        | 禁用输入框。                                            |
| `autofocus` / `readonly` | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。                                  |
| `size`                   | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。                                        |
| `clearable`              | `boolean`                    | 否   | `false`        | 当前不影响渲染。                                        |

其余继承属性没有组件默认值；`name`、`label` 会传递或显示。

## Emits

| 事件                | 参数     | 触发时机         |
| ------------------- | -------- | ---------------- |
| `update:modelValue` | `string` | 点击下拉选项时。 |

类型声明继承了 `input`、`change`、`focus`、`blur`、`clear`，但当前组件不会触发它们。

## Slots

无。

## Exposes

无。
