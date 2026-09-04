# QHeader

## 用途

顶部栏布局组件，作为 `QLayout` 的顶部区域，对齐 Ant Design `Layout.Header`。默认高度由 CSS 变量 `--q-layout-header-height` 控制（默认 56px）。

## 基本用法

```vue
<template>
  <QHeader>
    <span style="font-weight: 600">Logo / 标题</span>
  </QHeader>
</template>
```

## Props

| 属性     | 类型     | 必填 | 默认值 | 说明                              |
| -------- | -------- | ---- | ------ | --------------------------------- |
| `height` | `number` | 否   | 无     | 顶栏高度（px）；缺省用 CSS 变量。 |

## Slots

| 插槽     | 说明       |
| -------- | ---------- |
| 默认插槽 | 顶栏内容。 |

## Exposes

无。
