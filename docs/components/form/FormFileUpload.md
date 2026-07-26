# QFormFileUpload

## 用途

基于原生文件输入框选择单个或多个文件。

## 基本用法

```vue
<QFormFileUpload v-model="file" accept="image/*" />
```

## Props

继承 `FormComponentProps<FileType>`；`FileType = File | FileList | null`。公共属性包括 `modelValue?: FileType | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性                     | 类型                         | 必填 | 默认值                                  | 说明                                              |
| ------------------------ | ---------------------------- | ---- | --------------------------------------- | ------------------------------------------------- |
| `multiple`               | `boolean`                    | 否   | `false`                                 | 是否允许多选；决定事件值为 `File` 或 `FileList`。 |
| `accept`                 | `string`                     | 否   | `'*'`                                   | 允许选择的 MIME 类型或扩展名。                    |
| `required`               | `boolean`                    | 否   | `true`                                  | 传递给原生输入框。                                |
| `direction`              | `'vertical' \| 'horizontal'` | 否   | `'vertical'`                            | 布局方向。                                        |
| `disabled`               | `boolean`                    | 否   | `false`                                 | 禁用输入框。                                      |
| `autofocus` / `readonly` | `boolean`                    | 否   | `false`                                 | 当前未绑定到原生控件。                            |
| `name`                   | `string`                     | 否   | `` `files${Math.random() * 1000000}` `` | 原生输入框名称；未传入时运行时生成。              |
| `size`                   | `FormSize`                   | 否   | `'middle'`                              | 当前不影响渲染。                                  |
| `placeholder`            | `string`                     | 否   | `'选择文件'`                            | 当前不影响渲染。                                  |
| `clearable`              | `boolean`                    | 否   | `true`                                  | 当前不影响渲染。                                  |

其余继承属性没有组件默认值，且当前不影响渲染。

## Emits

| 事件                | 参数       | 触发时机                                                                  |
| ------------------- | ---------- | ------------------------------------------------------------------------- |
| `update:modelValue` | `FileType` | 文件选择变化时；无文件时为 `null`，单选为首个 `File`，多选为 `FileList`。 |

不继承 `FormComponentEmits` 的其他事件。

## Slots

无。

## Exposes

无。
