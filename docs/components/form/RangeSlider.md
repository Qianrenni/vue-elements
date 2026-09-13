# QRangeSlider

## 用途

范围滑块，对齐 Ant Design `Slider` 的 `range` 模式：`v-model:value` 双向绑定，单个轨道上放置两个原生 `<input type="range">` 滑块，选中间用主色填充，支持步进、值提示与刻度标记。

## 基本用法

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<[number, number]>([20, 60]);
</script>

<template>
  <QRangeSlider v-model:value="value" :min="0" :max="100" :step="5" />

  <QRangeSlider
    v-model:value="value"
    :marks="{ 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }"
    @after-change="(val) => console.log('落点', val)"
  />
</template>
```

## Props

| 属性       | 类型                     | 必填 | 默认值     | 说明                             |
| ---------- | ------------------------ | ---- | ---------- | -------------------------------- |
| `value`    | `[number, number]`       | 否   | `[0, 100]` | 当前区间值（`v-model:value`）。  |
| `min`      | `number`                 | 否   | `0`        | 最小值。                         |
| `max`      | `number`                 | 否   | `100`      | 最大值。                         |
| `step`     | `number`                 | 否   | `1`        | 步进值，需大于 0。               |
| `disabled` | `boolean`                | 否   | `false`    | 是否禁用。                       |
| `tooltip`  | `boolean`                | 否   | `true`     | 是否在滑块上方展示当前数值。     |
| `marks`    | `Record<number, string>` | 否   | 无         | 刻度标记，键为刻度值，值为文案。 |
| `vertical` | `boolean`                | 否   | `false`    | 是否垂直方向展示。               |

## Emits

| 事件           | 参数               | 说明                            |
| -------------- | ------------------ | ------------------------------- |
| `update:value` | `[number, number]` | 区间值变化（`v-model:value`）。 |
| `change`       | `[number, number]` | 拖动过程中区间值变化。          |
| `afterChange`  | `[number, number]` | 拖动结束（松开滑块）时触发。    |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 仅实现 `range` 双滑块模式：antd 的 `Slider` 还支持单值模式、`dots`、`reverse`、`included`、`tooltip.formatter` 等，本组件未实现。
- `tooltip` 只支持布尔开关（展示原始数值），不支持 `open` / `formatter` / `placement` 等配置对象。
- 值为 `[number, number]` 元组（antd 同样为数组）；滑块由原生 `<input type="range">` 渲染，`change` 事件会冒泡供 `QFormItem` 自动校验。
- 不内置 `label`，交由 `QFormItem` 提供。
