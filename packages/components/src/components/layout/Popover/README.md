# QPopover

## 用途

气泡卡片：点击 / 鼠标移入目标元素，弹出可交互卡片（标题 + 内容）。与 `QTooltip` 不同，卡片内可承载链接、按钮等操作，对齐 Ant Design Popover 常用能力。

## 基本用法

```vue
<template>
  <QPopover title="标题" content="卡片内容，可放链接或按钮">
    <QButton>悬停/点击我</QButton>
  </QPopover>
</template>
```

## Props

| 属性              | 类型                                                  | 必填 | 默认值    | 说明                                         |
| ----------------- | ----------------------------------------------------- | ---- | --------- | -------------------------------------------- |
| `title`           | `string`                                              | 否   | —         | 卡片标题（也可用 `#title` 插槽）。           |
| `content`         | `string`                                              | 否   | —         | 卡片内容（也可用 `#content` 插槽）。         |
| `placement`       | `'top' \| 'topLeft' \| ... \| 'rightBottom'`（12 向） | 否   | `'top'`   | 弹出方向。                                   |
| `trigger`         | `'hover' \| 'focus' \| 'click'`                       | 否   | `'hover'` | 触发方式。                                   |
| `open`            | `boolean`                                             | 否   | —         | 受控显隐（`v-model:open`）。                 |
| `arrow`           | `boolean`                                             | 否   | `true`    | 是否显示箭头。                               |
| `disabled`        | `boolean`                                             | 否   | `false`   | 禁用弹出。                                   |
| `mouseEnterDelay` | `number`                                              | 否   | `0`       | 悬停后延时（ms）显示。                       |
| `mouseLeaveDelay` | `number`                                              | 否   | `120`     | 移出后延时（ms）隐藏（留时间移到卡片内容）。 |
| `width`           | `string`                                              | 否   | —         | 卡片宽度（CSS 长度）。                       |

`placement` 取值：`top / topLeft / topRight / bottom / bottomLeft / bottomRight / left / leftTop / leftBottom / right / rightTop / rightBottom`。

## 触发方式

- `hover`：移入显示、移出（延时后）隐藏；鼠标可移入卡片内停留不关闭。
- `focus`：聚焦显示、失焦隐藏，便于键盘可达。
- `click`：点击切换；点击卡片外部自动关闭，按 `Esc` 关闭。

## 内容插槽

| 插槽       | 作用域参数 | 回退内容         |
| ---------- | ---------- | ---------------- |
| `#content` | —          | 显示 `content`。 |
| `#title`   | —          | 显示 `title`。   |

默认插槽为触发元素（任意内容）。

## Emits

| 事件          | 参数      | 触发时机                            |
| ------------- | --------- | ----------------------------------- |
| `update:open` | `boolean` | 显隐变化时（配合 `v-model:open`）。 |
| `open-change` | `boolean` | 显隐变化时。                        |

## 受控示例

```vue
<template>
  <QPopover v-model:open="open" title="控制面板" trigger="click">
    <QButton>打开</QButton>
  </QPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const open = ref(false);
</script>
```

## Exposes

无。

## 说明

- 弹层 `Teleport` 到 `body` 并使用 `fixed` 视口定位；滚动 / 缩放自动跟随触发元素重定位并收敛在视口内。
- 需要位置 / 内容随视图更新的场景（如列表内）建议在布局稳定后再触发。
