# Props 参数

| 参数         | 类型                                                          | 默认值     | 必填 | 说明         |
|------------|-------------------------------------------------------------|---------|----|------------|
| `type`     | `'date' \| 'time' \| 'datetime-local' \| 'month' \| 'week'` | `'date'` | 否  | 日期选择器的类型   |
| `label`    | `string`                                                      | —       | 否  | 标签文字       |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'` | 否  | 输入框尺寸      |
| `disabled` | `boolean`                                                   | `false` | 否  | 是否禁用输入框    |
| `required` | `boolean`                                                   | `true`  | 否  | 是否为必填项     |
| `direction`| `'horizontal' \| 'vertical'`                                | `'horizontal'` | 否  | 表单控件排列方向 |
| `placeholder` | `string`                                               | `'请选择日期'` | 否  | 输入框占位符     |
| `autofocus`| `boolean`                                                   | `false` | 否  | 是否自动获取焦点  |
| `readonly` | `boolean`                                                   | `false` | 否  | 是否只读       |
| `clearable`| `boolean`                                                   | `true`  | 否  | 是否显示清除按钮  |
| `modelValue`| `string`                                                  | —       | 否  | 绑定的日期值     |

> 💡 提示：支持原生 `input` 的所有属性（如 `name`, `id`, `placeholder` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明           |
|----------|------|--------------|
| `update:modelValue` | `string` | 当日期值发生变化时触发 |
| `input`  | `string` | 原生输入事件，返回输入框的值 |
| `change` | `string` | 值发生变化且输入框失去焦点时触发 |

---

# Slots 插槽

| 插槽名       | 说明         | 示例 |
|-----------|------------|------|
| `default` | 默认插槽，用于扩展内容 | —    |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
|------|----|-----|----|
| —    | —  | —   | —  |