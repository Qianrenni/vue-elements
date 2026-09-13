# QTextArea

## 用途

多行文本输入框，对齐 Ant Design `Input.TextArea`：支持自适应高度（`autoSize`）、字数统计（`showCount`）、清除（`allowClear`）与校验状态。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('');
</script>

<template>
  <QTextArea
    v-model:value="text"
    :auto-size="{ minRows: 2, maxRows: 6 }"
    show-count
    :max-length="200"
    allow-clear
  />
</template>
```

## Props

| 属性          | 类型                                | 必填 | 默认值  | 说明                                   |
| ------------- | ----------------------------------- | ---- | ------- | -------------------------------------- |
| `value`       | `string`                            | 否   | `''`    | 文本值（`v-model:value`）。            |
| `placeholder` | `string`                            | 否   | 无      | 占位文本。                             |
| `disabled`    | `boolean`                           | 否   | `false` | 是否禁用。                             |
| `readonly`    | `boolean`                           | 否   | `false` | 是否只读。                             |
| `rows`        | `number`                            | 否   | `3`     | 默认行数。                             |
| `autoSize`    | `boolean \| { minRows?, maxRows? }` | 否   | `false` | 自适应内容高度，可限制最小/最大行数。  |
| `showCount`   | `boolean`                           | 否   | `false` | 是否展示字数统计。                     |
| `maxLength`   | `number`                            | 否   | 无      | 最大长度限制（同时用于字数统计展示）。 |
| `allowClear`  | `boolean`                           | 否   | `false` | 是否展示清除按钮。                     |
| `status`      | `'error' \| 'warning'`              | 否   | 无      | 校验状态。                             |
| `autofocus`   | `boolean`                           | 否   | `false` | 是否自动聚焦。                         |
| `name`        | `string`                            | 否   | 无      | 原生 `name`，用于表单提交。            |

## Emits

| 事件           | 参数            | 说明                          |
| -------------- | --------------- | ----------------------------- |
| `update:value` | `string`        | 文本变化（`v-model:value`）。 |
| `change`       | `string`        | 文本变化。                    |
| `pressEnter`   | `KeyboardEvent` | 按下回车。                    |
| `focus`        | `FocusEvent`    | 获得焦点。                    |
| `blur`         | `FocusEvent`    | 失去焦点。                    |
| `clear`        | 无              | 点击清除按钮。                |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 不内置 `label` 与校验提示，交由 `QFormItem` 提供（antd 由 `Form.Item` 提供）。
- `autoSize` 行数限制通过 `minRows` / `maxRows` 指定，行为与 antd 一致。
