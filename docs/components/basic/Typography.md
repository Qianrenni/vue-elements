# QTypography

## 用途

排版组件，**单组件覆盖 Text / Title / Paragraph** 用法，对齐 Ant Design Typography 常用 API。通过 `level` 渲染 `h1~h5` 标题、`paragraph` 渲染段落、缺省渲染行内文本；支持语义色、加粗/斜体/下划线/删除线/高亮/行内代码/按键、省略号、复制与编辑。

## 基本用法

```vue
<template>
  <!-- 行内文本 -->
  <QTypography>普通文本</QTypography>
  <QTypography type="secondary">次要文本</QTypography>
  <QTypography type="danger">危险文本</QTypography>

  <!-- 标题 -->
  <QTypography :level="1">一级标题</QTypography>
  <QTypography :level="3">三级标题</QTypography>

  <!-- 段落 / 组合样式 -->
  <QTypography paragraph>一段说明文字……</QTypography>
  <QTypography strong delete code>加粗 + 删除线 + 代码</QTypography>
</template>
```

省略、复制与编辑：

```vue
<template>
  <QTypography paragraph :ellipsis="2" style="width: 320px">
    很长的段落内容，超出两行后自动截断显示省略号……
  </QTypography>
  <QTypography copyable>复制我</QTypography>
  <QTypography editable @change="(v: string) => (text = v)"
    >点击 ✎ 编辑</QTypography
  >
</template>
```

## Props

| 属性        | 类型                                                | 必填 | 默认值  | 说明                                               |
| ----------- | --------------------------------------------------- | ---- | ------- | -------------------------------------------------- |
| `level`     | `1 \| 2 \| 3 \| 4 \| 5`                             | 否   | 无      | 以标题渲染并指定层级，根标签为 `h1~h5`。           |
| `paragraph` | `boolean`                                           | 否   | `false` | 是否以段落渲染（根标签 `p`）。                     |
| `tag`       | `string`                                            | 否   | 无      | 自定义根标签名，优先级高于 `level`/`paragraph`。   |
| `type`      | `'secondary' \| 'success' \| 'warning' \| 'danger'` | 否   | 无      | 语义颜色。                                         |
| `disabled`  | `boolean`                                           | 否   | `false` | 弱化显示（置灰）。                                 |
| `strong`    | `boolean`                                           | 否   | `false` | 加粗。                                             |
| `italic`    | `boolean`                                           | 否   | `false` | 斜体。                                             |
| `underline` | `boolean`                                           | 否   | `false` | 下划线。                                           |
| `delete`    | `boolean`                                           | 否   | `false` | 删除线。                                           |
| `mark`      | `boolean`                                           | 否   | `false` | 高亮标记。                                         |
| `code`      | `boolean`                                           | 否   | `false` | 行内代码样式。                                     |
| `keyboard`  | `boolean`                                           | 否   | `false` | 键盘按键样式。                                     |
| `ellipsis`  | `boolean \| number`                                 | 否   | `false` | `true` 单行省略；数字表示最多行数（多行截断）。    |
| `copyable`  | `boolean`                                           | 否   | `false` | 显示复制按钮，点击复制文本。                       |
| `editable`  | `boolean`                                           | 否   | `false` | 是否可编辑：点击 ✎ 进入编辑态，保存触发 `change`。 |
| `copyText`  | `string`                                            | 否   | 无      | 复制内容；缺省复制元素文本。                       |

> 语义标签（`strong`/`code`/`mark` 等）当前以视觉样式实现；如需原生语义标签可直接传 `tag`（如 `tag="strong"`）。

## Emits

| 事件名   | 参数类型 | 触发时机                                             |
| -------- | -------- | ---------------------------------------------------- |
| `copy`   | 无       | 复制按钮点击成功复制后触发。                         |
| `change` | `string` | 编辑保存（失焦 / Enter / ✓）后触发，参数为编辑结果。 |

## Slots

| 插槽     | 说明                     |
| -------- | ------------------------ |
| 默认插槽 | 排版文本或任意节点内容。 |

## 可访问性（Accessibility）

- 复制 / 编辑 / 保存 / 取消按钮均为原生 `<button>`，带 `type="button"`、`aria-label` 与 `title`；复制后文案切换为“已复制”。
- 编辑态输入为原生 `<textarea>`（带 `aria-label`），支持 Enter 保存、Esc 取消。
- 文本颜色对比度基于语义 token（success/warning/danger/secondary），随主题切换。

## Exposes

无。
