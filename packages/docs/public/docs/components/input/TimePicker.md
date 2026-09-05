# QTimePicker

## 用途

时间选择器（对齐 antd TimePicker 常用能力）：点击弹出 时/分/秒 列表面板，支持格式、步长、清除、受控值。

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const time = ref('');
</script>

<template>
  <QTimePicker v-model="time" placeholder="请选择时间" />
</template>
```

## Props

| 属性          | 类型      | 必填 | 默认值         | 说明                       |
| ------------- | --------- | ---- | -------------- | -------------------------- |
| `modelValue`  | `string`  | 否   | —              | 时间字符串（v-model）。    |
| `format`      | `string`  | 否   | `'HH:mm:ss'`   | 格式，支持 HH/mm/ss。      |
| `placeholder` | `string`  | 否   | `'请选择时间'` | 占位文案。                 |
| `disabled`    | `boolean` | 否   | `false`        | 禁用。                     |
| `allowClear`  | `boolean` | 否   | `true`         | 允许清除。                 |
| `hourStep`    | `number`  | 否   | `1`            | 小时步长。                 |
| `minuteStep`  | `number`  | 否   | `1`            | 分钟步长。                 |
| `secondStep`  | `number`  | 否   | `1`            | 秒步长。                   |
| `open`        | `boolean` | 否   | —              | 受控展开（v-model:open）。 |

## Emits

| 事件                | 参数      | 触发时机              |
| ------------------- | --------- | --------------------- |
| `update:modelValue` | `string`  | 确定/清除后输出新值。 |
| `change`            | `string`  | 值变化时（确定后）。  |
| `update:open`       | `boolean` | 展开状态变化。        |

## 说明

- 值格式与 `format` 对应：含 `ss` 时输出/面板含秒列，否则为 `HH:mm`。
- 面板提供“清除 / 确定”；点击外部或按 `Esc` 收起。
- 目前为 24 小时制；12 小时制（`use12Hours`）暂未实现。
