# QInputNumber

## 用途

数字输入框，对齐 Ant Design `InputNumber`：支持 `min` / `max` / `step` / `precision`、增减按钮与键盘上下键；受控（v-model）。

## 基本用法

```vue
<template>
  <QInputNumber v-model="value" :min="0" :max="100" :step="5" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<number | null>(20);
</script>
```

## Props

| 属性          | 类型                         | 必填 | 默认值      | 说明                     |
| ------------- | ---------------------------- | ---- | ----------- | ------------------------ |
| `modelValue`  | `number \| null`             | 否   | 无          | 当前值（v-model）。      |
| `min`         | `number`                     | 否   | `-Infinity` | 最小值。                 |
| `max`         | `number`                     | 否   | `Infinity`  | 最大值。                 |
| `step`        | `number`                     | 否   | `1`         | 步长。                   |
| `precision`   | `number`                     | 否   | 无          | 保留小数位（四舍五入）。 |
| `disabled`    | `boolean`                    | 否   | `false`     | 是否禁用。               |
| `controls`    | `boolean`                    | 否   | `true`      | 是否显示增减按钮。       |
| `size`        | `'small'\|'middle'\|'large'` | 否   | `'middle'`  | 尺寸。                   |
| `placeholder` | `string`                     | 否   | 无          | 占位文本。               |

## Emits

| 事件名              | 参数类型         | 触发时机                |
| ------------------- | ---------------- | ----------------------- |
| `update:modelValue` | `(number\|null)` | 值变化（步进/提交）时。 |
| `change`            | `(number\|null)` | 值提交时。              |
| `focus`             | `(FocusEvent)`   | 聚焦时。                |
| `blur`              | `(FocusEvent)`   | 失焦时。                |

## 可访问性（Accessibility）

- 输入框 `role="spinbutton"` + `aria-valuemin/max/now`；按钮带 `aria-label`。

## Exposes

无。
