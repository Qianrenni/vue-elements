# QSegmented

## 用途

分段控制器，对齐 Ant Design `Segmented`：互斥选中一段，支持图标、禁用、整块撑满、纵向排列与键盘导航，受控（v-model）。

## 基本用法

```vue
<template>
  <!-- 字符串选项 -->
  <QSegmented v-model="value" :options="['日', '周', '月']" />

  <!-- 对象选项：图标 + 禁用 -->
  <QSegmented
    v-model="align"
    :options="[
      { label: '左', value: 'left', icon: 'Menu' },
      { label: '中', value: 'center' },
      { label: '右', value: 'right', icon: 'More', disabled: true },
    ]"
  />

  <!-- 整块 + 大尺寸 -->
  <QSegmented v-model="size" :options="opts" block size="large" />

  <!-- 纵向 -->
  <QSegmented v-model="vertical" :options="opts" vertical />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('日');
const align = ref('center');
const vertical = ref('day');
const opts = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
];
</script>
```

## Props

| 属性         | 类型                                      | 必填 | 默认值     | 说明                    |
| ------------ | ----------------------------------------- | ---- | ---------- | ----------------------- |
| `options`    | `(string \| number \| SegmentedOption)[]` | 否   | `[]`       | 选项数组。              |
| `modelValue` | `string \| number`                        | 否   | 无         | 当前选中值（v-model）。 |
| `disabled`   | `boolean`                                 | 否   | `false`    | 是否整体禁用。          |
| `block`      | `boolean`                                 | 否   | `false`    | 是否撑满整行（等分）。  |
| `size`       | `'small' \| 'middle' \| 'large'`          | 否   | `'middle'` | 尺寸。                  |
| `vertical`   | `boolean`                                 | 否   | `false`    | 是否纵向排列。          |

> `SegmentedOption = { label: string; value: string \| number; disabled?: boolean; icon?: string }`

## Emits

| 事件名              | 参数类型                    | 触发时机     |
| ------------------- | --------------------------- | ------------ |
| `update:modelValue` | `(value: string \| number)` | 选中值变化。 |
| `change`            | `(value: string \| number)` | 选中值变化。 |

## 可访问性（Accessibility）

- 容器 `role="radiogroup"`，选项 `role="radio"` + `aria-checked`。
- 方向键移动焦点（跳过禁用项并环绕），`Home`/`End` 跳首尾，`Enter`/`Space` 选中。

## Exposes

无。
