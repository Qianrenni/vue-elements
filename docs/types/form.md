# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `modelValue` | `T | null`                                                    | `undefined` | 否  | v-model 绑定值（可选，支持 null） |
| `name`       | `string`                                                    | `undefined` | 否  | 表单项名称（用于表单提交） |
| `label`      | `string`                                                    | `undefined` | 否  | label 文本 |
| `disabled`   | `boolean`                                                   | `false`     | 否  | 是否禁用 |
| `readonly`   | `boolean`                                                   | `false`     | 否  | 是否只读（主要用于原生输入控件） |
| `size`       | `'small' \| 'middle' \| 'large'`                            | `undefined` | 否  | 尺寸 |
| `status`     | `'default' \| 'success' \| 'warning' \| 'error'`            | `'default'` | 否  | 状态（用于边框颜色、校验反馈） |
| `required`   | `boolean`                                                   | `false`     | 否  | 是否必填（视觉星号提示） |
| `placeholder`| `string`                                                    | `undefined` | 否  | 占位符 |
| `clearable`  | `boolean`                                                   | `false`     | 否  | 是否可清空（显示 × 按钮） |
| `autofocus`  | `boolean`                                                   | `false`     | 否  | 自动聚焦 |
| `id`         | `string`                                                    | `undefined` | 否  | 唯一标识，用于 label 关联和 a11y |
| `direction`  | `'vertical' \| 'horizontal'`                                | `'horizontal'` | 否  | 竖向排列还是横向 |

> 💡 提示：支持原生 input / select 等表单元素的所有属性（如 `autocomplete`, `maxlength`, `min`, `max` 等）

---

# Events 事件

| 事件名        | 回调参数                                     | 说明        |
|------------|--------------------------------------------|-----------|
| `update:modelValue` | `value: T`                                 | v-model 更新值 |
| `change`        | `value: T`                                 | 值变化（可用于验证） |
| `focus`         | `event: FocusEvent`                        | 聚焦 |
| `blur`          | `event: FocusEvent`                        | 失焦 |
| `input`         | `value: T, event: InputEvent \| Event`     | 输入中（input 事件） |
| `clear`         | —                                          | 清空操作 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `prefix`  | 前缀图标/文本 | `<template #prefix="{ value }"><icon />{{ value }}</template>` |
| `suffix`  | 后缀图标/文本 | `<template #suffix="{ value }">{{ value }}<icon /></template>` |
| `clear`   | 清空按钮（可自定义） | `<template #clear><close-icon /></template>` |
| `error`   | 错误信息区域 | `<template #error="{ error }">⚠️ {{ error }}</template>` |
| `default` | 默认插槽（用于复杂内容） | `<template #default><custom-content /></template>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| —         | —  | —   | 暂无 expose 方法 |