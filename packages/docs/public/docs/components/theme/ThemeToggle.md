# QThemeToggle

## 用途

`QThemeToggle` 用于切换日间与夜间主题。组件使用 `useFollowSystemTheme` 管理主题状态：当前为深色模式时显示夜间图标，否则显示日间图标；点击组件即执行主题切换。

## 基本用法

```vue
<script setup lang="ts">
import { QThemeToggle } from 'qyani-components';
</script>

<template>
  <QThemeToggle size="24" day-icon="Sun" night-icon="Moon" />
</template>
```

## Props

| 名称        | 类型               | 必填 | 默认值   | 说明                                  |
| ----------- | ------------------ | ---- | -------- | ------------------------------------- |
| `size`      | `string \| number` | 否   | `20`     | 传递给当前显示的 `QIcon` 的图标尺寸。 |
| `dayIcon`   | `string`           | 否   | `'Sun'`  | 非深色模式时显示的图标名称。          |
| `nightIcon` | `string`           | 否   | `'Moon'` | 深色模式时显示的图标名称。            |

## Emits

无。主题切换不会由该组件派发自定义事件。

## Slots

无。

## Exposes

无。
