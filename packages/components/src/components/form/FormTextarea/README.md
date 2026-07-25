# QFormTextarea

## 用途

输入多行文本，并以字符串同步输入内容。

## 基本用法

```vue
<QFormTextarea v-model="content" :rows="6" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                     | 类型                         | 必填 | 默认值         | 说明                     |
| ------------------------ | ---------------------------- | ---- | -------------- | ------------------------ |
| `rows`                   | `number`                     | 否   | `5`            | 文本域可见行数。         |
| `resizable`              | `boolean`                    | 否   | `false`        | 是否允许调整文本域大小。 |
| `placeholder`            | `string`                     | 否   | `'请输入内容'` | 文本域占位文本。         |
| `required`               | `boolean`                    | 否   | `true`         | 传递给原生文本域。       |
| `direction`              | `'vertical' \| 'horizontal'` | 否   | `'vertical'`   | 布局方向。               |
| `disabled`               | `boolean`                    | 否   | `false`        | 禁用文本域。             |
| `autofocus` / `readonly` | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。   |
| `size`                   | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。         |
| `clearable`              | `boolean`                    | 否   | `false`        | 当前不影响渲染。         |

其余继承属性没有组件默认值；`name`、`label` 会传递或显示。

## Emits

| 事件                | 参数     | 触发时机                    |
| ------------------- | -------- | --------------------------- |
| `update:modelValue` | `string` | 原生文本域发生 `input` 时。 |
| `input`             | `string` | 同上。                      |

继承声明的 `change`、`focus`、`blur`、`clear` 当前不会触发。

## Slots

无。

## Exposes

无。
