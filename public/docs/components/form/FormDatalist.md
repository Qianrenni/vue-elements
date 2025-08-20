# Props 参数

| 参数         | 类型                     | 默认值     | 必填 | 说明                                                                 |
|------------|------------------------|---------|----|----------------------------------------------------------------------|
| `label`    | `string`               | `''`    | 否  | 表单项标签文本                                                         |
| `size`     | `'small' \| 'middle' \| 'large'` | `'middle'` | 否  | 控件尺寸，影响字体大小                                                     |
| `disabled` | `boolean`              | `false` | 否  | 是否禁用输入框                                                           |
| `required` | `boolean`              | `true`  | 否  | 是否必填项                                                             |
| `direction`| `'horizontal' \| 'vertical'` | `'horizontal'` | 否  | 表单控件布局方向，`vertical`为竖直布局，`horizontal`为水平布局 |
| `name`     | `string`               | `''`    | 是  | 表单字段名称，同时作为 `input` 的 `name` 属性                             |
| `id`       | `string`               | `''`    | 否  | 表单字段 ID，用于 `label` 的 `for` 属性                                  |
| `placeholder` | `string`            | `''`    | 否  | 输入框占位符文本                                                         |
| `autofocus`| `boolean`              | `false` | 否  | 是否自动获取焦点                                                         |
| `readonly` | `boolean`              | `false` | 否  | 输入框是否只读                                                           |
| `clearable`| `boolean`              | `true`  | 否  | 是否可清除输入内容                                                         |
| `options`  | `string[]`             | `[]`    | 是  | 数据列表，用于 `<datalist>` 提供自动补全选项                              |
| `modelValue`| `string`              | `''`    | 是  | 绑定的输入值，支持 `v-model`                                           |

> 💡 提示：支持原生 `input` 的所有属性（如 `autocomplete`, `maxlength` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明             |
|----------|------|------------------|
| `input`  | `(value: string)` | 输入时触发，用于支持 `v-model` 绑定 |
| `change` | `(value: string)` | 值改变时触发                        |
| `focus`  | —                 | 输入框获得焦点时触发                  |
| `blur`   | —                 | 输入框失去焦点时触发                  |
| `clear`  | —                 | 当用户点击清除按钮时触发（如果启用）     |

---

# Slots 插槽

当前组件未定义任何插槽。

---

# Expose 方法

当前组件未通过 `defineExpose` 暴露任何方法。