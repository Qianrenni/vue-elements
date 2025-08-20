# Props 参数

| 参数         | 类型                            | 默认值      | 必填 | 说明                            |
|------------|-------------------------------|-----------|----|-------------------------------|
| `label`    | `string`                      | `''`      | 否  | 复选框组的标签文本                  |
| `modelValue` | `string[]`                    | `[]`      | 否  | 绑定的选中值数组                    |
| `options`  | `Options[]`                   | `[]`      | 是  | 复选框选项数组，每个选项需包含 `value` 和 `label` |
| `required` | `boolean`                     | `true`    | 否  | 是否必填                        |
| `direction`| `'horizontal' \| 'vertical'` | `'horizontal'` | 否  | 复选框排列方向                     |
| `disabled` | `boolean`                     | `false`   | 否  | 是否禁用整个复选框组                 |
| `autofocus`| `boolean`                     | `false`   | 否  | 是否自动聚焦（未实际使用）              |
| `readonly` | `boolean`                     | `false`   | 否  | 是否只读（未实际使用）                |
| `size`     | `'small' \| 'middle' \| 'large'` | `'middle'` | 否  | 控制复选框组内文字大小                 |
| `placeholder` | `string`                   | `''`      | 否  | 占位符（未实际使用）                 |
| `clearable`| `boolean`                     | `true`    | 否  | 是否可清除（未实际使用）               |

---

# Events 事件

| 事件名      | 回调参数 | 说明                        |
|----------|------|---------------------------|
| `update:modelValue` | `(value: string[]) => void` | 当复选框组选中值变化时触发，返回新的值数组 |

---

# Slots 插槽

当前组件未使用插槽。

---

# Expose 方法

当前组件未暴露任何方法。