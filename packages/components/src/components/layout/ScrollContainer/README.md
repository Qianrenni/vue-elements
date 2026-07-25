# QScrollContainer

## 用途

滚动容器。可监听横向或纵向滚动，通知滚动位置与接近边界事件，并可按名称恢复会话内的滚动位置。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const containerRef = ref<InstanceType<typeof QScrollContainer>>();
</script>

<template>
  <QScrollContainer
    ref="containerRef"
    scroll-y
    name="article-list"
    recoverable
    @ended="loadMore"
    @scroll="handleScroll"
  >
    内容
  </QScrollContainer>
</template>
```

## Props

| 名称           | 类型      | 必填 | 默认值           | 说明                                                                        |
| -------------- | --------- | ---- | ---------------- | --------------------------------------------------------------------------- |
| `scrollX`      | `boolean` | 否   | `false`          | 是否监听横向滚动并检测横向边界。                                            |
| `scrollY`      | `boolean` | 否   | `false`          | 是否监听纵向滚动并检测纵向边界。                                            |
| `threshold`    | `number`  | 否   | `20`             | 判定滚动到边界的阈值，单位为 px。                                           |
| `emitInterval` | `number`  | 否   | `16`             | `scroll` 处理的节流间隔，单位为 ms。                                        |
| `recoverable`  | `boolean` | 否   | `false`          | 是否使用 `sessionStorage` 保存并恢复滚动位置。                              |
| `name`         | `string`  | 否   | 无（源码未设置） | 恢复滚动位置使用的 `sessionStorage` 键；仅与 `recoverable` 同时设置时生效。 |

## Emits

| 事件     | 载荷类型                   | 触发时机                                                                 |
| -------- | -------------------------- | ------------------------------------------------------------------------ |
| `scroll` | `{ x: number; y: number }` | 启用横向或纵向监听后，容器滚动时按 `emitInterval` 节流触发。             |
| `ended`  | 无                         | 开启对应方向监听且向该方向滚动接近末端（距离不大于 `threshold`）时触发。 |

## Slots

| 名称      | 作用域参数 | 后备内容 |
| --------- | ---------- | -------- |
| `default` | 无         | 无。     |

## Exposes

| 方法       | 参数                       | 返回值 | 说明                                                                                                                                |
| ---------- | -------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `scrollTo` | `options: ScrollToOptions` | `void` | 调用原生滚动容器的 `scrollTo`。`ScrollToOptions` 为 `{ left?: number; top?: number; behavior?: 'smooth' \| 'auto' \| 'instant' }`。 |
