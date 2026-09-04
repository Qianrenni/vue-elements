# QRate

## 用途

评分组件，对齐 Ant Design `Rate`：整星/半星、可清除、自定义字符、只读；受控（v-model）。

## 基本用法

```vue
<template>
  <QRate v-model="value" />
  <QRate v-model="half" allow-half />
  <QRate v-model="score" :count="10" character="赞" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(3);
const half = ref(2.5);
const score = ref(5);
</script>
```

## Props

| 属性         | 类型      | 必填 | 默认值  | 说明                       |
| ------------ | --------- | ---- | ------- | -------------------------- |
| `modelValue` | `number`  | 否   | `0`     | 当前评分（v-model）。      |
| `count`      | `number`  | 否   | `5`     | 星星总数。                 |
| `allowHalf`  | `boolean` | 否   | `false` | 是否允许半星。             |
| `allowClear` | `boolean` | 否   | `true`  | 再点同值是否清除（归零）。 |
| `disabled`   | `boolean` | 否   | `false` | 是否只读。                 |
| `character`  | `string`  | 否   | `'★'`   | 自定义字符。               |

## Emits

| 事件名              | 参数类型   | 触发时机         |
| ------------------- | ---------- | ---------------- |
| `update:modelValue` | `(number)` | 评分变化时。     |
| `change`            | `(number)` | 评分变化时。     |
| `hoverChange`       | `(number)` | 悬停预览变化时。 |

## Slots

| 插槽        | 作用域参数  | 说明               |
| ----------- | ----------- | ------------------ |
| `character` | `{ index }` | 自定义单颗星内容。 |

## 可访问性（Accessibility）

- 容器 `role="radiogroup"`，每颗星 `role="radio"` + `aria-checked`。

## Exposes

无。
