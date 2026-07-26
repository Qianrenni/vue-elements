# QMarkdownRender

## 用途

将 Markdown 内容渲染为 HTML，支持常用代码语法高亮、数学公式和可选的复制按钮、悬浮目录。

## 基本用法

```vue
<QMarkdownRender content="# 标题\n\n正文" :show-toc="true" />
```

## Props

| 名称       | 类型      | 必填 | 默认值  | 说明                                                              |
| ---------- | --------- | ---- | ------- | ----------------------------------------------------------------- |
| `content`  | `string`  | 是   | 无      | 要渲染的 Markdown 原文；变更后会重新解析。                        |
| `showCopy` | `boolean` | 否   | `true`  | 是否在内容非空时显示复制按钮；点击后将原始 `content` 写入剪贴板。 |
| `showToc`  | `boolean` | 否   | `false` | 是否在存在标题时显示悬浮目录。                                    |

## Emits

无。

## Slots

无。

## Exposes

| 方法           | 类型                                                                                             | 说明                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `getTOC`       | `() => TocItem[]`                                                                                | 返回当前解析得到的目录项。`TocItem` 为 `{ id: string; text: string; level: number }`。 |
| `scrollToById` | `(id: string) => void`                                                                           | 平滑滚动到指定标题 ID，并更新地址栏锚点。                                              |
| `scrollTo`     | `(options: { left?: number; top?: number; behavior?: 'smooth' \| 'auto' \| 'instant' }) => void` | 调用组件根容器的滚动方法。                                                             |
| `getContent`   | `() => string`                                                                                   | 返回当前原始 Markdown 内容。                                                           |
