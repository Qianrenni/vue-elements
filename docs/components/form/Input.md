# QInput

## 用途

文本输入框，对齐 Ant Design `Input`：支持前后缀图标、清除、字数统计、校验状态与三种尺寸。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const keyword = ref('');
</script>

<template>
  <QInput v-model:value="keyword" placeholder="请输入" allow-clear />
  <QInput v-model:value="keyword" prefix="search" show-count :max-length="20" />
</template>
```

## Props

| 属性          | 类型                             | 必填 | 默认值     | 说明                                                        |
| ------------- | -------------------------------- | ---- | ---------- | ----------------------------------------------------------- |
| `value`       | `string`                         | 否   | `''`       | 输入值（`v-model:value`）。                                 |
| `type`        | `InputType`                      | 否   | `'text'`   | 原生输入类型（text/password/email/number/tel/url/search）。 |
| `placeholder` | `string`                         | 否   | 无         | 占位文本。                                                  |
| `disabled`    | `boolean`                        | 否   | `false`    | 是否禁用。                                                  |
| `readonly`    | `boolean`                        | 否   | `false`    | 是否只读。                                                  |
| `allowClear`  | `boolean`                        | 否   | `false`    | 是否展示清除按钮。                                          |
| `maxLength`   | `number`                         | 否   | 无         | 最大长度限制。                                              |
| `showCount`   | `boolean`                        | 否   | `false`    | 是否展示字数统计。                                          |
| `prefix`      | `string`                         | 否   | 无         | 前缀图标名（`QIcon` 的 `icon`）。                           |
| `suffix`      | `string`                         | 否   | 无         | 后缀图标名（`QIcon` 的 `icon`）。                           |
| `status`      | `'error' \| 'warning'`           | 否   | 无         | 校验状态。                                                  |
| `size`        | `'small' \| 'middle' \| 'large'` | 否   | `'middle'` | 尺寸。                                                      |
| `autofocus`   | `boolean`                        | 否   | `false`    | 是否自动聚焦。                                              |
| `name`        | `string`                         | 否   | 无         | 原生 `name`，用于表单提交。                                 |

## Emits

| 事件           | 参数            | 说明                            |
| -------------- | --------------- | ------------------------------- |
| `update:value` | `string`        | 输入值变化（`v-model:value`）。 |
| `change`       | `string`        | 输入值变化。                    |
| `pressEnter`   | `KeyboardEvent` | 按下回车。                      |
| `focus`        | `FocusEvent`    | 获得焦点。                      |
| `blur`         | `FocusEvent`    | 失去焦点。                      |
| `clear`        | 无              | 点击清除按钮。                  |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- antd 的 `prefix` / `suffix` 接收节点，本组件接收 `QIcon` 的图标名（字符串）。
- 不内置 `label` 与校验提示，交由 `QFormItem` 提供（antd 由 `Form.Item` 提供）。
- 暂不提供 `addonBefore` / `addonAfter`。
