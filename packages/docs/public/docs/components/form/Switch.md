# QSwitch

## 用途

开关，对齐 Ant Design `Switch`：`v-model:value` 双向绑定，支持加载中、内外文字与两种尺寸。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
</script>

<template>
  <QSwitch v-model:value="checked" />
  <QSwitch
    v-model:value="checked"
    checked-children="开"
    un-checked-children="关"
  />
</template>
```

## Props

| 属性                | 类型                   | 必填 | 默认值      | 说明                           |
| ------------------- | ---------------------- | ---- | ----------- | ------------------------------ |
| `value`             | `boolean`              | 否   | `false`     | 开关状态（`v-model:value`）。  |
| `disabled`          | `boolean`              | 否   | `false`     | 是否禁用。                     |
| `loading`           | `boolean`              | 否   | `false`     | 是否加载中（加载中不可切换）。 |
| `size`              | `'small' \| 'default'` | 否   | `'default'` | 尺寸。                         |
| `checkedChildren`   | `string`               | 否   | 无          | 打开时的文字。                 |
| `unCheckedChildren` | `string`               | 否   | 无          | 关闭时的文字。                 |
| `autofocus`         | `boolean`              | 否   | `false`     | 是否自动聚焦。                 |

## Emits

| 事件           | 参数      | 说明                              |
| -------------- | --------- | --------------------------------- |
| `update:value` | `boolean` | 开关状态变化（`v-model:value`）。 |
| `change`       | `boolean` | 开关状态变化。                    |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- antd / ant-design-vue 用 `checked`（`v-model:checked`）承载状态，本库为与其他表单组件保持一致统一为 `value`。
- 不内置 `label`，交由 `QFormItem` 提供。
