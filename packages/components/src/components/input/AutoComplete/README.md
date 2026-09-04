# QAutoComplete

## 用途

自动完成组件，对齐 Ant Design `AutoComplete`：输入框 + 下拉候选，输入即按关键词过滤，支持键盘上下选择、点击回填、清空、展开受控（v-model:open）；受控（v-model）。

## 基本用法

```vue
<template>
  <QAutoComplete v-model="value" :options="options" placeholder="输入搜索" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];
</script>
```

## 过滤规则（filterOption）

- 缺省 / `true`：按 `label` 忽略大小写包含匹配；
- `false`：不过滤，始终展示全部候选；
- 函数 `(keyword, option) => boolean`：自定义匹配。

## Props

| 属性           | 类型                                      | 必填 | 默认值     | 说明                                     |
| -------------- | ----------------------------------------- | ---- | ---------- | ---------------------------------------- |
| `modelValue`   | `string`                                  | 否   | `''`       | 输入框文本（v-model）。                  |
| `options`      | `(string \| {value,label?,disabled?})[]`  | 否   | `[]`       | 候选项。                                 |
| `placeholder`  | `string`                                  | 否   | 无         | 占位文本。                               |
| `disabled`     | `boolean`                                 | 否   | `false`    | 是否禁用。                               |
| `allowClear`   | `boolean`                                 | 否   | `true`     | 有文本时是否显示清空按钮。               |
| `open`         | `boolean`                                 | 否   | 无         | 下拉是否展开（v-model:open，缺省内部）。 |
| `size`         | `'small' \| 'middle' \| 'large'`          | 否   | `'middle'` | 尺寸。                                   |
| `filterOption` | `boolean \| (keyword, option) => boolean` | 否   | 默认过滤   | 过滤规则。                               |

## Emits

| 事件名              | 参数类型                  | 触发时机                 |
| ------------------- | ------------------------- | ------------------------ |
| `update:modelValue` | `(value: string)`         | 输入 / 选中变化时。      |
| `update:open`       | `(open: boolean)`         | 展开状态变化时。         |
| `change`            | `(value: string)`         | 选中提交时。             |
| `select`            | `(value: string, option)` | 选中某候选项时。         |
| `search`            | `(value: string)`         | 输入过程中（远程搜索）。 |
| `focus` / `blur`    | `(ev: FocusEvent)`        | 聚焦 / 失焦时。          |
| `clear`             | —                         | 清空时。                 |

## 可访问性（Accessibility）

- 输入框 `role="combobox"` + `aria-expanded` + `aria-autocomplete="list"`；
- 高亮项通过 `aria-activedescendant` 关联；候选项 `role="option"`。

## Exposes

无。
