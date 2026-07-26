# QDialog

## 用途

通过 Teleport 渲染到 `body` 的模态对话框，内置标题、关闭、确认与取消操作区。

## 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<template>
  <QFormButton @click="visible = true">打开</QFormButton>
  <QDialog v-model:visible="visible" title="提示" @confirm="handleConfirm">
    对话框内容
  </QDialog>
</template>
```

## Props

| 名称                  | 类型      | 必填 | 默认值                           | 说明                                   |
| --------------------- | --------- | ---- | -------------------------------- | -------------------------------------- |
| `visible`             | `boolean` | 否   | `false`                          | 是否显示对话框。                       |
| `title`               | `string`  | 否   | `''`                             | 未提供 `header` 插槽时显示的标题。     |
| `showClose`           | `boolean` | 否   | `true`                           | 是否显示关闭按钮。                     |
| `showFooter`          | `boolean` | 否   | `true`                           | 是否显示底部操作区。                   |
| `showCancel`          | `boolean` | 否   | `true`                           | 使用默认 `footer` 时是否显示取消按钮。 |
| `confirmText`         | `string`  | 否   | `'确定'`                         | 默认确认按钮文本。                     |
| `cancelText`          | `string`  | 否   | `'取消'`                         | 默认取消按钮文本。                     |
| `closeOnClickOverlay` | `boolean` | 否   | `true`                           | 点击遮罩层时是否关闭。                 |
| `width`               | `string`  | 否   | 无（源码未设置，当前模板未使用） | 对话框宽度配置。                       |
| `customClass`         | `string`  | 否   | `''`                             | 添加到对话框容器的自定义类名。         |

## Emits

| 事件             | 载荷类型  | 触发时机                                                      |
| ---------------- | --------- | ------------------------------------------------------------- |
| `update:visible` | `boolean` | 调用关闭逻辑时发送 `false`。                                  |
| `close`          | 无        | 点击关闭按钮，或允许点击遮罩关闭，或确认/取消操作完成后触发。 |
| `confirm`        | 无        | 点击默认确认按钮时，关闭前触发。                              |
| `cancel`         | 无        | 点击默认取消按钮时，关闭前触发。                              |

## Slots

| 名称      | 作用域参数 | 后备内容                            |
| --------- | ---------- | ----------------------------------- |
| `default` | 无         | 无。                                |
| `header`  | 无         | 当 `title` 非空时显示标题文本。     |
| `footer`  | 无         | 依据相关 Props 显示取消与确认按钮。 |

## Exposes

无。
