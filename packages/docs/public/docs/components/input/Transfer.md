# QTransfer

## 用途

穿梭框组件，对齐 Ant Design `Transfer`：左右面板 + 勾选/全选/搜索 + 按钮或双击移动，支持禁用项、单向模式；右侧 key 集合受控（v-model）。

## 基本用法

```vue
<template>
  <QTransfer
    v-model="targetKeys"
    :data-source="dataSource"
    :titles="['源', '目标']"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const targetKeys = ref<string[]>([]);
const dataSource = [
  { key: 'a', title: 'Apple', description: '红色水果' },
  { key: 'b', title: 'Banana' },
  { key: 'c', title: 'Cherry', disabled: true },
];
const onChange = (
  keys: string[],
  direction: 'left' | 'right',
  moveKeys: string[],
) => {
  console.log(keys, direction, moveKeys);
};
</script>
```

## 搜索 / 单向 / 自定义文案

```vue
<QTransfer
  v-model="targetKeys"
  :data-source="dataSource"
  :titles="['待选', '已选']"
  :operations="['向右', '向左']"
  show-search
  one-way
/>
```

## Props

| 属性                | 类型                             | 必填 | 默认值             | 说明                         |
| ------------------- | -------------------------------- | ---- | ------------------ | ---------------------------- |
| `dataSource`        | `TransferItem[]`                 | 否   | `[]`               | 数据源。                     |
| `modelValue`        | `(string\|number)[]`             | 否   | `[]`               | 右侧 key 集合（v-model）。   |
| `titles`            | `[string, string]`               | 否   | `['', '']`         | 左右面板标题。               |
| `operations`        | `[string, string]`               | 否   | `['', '']`         | 操作按钮文案（空用 › / ‹）。 |
| `disabled`          | `boolean`                        | 否   | `false`            | 是否禁用。                   |
| `showSearch`        | `boolean`                        | 否   | `false`            | 是否显示搜索框。             |
| `searchPlaceholder` | `[string, string]`               | 否   | `['搜索', '搜索']` | 搜索占位。                   |
| `oneWay`            | `boolean`                        | 否   | `false`            | 单向模式（禁右→左）。        |
| `showSelectAll`     | `boolean`                        | 否   | `true`             | 是否显示全选复选框。         |
| `size`              | `'small' \| 'middle' \| 'large'` | 否   | `'middle'`         | 尺寸。                       |

> `TransferItem`：`{ key, title, description?, disabled? }`

## Emits

| 事件名              | 参数类型                                       | 触发时机         |
| ------------------- | ---------------------------------------------- | ---------------- |
| `update:modelValue` | `(keys: (string\|number)[])`                   | 右侧集合变化时。 |
| `change`            | `(keys, direction: 'left'\|'right', moveKeys)` | 数据移动完成时。 |

## 交互

- 单击行 / 复选框勾选；单击面板头部复选框全选（半选态）。
- 点击中部 `›` / `‹` 移动选中项；**双击行**直接移动该项到另一侧。

## 可访问性（Accessibility）

- 行复选框与全选复选框使用原生 `input[type=checkbox]`（`accent-color` 随主题）。

## Exposes

无。
