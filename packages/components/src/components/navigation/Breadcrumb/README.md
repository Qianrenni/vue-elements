# QBreadcrumb

## 用途

面包屑导航，对齐 Ant Design `Breadcrumb`（`items` / `separator`）。支持链接项、可点击文字项与当前页高亮。

## 基本用法

```vue
<template>
  <QBreadcrumb
    :items="[
      { title: '首页' },
      { title: '组件', href: '/components' },
      { title: 'Button' },
    ]"
    separator="/"
  />
</template>
```

## Props

| 属性        | 类型                                 | 必填 | 默认值 | 说明                           |
| ----------- | ------------------------------------ | ---- | ------ | ------------------------------ |
| `items`     | `{ title: string; href?: string }[]` | 否   | `[]`   | 面包屑数据；末项渲染为当前页。 |
| `separator` | `string`                             | 否   | `'/'`  | 分隔符文本。                   |

> 不传 `items` 时，可在默认插槽内自定义结构。

## Emits

| 事件名      | 参数类型        | 触发时机                       |
| ----------- | --------------- | ------------------------------ |
| `itemClick` | `(item, index)` | 点击无 `href` 的非末项时触发。 |

## Slots

| 插槽     | 说明                                  |
| -------- | ------------------------------------- |
| 默认插槽 | 自定义结构（当未传 `items` 时渲染）。 |

## 可访问性（Accessibility）

- 容器 `nav` 带 `aria-label="面包屑"`；当前页 `aria-current="page"`。

## Exposes

无。
