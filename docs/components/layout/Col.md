# QCol

## 用途

24 栅格系统的**列**，配合 `QRow` 使用，对齐 Ant Design `Col`（`span` / `offset` / `flex`）。

## 基本用法

```vue
<template>
  <QRow>
    <QCol :span="8"><div class="block">8</div></QCol>
    <QCol :span="8" :offset="4"><div class="block">8 + offset 4</div></QCol>
  </QRow>
</template>
```

## Props

| 属性     | 类型               | 必填 | 默认值 | 说明                                                |
| -------- | ------------------ | ---- | ------ | --------------------------------------------------- |
| `span`   | `number`           | 否   | `24`   | 占据栅格列数（0~24），百分比 = `span / 24 * 100%`。 |
| `offset` | `number`           | 否   | `0`    | 左侧偏移列数。                                      |
| `flex`   | `string \| number` | 否   | 无     | 自定义 flex；设置后优先于 `span` / `offset`。       |

## Slots

| 插槽     | 说明     |
| -------- | -------- |
| 默认插槽 | 列内容。 |

## Exposes

无。
