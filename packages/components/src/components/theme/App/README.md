# QApp

## 用途

App 包裹组件（对标 Ant Design App）：为子树提供**作用域上下文**，把命令式 `message` / `notification` / `modal` 渲染进本 App 根（而非直接挂 `body`），从而继承外层 `QConfigProvider` 的 CSS 变量 / 主题。子树内通过 `useQApp()` 消费。

## 基本用法

```vue
<script lang="ts" setup>
import { useQApp } from 'qyani-components';

const { message, notification, modal } = useQApp();
const onDelete = async () => {
  const ok = await modal.confirm({
    title: '删除确认',
    content: '确定要删除这条数据吗？',
  });
  if (ok) message.success('已删除');
};
</script>

<template>
  <QApp>
    <QButton type="primary" @click="notification.success('已保存')">
      打开通知
    </QButton>
    <QButton @click="message.info('这是一条消息')">消息</QButton>
    <QButton @click="onDelete">确认弹窗</QButton>
  </QApp>
</template>
```

## 结合 ConfigProvider

```vue
<template>
  <QConfigProvider :css-vars="{ '--q-color-primary': '#722ed1' }">
    <QApp>
      <!-- App 内的通知会渲染进本根，继承紫色主题 -->
      <MyPage />
    </QApp>
  </QConfigProvider>
</template>
```

## useQApp()

| 字段           | 类型           | 说明                                                     |
| -------------- | -------------- | -------------------------------------------------------- |
| `notification` | 通知作用域实例 | 绑定到本 QApp 的通知 API（open/success/…）。             |
| `message`      | 消息作用域实例 | 绑定到本 QApp 的消息 API（info/success/warning/error）。 |
| `modal`        | 弹窗作用域实例 | 绑定到本 QApp 的命令式弹窗（confirm / alert）。          |

未包 `QApp` 时 `useQApp()` 回退到全局单例（`useNotification` / `useMessage` / 全局弹窗），保证代码可无 `QApp` 运行。

### message

`message.success('已保存')`、`message.info(content)` 等。内容可为字符串或 `{ message, type?, duration? }`；`duration: 0` 常驻。返回句柄含 `close()`。

### modal

```ts
const ok = await modal.confirm({
  title: '删除确认',
  content: '确定删除？',
  confirmText: '删除',
  cancelText: '再想想',
});
// ok === true 用户确认，false 取消/关闭
```

`modal.alert({ title, content })`：仅「确定」的提示弹窗。

## Slots

| 插槽     | 说明       |
| -------- | ---------- |
| 默认插槽 | 页面内容。 |

## 说明

- `QApp` 根为普通 `div.q-app`（`position: relative`），不会影响布局。
- 卸载时自动销毁作用域 message / notification / modal，清理定时器与容器。
- 作用域化的 message / notification 挂在本 App 根内，可继承 `QConfigProvider` 的 CSS 变量；modal 命令式渲染 `QDialog`。
