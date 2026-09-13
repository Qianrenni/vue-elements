# QRadioGroup

## 用途

单选框组，对齐 Ant Design `Radio.Group`：由 `options` 驱动渲染，通过 `v-model:value` 双向绑定选中值，支持普通圆点与按钮组两种形态。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('apple');
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true },
];
</script>

<template>
  <QRadioGroup v-model:value="value" :options="options" />

  <!-- 按钮组形态 -->
  <QRadioGroup
    v-model:value="value"
    :options="options"
    button-style="solid"
    option-type="button"
  />
</template>
```

## Props

| 属性          | 类型                                  | 必填 | 默认值      | 说明                                                |
| ------------- | ------------------------------------- | ---- | ----------- | --------------------------------------------------- |
| `options`     | `(RadioOption \| string \| number)[]` | 否   | `[]`        | 选项列表，支持简写或 `{ label, value, disabled }`。 |
| `value`       | `string \| number`                    | 否   | 无          | 当前选中值（`v-model:value`）。                     |
| `disabled`    | `boolean`                             | 否   | `false`     | 是否整体禁用。                                      |
| `name`        | `string`                              | 否   | 无          | 原生 `name`，用于表单提交。                         |
| `optionType`  | `'default' \| 'button'`               | 否   | `'default'` | 展示形式：圆点单选 / 按钮组。                       |
| `buttonStyle` | `'outline' \| 'solid'`                | 否   | `'outline'` | 按钮组外观，仅 `optionType="button"` 时生效。       |
| `size`        | `'small' \| 'middle' \| 'large'`      | 否   | `'middle'`  | 尺寸，按钮组形态下生效。                            |

### RadioOption

| 字段       | 类型               | 必填 | 默认值          | 说明           |
| ---------- | ------------------ | ---- | --------------- | -------------- |
| `value`    | `string \| number` | 是   | 无              | 选项值。       |
| `label`    | `string`           | 否   | `String(value)` | 选项文案。     |
| `disabled` | `boolean`          | 否   | `false`         | 是否禁用该项。 |

## Emits

| 事件           | 参数               | 说明                            |
| -------------- | ------------------ | ------------------------------- |
| `update:value` | `string \| number` | 选中值变化（`v-model:value`）。 |
| `change`       | `string \| number` | 选中值变化。                    |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 不内置 `label` / 校验提示，交由 `QFormItem` 提供（antd 由 `Form.Item` 提供）。
- 变更时同时派发原生 `change` 事件，`QFormItem` 据此自动触发校验。
