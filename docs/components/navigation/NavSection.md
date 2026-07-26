# QNavSection

## 用途

`QNavSection` 用于呈现可逐层进入的导航数据。点击含 `children` 的节点进入下一层，点击叶子节点会选中该节点并通知调用方；在非顶层时可点击“返回”回到上一层。`sections` 变化时，组件会回到顶层并清除选中状态。

## 基本用法

```vue
<script setup lang="ts">
import { QNavSection } from 'qyani-components';
import type { NavSectionProps } from 'qyani-components';

const sections: NavSectionProps[] = [
  {
    title: '组件',
    children: [{ title: '导航', value: 'navigation' }],
  },
];

function handleSelect(section: NavSectionProps) {
  console.log(section.value);
}
</script>

<template>
  <QNavSection title="目录" :sections="sections" @select="handleSelect" />
</template>
```

## Props

| 名称       | 类型                | 必填 | 默认值 | 说明                                                                                                                                      |
| ---------- | ------------------- | ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `sections` | `NavSectionProps[]` | 是   | 无     | 顶层导航项。`NavSectionProps` 为 `{ title: string; value?: unknown; children?: NavSectionProps[] }`。有非空 `children` 的项可进入子层级。 |
| `title`    | `string`            | 是   | 无     | 顶层导航标题。                                                                                                                            |

## Emits

| 事件     | 参数类型                   | 触发时机                                                                                                   |
| -------- | -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `select` | `section: NavSectionProps` | 用户点击当前层级中不含非空 `children` 的导航项后触发，参数为被点击的导航项。进入子层级或点击返回不会触发。 |

## Slots

无。

## Exposes

无。
