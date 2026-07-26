# QCollapse

## 用途

折叠面板容器。与 `QCollapseItem` 配合使用，支持普通多开模式与手风琴模式。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const activeNames = ref<string[]>(['first']);
</script>

<template>
  <QCollapse v-model="activeNames">
    <QCollapseItem name="first" title="第一个面板">内容</QCollapseItem>
    <QCollapseItem name="second" title="第二个面板">内容</QCollapseItem>
  </QCollapse>
</template>
```

## Props

| 名称         | 类型                 | 必填 | 默认值           | 说明                                     |
| ------------ | -------------------- | ---- | ---------------- | ---------------------------------------- |
| `modelValue` | `string \| string[]` | 否   | 无（源码未设置） | 当前激活面板名称；单个字符串或名称数组。 |
| `accordion`  | `boolean`            | 否   | 无（源码未设置） | 为真时一次仅保留一个激活面板。           |

## Emits

| 事件                | 载荷类型             | 触发时机                                                                                          |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| `update:modelValue` | `string \| string[]` | 点击未禁用的 `QCollapseItem` 后触发；手风琴模式发送激活名称或空字符串，普通模式发送激活名称数组。 |

## Slots

| 名称      | 作用域参数 | 后备内容                       |
| --------- | ---------- | ------------------------------ |
| `default` | 无         | 无；通常放置 `QCollapseItem`。 |

## Exposes

无。
