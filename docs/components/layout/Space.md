# QSpace

## 用途

间距组件，对齐 Ant Design Space。水平 / 垂直排列子内容并统一间距，支持预设档位、任意尺寸、对齐、换行与子项间分隔（split）。

## 基本用法

```vue
<template>
  <QSpace>
    <button>A</button>
    <button>B</button>
    <button>C</button>
  </QSpace>

  <QSpace direction="vertical" :size="16">
    <span>第一行</span>
    <span>第二行</span>
  </QSpace>

  <!-- 分隔：文本分隔 / 分隔条 -->
  <QSpace split="/">
    <span>目录</span>
    <span>详情</span>
    <span>关于</span>
  </QSpace>
  <QSpace split>
    <span>A</span>
    <span>B</span>
  </QSpace>
</template>
```

## Props

| 属性        | 类型                                                 | 必填 | 默认值         | 说明                                                 |
| ----------- | ---------------------------------------------------- | ---- | -------------- | ---------------------------------------------------- |
| `direction` | `'horizontal' \| 'vertical'`                         | 否   | `'horizontal'` | 排列方向：水平 / 垂直。                              |
| `size`      | `'small' \| 'middle' \| 'large' \| number \| string` | 否   | `'middle'`     | 间距：预设档位（8 / 16 / 24px）或数值(px)/CSS 长度。 |
| `align`     | `'start' \| 'end' \| 'center' \| 'baseline'`         | 否   | `'center'`     | 水平排列时的垂直对齐。                               |
| `wrap`      | `boolean`                                            | 否   | `false`        | 是否允许换行（水平模式）。                           |
| `split`     | `boolean \| string`                                  | 否   | 无             | 子项间分隔：`true` 分隔条；字符串作为分隔文本。      |

> `size` 预设：`small` = 8px、`middle` = 16px、`large` = 24px（对应 `--q-space-4/6/8`）。
> `split` 通过子项伪元素实现，适合文本 / 行内子元素；对带背景的块级子元素（如按钮）效果有限。

## Emits

无。

## Slots

| 插槽     | 说明                 |
| -------- | -------------------- |
| 默认插槽 | 需要等距排列的内容。 |

## 可访问性（Accessibility）

- 使用原生块元素容器承载子内容，不改变子元素语义。

## Exposes

无。
