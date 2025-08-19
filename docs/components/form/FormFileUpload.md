# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                                                                 |
|------------|-------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `modelValue` | `File \| FileList \| null`                                  | `null`      | 否  | 绑定的文件或文件列表，支持单文件和多文件上传                                                       |
| `label`      | `string`                                                    | `undefined` | 否  | 表单标签文字，用于标识上传组件                                                               |
| `name`       | `string`                                                    | `undefined` | 否  | 输入框的 name 属性，用于表单提交和 DOM 操作                                                   |
| `multiple`   | `boolean`                                                   | `false`     | 否  | 是否允许多文件上传                                                                   |
| `accept`     | `string`                                                    | `*`         | 否  | 文件类型过滤，如 `image/*`, `.pdf`, `.jpg` 等，参考 HTML input accept 属性                            |
| `required`   | `boolean`                                                   | `true`      | 否  | 是否为必填项，影响表单验证                                                             |
| `direction`  | `'vertical' \| 'horizontal'`                                | `'vertical'`| 否  | 布局方向，`vertical` 为上下排列，`horizontal` 为左右排列                                          |
| `disabled`   | `boolean`                                                   | `false`     | 否  | 是否禁用上传功能                                                                    |
| `autofocus`  | `boolean`                                                   | `false`     | 否  | 是否自动聚焦                                                                       |
| `readonly`   | `boolean`                                                   | `false`     | 否  | 是否只读模式，不可编辑但可显示                                                         |
| `size`       | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 组件尺寸，影响字体大小和内边距                                                           |
| `placeholder`| `string`                                                    | `'选择文件'`| 否  | 当无文件时显示的占位提示文本                                                              |
| `clearable`  | `boolean`                                                   | `true`      | 否  | 是否显示清除按钮（仅在非禁用且有文件时显示）                                                  |

> 💡 提示：支持原生 `input[type="file"]` 的所有属性（如 `accept`, `multiple`, `required` 等）

---

# Events 事件

| 事件名          | 回调参数             | 说明                             |
|--------------|------------------|--------------------------------|
| `update:modelValue` | `File \| FileList \| null` | 当文件被选择或移除时触发，用于更新绑定值 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormFileUpload><template #default>自定义内容</template></FormFileUpload>` |
| `slot1`   | 插槽用途    | `<template #slot1>内容</template>`              |
| `slot2`   | 插槽用途    | `<template #slot2>内容</template>`              |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `method1` | —  | —   | 方法说明 |
| `method2` | —  | —   | 方法说明 |