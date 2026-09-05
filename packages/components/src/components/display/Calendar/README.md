# QCalendar

## 用途

日历（对齐 antd Calendar 基础能力）：月视图网格，支持选中/今天高亮、前后月切换、今日按钮与 `disabledDate`。

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(new Date());
</script>

<template>
  <QCalendar v-model="value" />
</template>
```

## Props

| 属性           | 类型                      | 必填 | 默认值 | 说明                   |
| -------------- | ------------------------- | ---- | ------ | ---------------------- |
| `modelValue`   | `Date \| null`            | 否   | —      | 选中日期（v-model）。  |
| `disabledDate` | `(date: Date) => boolean` | 否   | —      | 禁用日期判断。         |
| `allowClear`   | `boolean`                 | 否   | `true` | 再次点击已选日期取消。 |

## Emits

| 事件                | 参数            | 说明             |
| ------------------- | --------------- | ---------------- |
| `update:modelValue` | `Date \| null`  | 选中变化。       |
| `change`            | `Date \| null`  | 选中变化。       |
| `panel-change`      | `(year, month)` | 切换月份面板时。 |

## 说明

- 目前为「月视图 + 选择日期」基础能力；年/季度切换、日期单元格插槽等可按需扩展。
