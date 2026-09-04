# QTooltip

## 用途

文字提示组件，对齐 Ant Design Tooltip。弹层 `Teleport` 到 `body` 并基于触发元素视口定位（支持 8 个位置、箭头、hover/focus/click 触发、受控 `open` 与进出延迟）。

## 基本用法

```vue
<template>
  <QTooltip content="提示文字">
    <QButton type="primary">悬停查看</QButton>
  </QTooltip>
</template>
```

不同位置与触发方式：

```vue
<template>
  <QTooltip content="上方提示" placement="top">上</QTooltip>
  <QTooltip content="下方提示" placement="bottomRight">下</QTooltip>
  <QTooltip content="点击触发" trigger="click">点我</QTooltip>
</template>
```

受控显隐：

```vue
<template>
  <QTooltip v-model:open="open" content="受控提示">
    <span>受控示例</span>
  </QTooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>
```

## Props

| 属性              | 类型                                                                                                 | 必填 | 默认值    | 说明                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ---- | --------- | ------------------------------------------------------- |
| `content`         | `string`                                                                                             | 否   | 无        | 提示内容（也可用 `content` 插槽）。                     |
| `placement`       | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'right'` | 否   | `'top'`   | 弹出位置。                                              |
| `open`            | `boolean`                                                                                            | 否   | 无        | 受控显隐（`v-model:open`）；缺省由 `trigger` 自动管理。 |
| `trigger`         | `'hover' \| 'focus' \| 'click'`                                                                      | 否   | `'hover'` | 触发方式；`hover` 同时启用键盘 `focus`。                |
| `arrow`           | `boolean`                                                                                            | 否   | `true`    | 是否显示箭头。                                          |
| `color`           | `string`                                                                                             | 否   | 无        | 气泡背景色（缺省深色）。                                |
| `disabled`        | `boolean`                                                                                            | 否   | `false`   | 禁用提示。                                              |
| `mouseEnterDelay` | `number`                                                                                             | 否   | `0`       | 悬停后延时（ms）显示。                                  |
| `mouseLeaveDelay` | `number`                                                                                             | 否   | `0`       | 移出后延时（ms）隐藏。                                  |

## Emits

| 事件名        | 参数类型  | 触发时机                                |
| ------------- | --------- | --------------------------------------- |
| `update:open` | `boolean` | 显隐变化时触发（配合 `v-model:open`）。 |

## Slots

| 插槽      | 说明                                |
| --------- | ----------------------------------- |
| 默认插槽  | 触发元素（任意内容）。              |
| `content` | 提示内容（优先于 `content` prop）。 |

## 可访问性（Accessibility）

- 弹层带 `role="tooltip"`；`hover` 触发同时响应键盘 `focus`/`blur`，键盘可达。
- `disabled` 时不渲染弹层。

## Exposes

无。
