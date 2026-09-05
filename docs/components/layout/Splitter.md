# QSplitter

## 用途

分隔面板（对齐 antd Splitter 基础能力）：两个面板 + 可拖拽分隔条，支持左右/上下方向、受控尺寸、最小/最大限制与键盘调整。

```vue
<template>
  <QSplitter :size="260" :default-size="300" style="height: 320px">
    <template #first>
      <div class="list-pane">列表</div>
    </template>
    <template #second>
      <div class="detail-pane">详情</div>
    </template>
  </QSplitter>
</template>
```

## Props

| 属性          | 类型                | 必填 | 默认值  | 说明                                  |
| ------------- | ------------------- | ---- | ------- | ------------------------------------- |
| `direction`   | `'row' \| 'column'` | 否   | `'row'` | 方向：row 左右 / column 上下。        |
| `size`        | `number \| string`  | 否   | —       | 首个面板尺寸（受控 `v-model:size`）。 |
| `defaultSize` | `number`            | 否   | `300`   | 首个面板默认尺寸(px)。                |
| `min`         | `number`            | 否   | `60`    | 首个面板最小尺寸(px)。                |
| `max`         | `number`            | 否   | —       | 最大尺寸(px)，默认不超过容器减 min。  |
| `resizable`   | `boolean`           | 否   | `true`  | 是否可拖拽。                          |
| `gutter`      | `number`            | 否   | `8`     | 分隔条宽/厚(px)。                     |

## Slots

| 插槽      | 说明         |
| --------- | ------------ |
| `#first`  | 首面板内容。 |
| `#second` | 次面板内容。 |

## Emits

| 事件           | 参数     | 触发时机          |
| -------------- | -------- | ----------------- |
| `update:size`  | `number` | 拖拽/键盘调整时。 |
| `resize-start` | —        | 开始拖拽时。      |
| `resize-end`   | `number` | 拖拽结束时。      |

## 说明

- 尺寸拖拽在主轴方向上生效；分隔条支持鼠标/触屏拖拽与键盘方向键（每次 ±10px）。
- 多栏布局可用 `QSplitter` 嵌套实现。
