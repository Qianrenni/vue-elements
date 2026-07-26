# QTree

## 用途

递归展示树形节点数据。点击节点会更新传入数据中的 `selected` 状态；包含子节点的节点还会切换其 `expanded` 状态。

## 基本用法

```vue
<script setup lang="ts">
import type { TreeNodeData } from 'qyani-components';

const data: TreeNodeData[] = [
  {
    id: 'root',
    label: '根节点',
    children: [{ id: 'child', label: '子节点' }],
  },
];
</script>

<template>
  <QTree :data="data" @node-click="handleNodeClick" />
</template>
```

## Props

| 名称   | 类型             | 必填 | 默认值 | 说明                                                                                                                                                                                                                     |
| ------ | ---------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data` | `TreeNodeData[]` | 是   | 无     | 树节点数据。`TreeNodeData` 为 `{ id: string \| number; label: string; children?: TreeNodeData[]; expanded?: boolean; selected?: boolean; disabled?: boolean }`。组件会直接修改其中节点的 `selected` 与 `expanded` 字段。 |

## Emits

| 事件         | 载荷类型       | 触发时机                                                               |
| ------------ | -------------- | ---------------------------------------------------------------------- |
| `node-click` | `TreeNodeData` | 点击未禁用节点后触发；在树中标记该节点为选中并取消其他节点选中时发送。 |

## Slots

无。

## Exposes

无。
