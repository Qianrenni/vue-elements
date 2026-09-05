# QFlex

## 用途

弹性布局容器（对齐 Ant Design Flex）：一行 CSS flex 封装，用于快速搭主子轴/对齐/间距的布局。

```vue
<template>
  <QFlex justify="space-between" gap="middle">
    <div>左</div>
    <div>右</div>
  </QFlex>
</template>
```

## Props

| 属性       | 类型                                                                                | 必填 | 默认值         | 说明                        |
| ---------- | ----------------------------------------------------------------------------------- | ---- | -------------- | --------------------------- |
| `vertical` | `boolean`                                                                           | 否   | `false`        | 主轴纵向（column）。        |
| `wrap`     | `boolean`                                                                           | 否   | `false`        | 是否换行。                  |
| `justify`  | `flex-start \| center \| flex-end \| space-between \| space-around \| space-evenly` | 否   | `'flex-start'` | 主轴对齐。                  |
| `align`    | `flex-start \| center \| flex-end \| stretch \| baseline`                           | 否   | `'flex-start'` | 交叉轴对齐。                |
| `gap`      | `number \| 'small' \| 'middle' \| 'large' \| string`                                | 否   | `'middle'`     | 间距（16px）。              |
| `flex`     | `number \| string`                                                                  | 否   | —              | 容器 CSS flex（父级子项）。 |
| `tag`      | `string`                                                                            | 否   | `'div'`        | 渲染标签。                  |

## Slots

| 插槽     | 说明     |
| -------- | -------- |
| 默认插槽 | 子元素。 |

## 说明

- `gap` 档位 small/middle/large = 8/16/24px；数字视为 px。
- 如需按 24 栅格布局，请用 `QRow`/`QCol`。
