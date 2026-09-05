# QMasonry

## 用途

瀑布流（对齐 antd Masonry 常用能力）：按指定列数以 CSS 多列填充任意高度卡片。

```vue
<script lang="ts" setup>
const cards = [1, 2, 3, 4, 5, 6, 7, 8];
</script>

<template>
  <QMasonry :items="cards" :columns="3" :gap="16">
    <template #default="{ item }">
      <div class="card" :style="{ height: 80 + (item % 4) * 30 + 'px' }">
        #{{ item }}
      </div>
    </template>
  </QMasonry>
</template>
```

## Props

| 属性      | 类型                   | 必填 | 默认值 | 说明            |
| --------- | ---------------------- | ---- | ------ | --------------- |
| `items`   | `T[]`                  | 否   | `[]`   | 数据源。        |
| `columns` | `number`               | 否   | `4`    | 列数。          |
| `gap`     | `number`               | 否   | `16`   | 列/行间距(px)。 |
| `itemKey` | `(item, index) => key` | 否   | —      | 子项 key 函数。 |

## Slots

| 插槽     | 作用域            | 说明       |
| -------- | ----------------- | ---------- |
| 默认插槽 | `{ item, index }` | 卡片渲染。 |

## 说明

- 采用 CSS 多列实现，内容按“逐列”顺序填充；每列内自动断页避免跨列截断（`break-inside: avoid`）。
