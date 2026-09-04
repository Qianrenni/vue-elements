# QSider

## 用途

侧边栏布局组件，作为 `QLayout` 的左/右侧栏，支持折叠（底部触发器），对齐 Ant Design `Layout.Sider`。深/浅两套主题。

## 基本用法

```vue
<template>
  <QLayout style="height: 480px">
    <QSider :width="220" collapsible v-model:collapsed="collapsed">
      <nav>侧边菜单</nav>
    </QSider>
    <QContent>主体</QContent>
  </QLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const collapsed = ref(false);
</script>
```

## Props

| 属性             | 类型                | 必填 | 默认值   | 说明                         |
| ---------------- | ------------------- | ---- | -------- | ---------------------------- |
| `width`          | `number`            | 否   | `200`    | 侧边栏宽度（px）。           |
| `collapsedWidth` | `number`            | 否   | `80`     | 折叠后宽度（px）。           |
| `collapsible`    | `boolean`           | 否   | `false`  | 是否可折叠（显示折叠按钮）。 |
| `collapsed`      | `boolean`           | 否   | `false`  | 折叠状态（支持 v-model）。   |
| `theme`          | `'dark' \| 'light'` | 否   | `'dark'` | 主题。                       |
| `trigger`        | `unknown`(插槽)     | 否   | 默认箭头 | 自定义触发器内容。           |

## Emits

| 事件名             | 参数类型                            | 触发时机         |
| ------------------ | ----------------------------------- | ---------------- |
| `update:collapsed` | `(collapsed: boolean)`              | 折叠状态变化时。 |
| `collapse`         | `(collapsed, type: 'clickTrigger')` | 折叠状态变化时。 |

## Slots

| 插槽      | 说明                   |
| --------- | ---------------------- |
| 默认插槽  | 侧边栏内容（菜单等）。 |
| `trigger` | 自定义折叠触发器。     |

## 可访问性（Accessibility）

- 折叠按钮带 `aria-label`（折叠/展开侧边栏）。

## Exposes

无。
