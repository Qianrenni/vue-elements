# QSlider

## 用途

单值滑动条，对齐 Ant Design `Slider`：支持 `min` / `max` / `step`、刻度标记 `marks`、点击/拖动/键盘控制；受控（v-model）。范围（双滑块）请用 `FormRangeSlider`。

## 基本用法

```vue
<template>
  <QSlider v-model="value" :min="0" :max="100" :step="5" />
  <QSlider
    v-model="v2"
    :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(30);
const v2 = ref(50);
</script>
```

## Props

| 属性         | 类型                         | 必填 | 默认值     | 说明                     |
| ------------ | ---------------------------- | ---- | ---------- | ------------------------ |
| `modelValue` | `number`                     | 否   | `0`        | 当前值（v-model）。      |
| `min`        | `number`                     | 否   | `0`        | 最小值。                 |
| `max`        | `number`                     | 否   | `100`      | 最大值。                 |
| `step`       | `number`                     | 否   | `1`        | 步长；`0` 表示自由取值。 |
| `disabled`   | `boolean`                    | 否   | `false`    | 是否禁用。               |
| `marks`      | `Record<number, string>`     | 否   | 无         | 刻度标记。               |
| `size`       | `'small'\|'middle'\|'large'` | 否   | `'middle'` | 尺寸。                   |

## Emits

| 事件名              | 参数类型   | 触发时机               |
| ------------------- | ---------- | ---------------------- |
| `update:modelValue` | `(number)` | 拖动/点击/键盘变化时。 |
| `change`            | `(number)` | 鼠标释放/键盘提交时。  |

## 可访问性（Accessibility）

- 手柄 `role="slider"` + `aria-valuemin/max/now`，支持方向键调节。

## Exposes

无。
