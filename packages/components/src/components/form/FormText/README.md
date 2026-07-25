# QFormText

## 用途

输入单行文本，支持输入类型、前缀图标与失焦校验提示。

## 基本用法

```vue
<QFormText
  v-model="email"
  type="email"
  :validate="isValidEmail"
  hint="邮箱格式不正确"
/>
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                     | 类型                                                            | 必填 | 默认值         | 说明                                                  |
| ------------------------ | --------------------------------------------------------------- | ---- | -------------- | ----------------------------------------------------- |
| `type`                   | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | 否   | `'text'`       | 原生输入框类型。                                      |
| `pattern`                | `string \| undefined`                                           | 否   | `undefined`    | 传递给原生输入框的校验正则。                          |
| `editable`               | `boolean`                                                       | 否   | `true`         | 当前不影响渲染。                                      |
| `prefixIcon`             | `string`                                                        | 否   | 无             | 要显示的前缀图标名称。                                |
| `validate`               | `(value: string) => boolean`                                    | 否   | 无             | 失焦时使用的校验函数。                                |
| `hint`                   | `string`                                                        | 否   | 无             | 校验失败时显示的提示文本。                            |
| `required`               | `boolean`                                                       | 否   | `false`        | 传递给原生输入框；同时决定失焦时是否执行 `validate`。 |
| `direction`              | `'vertical' \| 'horizontal'`                                    | 否   | `'horizontal'` | 布局方向。                                            |
| `disabled`               | `boolean`                                                       | 否   | `false`        | 禁用输入框。                                          |
| `autofocus` / `readonly` | `boolean`                                                       | 否   | `false`        | 当前未绑定到原生控件。                                |
| `size`                   | `FormSize`                                                      | 否   | `'middle'`     | 当前不影响渲染。                                      |
| `placeholder`            | `string`                                                        | 否   | `''`           | 输入框占位文本。                                      |
| `clearable`              | `boolean`                                                       | 否   | `true`         | 当前不影响渲染。                                      |

其余继承属性没有组件默认值；`name`、`label` 会传递或显示。

## Emits

| 事件                | 参数     | 触发时机                   |
| ------------------- | -------- | -------------------------- |
| `update:modelValue` | `string` | 原生输入发生 `input` 时。  |
| `input`             | `string` | 同上。                     |
| `change`            | `string` | 原生输入发生 `change` 时。 |
| `focus`             | 无       | 输入框获得焦点时。         |
| `blur`              | 无       | 输入框失去焦点时。         |

继承的 `clear` 当前不会触发。

## Slots

无。

## Exposes

无。
