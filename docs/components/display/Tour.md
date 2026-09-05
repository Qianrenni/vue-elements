# QTour

## 用途

漫游引导（对齐 antd Tour 基础能力）：按步骤依次高亮目标元素并展示说明卡片（遮罩挖孔 + 上一步/下一步/关闭/进度）。

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const open = ref(false);
const steps = [
  { target: '.step-a', title: '第一步', description: '这里是功能 A' },
  { target: '.step-b', title: '第二步', description: '这里是功能 B' },
];
</script>

<template>
  <QButton @click="open = true">开始引导</QButton>
  <div class="step-a">目标一</div>
  <div class="step-b">目标二</div>
  <QTour v-model:open="open" :steps="steps" />
</template>
```

## Props

| 属性                    | 类型                                              | 必填 | 默认值                  | 说明                  |
| ----------------------- | ------------------------------------------------- | ---- | ----------------------- | --------------------- |
| `open`                  | `boolean`                                         | 否   | `false`                 | 是否显示（v-model）。 |
| `steps`                 | `{ target?, title?, description?, placement? }[]` | 否   | `[]`                    | 引导步骤。            |
| `current`               | `number`                                          | 否   | `0`                     | 当前步骤（v-model）。 |
| `maskColor`             | `string`                                          | 否   | `'rgba(0,0,0,0.45)'`    | 遮罩颜色。            |
| `closable`              | `boolean`                                         | 否   | `true`                  | 显示关闭按钮。        |
| `prevText` / `nextText` | `string`                                          | 否   | `'上一步'` / `'下一步'` | 按钮文案。            |
| `onFinish`              | `() => void`                                      | 否   | —                       | 完成回调。            |

## Emits

| 事件             | 参数      | 说明           |
| ---------------- | --------- | -------------- |
| `update:open`    | `boolean` | 显示状态变化。 |
| `update:current` | `number`  | 当前步骤变化。 |
| `finish`         | —         | 完成全部步骤。 |

## 说明

- 步骤的 `target` 是选择器，解析为页面元素高亮；无目标时卡片居中展示。
- 卡片位置默认在目标下方，空间不足自动翻转到上方；会随滚动/缩放重新定位。
- 目标应可被 `document.querySelector` 命中。
