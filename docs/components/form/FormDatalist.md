# Props 参数

| 参数         | 类型                          | 默认值    | 必填 | 说明                     |
|------------|-----------------------------|--------|----|------------------------|
| `name`     | `string`                    | —      | 是  | 输入框的名称，用于表单数据绑定和关联 label、datalist |
| `label`    | `string`                    | —      | 否  | 标签文本，显示在输入框上方或左侧 |
| `modelValue` | `string`                  | ``     | 是  | 双向绑定的值，当前输入框的值 |
| `options`  | `string[]`                  | `[]`   | 是  | datalist 的选项列表，供自动补全使用 |
| `placeholder` | `string`                 | ``     | 否  | 输入框占位符文本             |
| `required` | `boolean`                   | `true` | 否  | 是否为必填项，影响验证逻辑     |
| `disabled` | `boolean`                   | `false`| 否  | 是否禁用输入框               |
| `readonly` | `boolean`                   | `false`| 否  | 是否只读模式                |
| `autofocus`| `boolean`                   | `false`| 否  | 是否自动聚焦               |
| `size`     | `'small' \| 'middle' \| 'large'` | `'middle'` | 否  | 输入框尺寸，影响字体大小和内边距 |
| `direction`| `'horizontal' \| 'vertical'` | `'horizontal'` | 否  | 布局方向，水平或垂直排列 |
| `clearable`| `boolean`                   | `true` | 否  | 是否显示清除按钮（由事件触发） |

> 💡 提示：支持原生 `<input>` 的所有属性（如 `type="text"`、`autocomplete` 等）

---

# Events 事件

| 事件名      | 回调参数           | 说明                     |
|----------|------------------|------------------------|
| `update:modelValue` | `string`       | 当输入框值改变时触发，用于双向绑定更新 |
| `change` | `Event`          | 输入内容发生改变时触发（blur 或 change 事件） |
| `focus`  | `FocusEvent`     | 输入框获得焦点时触发              |
| `blur`   | `FocusEvent`     | 输入框失去焦点时触发              |
| `clear`  | —                | 清除按钮被点击时触发，清空输入值       |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormDataList><template #default>自定义标签</template></FormDataList>` |
| `label`   | 自定义标签插槽 | `<template #label><span class="custom-label">自定义标签</span></template>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦到输入框，等同于调用原生 focus() 方法 |
| `blur`    | —  | —   | 失去焦点，等同于调用原生 blur() 方法 |
| `clear`   | —  | —   | 清空输入框内容并触发 `clear` 事件 |