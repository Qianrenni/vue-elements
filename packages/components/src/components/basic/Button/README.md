# QButton

## 用途

通用按钮组件，对齐 Ant Design 的按钮 API。支持 `primary / default / dashed / text / link` 五种语义类型，`level1~6` 六档大小（默认 `level3`），以及 `danger`、`ghost`、`block`、`loading`、图标插槽等能力；传入 `href` 时渲染为链接按钮。

## 基本用法

```vue
<template>
  <QButton type="primary">主按钮</QButton>
  <QButton>默认按钮</QButton>
  <QButton type="dashed">虚线按钮</QButton>
  <QButton type="text">文本按钮</QButton>
  <QButton type="link">链接按钮</QButton>
</template>
```

带图标、加载态与大小档位：

```vue
<template>
  <QButton type="primary" loading>加载中</QButton>
  <QButton type="primary" danger>危险按钮</QButton>
  <QButton block>块级按钮</QButton>
  <QButton href="https://example.com" target="_blank">链接</QButton>
</template>
```

六档大小（1 最小 → 6 最大，默认 `level3`）：

```vue
<template>
  <QButton type="primary" :level="1">level 1</QButton>
  <QButton type="primary" :level="3">level 3（默认）</QButton>
  <QButton type="primary" :level="6">level 6</QButton>
</template>
```

## Props

| 属性        | 类型                                                     | 必填 | 默认值      | 说明                                                         |
| ----------- | -------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------ |
| `type`      | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | 否   | `'default'` | 按钮语义类型。                                               |
| `level`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                             | 否   | `3`         | 按钮大小档位（1 最小 → 6 最大）。                            |
| `size`      | `'small' \| 'middle' \| 'large'`                         | 否   | `'middle'`  | 兼容旧 API 的尺寸，映射到 `level` 2/3/4；传 `level` 时忽略。 |
| `htmlType`  | `'button' \| 'submit' \| 'reset'`                        | 否   | `'button'`  | 原生 `button` 的 type，用于表单提交或重置。                  |
| `disabled`  | `boolean`                                                | 否   | `false`     | 是否禁用按钮。                                               |
| `loading`   | `boolean`                                                | 否   | `false`     | 是否加载中；加载时禁用点击并显示加载指示器。                 |
| `danger`    | `boolean`                                                | 否   | `false`     | 危险按钮（使用红色系）。                                     |
| `ghost`     | `boolean`                                                | 否   | `false`     | 幽灵按钮（透明背景 + 主题色描边/文字），适合深色背景。       |
| `block`     | `boolean`                                                | 否   | `false`     | 块级按钮，占满父容器整行。                                   |
| `autofocus` | `boolean`                                                | 否   | `false`     | 页面加载后是否自动聚焦。                                     |
| `href`      | `string`                                                 | 否   | 无          | 传入后渲染为 `<a>` 链接按钮。                                |
| `target`    | `string`                                                 | 否   | 无          | 链接按钮的打开方式（配合 `href`，如 `_blank`）。             |

> `level` 与 `size` 同时传入时以 `level` 为准；`small/middle/large` → `level 2/3/4`。
> 现阶段本组件样式**直接引用**设计系统库内 token（`--q-color-*` / `--q-font-*` / `--q-radius-*`）；局部主题通过 `QConfigProvider.cssVars` 覆盖这些语义 token 实现。

> 原生 `button` 的其他标准属性（如 `name`、`form`、`formaction` 等）可通过普通 attribute 透传到根元素。

## Emits

| 事件名  | 参数类型     | 触发时机                                                 |
| ------- | ------------ | -------------------------------------------------------- |
| `click` | `MouseEvent` | 点击按钮时触发；`disabled` 或 `loading` 状态下不会触发。 |

## Slots

| 插槽     | 说明                         |
| -------- | ---------------------------- |
| 默认插槽 | 按钮内容（文字或任意节点）。 |
| `icon`   | 前置图标（未加载时显示）。   |

## 可访问性（Accessibility）

- 默认渲染为原生 `<button>`；传 `href` 时渲染为 `<a>` 并保留链接语义。
- `loading` 时设置 `aria-busy="true"`；`disabled`/`loading` 时设置 `aria-disabled` 并从 Tab 键序移除（`<a>` 形态设 `tabindex="-1"`）。
- 键盘支持：`Enter`/`Space` 触发点击，`focus-visible` 时显示主题色焦点环。
- 仅图标按钮（无文本内容）请自行补充 `aria-label`。

## Exposes

无。
