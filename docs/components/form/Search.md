# QSearch

## 用途

提供搜索输入框；支持输入同步、Enter 键或点击搜索图标发起搜索。

## 基本用法

```vue
<QSearch v-model="keyword" @search="handleSearch" />
```

## Props

继承 `FormComponentProps<string>`：`modelValue?: string | null`、`name?: string`、`label?: string`、`disabled?: boolean`、`readonly?: boolean`、`size?: FormSize`、`status?: FormStatus`、`required?: boolean`、`placeholder?: string`、`clearable?: boolean`、`autofocus?: boolean`、`id?: string`、`direction?: 'vertical' | 'horizontal'`、`errorMessage?: string`。

| 属性          | 类型                         | 必填 | 默认值         | 说明                     |
| ------------- | ---------------------------- | ---- | -------------- | ------------------------ |
| `direction`   | `'vertical' \| 'horizontal'` | 否   | `'horizontal'` | 当前不影响渲染。         |
| `disabled`    | `boolean`                    | 否   | `false`        | 禁用搜索输入框。         |
| `autofocus`   | `boolean`                    | 否   | `true`         | 当前未绑定到原生输入框。 |
| `size`        | `FormSize`                   | 否   | `'middle'`     | 当前不影响渲染。         |
| `placeholder` | `string`                     | 否   | `''`           | 搜索框占位文本。         |
| `clearable`   | `boolean`                    | 否   | `true`         | 当前不影响渲染。         |

其余继承属性没有组件默认值；`name` 会传递给搜索输入框，其余当前不影响渲染。

## Emits

| 事件                | 参数     | 触发时机                                        |
| ------------------- | -------- | ----------------------------------------------- |
| `update:modelValue` | `string` | 用户修改输入值时。                              |
| `change`            | `string` | 用户修改输入值时，以及非 Enter 键的键盘抬起时。 |
| `search`            | `string` | 按下 Enter 或点击搜索图标时。                   |
| `focus`             | 无       | 搜索框获得焦点时。                              |
| `blur`              | 无       | 搜索框失去焦点时。                              |

继承的 `input`、`clear` 当前不会触发。

## Slots

无。

## 可访问性（Accessibility）

- 搜索图标带 `role="button"`、`title="搜索"` 与 `aria-label`，支持 Enter / Space 触发搜索。

## Exposes

无。
