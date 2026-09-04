# QSteps

## 用途

步骤条，对齐 Ant Design `Steps`。支持水平 / 垂直、`finish / process / error / wait` 状态、小尺寸与可点击标题。

## 基本用法

```vue
<template>
  <QSteps
    :current="1"
    :items="[
      { title: '填写信息' },
      { title: '确认订单', description: '请核对订单内容' },
      { title: '完成' },
    ]"
  />
</template>
```

## Props

| 属性        | 类型                                        | 必填 | 默认值         | 说明                                 |
| ----------- | ------------------------------------------- | ---- | -------------- | ------------------------------------ |
| `current`   | `number`                                    | 否   | `0`            | 当前步骤索引（从 0 开始）。          |
| `status`    | `'process' \| 'finish' \| 'error'`          | 否   | `'process'`    | 当前步骤状态。                       |
| `direction` | `'horizontal' \| 'vertical'`                | 否   | `'horizontal'` | 排列方向。                           |
| `size`      | `'default' \| 'small'`                      | 否   | `'default'`    | 尺寸。                               |
| `items`     | `{ title: string; description?: string }[]` | 否   | `[]`           | 步骤项。                             |
| `clickable` | `boolean`                                   | 否   | `false`        | 步骤是否可点击（触发 `stepClick`）。 |

## Emits

| 事件名      | 参数类型        | 触发时机                   |
| ----------- | --------------- | -------------------------- |
| `stepClick` | `index: number` | 点击可点击步骤标题时触发。 |

## Slots

无。

## 可访问性（Accessibility）

- 当前步骤 `aria-current="step"`；可点击时步骤头带 `role="button"` 与键盘支持。

## Exposes

无。
