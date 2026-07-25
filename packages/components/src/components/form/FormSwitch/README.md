# QFormSwitch

## 用途

切换布尔状态的开关控件。

## 基本用法

```vue
<QFormSwitch v-model="enabled" label="启用功能" />
```

## Props

继承 `FormComponentProps<boolean>`：`modelValue?: boolean | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性         | 类型                         | 必填 | 默认值         | 说明                   |
| ------------ | ---------------------------- | ---- | -------------- | ---------------------- |
| `modelValue` | `boolean \| null`            | 否   | `false`        | 开关状态。             |
| `label`      | `string`                     | 否   | `''`           | 开关旁的文本。         |
| `disabled`   | `boolean`                    | 否   | `false`        | 禁用后点击不会切换。   |
| `name`       | `string`                     | 否   | `''`           | 原生复选框名称。       |
| `direction`  | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 标签和开关的排列方向。 |
| `size`       | `FormSize`                   | 否   | `'middle'`     | 影响开关与标签尺寸。   |

其他继承属性没有组件默认值，且当前不影响渲染；`id` 会关联内部标签与复选框。

## Emits

| 事件                | 参数      | 触发时机             |
| ------------------- | --------- | -------------------- |
| `update:modelValue` | `boolean` | 点击未禁用的开关时。 |
| `change`            | `boolean` | 同上。               |

类型声明继承了 `input`、`focus`、`blur`、`clear`，但当前组件不会触发它们。

## Slots

无。

## Exposes

无。
