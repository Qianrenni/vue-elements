# QWatermark

## 用途

水印：在内容之上叠加平铺的旋转文本水印，常用于敏感页面 / 内部文档的防泄露标记，对齐 Ant Design Watermark 常用能力。文本经 Canvas 绘制为一张瓦片图后用 CSS 平铺，性能稳定。

## 基本用法

```vue
<template>
  <QWatermark content="机密文档">
    <div class="page">这是受水印保护的内容区域。</div>
  </QWatermark>
</template>
```

## Props

| 属性      | 类型                                              | 必填 | 默认值                                        | 说明                                 |
| --------- | ------------------------------------------------- | ---- | --------------------------------------------- | ------------------------------------ |
| `content` | `string \| string[]`                              | 否   | —                                             | 水印文本；数组表示多行；为空不渲染。 |
| `gap`     | `[number, number]`                                | 否   | `[100, 100]`                                  | 水印间距 [水平, 垂直]（px）。        |
| `offset`  | `[number, number]`                                | 否   | `[0, 0]`                                      | 首个水印偏移 [x, y]（px）。          |
| `rotate`  | `number`                                          | 否   | `-22`                                         | 旋转角度（deg）。                    |
| `font`    | `{ color?, fontSize?, fontWeight?, fontFamily? }` | 否   | `{ color: 'rgba(0,0,0,0.12)', fontSize: 16 }` | 字体配置。                           |
| `zIndex`  | `number`                                          | 否   | `1`                                           | 水印层 z-index。                     |

## Emits

无。

## Exposes

无。

## 说明

- 水印层 `pointer-events: none`，不会拦截下层交互。
- 示例可指定 `type` 语义、`closable` 或 `banner` 组合；需要动态水印（如登录用户名）时让 `content` 响应式即可。
