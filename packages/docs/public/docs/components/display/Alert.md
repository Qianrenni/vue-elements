# QAlert

## 用途

警告提示：用于页面中展示需要用户注意的信息，支持 `success` / `info` / `warning` / `error` 四种语义，可带标题 + 描述、图标、操作区与可关闭，对齐 Ant Design Alert 常用能力。

## 基本用法

```vue
<template>
  <QAlert message="成功提示" type="success" />
  <QAlert
    type="warning"
    message="警告标题"
    description="这里是详细说明文案。"
    closable
  />
</template>
```

## Props

| 属性          | 类型                                          | 必填 | 默认值   | 说明                                 |
| ------------- | --------------------------------------------- | ---- | -------- | ------------------------------------ |
| `type`        | `'success' \| 'info' \| 'warning' \| 'error'` | 否   | `'info'` | 语义类型。                           |
| `message`     | `string`                                      | 否   | —        | 标题。                               |
| `description` | `string`                                      | 否   | —        | 详细描述（提供后标题与描述分两行）。 |
| `closable`    | `boolean`                                     | 否   | `false`  | 是否可关闭（右侧 ×）。               |
| `closeText`   | `string`                                      | 否   | —        | 关闭按钮自定义文案（缺省 ×）。       |
| `showIcon`    | `boolean`                                     | 否   | `true`   | 是否显示左侧类型图标。               |
| `banner`      | `boolean`                                     | 否   | `false`  | 是否作为顶部通栏（无圆角）。         |

## Slots

| 插槽           | 说明                                    |
| -------------- | --------------------------------------- |
| `#message`     | 覆盖标题区域。                          |
| `#description` | 覆盖描述区域。                          |
| `#icon`        | 覆盖左侧图标。                          |
| `#action`      | 右侧操作区（按钮/链接等，显示在右侧）。 |
| `#closeText`   | 覆盖关闭按钮文案。                      |

## Emits

| 事件    | 参数 | 触发时机         |
| ------- | ---- | ---------------- |
| `close` | —    | 点击关闭按钮后。 |

## Exposes

无。
