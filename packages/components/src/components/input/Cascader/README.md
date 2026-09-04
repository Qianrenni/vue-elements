# QCascader

## 用途

级联选择组件，对齐 Ant Design `Cascader`：多列面板逐级下钻，支持 `changeOnSelect`、搜索、异步懒加载（`loadData`）、清空/禁用；受控（v-model，值存**完整路径数组**）。

## 基本用法

```vue
<template>
  <QCascader v-model="value" :options="options" placeholder="请选择地址" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string[] | null>(null);
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [{ value: 'xihu', label: '西湖' }],
      },
    ],
  },
  { value: 'jiangsu', label: '江苏' },
];
</script>
```

## 搜索

```vue
<QCascader
  v-model="value"
  :options="options"
  show-search
  search-placeholder="输入关键字"
  @change="onChange"
/>
```

## 异步加载（loadData）

`loadData(selectedOptions)` 接收当前路径的选项数组；可通过**返回 children 数组**或**直接修改传入选项的 `children`** 提供下一级数据。叶子请标注 `isLeaf: true`，否则会被视为仍可加载。

```vue
<script lang="ts" setup>
const options = ref([{ value: 'city', label: '城市', isLeaf: false }]);

const loadData = async (sel: any[]) => {
  const target = sel[sel.length - 1];
  target.children = [
    { value: 'xihu', label: '西湖', isLeaf: true },
    { value: 'wulin', label: '武林', isLeaf: true },
  ];
};
</script>

<template>
  <QCascader v-model="value" :options="options" :load-data="loadData" />
</template>
```

> 说明：选中值始终是**从根到当前节点的 value 数组**；`changeOnSelect` 允许选中非叶子节点。

## Props

| 属性                | 类型                                               | 必填 | 默认值       | 说明                      |
| ------------------- | -------------------------------------------------- | ---- | ------------ | ------------------------- |
| `options`           | `CascaderOption[]`                                 | 否   | `[]`         | 级联数据。                |
| `modelValue`        | `(string\|number)[] \| null`                       | 否   | 无           | 选中路径（v-model）。     |
| `placeholder`       | `string`                                           | 否   | `'请选择'`   | 占位文本。                |
| `disabled`          | `boolean`                                          | 否   | `false`      | 是否禁用。                |
| `allowClear`        | `boolean`                                          | 否   | `true`       | 是否显示清空按钮。        |
| `separator`         | `string`                                           | 否   | `'/'`        | 路径显示分隔符。          |
| `changeOnSelect`    | `boolean`                                          | 否   | `false`      | 每选中一级即触发 change。 |
| `showSearch`        | `boolean`                                          | 否   | `false`      | 是否允许搜索。            |
| `searchPlaceholder` | `string`                                           | 否   | `'输入搜索'` | 搜索框占位。              |
| `loadData`          | `(selectedOptions) => unknown \| Promise<unknown>` | 否   | 无           | 懒加载子级。              |
| `size`              | `'small' \| 'middle' \| 'large'`                   | 否   | `'middle'`   | 尺寸。                    |

> `CascaderOption`：`{ value, label, children?, disabled?, isLeaf? }`

## Emits

| 事件名              | 参数类型                             | 触发时机         |
| ------------------- | ------------------------------------ | ---------------- |
| `update:modelValue` | `(path: (string\|number)[] \| null)` | 选中路径变化时。 |
| `change`            | `(path: (string\|number)[] \| null)` | 选中路径提交时。 |
| `select`            | `(path: (string\|number)[], option)` | 选中某节点时。   |
| `clear`             | —                                    | 清空时。         |

## 可访问性（Accessibility）

- 触发器 `aria-haspopup="listbox"` + `aria-expanded`；面板选项 `role="option"`。

## Exposes

无。
