# QContent

## 用途

内容区布局组件，作为 `QLayout` 的自适应主体区域，对齐 Ant Design `Layout.Content`。默认占用剩余空间并自动滚动。

## 基本用法

```vue
<template>
  <QLayout style="height: 480px">
    <QHeader>Header</QHeader>
    <QContent>主体内容，可滚动</QContent>
    <QFooter>Footer</QFooter>
  </QLayout>
</template>
```

## Props

无（内容经默认插槽放置）。

## Slots

| 插槽     | 说明       |
| -------- | ---------- |
| 默认插槽 | 主体内容。 |

## Exposes

无。
