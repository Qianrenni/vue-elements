# QPopconfirm

## 用途

气泡确认框：点击 / 悬停目标元素弹出确认卡片（标题 + 描述 + 确认 / 取消），复用 `QPopover` 的定位与触发能力；点击确认后关闭，支持返回 Promise 的异步确认（按钮进入加载态），对齐 Ant Design Popconfirm 常用能力。

## 基本用法

```vue
<template>
  <QPopconfirm
    title="确定删除这条记录吗？"
    description="删除后不可恢复。"
    ok-text="删除"
    @confirm="remove"
  >
    <QButton type="danger">删除</QButton>
  </QPopconfirm>
</template>
```

## Props

| 属性              | 类型                             | 必填 | 默认值    | 说明                                      |
| ----------------- | -------------------------------- | ---- | --------- | ----------------------------------------- |
| `title`           | `string`                         | 否   | —         | 提示标题。                                |
| `description`     | `string`                         | 否   | —         | 详细描述。                                |
| `trigger`         | `'hover' \| 'focus' \| 'click'`  | 否   | `'click'` | 触发方式。                                |
| `placement`       | `QPopoverPlacement`（12 方向）   | 否   | `'top'`   | 弹出位置。                                |
| `open`            | `boolean`                        | 否   | —         | 受控显隐（`v-model:open`）。              |
| `arrow`           | `boolean`                        | 否   | `true`    | 是否显示箭头。                            |
| `disabled`        | `boolean`                        | 否   | `false`   | 禁用弹出。                                |
| `okText`          | `string`                         | 否   | `'确定'`  | 确认按钮文案。                            |
| `cancelText`      | `string`                         | 否   | `'取消'`  | 取消按钮文案。                            |
| `showCancel`      | `boolean`                        | 否   | `true`    | 是否显示取消按钮。                        |
| `showIcon`        | `boolean`                        | 否   | `true`    | 是否显示标题前提示图标。                  |
| `mouseEnterDelay` | `number`                         | 否   | `0`       | hover 显示延时(ms)。                      |
| `mouseLeaveDelay` | `number`                         | 否   | `120`     | hover 隐藏延时(ms)。                      |
| `onConfirm`       | `() => void \| Promise<unknown>` | 否   | —         | 确认回调；返回 Promise 时按钮进入加载态。 |
| `onCancel`        | `() => void`                     | 否   | —         | 取消回调。                                |

## 异步确认

```vue
<script lang="ts" setup>
async function handleConfirm() {
  await requestDelete(); // 成功后关闭
}
</script>

<template>
  <QPopconfirm title="确认删除？" :on-confirm="handleConfirm">
    <QButton>删除</QButton>
  </QPopconfirm>
</template>
```

确认按钮在 Promise 完成前保持 loading 且禁用；`resolve` 后自动关闭，`reject` 时保持展开。

## Slots

| 插槽           | 说明           |
| -------------- | -------------- |
| `#icon`        | 覆盖提示图标。 |
| `#title`       | 覆盖标题区域。 |
| `#description` | 覆盖描述区域。 |
| 默认插槽       | 触发元素。     |

## Emits

| 事件          | 参数      | 触发时机                            |
| ------------- | --------- | ----------------------------------- |
| `update:open` | `boolean` | 显隐变化时（配合 `v-model:open`）。 |
| `confirm`     | —         | 点击确认时（`onConfirm` 之前）。    |
| `cancel`      | —         | 点击取消时（`onCancel` 之前）。     |

## Exposes

无。

## 说明

- 弹层、定位、hover/click/外部关闭等机制由 `QPopover` 提供；`description` 出现时标题与描述分行。
- 异步确认期间点击卡片外部仍会收起（与受控用法一致）；如需禁止收起可保持 `open` 受控由外部管理。
