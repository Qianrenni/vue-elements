# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                                                                 |
|------------|-------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `modelValue` | `string[]`                                                  | `[]`        | 是  | 绑定的选中值数组，支持多选                                               |
| `options`    | `Options[]`                                                 | `[]`        | 是  | 选项数据，每个选项包含 `label` 和 `value` 属性                             |
| `label`      | `string`                                                    | `''`        | 否  | 表单标签文字，显示在组件上方                                             |
| `direction`  | `'horizontal' \| 'vertical'`                                | `'horizontal'` | 否  | 选项排列方向，`horizontal` 为横向，`vertical` 为纵向                         |
| `size`       | `'small' \| 'middle' \| 'large'`                            | `'middle'`   | 否  | 组件尺寸，影响字体大小和间距                                           |
| `disabled`   | `boolean`                                                   | `false`     | 否  | 是否禁用整个组件，禁用后不可交互                                         |
| `autofocus`  | `boolean`                                                   | `false`     | 否  | 是否自动聚焦（仅对输入框有效，当前组件不直接支持）                          |
| `readonly`   | `boolean`                                                   | `false`     | 否  | 是否只读，等同于禁用但样式略有不同                                        |
| `placeholder`| `string`                                                    | `''`        | 否  | 占位符文本，当前组件未使用该属性                                          |
| `clearable`  | `boolean`                                                   | `true`      | 否  | 是否支持清空，当前组件通过 `v-model` 控制，清空逻辑由外部处理                 |

> 💡 提示：支持原生 `input[type="checkbox"]` 的所有属性（如 `name`, `value`, `checked` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明                     |
|----------|------|------------------------|
| `update:modelValue` | `string[]` | 当选中项发生变化时触发，返回更新后的选中值数组 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormCheckboxGroup><template #default>自定义内容</template></FormCheckboxGroup>` |
| `label`   | 自定义 label 内容 | `<template #label>自定义标签</template>`       |

---

# Expose 方法

> 暂无内容