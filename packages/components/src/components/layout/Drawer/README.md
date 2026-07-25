# QDrawer

## 用途

抽屉式内容容器，可按指定方向显示；默认使用 Teleport 挂载到 `body`。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <QDrawer v-model:visible="visible" title="设置" direction="right">
    抽屉内容
  </QDrawer>
</template>
```

## Props

| 名称                  | 类型                                     | 必填 | 默认值    | 说明                                                      |
| --------------------- | ---------------------------------------- | ---- | --------- | --------------------------------------------------------- |
| `visible`             | `boolean`                                | 否   | `false`   | 是否显示抽屉。                                            |
| `title`               | `string`                                 | 否   | `''`      | 未提供 `header` 插槽时显示的标题。                        |
| `direction`           | `'top' \| 'right' \| 'bottom' \| 'left'` | 否   | `'right'` | 抽屉出现的方向。                                          |
| `showClose`           | `boolean`                                | 否   | `true`    | 是否显示默认关闭按钮。                                    |
| `closeOnClickOverlay` | `boolean`                                | 否   | `true`    | 点击覆盖层时是否关闭。                                    |
| `overlay`             | `boolean`                                | 否   | `true`    | 是否为覆盖层应用 `overlay` 类；否则使用透明背景类。       |
| `appendToBody`        | `boolean`                                | 否   | `true`    | 是否 Teleport 到 `body`；为假时在当前位置以绝对定位渲染。 |

## Emits

| 事件             | 载荷类型  | 触发时机                                       |
| ---------------- | --------- | ---------------------------------------------- |
| `update:visible` | `boolean` | 调用关闭逻辑时发送 `false`。                   |
| `close`          | 无        | 点击默认关闭按钮，或允许点击覆盖层关闭时触发。 |

## Slots

| 名称      | 作用域参数 | 后备内容                       |
| --------- | ---------- | ------------------------------ |
| `default` | 无         | 无。                           |
| `header`  | 无         | 显示标题和（若启用）关闭按钮。 |

## Exposes

无。
