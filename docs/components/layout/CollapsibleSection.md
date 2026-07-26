# QCollapsibleSection

## 用途

提供带可选箭头控制区的可折叠内容区域，支持四个方向的展开与收起动画。

## 基本用法

```vue
<template>
  <QCollapsibleSection direction="down" :initial-expanded="true">
    可折叠内容
  </QCollapsibleSection>
</template>
```

## Props

| 名称              | 类型                                  | 必填 | 默认值   | 说明                                       |
| ----------------- | ------------------------------------- | ---- | -------- | ------------------------------------------ |
| `isShowArrow`     | `boolean`                             | 否   | `true`   | 是否渲染用于切换状态的箭头控制区。         |
| `initialExpanded` | `boolean`                             | 否   | `true`   | 组件初始化时是否展开；后续不响应该值变化。 |
| `direction`       | `'up' \| 'down' \| 'left' \| 'right'` | 否   | `'down'` | 箭头位置及内容展开动画方向。               |

## Emits

无。

## Slots

| 名称      | 作用域参数 | 后备内容 |
| --------- | ---------- | -------- |
| `default` | 无         | 无。     |

## Exposes

| 方法     | 参数 | 返回值 | 说明                       |
| -------- | ---- | ------ | -------------------------- |
| `toggle` | 无   | `void` | 在展开和收起状态之间切换。 |
| `close`  | 无   | `void` | 收起内容。                 |
| `open`   | 无   | `void` | 展开内容。                 |
