# QNotification

## 用途

通知提醒卡片（单条）。`QNotification` 是**展示用条目组件**（标题 + 描述 + 类型图标 + 关闭按钮），一般由命令式单例 `useNotification` / `notification` 渲染进屏幕角标容器（对齐 Ant Design Notification）；也可直接以标签形式用于静态展示。

## 命令式用法（推荐）

```ts
import { useNotification } from 'qyani-components';

// 右上角弹出，4.5s 自动关闭
useNotification.success({ title: '保存成功', description: '你的修改已保存。' });
useNotification.error({
  title: '请求失败',
  description: '网络异常，请稍后重试。',
});
```

## 静态展示

```vue
<template>
  <QNotification
    type="success"
    title="保存成功"
    description="你的修改已保存。"
  />
</template>
```

## Props

| 属性          | 类型                                          | 必填 | 默认值   | 说明               |
| ------------- | --------------------------------------------- | ---- | -------- | ------------------ |
| `type`        | `'success' \| 'info' \| 'warning' \| 'error'` | 否   | `'info'` | 通知类型。         |
| `title`       | `string`                                      | 否   | —        | 通知标题。         |
| `description` | `string`                                      | 否   | —        | 通知详情。         |
| `closable`    | `boolean`                                     | 否   | `true`   | 是否显示关闭按钮。 |
| `showIcon`    | `boolean`                                     | 否   | `true`   | 是否显示类型图标。 |
| `onClose`     | `() => void`                                  | 否   | —        | 点击关闭按钮回调。 |

## Slots

| 插槽           | 说明               |
| -------------- | ------------------ |
| `#icon`        | 覆盖类型图标。     |
| `#title`       | 覆盖标题区域。     |
| `#description` | 覆盖描述区域。     |
| 默认插槽       | 底部自定义操作区。 |

## Emits

无（命令式渲染时关闭由管理 util 处理）。

## 说明

- 角标容器 / 动画 / 自动关闭等能力由 `useNotification`（`utils/business/useNotification`）提供，详见其 README。
- 放在 `QApp` 内时，可通过 `useQApp().notification` 获得绑定到 App 作用域的通知（继承 `QConfigProvider` 的 CSS 变量 / 主题）。
