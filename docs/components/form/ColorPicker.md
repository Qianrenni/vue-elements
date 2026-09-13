# QColorPicker

## 用途

颜色选择器，对齐 Ant Design `ColorPicker`：通过 `v-model:value` 双向绑定 hex 色值，提供色块触发按钮、原生取色器、hex 输入框与预设色板，并支持 `hex` / `rgb` / `hsl` 三种展示文案。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('#1677ff');
const presets = [
  { label: '推荐', colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d'] },
];
</script>

<template>
  <QColorPicker v-model:value="color" show-text allow-clear />

  <!-- 预设色板 + rgb 展示 -->
  <QColorPicker v-model:value="color" :presets="presets" format="rgb" />

  <!-- 受控展开 -->
  <QColorPicker v-model:value="color" :open="true" />
</template>
```

## Props

| 属性         | 类型                      | 必填 | 默认值      | 说明                                           |
| ------------ | ------------------------- | ---- | ----------- | ---------------------------------------------- |
| `value`      | `string`                  | 否   | `'#000000'` | 颜色值（`v-model:value`），hex 格式。          |
| `presets`    | `ColorPickerPreset[]`     | 否   | 无          | 预设色板，按分组展示。                         |
| `disabled`   | `boolean`                 | 否   | `false`     | 是否禁用。                                     |
| `allowClear` | `boolean`                 | 否   | `false`     | 是否展示清除按钮。                             |
| `showText`   | `boolean`                 | 否   | `false`     | 是否在色块旁展示当前色值文本。                 |
| `format`     | `'hex' \| 'rgb' \| 'hsl'` | 否   | `'hex'`     | 展示格式，仅影响文案，不影响绑定值。           |
| `open`       | `boolean`                 | 否   | 无          | 是否展开面板（受控），缺省时由内部状态自管理。 |
| `status`     | `'error' \| 'warning'`    | 否   | 无          | 校验状态。                                     |

### ColorPickerPreset

| 字段     | 类型       | 必填 | 默认值 | 说明                |
| -------- | ---------- | ---- | ------ | ------------------- |
| `label`  | `string`   | 是   | 无     | 分组名称。          |
| `colors` | `string[]` | 是   | 无     | 分组内的 hex 色值。 |

## Emits

| 事件           | 参数                           | 说明                            |
| -------------- | ------------------------------ | ------------------------------- |
| `update:value` | `string`                       | 颜色值变化（`v-model:value`）。 |
| `change`       | `(color: string, hex: string)` | 颜色值变化，返回颜色值与 hex。  |
| `clear`        | 无                             | 点击清除按钮。                  |
| `openChange`   | `boolean`                      | 面板展开状态变化。              |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- antd 的 `value` 是 `Color` 对象，并支持 alpha；本组件为 hex 字符串，不含透明度。
- `change` 的两个参数均为字符串（本组件无颜色对象），hex 与颜色值一致。
- 面板为简易实现：原生 `<input type="color">` + hex 输入框 + 预设色板，不含色相/饱和度/亮度滑块、取色器（吸管）与 `disabledAlpha`。
- 受控 `open` 模式下不自行收起（点击外部仅派发 `openChange`，由外部决定）；非受控模式支持点击面板外部收起。
- 不内置 `label` / 校验提示，交由 `QFormItem` 提供。
