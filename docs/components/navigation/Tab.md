# QTab

## 用途

`QTab` 用于展示字符串标签列表，并维护当前激活标签。初始激活第一个标签；当列表为空时没有激活项。

## 基本用法

```vue
<script setup lang="ts">
import { QTab } from 'qyani-components';

function handleSelect(index: number) {
  console.log(index);
}
</script>

<template>
  <QTab :list="['概览', '订单', '设置']" @select="handleSelect" />
</template>
```

## Props

| 名称          | 类型       | 必填 | 默认值     | 说明                                                                                              |
| ------------- | ---------- | ---- | ---------- | ------------------------------------------------------------------------------------------------- |
| `list`        | `string[]` | 是   | 无         | 要展示的标签文本列表。                                                                            |
| `activeClass` | `string`   | 否   | `'active'` | 激活标签额外使用的 CSS 类名。组件内置激活态样式使用 `active` 类；自定义该值仅影响动态添加的类名。 |

## Emits

| 事件     | 参数类型        | 触发时机                                                         |
| -------- | --------------- | ---------------------------------------------------------------- |
| `select` | `index: number` | 用户点击任一标签后触发，参数为该标签在 `list` 中的从零开始索引。 |

## Slots

无。

## Exposes

无。
