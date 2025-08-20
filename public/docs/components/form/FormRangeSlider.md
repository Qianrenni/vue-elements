# Props 参数

| 参数         | 类型                                                                 | 默认值         | 必填 | 说明                                                                 |
|------------|--------------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `name`     | `string`                                                          | —           | 是  | 原生 input 的 `name` 属性                                           |
| `modelValue` | `number`                                                         | `0`         | 是  | 双向绑定的数值，表示当前滑块的值                                            |
| `min`      | `number`                                                          | `0`         | 否  | 最小值                                                               |
| `max`      | `number`                                                          | `100`       | 否  | 最大值                                                               |
| `step`     | `number`                                                          | `1`         | 否  | 步长                                                                 |
| `label`    | `string`                                                          | `undefined` | 否  | 标签文本                                                              |
| `valueText`| `string`                                                          | `undefined` | 否  | 自定义显示值文本（用于 ARIA 和 output）                              |
| `formatter`| `(value: number) => string`                                      | `(val: number) => String(val)` | 否  | 自定义输出显示格式 |
| `required` | `boolean`                                                         | `true`      | 否  | 是否为必填项                                                           |
| `direction`| `'horizontal' \| 'vertical'`                                     | `'horizontal'` | 否  | 滑块方向                                                             |
| `disabled` | `boolean`                                                         | `false`     | 否  | 是否禁用组件                                                         |
| `readonly` | `boolean`                                                         | `false`     | 否  | 是否只读                                                             |
| `size`     | `'small' \| 'middle' \| 'large'`                                 | `'middle'`  | 否  | 组件尺寸，影响标签和输出值的字体大小                                         |
| `id`       | `string`                                                          | `undefined` | 否  | 原生 input 的 `id` 属性，未提供时使用 `name` 生成                      |
| `clearable`| `boolean`                                                         | `false`     | 否  | 虽然不适用，但保留接口统一                                               |

> 💡 提示：支持原生 `input` 的所有属性（如 `autofocus`, `required`, `readonly` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明                   |
|----------|------|------------------------|
| `update:modelValue` | `(value: number)` | 当滑块值改变时触发双向绑定更新 |
| `change` | `(value: number)` | 当用户结束拖动并更改值时触发 |
| `input`  | `(value: number)` | 滑块值变化时实时触发        |
| `focus`  | `(event: FocusEvent)` | 输入框获得焦点时触发       |
| `blur`   | `(event: FocusEvent)` | 输入框失去焦点时触发       |

---

# Slots 插槽

当前组件未使用插槽。

---

# Expose 方法

当前组件未暴露任何方法（无 `defineExpose` 定义）。