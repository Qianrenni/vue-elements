# QMentions

## 用途

提及输入（对齐 antd Mentions）：文本域中键入 `@` 触发候选下拉，选中后替换为 `@value` 文本；支持键盘上下选择 + Enter 确认。

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('你好 @');
const options = [{ value: 'Alice' }, { value: 'Bob', label: 'Bob 波比' }];
</script>

<template>
  <QMentions v-model="text" :options="options" />
</template>
```

## Props

| 属性          | 类型                             | 必填 | 默认值             | 说明                       |
| ------------- | -------------------------------- | ---- | ------------------ | -------------------------- |
| `modelValue`  | `string`                         | 否   | `''`               | 文本值（v-model）。        |
| `options`     | `{ value, label?, disabled? }[]` | 否   | `[]`               | 候选列表。                 |
| `prefix`      | `string`                         | 否   | `'@'`              | 触发前缀。                 |
| `placeholder` | `string`                         | 否   | `'请输入，@ 提及'` | 占位文案。                 |
| `disabled`    | `boolean`                        | 否   | `false`            | 禁用。                     |
| `rows`        | `number`                         | 否   | `3`                | 行数。                     |
| `autoSize`    | `boolean`                        | 否   | `false`            | 自适应高度。               |
| `open`        | `boolean`                        | 否   | —                  | 受控展开（v-model:open）。 |

## Emits

| 事件                | 参数      | 说明               |
| ------------------- | --------- | ------------------ |
| `update:modelValue` | `string`  | 输入/选择输出。    |
| `change`            | `string`  | 值变化时。         |
| `update:open`       | `boolean` | 候选展开状态变化。 |

## 说明

- 触发判定基于光标末尾最后一个 `@词`（支持中英文/数字/下划线/连字符），词内无空格。
- 候选按 label/value 做包含匹配；`@` 后无词时展示全部。
