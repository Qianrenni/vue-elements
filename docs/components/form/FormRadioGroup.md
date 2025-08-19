# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `modelValue` | `string`                                                    | `undefined` | 否  | 当前选中的值，受控属性 |
| `options`    | `Array<{ label: string; value: string }>`                   | `[]`        | 是  | 单选框选项列表 |
| `label`      | `string`                                                    | `''`        | 否  | 标签文本     |
| `name`       | `string`                                                    | `''`        | 否  | input 的 name 属性 |
| `required`   | `boolean`                                                   | `true`      | 否  | 是否为必填项 |
| `direction`  | `'horizontal' \| 'vertical'`                                | `'horizontal'` | 否  | 布局方向：水平或垂直 |
| `disabled`   | `boolean`                                                   | `false`     | 否  | 是否禁用单选组 |
| `autofocus`  | `boolean`                                                   | `false`     | 否  | 是否自动聚焦 |
| `readonly`   | `boolean`                                                   | `false`     | 否  | 是否只读     |
| `size`       | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 组件尺寸     |
| `placeholder`| `string`                                                    | `''`        | 否  | 占位符文本（此组件不使用） |
| `clearable`  | `boolean`                                                   | `true`      | 否  | 是否支持清除（本组件无清除功能） |

> 💡 提示：支持原生 `input[type="radio"]` 的所有属性（如 `type`, `value`, `checked`, `required` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明        |
|----------|------|-----------|
| `update:modelValue` | `string` | 当选中项改变时触发，用于更新父组件的 modelValue |
| `change`  | `string` | 与 `update:modelValue` 功能一致，兼容性保留 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormRadioGroup><template #default>自定义选项</template></FormRadioGroup>` |
| `label`   | 自定义标签插槽 | `<template #label><span>自定义标签</span></template>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦到当前单选组的第一个可交互元素 |