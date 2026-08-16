# QTreeNode

## 用途

树节点的递归渲染单元，通常由 `QTree` 自动使用；可独立使用以展示单个节点及其子树。

## 基本用法

```vue
<script setup lang="ts">
import type { TreeNodeData } from 'qyani-components';

const node: TreeNodeData = { id: '1', label: '节点' };
</script>

<template>
  <QTreeNode :node="node" :level="0" @node-click="handleNodeClick" />
</template>
```

## Props

| 名称    | 类型           | 必填 | 默认值 | 说明                                                                                                                                                        |
| ------- | -------------- | ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node`  | `TreeNodeData` | 是   | 无     | 要渲染的节点数据。类型为 `{ id: string \| number; label: string; children?: TreeNodeData[]; expanded?: boolean; selected?: boolean; disabled?: boolean }`。 |
| `level` | `number`       | 是   | 无     | 当前节点层级；子节点渲染时在此基础上加 1。                                                                                                                  |

## Emits

| 事件          | 载荷类型       | 触发时机                                                                                            |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| `node-click`  | `TreeNodeData` | 点击未禁用节点时触发；子节点事件会向上转发。                                                        |
| `node-toggle` | `TreeNodeData` | 点击未禁用且存在子节点的节点时触发；子节点事件会向上转发。该组件仅发出事件，不直接修改 `expanded`。 |

## Slots

无。

## 可访问性（Accessibility）

- 节点使用 `role="treeitem"`，带 `aria-level`、`aria-expanded`（有子节点时）与 `aria-selected`；支持 Enter / Space 触发。
- 文件夹 / 文件图标为纯装饰，标记 `aria-hidden`。

## Exposes

无。
