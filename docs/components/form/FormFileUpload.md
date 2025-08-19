# Props 参数

| 参数         | 类型                                                                 | 默认值      | 必填 | 说明                                                                 |
|------------|--------------------------------------------------------------------|----------|----|----------------------------------------------------------------------|
| `modelValue` | `File \| FileList \| null`                                        | `null`   | 否  | 绑定的文件对象或文件列表                                                   |
| `label`      | `string`                                                          | `''`     | 否  | 标签文字                                                               |
| `name`       | `string`                                                          | `''`     | 是  | 表单字段的 `name` 属性，同时也是 `id` 和 `for` 的值                          |
| `multiple`   | `boolean`                                                         | `false`  | 否  | 是否支持多文件上传                                                       |
| `accept`     | `string`                                                          | `'*'`    | 否  | 接受的文件类型（如 `'image/*'` 或 `'application/pdf'`）                      |
| `required`   | `boolean`                                                         | `true`   | 否  | 是否为必填项                                                             |
| `direction`  | `'vertical' \| 'horizontal'`                                      | `'vertical'` | 否  | 表单标签与控件排列方向                                                      |
| `disabled`   | `boolean`                                                         | `false`  | 否  | 是否禁用上传控件                                                         |
| `autofocus`  | `boolean`                                                         | `false`  | 否  | 是否自动聚焦                                                            |
| `readonly`   | `boolean`                                                         | `false`  | 否  | 是否只读                                                               |
| `size`       | `'small' \| 'middle' \| 'large'`                                  | `'middle'`   | 否  | 控件尺寸，影响字体大小                                                     |
| `placeholder`| `string`                                                          | `'选择文件'` | 否  | 占位符文本                                                             |
| `clearable`  | `boolean`                                                         | `true`   | 否  | 是否显示清除按钮                                                         |

---

# Events 事件

| 事件名             | 回调参数                          | 说明                       |
|------------------|-------------------------------|--------------------------|
| `update:modelValue` | `(value: File \| FileList \| null): void` | 当文件选择发生变化时触发，返回选中的文件 |

---

# Slots 插槽

当前组件未使用插槽功能，因此无插槽定义。

---

# Expose 方法

当前组件未通过 `defineExpose` 暴露任何方法，因此无对外方法可调用。