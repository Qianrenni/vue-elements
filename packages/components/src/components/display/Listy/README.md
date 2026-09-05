# QListy

## 用途

虚拟列表（对齐 antd Listy 虚拟列表能力，**定高**模式）：窗口化渲染超长列表，只挂载可视区 + overscan 行。

```vue
<script lang="ts" setup>
const items = Array.from({ length: 10000 }, (_, i) => `第 ${i} 行`);
</script>

<template>
  <QListy :items="items" :item-height="40" :height="400">
    <template #default="{ item }">
      <span>{{ item }}</span>
    </template>
  </QListy>
</template>
```

## Props

| 属性         | 类型                   | 必填 | 默认值 | 说明             |
| ------------ | ---------------------- | ---- | ------ | ---------------- |
| `items`      | `T[]`                  | 否   | `[]`   | 数据源。         |
| `itemHeight` | `number`               | 否   | `40`   | 行高(px)。       |
| `height`     | `number`               | 否   | `400`  | 视口高度(px)。   |
| `overscan`   | `number`               | 否   | `4`    | 预渲染额外行数。 |
| `itemKey`    | `(item, index) => key` | 否   | —      | 行 key 函数。    |

## Slots

| 插槽     | 作用域            | 说明     |
| -------- | ----------------- | -------- |
| 默认插槽 | `{ item, index }` | 行渲染。 |

## Exposes

| 方法       | 说明         |
| ---------- | ------------ |
| `scrollTo` | 滚动到索引。 |

## 说明

- 当前为定高虚拟列表；如需动态行高（measure 模式）可基于本组件扩展。
