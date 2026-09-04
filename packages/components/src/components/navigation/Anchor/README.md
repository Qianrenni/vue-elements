# QAnchor

## 用途

锚点导航组件，对齐 Ant Design `Anchor`：数据驱动（`items`）、页面滚动高亮当前锚点、点击平滑滚动到目标并更新 hash。

## 基本用法

```vue
<template>
  <QAnchor :items="items" :offset-top="80" @change="onChange" />
</template>

<script lang="ts" setup>
const items = [
  { href: '#sec-1', title: '第一节' },
  {
    href: '#sec-2',
    title: '第二节',
    children: [{ href: '#sec-2-1', title: '子节 A' }],
  },
];
function onChange(href: string) {
  console.log('激活', href);
}
</script>
```

> 目标元素需在文档中存在对应 `id`（如 `<h2 id="sec-1">`）。滚动高亮以「页面窗口滚动」为默认滚动源。

## Props

| 属性         | 类型           | 必填 | 默认值  | 说明                           |
| ------------ | -------------- | ---- | ------- | ------------------------------ |
| `items`      | `AnchorItem[]` | 否   | `[]`    | 锚点数据（含 children 二级）。 |
| `offsetTop`  | `number`       | 否   | `0`     | 高亮触发偏移（px）。           |
| `updateHash` | `boolean`      | 否   | `true`  | 点击时是否更新地址栏 hash。    |
| `disabled`   | `boolean`      | 否   | `false` | 禁用点击跳转（仅高亮）。       |

> `AnchorItem`：`{ href: string; title: string; children?: AnchorItem[] }`

## Emits

| 事件名   | 参数类型 | 触发时机         |
| -------- | -------- | ---------------- |
| `change` | `(href)` | 激活锚点变化时。 |
| `click`  | `(item)` | 点击锚点时。     |

## 可访问性（Accessibility）

- 激活项 `aria-current="true"`。

## Exposes

无。
