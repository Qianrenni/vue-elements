# QFooter

## 用途

底部栏布局组件，作为 `QLayout` 的底部区域，对齐 Ant Design `Layout.Footer`。默认居中展示版权信息等。

## 基本用法

```vue
<template>
  <QLayout style="height: 480px">
    <QContent>主体</QContent>
    <QFooter>© 2026 QYANI</QFooter>
  </QLayout>
</template>
```

## Props

无（内容经默认插槽放置）。

## Slots

| 插槽     | 说明         |
| -------- | ------------ |
| 默认插槽 | 底部栏内容。 |

## Exposes

无。
