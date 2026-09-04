# QRow

## 用途

24 栅格系统的**行容器**，配合 `QCol` 使用，对齐 Ant Design `Row`（`gutter` / `justify` / `align` / `wrap`）。

## 基本用法

```vue
<template>
  <QRow :gutter="16">
    <QCol :span="12"><div class="block">col-12</div></QCol>
    <QCol :span="12"><div class="block">col-12</div></QCol>
  </QRow>
</template>
```

## Props

| 属性      | 类型                                                                                  | 必填 | 默认值    | 说明                                  |
| --------- | ------------------------------------------------------------------------------------- | ---- | --------- | ------------------------------------- |
| `gutter`  | `number \| [number, number]`                                                          | 否   | `0`       | 栅格间距(px)；数组为 `[水平, 垂直]`。 |
| `justify` | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | 否   | `'start'` | 主轴对齐。                            |
| `align`   | `'top' \| 'middle' \| 'bottom' \| 'stretch'`                                          | 否   | `'top'`   | 交叉轴对齐。                          |
| `wrap`    | `boolean`                                                                             | 否   | `true`    | 是否允许换行。                        |

> 间距通过 flex `gap` 实现；`gutter` 与占满整行（span 合计 24）同时使用可能造成换行，如需精确 gutter 间距建议给子项留余量或使用栅格不填满。

## Slots

| 插槽     | 说明                        |
| -------- | --------------------------- |
| 默认插槽 | 若干 `QCol`（或任意内容）。 |

## Exposes

无。
