# QDropdown

## 用途

下拉菜单组件，对齐 Ant Design `Dropdown`：包裹触发元素，展示浮层菜单；支持 `hover` / `click` 触发、受控展开（v-model:open）、点击项自动关闭。

## 基本用法

```vue
<template>
  <QDropdown :items="items" trigger="click" @select="onSelect">
    <QButton>更多操作</QButton>
  </QDropdown>
</template>

<script lang="ts" setup>
const items = [
  { key: 'edit', label: '编辑', icon: 'Edit' },
  { key: 'divider1', label: '', divider: true },
  { key: 'del', label: '删除', danger: true },
];
function onSelect(item: { key: string; label: string }) {
  console.log('选择', item.key);
}
</script>
```

## Props

| 属性        | 类型                                                 | 必填 | 默认值         | 说明                  |
| ----------- | ---------------------------------------------------- | ---- | -------------- | --------------------- |
| `items`     | `DropdownItem[]`                                     | 否   | `[]`           | 菜单数据。            |
| `trigger`   | `'hover' \| 'click'`                                 | 否   | `'hover'`      | 触发方式。            |
| `placement` | `'bottomLeft'\|'bottomRight'\|'topLeft'\|'topRight'` | 否   | `'bottomLeft'` | 弹出位置。            |
| `open`      | `boolean`                                            | 否   | `undefined`    | 展开状态（v-model）。 |
| `disabled`  | `boolean`                                            | 否   | `false`        | 是否禁用。            |

> `DropdownItem`：`{ key, label, icon?, disabled?, danger?, divider? }`
> 不传 `items` 时可用 `content` 插槽自定义浮层内容。

## Emits

| 事件名        | 参数类型 | 触发时机         |
| ------------- | -------- | ---------------- |
| `update:open` | `(open)` | 展开状态变化时。 |
| `select`      | `(item)` | 点击菜单项时。   |

## Slots

| 插槽      | 说明                            |
| --------- | ------------------------------- |
| 默认插槽  | 触发元素。                      |
| `content` | 自定义浮层内容（无 items 时）。 |

## 可访问性（Accessibility）

- 浮层 `role="menu"`，菜单项 `role="menuitem"`，支持键盘 `Enter` 触发；外部点击自动关闭。

## Exposes

无。
