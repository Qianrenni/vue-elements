# QApp

## 用途

App 包裹组件（对标 Ant Design App）：为子树提供**作用域上下文**，把命令式通知渲染进本 App 根（而非直接挂 `body`），从而继承外层 `QConfigProvider` 的 CSS 变量 / 主题。子树内通过 `useQApp()` 消费。

## 基本用法

```vue
<script lang="ts" setup>
import { useQApp } from 'qyani-components';

const { notification, message } = useQApp();
</script>

<template>
  <QApp>
    <QButton type="primary" @click="notification.success('已保存')">
      打开通知
    </QButton>
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

| 字段           | 类型           | 说明                                         |
| -------------- | -------------- | -------------------------------------------- |
| `notification` | 通知作用域实例 | 绑定到本 QApp 的通知 API（open/success/…）。 |
| `message`      | 全局消息 util  | 当前为全局单例。                             |

未包 `QApp` 时 `useQApp()` 回退到全局单例（`useNotification` / `useMessage`），保证代码可无 `QApp` 运行。

## Slots

| 插槽     | 说明       |
| -------- | ---------- |
| 默认插槽 | 页面内容。 |

## 说明

- `QApp` 根为普通 `div.q-app`（`position: relative`），不会影响布局。
- 卸载时自动销毁作用域通知容器并清理定时器。
- 当前作用域化的是 `notification`；`message` / modal 上下文为后续扩展预留。
