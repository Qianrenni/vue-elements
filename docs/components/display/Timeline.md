# QTimeline

## 用途

时间轴组件，对齐 Ant Design `Timeline`：垂直时间线按时间顺序展示事件，支持左右/交替布局、时间标签、自定义圆点颜色与内容、幽灵待定条目。

## 基本用法

```vue
<template>
  <!-- 默认（轴线居左） -->
  <QTimeline
    :items="[
      { content: '创建仓库', color: 'green' },
      { content: '发布 v1.0', color: 'blue' },
      { content: '修复若干问题', color: 'red' },
    ]"
  />

  <!-- 带时间标签 + 交替布局 -->
  <QTimeline mode="alternate" :items="items" />

  <!-- 倒序 + 幽灵待定 -->
  <QTimeline :items="items" reverse pending="进行中…" />

  <!-- 用 content 插槽渲染富内容 -->
  <QTimeline :items="items">
    <template #content="{ item, index }">
      <strong>{{ index + 1 }}. </strong>{{ item.content }}
    </template>
  </QTimeline>
</template>

<script lang="ts" setup>
const items = [
  { label: '2024-01', content: '第一件事' },
  { label: '2024-02', content: '第二件事', color: 'green', dot: '★' },
  { content: '第三件事', position: 'left' },
];
</script>
```

## Props

| 属性      | 类型                               | 必填 | 默认值   | 说明                                                        |
| --------- | ---------------------------------- | ---- | -------- | ----------------------------------------------------------- |
| `items`   | `TimelineItem[]`                   | 否   | `[]`     | 条目数组。                                                  |
| `mode`    | `'left' \| 'right' \| 'alternate'` | 否   | `'left'` | 轴线位置：`left` 居左、`right` 居右、`alternate` 居中交替。 |
| `reverse` | `boolean`                          | 否   | `false`  | 是否倒序（幽灵条目恒在末尾）。                              |
| `pending` | `boolean \| string`                | 否   | `false`  | 幽灵待定条目：`true` 显示虚线占位；字符串作为内容。         |

> `TimelineItem = { content?: string; label?: string; color?: string; dot?: string; position?: 'left' \| 'right' }`
> `color` 支持预设 `blue / red / green / gray / success / error / warning / processing`，也支持任意 CSS 颜色。

## Slots

| 插槽      | 作用域参数        | 说明             |
| --------- | ----------------- | ---------------- |
| `content` | `{ item, index }` | 自定义条目内容。 |
| `label`   | `{ item, index }` | 自定义时间标签。 |
| `dot`     | `{ item, index }` | 自定义圆点。     |

## Emits

无。

## Exposes

无。
