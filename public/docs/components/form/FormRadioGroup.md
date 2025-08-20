# Props 参数

| 参数         | 类型                                                                 | 默认值      | 必填 | 说明                                                                 |
|------------|--------------------------------------------------------------------|----------|----|----------------------------------------------------------------------|
| `options`  | `{ value: string \| number, label: string }[]`                     | `[]`     | 是  | 选项列表，每个选项包含 `value` 和 `label` 字段                                  |
| `modelValue` | `string \| number`                                                | `''`     | 否  | 绑定的选中值，用于 `v-model` 控制选中项                                        |
| `label`    | `string`                                                          | `''`     | 否  | 单选组的标签文本                                                           |
| `direction`| `'horizontal' \| 'vertical'`                                      | `'horizontal'` | 否  | 设置单选组排列方向，`'horizontal'` 横向排列，`'vertical'` 纵向排列            |
| `name`     | `string`                                                          | `''`     | 否  | 原生 `name` 属性，用于表单提交或关联多个单选按钮                                 |
| `size`     | `'small' \| 'middle' \| 'large'`                                  | `'middle'`   | 否  | 设置单选组大小，影响字体大小（`text-12rem` / `text-05rem`）                    |
| `disabled` | `boolean`                                                         | `false`  | 否  | 是否禁用整个单选组，禁用后不可操作                                               |
| `required` | `boolean`                                                         | `true`   | 否  | 是否为必填项，原生 `required` 属性                                          |
| `autofocus`| `boolean`                                                         | `false`  | 否  | 自动聚焦属性，原生支持                                                       |
| `readonly` | `boolean`                                                         | `false`  | 否  | 是否为只读状态，原生支持                                                     |

---

# Events 事件

| 事件名     | 回调参数 | 说明                      |
|---------|------|---------------------------|
| `update:modelValue` | `(value: string \| number)` | 当用户选择一个选项时触发，用于更新 `v-model` 绑定值 |

---

# Slots 插槽

| 插槽名       | 说明         | 示例 |
|-----------|------------|-----|
| —         | 不支持插槽内容 | —   |

---

# Expose 方法

当前组件未使用 `defineExpose`，因此无暴露方法。