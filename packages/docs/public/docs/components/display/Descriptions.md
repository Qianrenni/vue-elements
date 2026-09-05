# QDescriptions

## 用途

描述列表：以网格形式展示多个只读字段（详情页信息展示），支持边框、列数、水平/垂直布局、尺寸与跨列 `span`，对齐 Ant Design Descriptions 常用能力。

## 基本用法

```vue
<template>
  <QDescriptions title="用户信息" :items="items" />
</template>

<script lang="ts" setup>
const items = [
  { key: 'name', label: '姓名', content: '张三' },
  { key: 'phone', label: '电话', content: '1810000000' },
  { key: 'city', label: '城市', content: '杭州' },
  { key: 'remark', label: '备注', content: '空' },
  { key: 'address', label: '地址', content: '浙江省杭州市西湖区万塘路 18 号' },
];
</script>
```

## Props

| 属性           | 类型                             | 必填 | 默认值         | 说明                                             |
| -------------- | -------------------------------- | ---- | -------------- | ------------------------------------------------ |
| `title`        | `string`                         | 否   | —              | 列表标题（也可用 `#title` 插槽）。               |
| `items`        | `QDescriptionItem[]`             | 否   | `[]`           | 描述项配置。                                     |
| `column`       | `number`                         | 否   | `3`            | 一行显示项数（任意正整数）。                     |
| `layout`       | `'horizontal' \| 'vertical'`     | 否   | `'horizontal'` | 水平（标签在内容左侧）或垂直（标签在内容上方）。 |
| `size`         | `'small' \| 'middle' \| 'large'` | 否   | `'middle'`     | 尺寸。                                           |
| `bordered`     | `boolean`                        | 否   | `false`        | 是否显示边框。                                   |
| `colon`        | `boolean`                        | 否   | `true`         | 是否在标签后显示冒号（horizontal 布局生效）。    |
| `labelStyle`   | `CSSProperties`                  | 否   | —              | 标签自定义样式。                                 |
| `contentStyle` | `CSSProperties`                  | 否   | —              | 内容自定义样式。                                 |

`QDescriptionItem = { key?: string; label?: string; content?: string; span?: number }`。

- `span`：占据的列数（1 ~ `column`），例如 `column=3` 时 `span=2` 使该项独占两列宽。
- 带边框（`bordered`）时标题行不渲染冒号（与 Ant Design 一致）。

## 内容插槽

| 插槽                | 作用域参数        | 回退内容              |
| ------------------- | ----------------- | --------------------- |
| `#<item.key>`       | `{ item, index }` | 显示 `item.content`。 |
| `#<item.key>-label` | `{ item, index }` | 显示 `item.label`。   |
| `#title`            | —                 | 显示 `title`。        |
| `#extra`            | —                 | 空（右上操作区）。    |

## Emits

无。

## Exposes

无。
