# QTreeSelect

## 用途

树选择组件，对齐 Ant Design `TreeSelect`：数据驱动下拉树，支持展开/收起、单选、禁用/不可选节点；受控（v-model）。

## 基本用法

```vue
<template>
  <QTreeSelect
    v-model="value"
    :items="items"
    placeholder="请选择分类"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const items = [
  {
    value: 'parent1',
    label: '父级 1',
    children: [
      { value: 'child1-1', label: '子级 1-1' },
      { value: 'child1-2', label: '子级 1-2' },
    ],
  },
  { value: 'leaf', label: '叶子' },
];

const value = ref<string | number | null>(null);
const onChange = (v: string | number | null) => console.log(v);
</script>
```

## Props

| 属性          | 类型                       | 必填 | 默认值     | 说明                             |
| ------------- | -------------------------- | ---- | ---------- | -------------------------------- |
| `items`       | `TreeSelectItem[]`         | 否   | `[]`       | 树数据（value/label/children）。 |
| `modelValue`  | `string \| number \| null` | 否   | 无         | 选中值（v-model）。              |
| `placeholder` | `string`                   | 否   | `'请选择'` | 占位文本。                       |
| `disabled`    | `boolean`                  | 否   | `false`    | 是否禁用。                       |
| `allowClear`  | `boolean`                  | 否   | `true`     | 是否显示清空按钮。               |
| `expandAll`   | `boolean`                  | 否   | `true`     | 初始是否展开全部含子节点。       |

> `TreeSelectItem`：`{ value, label, children?, disabled?, selectable? }`

## Emits

| 事件名              | 参数类型                 | 触发时机       |
| ------------------- | ------------------------ | -------------- |
| `update:modelValue` | `(string\|number\|null)` | 选中值变化时。 |
| `change`            | `(string\|number\|null)` | 选中值提交时。 |
| `select`            | `(item)`                 | 选中某节点时。 |

## 可访问性（Accessibility）

- 触发器 `aria-haspopup="listbox"` + `aria-expanded`；节点 `role="option"`。

## Exposes

无。
