# QFormButton

> **⚠️ 已废弃（Deprecated）**：请改用 [`QButton`](../basic/Button.md)。`QFormButton` 内部已复用 `QButton`，现有代码仍可运行，但不再演进，未来版本可能移除。

## 迁移指南

| 旧写法（QFormButton）                           | 新写法（QButton）                            |
| ----------------------------------------------- | -------------------------------------------- |
| `<QFormButton type="submit">提交</QFormButton>` | `<QButton html-type="submit">提交</QButton>` |
| `<QFormButton type="reset">重置</QFormButton>`  | `<QButton html-type="reset">重置</QButton>`  |
| `<QFormButton size="small">小</QFormButton>`    | `<QButton size="small">小</QButton>`         |
| `<QFormButton disabled>禁用</QFormButton>`      | `<QButton disabled>禁用</QButton>`           |

> 注意：`QButton` 的 `type` 为**语义类型**（`primary` / `default` / `dashed` / `text` / `link`），原生 `button` / `submit` / `reset` 请使用 `html-type`。

## 用途

表单按钮，内部复用基础 `QButton` 渲染（不再直接输出裸 `<button>`），对外保持普通、提交和重置三种原生类型的兼容用法。

## 基本用法

```vue
<!-- 旧 API：type 为原生按钮类型（推荐保留以兼容既有代码） -->
<QFormButton type="submit">提交</QFormButton>

<!-- 新 API：html-type 对齐 QButton，同时传入时优先于 type -->
<QFormButton html-type="reset">重置</QFormButton>
```

## Props

继承 `FormComponentProps<null>`。除下表项外，`modelValue`、`name`、`label`、`readonly`、`status`、`required`、`placeholder`、`clearable`、`id`、`direction`、`errorMessage` 均可传入，类型分别为 `null | undefined`、`string`、`string`、`boolean`、`'default' | 'success' | 'warning' | 'error'`、`boolean`、`string`、`boolean`、`string`、`'vertical' | 'horizontal'`、`string`；组件当前不使用这些属性。

| 属性        | 类型                              | 必填 | 默认值     | 说明                                                           |
| ----------- | --------------------------------- | ---- | ---------- | -------------------------------------------------------------- |
| `type`      | `'button' \| 'submit' \| 'reset'` | 否   | `'button'` | 原生按钮类型（旧 API，等价于 `htmlType`）。                    |
| `htmlType`  | `'button' \| 'submit' \| 'reset'` | 否   | 无         | 原生 button 的 type，对齐 `QButton`；同时传入时优先于 `type`。 |
| `disabled`  | `boolean`                         | 否   | `false`    | 是否禁用按钮。                                                 |
| `autofocus` | `boolean`                         | 否   | `false`    | 是否自动聚焦。                                                 |
| `size`      | `'small' \| 'middle' \| 'large'`  | 否   | `'middle'` | 透传给 `QButton`，分别映射到 level 2 / 3 / 4。                 |

## Emits

| 事件    | 参数         | 说明                               |
| ------- | ------------ | ---------------------------------- |
| `click` | `MouseEvent` | 点击按钮时触发；禁用状态下不触发。 |

> 事件转发自内部 `QButton`，与旧版原生 `<button>` 的 `@click` 用法保持一致。

## Slots

| 插槽     | 作用域参数                             | 回退内容 |
| -------- | -------------------------------------- | -------- |
| 默认插槽 | `{ disabled: boolean, class: object }` | 无。     |

## Exposes

无。
