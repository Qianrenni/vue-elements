# QSelect

## 用途

选择器，对齐 Ant Design `Select`：由 `options` 驱动渲染，`v-model:value` 双向绑定，支持单选/多选、搜索过滤、清除与加载态。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('apple');
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true },
];
</script>

<template>
  <QSelect v-model:value="value" :options="options" allow-clear show-search />

  <!-- 多选 -->
  <QSelect v-model:value="value" :options="options" mode="multiple" />
</template>
```

## Props

| 属性           | 类型                                                         | 必填 | 默认值      | 说明                                                |
| -------------- | ------------------------------------------------------------ | ---- | ----------- | --------------------------------------------------- |
| `options`      | `(SelectOption \| string \| number)[]`                       | 否   | `[]`        | 选项列表，支持简写或 `{ label, value, disabled }`。 |
| `value`        | `string \| number \| (string \| number)[]`                   | 否   | 无          | 选中值（单选单值 / 多选数组）。                     |
| `mode`         | `'default' \| 'multiple'`                                    | 否   | `'default'` | 选择模式。                                          |
| `placeholder`  | `string`                                                     | 否   | 无          | 占位文本。                                          |
| `disabled`     | `boolean`                                                    | 否   | `false`     | 是否禁用。                                          |
| `allowClear`   | `boolean`                                                    | 否   | `false`     | 是否展示清除按钮。                                  |
| `showSearch`   | `boolean`                                                    | 否   | `false`     | 是否可搜索。                                        |
| `filterOption` | `(input: string, option: NormalizedSelectOption) => boolean` | 否   | 无          | 自定义过滤，缺省按 `label` 不区分大小写包含匹配。   |
| `size`         | `'small' \| 'middle' \| 'large'`                             | 否   | `'middle'`  | 尺寸。                                              |
| `status`       | `'error' \| 'warning'`                                       | 否   | 无          | 校验状态。                                          |
| `loading`      | `boolean`                                                    | 否   | `false`     | 是否加载中（展示加载指示器）。                      |
| `open`         | `boolean`                                                    | 否   | 无          | 下拉展开状态（受控，不传则内部自管理）。            |
| `name`         | `string`                                                     | 否   | 无          | 原生 `name`，用于表单提交。                         |

### SelectOption

| 字段       | 类型               | 必填 | 默认值          | 说明           |
| ---------- | ------------------ | ---- | --------------- | -------------- |
| `value`    | `string \| number` | 是   | 无              | 选项值。       |
| `label`    | `string`           | 否   | `String(value)` | 选项文案。     |
| `disabled` | `boolean`          | 否   | `false`         | 是否禁用该项。 |

## Emits

| 事件                    | 参数               | 说明                            |
| ----------------------- | ------------------ | ------------------------------- |
| `update:value`          | `SelectModelValue` | 选中值变化（`v-model:value`）。 |
| `change`                | `(value, option)`  | 选中值变化，附带选中项。        |
| `search`                | `string`           | 搜索关键字变化。                |
| `clear`                 | 无                 | 点击清除按钮。                  |
| `focus`                 | `FocusEvent`       | 获得焦点。                      |
| `blur`                  | `FocusEvent`       | 失去焦点。                      |
| `dropdownVisibleChange` | `boolean`          | 下拉展开状态变化。              |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 暂不提供 `mode="tags"`、`maxTagCount`、虚拟滚动、分组选项（`options[].options`）与自定义 `option` 插槽。
- 不内置 `label` 与校验提示，交由 `QFormItem` 提供（antd 由 `Form.Item` 提供）。
- 内部渲染原生 `input`，变更会派发原生事件供 `QFormItem` 自动校验。
