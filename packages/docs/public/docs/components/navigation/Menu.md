# QMenu

## 用途

导航菜单组件，对齐 Ant Design `Menu`：数据驱动、支持两级子菜单，`horizontal`（横向）/ `vertical`（纵向浮层）/ `inline`（内联展开）三种模式；选中态、展开态支持受控（v-model）。

## 基本用法

```vue
<template>
  <QMenu
    mode="inline"
    :items="items"
    v-model:selectedKeys="selected"
    v-model:openKeys="open"
    @click="onClick"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = [
  {
    key: 'nav',
    label: '导航',
    icon: 'Compass',
    children: [
      { key: 'menu', label: '菜单' },
      { key: 'dropdown', label: '下拉', danger: true },
    ],
  },
  { key: 'other', label: '其他' },
];
const selected = ref<string[]>([]);
const open = ref<string[]>([]);
function onClick({ key, keyPath }: { key: string; keyPath: string[] }) {
  console.log(key, keyPath);
}
</script>
```

## Props

| 属性           | 类型                                 | 必填 | 默认值     | 说明                           |
| -------------- | ------------------------------------ | ---- | ---------- | ------------------------------ |
| `items`        | `MenuItem[]`                         | 否   | `[]`       | 菜单数据（含 children 两级）。 |
| `mode`         | `'horizontal'\|'vertical'\|'inline'` | 否   | `'inline'` | 菜单方向模式。                 |
| `selectedKeys` | `string[]`                           | 否   | `[]`       | 选中项 key（v-model）。        |
| `openKeys`     | `string[]`                           | 否   | `[]`       | 展开子菜单 key（v-model）。    |
| `multiple`     | `boolean`                            | 否   | `false`    | 是否多选。                     |
| `disabled`     | `boolean`                            | 否   | `false`    | 整体禁用。                     |

> `MenuItem`：`{ key, label, icon?, disabled?, danger?, divider?, children? }`

## Emits

| 事件名                | 参数类型             | 触发时机                 |
| --------------------- | -------------------- | ------------------------ |
| `update:selectedKeys` | `(keys: string[])`   | 选中项变化时。           |
| `update:openKeys`     | `(keys: string[])`   | 展开项变化时。           |
| `click`               | `({ key, keyPath })` | 点击菜单项（含子项）时。 |
| `openChange`          | `(keys: string[])`   | 展开状态变化时。         |

## 可访问性（Accessibility）

- 语义化 `role="menu/menuitem"`，键盘 `Enter/Space` 触发；`aria-expanded` 标记展开态。

## Exposes

无。
