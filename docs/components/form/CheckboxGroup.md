# QCheckboxGroup

## 用途

复选框组，对齐 Ant Design `Checkbox.Group`：由 `options` 驱动渲染，通过 `v-model:value` 双向绑定选中值数组，支持整体禁用与单项禁用。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<(string | number)[]>(['apple']);
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true },
];
</script>

<template>
  <QCheckboxGroup v-model:value="value" :options="options" />
</template>
```

## Props

| 属性       | 类型                                     | 必填 | 默认值  | 说明                                                |
| ---------- | ---------------------------------------- | ---- | ------- | --------------------------------------------------- |
| `options`  | `(CheckboxOption \| string \| number)[]` | 否   | `[]`    | 选项列表，支持简写或 `{ label, value, disabled }`。 |
| `value`    | `(string \| number)[]`                   | 否   | `[]`    | 选中值数组（`v-model:value`）。                     |
| `disabled` | `boolean`                                | 否   | `false` | 是否整体禁用。                                      |
| `name`     | `string`                                 | 否   | 无      | 原生 `name`，用于表单提交。                         |

### CheckboxOption

| 字段       | 类型               | 必填 | 默认值          | 说明           |
| ---------- | ------------------ | ---- | --------------- | -------------- |
| `value`    | `string \| number` | 是   | 无              | 选项值。       |
| `label`    | `string`           | 否   | `String(value)` | 选项文案。     |
| `disabled` | `boolean`          | 否   | `false`         | 是否禁用该项。 |

## Emits

| 事件           | 参数                   | 说明                            |
| -------------- | ---------------------- | ------------------------------- |
| `update:value` | `(string \| number)[]` | 选中值变化（`v-model:value`）。 |
| `change`       | `(string \| number)[]` | 选中值变化。                    |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 不内置 `label` / 校验提示，交由 `QFormItem` 提供（antd 由 `Form.Item` 提供）。
- 变更时同时派发原生 `change` 事件，`QFormItem` 据此自动触发校验。
