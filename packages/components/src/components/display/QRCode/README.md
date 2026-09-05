# QQRCode

## 用途

二维码：输入文本 / 链接生成可扫描二维码，支持尺寸、前景 / 背景色、纠错等级与中心图标，对齐 Ant Design QRCode 常用能力。基于 `qrcode` 生成矩阵并以内联 SVG 渲染（无 Canvas，利于缩放与测试）。

## 基本用法

```vue
<template>
  <QQRCode value="https://qianrenni.github.io/vue-elements/" />
</template>
```

## Props

| 属性         | 类型                       | 必填 | 默认值    | 说明                                         |
| ------------ | -------------------------- | ---- | --------- | -------------------------------------------- |
| `value`      | `string`                   | 是   | `''`      | 二维码内容（文本 / URL）；为空时不绘制码点。 |
| `size`       | `number`                   | 否   | `160`     | 码宽高（px）。                               |
| `color`      | `string`                   | 否   | `#000000` | 码点颜色。                                   |
| `bgColor`    | `string`                   | 否   | `#ffffff` | 背景色（SVG 填充）。                         |
| `errorLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | 否   | `'M'`     | 纠错等级（H 容错最高，可承载图标）。         |
| `padding`    | `number`                   | 否   | `4`       | 空白边距（模块数）。                         |
| `icon`       | `string`                   | 否   | —         | 中心图标图片地址。                           |
| `iconSize`   | `number`                   | 否   | `size/4`  | 中心图标尺寸（px）。                         |

## Emits

无。

## Exposes

无。

## 说明

- `value` 支持任意文本与 URL；内容较长时按纠错等级自动选择合适版本。
- 中心图标会占用约 1/4 码宽并加白底，若图标较大建议使用 `errorLevel="H"` 保证可扫描性。
