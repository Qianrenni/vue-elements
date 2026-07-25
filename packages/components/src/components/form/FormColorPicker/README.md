# QFormColorPicker

## 用途

基于原生颜色输入框选择颜色，并以字符串同步颜色值。

## 基本用法

```vue
<QFormColorPicker v-model="color" label="主题色" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?`、`label?`、`disabled?`、`readonly?`、`size?`、`status?`、`required?`、`placeholder?`、`clearable?`、`autofocus?`、`id?`、`direction?`、`errorMessage?`；其中未说明的 `string`、`boolean`、`FormSize`、`FormStatus` 和方向类型定义与公共表单属性一致。

| 属性                     | 类型                         | 必填 | 默认值         | 说明                   |
| ------------------------ | ---------------------------- | ---- | -------------- | ---------------------- |
| `modelValue`             | `string \| null`             | 否   | `'#fff'`       | 当前颜色值。           |
| `required`               | `boolean`                    | 否   | `true`         | 当前未绑定到原生控件。 |
| `direction`              | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 布局方向。             |
| `disabled`               | `boolean`                    | 否   | `false`        | 禁用颜色输入。         |
| `autofocus` / `readonly` | `boolean`                    | 否   | `false`        | 当前未绑定到原生控件。 |
| `size`                   | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。       |
| `placeholder`            | `string`                     | 否   | `'请选择颜色'` | 当前不影响渲染。       |
| `clearable`              | `boolean`                    | 否   | `true`         | 当前不影响渲染。       |

其余继承属性没有组件默认值，且当前不影响渲染。

## Emits

| 事件                | 参数     | 触发时机                            |
| ------------------- | -------- | ----------------------------------- |
| `update:modelValue` | `string` | 原生颜色输入的 `input` 事件发生时。 |
| `input`             | `string` | 同上。                              |

声明继承的 `change`、`focus`、`blur`、`clear`，但当前不会触发。

## Slots

无。

## Exposes

无。
