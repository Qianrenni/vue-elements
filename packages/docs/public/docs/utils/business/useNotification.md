# useNotification（命令式通知）

## 用途

命令式通知单例：从屏幕角落弹出通知卡片（标题 + 描述 + 类型图标），自动关闭 / 手动关闭 / 位置可配；对齐 Ant Design `notification` 静态方法。内部用 `QNotification` 条目渲染进角标容器。

## 引入

```ts
import { useNotification } from 'qyani-components';
```

`useNotification` 为**全局单例**（等价 `notification`），未包 `QApp` 时直接挂到 `document.body`。

## 基本用法

```ts
// 打开一条（默认 topRight，4.5s 自动关闭）
const handle = useNotification.success({
  title: '保存成功',
  description: '你的修改已保存。',
});
// 手动关闭
handle.close();
```

类型快捷方法：`open` / `success` / `info` / `warning` / `error`；也支持字符串（作为标题）：

```ts
useNotification.warning('磁盘空间不足');
```

## 配置项

```ts
interface QNotificationOptions {
  title?: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
  duration?: number; // 自动关闭 ms，0 为常驻（默认 4500）
  closable?: boolean; // 默认 true
  showIcon?: boolean; // 默认 true
  key?: string | number; // 供 close(key) 定位
  onClick?: () => void; // 点击卡片回调
  onClose?: () => void; // 关闭回调
}
```

## 方法

| 方法                                        | 说明                                  |
| ------------------------------------------- | ------------------------------------- |
| `open(options \| title)`                    | 打开一条通知，返回 `{ key, close }`。 |
| `success / info / warning / error`          | 类型快捷方法。                        |
| `config({ placement, duration, maxCount })` | 修改该作用域默认配置。                |
| `close(key)`                                | 按 key 关闭。                         |
| `closeAll()`                                | 关闭当前作用域全部通知。              |
| `destroy()`                                 | 销毁并移除容器 DOM。                  |

## 位置 / 默认配置

```ts
import { createNotification } from 'qyani-components';

const scoped = createNotification({
  defaults: { placement: 'bottomRight', duration: 3000, maxCount: 3 },
});
```

> 说明：`useNotification` 与 `notification` 是同一全局单例；`createNotification` 用于创建自定义/作用域实例（如 `QApp` 内部使用）。

## 结合 QApp（推荐）

包裹 `QApp` 后通过 `useQApp().notification` 使用，通知会渲染进 App 根并继承 `QConfigProvider` 的 CSS 变量 / 主题：

```vue
<script lang="ts" setup>
import { useQApp } from 'qyani-components';

const { notification } = useQApp();
</script>

<template>
  <QButton type="primary" @click="notification.success('已保存')">保存</QButton>
</template>
```

## 说明

- 无 `QApp` 时回退为全局单例（与 `QMessage` 风格一致）。
- 每个 placement 独立容器、自动回收空容器；超出 `maxCount` 自动关闭最早一条。
