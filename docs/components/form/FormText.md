# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                                                                 |
|------------|-------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `name`     | `string`                                                    | `undefined` | 否  | 输入框的名称，用于表单数据绑定和标签关联                                               |
| `label`    | `string`                                                    | `undefined` | 否  | 输入框的标签文本，显示在输入框上方或左侧                                               |
| `modelValue` | `string`                                                  | `''`        | 是  | 双向绑定的值，控制输入框的当前内容                                                 |
| `type`     | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`    | 否  | 输入框类型，决定输入内容的格式和键盘类型（如 email 类型会显示邮箱键盘）                           |
| `pattern`  | `string`                                                    | `''`        | 否  | 正则表达式模式，用于验证输入内容是否符合要求                                           |
| `placeholder` | `string`                                                 | `''`        | 否  | 输入框占位符文本，当输入框为空时显示                                                |
| `required` | `boolean`                                                   | `true`      | 否  | 是否为必填项，影响表单验证逻辑                                                       |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用输入框，禁用状态下不可编辑且不可聚焦                                         |
| `autofocus` | `boolean`                                                  | `false`     | 否  | 页面加载后是否自动聚焦到该输入框                                                     |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读，可编辑但不响应输入事件，常用于展示信息                                     |
| `direction` | `'horizontal' \| 'vertical'`                              | `'horizontal'` | 否  | 布局方向：水平（横向排列 label 和 input）或垂直（纵向排列）                             |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 输入框尺寸大小，影响字体大小和内边距                                                 |
| `clearable` | `boolean`                                                  | `true`      | 否  | 是否显示清除按钮，仅在非 password 类型下有效                                          |
| `id`       | `string`                                                    | `undefined` | 否  | 输入框的唯一标识，用于关联 label 的 for 属性                                         |

---

# Events 事件

| 事件名      | 回调参数 | 说明                                                                 |
|----------|------|----------------------------------------------------------------------|
| `update:modelValue` | `string` | 当输入框内容变化时触发，用于更新父组件中 modelValue 的值                                  |
| `focus`  | `FocusEvent` | 输入框获得焦点时触发                                                              |
| `blur`   | `FocusEvent` | 输入框失去焦点时触发                                                              |
| `change` | `Event`   | 输入框内容发生变化并失去焦点后触发（适用于非实时校验场景）                                 |
| `input`  | `InputEvent` | 输入框内容实时变化时触发，适合实时监听用户输入行为                                   |
| `clear`  | —    | 点击清除按钮时触发，清空输入框内容，并触发 `update:modelValue` 事件                        |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<form-text><template #default>自定义内容</template></form-text>`             |
| `prefix`  | 输入框前缀插槽 | `<template #prefix><icon icon="User" /></template>`                         |
| `suffix`  | 输入框后缀插槽 | `<template #suffix><icon icon="Search" /></template>`                       |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦到输入框，等同于原生 input 的 focus() 方法                          |
| `blur`    | —  | —   | 失去焦点，等同于原生 input 的 blur() 方法                              |
| `reset`   | —  | —   | 重置输入框内容为空，同时触发 `clear` 事件并更新 `modelValue` 为 `''` |