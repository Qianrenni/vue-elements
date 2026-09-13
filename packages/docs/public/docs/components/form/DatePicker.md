# QDatePicker

## 用途

日期选择器，对齐 Ant Design `DatePicker`：通过 `v-model:value` 双向绑定，支持 `date` / `week` / `month` / `quarter` / `year` 五种粒度与时间选择，底层由原生 `<input>`（date / week / month / datetime-local）实现。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <QDatePicker v-model:value="value" allow-clear placeholder="请选择日期" />

  <!-- 月粒度 -->
  <QDatePicker v-model:value="value" picker="month" />

  <!-- 日期 + 时间 -->
  <QDatePicker v-model:value="value" show-time />

  <!-- 禁用 / 错误态 / 尺寸 -->
  <QDatePicker v-model:value="value" disabled />
  <QDatePicker v-model:value="value" status="error" size="large" />
</template>
```

## Props

| 属性          | 类型                                                 | 必填 | 默认值     | 说明                                                |
| ------------- | ---------------------------------------------------- | ---- | ---------- | --------------------------------------------------- |
| `value`       | `string`                                             | 否   | 无         | 日期值（`v-model:value`），原生输入框字符串。       |
| `picker`      | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | 否   | `'date'`   | 选择粒度。                                          |
| `showTime`    | `boolean`                                            | 否   | `false`    | 是否同时选择时间，开启后底层使用 `datetime-local`。 |
| `placeholder` | `string`                                             | 否   | 无         | 占位文本。                                          |
| `disabled`    | `boolean`                                            | 否   | `false`    | 是否禁用。                                          |
| `allowClear`  | `boolean`                                            | 否   | `false`    | 是否展示清除按钮。                                  |
| `status`      | `'error' \| 'warning'`                               | 否   | 无         | 校验状态。                                          |
| `size`        | `'small' \| 'middle' \| 'large'`                     | 否   | `'middle'` | 尺寸。                                              |
| `name`        | `string`                                             | 否   | 无         | 原生 `name`，用于表单提交。                         |
| `autofocus`   | `boolean`                                            | 否   | `false`    | 是否自动聚焦。                                      |

### picker 与原生输入框的映射

| `picker`  | `showTime: false` | `showTime: true` | 值示例       |
| --------- | ----------------- | ---------------- | ------------ |
| `date`    | `date`            | `datetime-local` | `2026-09-13` |
| `week`    | `week`            | `datetime-local` | `2026-W37`   |
| `month`   | `month`           | `datetime-local` | `2026-09`    |
| `quarter` | `month`           | `datetime-local` | `2026-09`    |
| `year`    | `date`            | `datetime-local` | `2026-09-13` |

## Emits

| 事件           | 参数                                  | 说明                                 |
| -------------- | ------------------------------------- | ------------------------------------ |
| `update:value` | `string`                              | 日期值变化（`v-model:value`）。      |
| `change`       | `(value: string, dateString: string)` | 日期值变化，返回原始值与展示字符串。 |
| `clear`        | 无                                    | 点击清除按钮。                       |
| `focus`        | `FocusEvent`                          | 获得焦点。                           |
| `blur`         | `FocusEvent`                          | 失去焦点。                           |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- antd 的 `value` 是 dayjs 对象，本组件是原生输入框字符串（`2026-09-13`、`2026-09`、`2026-W37`）。
- `quarter` 无原生输入类型，底层退化为 `month`，不做 `Q1` 文字换算；传入 `YYYY-QN` 时仅按 `YYYY-MM` 展示。
- `year` 底层使用原生 `date`，传入四位年份会补全为当年 1 月 1 日（`2026` → `2026-01-01`）。
- 未实现面板级能力（`format`、`presets`、`showNow`、`disabledDate`、日期范围 `RangePicker` 等）。
- 不内置 `label` / 校验提示，交由 `QFormItem` 提供。
- 值变化时派发原生 `change` 事件（冒泡），`QFormItem` 据此自动触发校验。
