# QStatistic

## 用途

统计数值组件，对齐 Ant Design `Statistic`：标题 + 大号数值，支持千分位、精度、前后缀与数值滚动动画。

## 基本用法

```vue
<template>
  <QStatistic title="今日访问" :value="1234567" :precision="0" />
  <QStatistic
    title="销售额"
    :value="99.5"
    prefix="¥"
    suffix="万"
    :precision="2"
  />

  <!-- 数值滚动动画 -->
  <QStatistic
    title="累计用户"
    :value="count"
    :count-up="true"
    :count-duration="1500"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(88234);
</script>
```

## Props

| 属性               | 类型               | 必填 | 默认值  | 说明                           |
| ------------------ | ------------------ | ---- | ------- | ------------------------------ |
| `title`            | `string`           | 否   | 无      | 数值标题。                     |
| `value`            | `number \| string` | 否   | 无      | 数值内容。                     |
| `precision`        | `number`           | 否   | 无      | 小数位数；缺省不强制小数。     |
| `groupSeparator`   | `string`           | 否   | `','`   | 千分位分隔符（传 `''` 禁用）。 |
| `decimalSeparator` | `string`           | 否   | `'.'`   | 小数点。                       |
| `prefix`           | `string`           | 否   | 无      | 前缀文本（如 `¥`）。           |
| `suffix`           | `string`           | 否   | 无      | 后缀文本（如 `%`）。           |
| `valueStyle`       | `CSSProperties`    | 否   | 无      | 数值样式。                     |
| `countUp`          | `boolean`          | 否   | `false` | 数值变化时滚动动画。           |
| `countDuration`    | `number`           | 否   | `2000`  | 动画时长（毫秒）。             |
| `loading`          | `boolean`          | 否   | `false` | 加载中，数值以 `—` 占位。      |

## Emits

无。

## Slots

无。

## Exposes

| 名称           | 类型         | 说明                        |
| -------------- | ------------ | --------------------------- |
| `startCountUp` | `() => void` | 手动从 0 重新触发滚动动画。 |

## 可访问性（Accessibility）

- 数值使用 `font-variant-numeric: tabular-nums`，等宽数字避免跳动。
