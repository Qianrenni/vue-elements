# QLoading

## 用途

`QLoading` 用于展示加载状态。组件根据 `type` 渲染呼吸点、旋转圆环或骨架屏动画；设置 `text` 后会在动画下方显示提示文字。

## 基本用法

```vue
<script setup lang="ts">
import { QLoading } from 'qyani-components';
</script>

<template>
  <QLoading type="spinner" text="正在加载" />
</template>
```

## Props

| 名称   | 类型                                     | 必填 | 默认值        | 说明                                                |
| ------ | ---------------------------------------- | ---- | ------------- | --------------------------------------------------- |
| `type` | `'breathing' \| 'spinner' \| 'skeleton'` | 否   | `'breathing'` | 要显示的加载动画类型。                              |
| `show` | `boolean`                                | 否   | `true`        | 是否渲染加载内容；为 `false` 时组件不渲染任何 DOM。 |
| `text` | `string`                                 | 否   | `''`          | 加载提示文字；空字符串时不显示文字段落。            |

## Emits

无。

## Slots

无。

## Exposes

无。
