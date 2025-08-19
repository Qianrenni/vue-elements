# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                                                                 |
|------------|-------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `name`     | `string`                                                    | `undefined` | 是  | 输入框的名称，用于表单提交和关联 label                                               |
| `label`    | `string`                                                    | `undefined` | 否  | 输入框标签文本，显示在输入框上方或左侧                                           |
| `modelValue` | `string`                                                  | `''`        | 是  | 双向绑定的值，控制文本框的当前内容                                             |
| `placeholder` | `string`                                                 | `'请输入内容'` | 否  | 占位符文本，提示用户输入内容                                              |
| `required` | `boolean`                                                   | `true`      | 否  | 是否为必填项，影响表单验证                                                |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用输入框，不可编辑且不响应事件                                       |
| `autofocus` | `boolean`                                                  | `false`     | 否  | 是否自动获取焦点，页面加载时是否聚焦于该输入框                                |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读，可查看但不可编辑                                               |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 输入框尺寸，影响字体大小和内边距                                           |
| `direction` | `'vertical' \| 'horizontal'`                              | `'vertical'`| 否  | 布局方向，`vertical` 为上下布局，`horizontal` 为左右布局（label 在左，input 在右） |
| `rows`     | `number`                                                    | `3`         | 否  | 文本域的行数，默认为 3 行                                                  |
| `resizable` | `boolean`                                                  | `false`     | 否  | 是否允许用户拖拽调整文本域大小，`true` 时可拖拽调整，`false` 时禁止              |
| `clearable` | `boolean`                                                  | `false`     | 否  | 是否显示清除按钮，当有内容时显示一个“×”图标可清空内容                         |

> 💡 提示：支持原生 `textarea` 的所有属性（如 `maxlength`, `minlength`, `spellcheck` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明                     |
|----------|------|------------------------|
| `update:modelValue` | `string` | 用户输入时触发，传递新值，用于双向绑定更新 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormTextarea><template #default>自定义内容</template></FormTextarea>` |
| `slot1`   | 插槽用途    | `<template #slot1>内容</template>`              |
| `slot2`   | 插槽用途    | `<template #slot2>内容</template>`              |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦到文本域，等同于调用原生 `focus()` 方法 |
| `blur`    | —  | —   | 失去焦点，等同于调用原生 `blur()` 方法    |