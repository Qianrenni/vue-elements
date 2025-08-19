# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `type`     | `'string' \| 'number' \| 'boolean' \| 'datetime'`          | `undefined` | 否  | 字段类型，决定渲染组件和操作符支持 |
| `modelValue` | `number \| string \| boolean \| null \| undefined \| number[] \| string[] \| null[] \| undefined[]` | `undefined` | 否  | 当前字段的值，支持单值或范围值 |
| `onUpdate:modelValue` | `(val: SqlValue) => void`                                   | `undefined` | 是  | 值变化时触发的回调函数 |

> 💡 提示：该组件为内部渲染组件，通常由条件查询构建器使用，不直接暴露给外部调用。

---

# Events 事件

| 事件名      | 回调参数 | 说明        |
|----------|------|-----------|
| `update:modelValue` | `SqlValue` | 值发生变化时触发，用于同步父组件状态 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<template #default><span>自定义标签</span></template>` |
| `loading` | 自定义加载图标 | `<template #loading><spin-icon /></template>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦输入框（如 ElInput、ElDatePicker 等） |
| `blur`    | —  | —   | 失去焦点 |