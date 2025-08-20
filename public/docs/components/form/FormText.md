# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明              |
|------------|-------------------------------------------------------------|-------------|----|-----------------|
| `type`     | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`    | 否  | 输入框类型           |
| `pattern`  | `string`                                                      | `undefined` | 否  | 正则表达式验证输入内容   |
| `required` | `boolean`                                                     | `true`      | 否  | 是否为必填项         |
| `direction`| `'horizontal' \| 'vertical'`                                 | `'horizontal'` | 否  | 标签排列方向         |
| `disabled` | `boolean`                                                     | `false`     | 否  | 是否禁用输入框        |
| `autofocus`| `boolean`                                                     | `false`     | 否  | 自动获取焦点          |
| `readonly` | `boolean`                                                     | `false`     | 否  | 是否只读            |
| `size`     | `'small' \| 'middle' \| 'large'`                             | `'middle'`  | 否  | 输入框尺寸           |
| `placeholder` | `string`                                                  | `''`        | 否  | 输入框占位符          |
| `clearable`| `boolean`                                                     | `true`      | 否  | 是否显示清除按钮       |
| `label`    | `string`                                                      | `undefined` | 否  | 标签文字             |
| `name`     | `string`                                                      | `undefined` | 是  | 表单控件名称          |
| `id`       | `string`                                                      | `undefined` | 否  | 输入框的 `id` 属性   |
| `modelValue`| `string`                                                     | `undefined` | 否  | 绑定的输入值          |

> 💡 提示：支持原生 `input` 的所有属性（如 `autofocus`, `placeholder`, `type="email"` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明              |
|----------|------|-----------------|
| `input`  | `value: string` | 输入内容变化时触发（实时） |
| `change` | `value: string` | 输入框内容变更后触发（失焦时） |
| `focus`  | —    | 输入框获取焦点时触发     |
| `blur`   | —    | 输入框失去焦点时触发     |

---

# Slots 插槽

当前组件未定义任何插槽。

---

# Expose 方法

当前组件未暴露任何方法（无 `defineExpose` 定义）。