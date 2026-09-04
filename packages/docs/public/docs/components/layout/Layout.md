# QLayout

## 用途

页面整体布局容器，对齐 Ant Design `Layout`。与 `QHeader` / `QSider` / `QContent` / `QFooter` 组合使用；默认纵向排列，检测到内部直接包含 `QSider` 时自动切换为横向（Sider 在左，其余子件在右）。

## 基本用法

```vue
<template>
  <QLayout style="height: 480px">
    <QSider>Sider</QSider>
    <QLayout>
      <QHeader>Header</QHeader>
      <QContent>Content</QContent>
      <QFooter>Footer</QFooter>
    </QLayout>
  </QLayout>
</template>
```

> 常见「左 Sider + 右 Header/Content/Footer」布局：外层 `QLayout` 内放 `QSider` 与一个内层 `QLayout`（纵向），外层检测到 Sider 自动横向排列。

## Props

| 属性       | 类型      | 必填 | 默认值 | 说明                                           |
| ---------- | --------- | ---- | ------ | ---------------------------------------------- |
| `hasSider` | `boolean` | 否   | 自动   | 强制横向（含 Sider）；缺省自动检测内部 Sider。 |

## Slots

| 插槽     | 说明                           |
| -------- | ------------------------------ |
| 默认插槽 | 布局子件（QSider/QHeader/…）。 |

## Exposes

无。
