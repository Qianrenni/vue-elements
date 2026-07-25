# QFormButton

## 用途

表单按钮，渲染原生 `<button>`，支持普通、提交和重置类型。

## 基本用法

```vue
<QFormButton type="submit">提交</QFormButton>
```

## Props

继承 `FormComponentProps<null>`。除下表项外，`modelValue`、`name`、`label`、`readonly`、`status`、`required`、`placeholder`、`clearable`、`id`、`direction`、`errorMessage` 均可传入，类型分别为 `null | undefined`、`string`、`string`、`boolean`、`'default' | 'success' | 'warning' | 'error'`、`boolean`、`string`、`boolean`、`string`、`'vertical' | 'horizontal'`、`string`；组件当前不使用这些属性。

| 属性        | 类型                              | 必填 | 默认值     | 说明                     |
| ----------- | --------------------------------- | ---- | ---------- | ------------------------ |
| `type`      | `'button' \| 'submit' \| 'reset'` | 否   | `'button'` | 原生按钮类型。           |
| `disabled`  | `boolean`                         | 否   | `false`    | 是否禁用按钮。           |
| `autofocus` | `boolean`                         | 否   | `false`    | 是否自动聚焦。           |
| `size`      | `'small' \| 'middle' \| 'large'`  | 否   | `'middle'` | 影响插槽内容的文字尺寸。 |

## Emits

无。

## Slots

| 插槽     | 作用域参数                             | 回退内容 |
| -------- | -------------------------------------- | -------- |
| 默认插槽 | `{ disabled: boolean, class: object }` | 无。     |

## Exposes

无。
