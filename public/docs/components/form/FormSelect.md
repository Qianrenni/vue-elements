# Props 参数

| 参数         | 类型                                                                 | 默认值      | 必填 | 说明                             |
|------------|--------------------------------------------------------------------|----------|----|--------------------------------|
| `label`    | `string`                                                          | `''`     | 否  | 表单选择器的标签文本                   |
| `options`  | `Array<{ label: string, [key: string]: any }>`                    | `[]`     | 是  | 选项列表，每个选项必须包含 `label` 字段 |
| `placeholder` | `string`                                                       | `'请选择'` | 否  | 未选择时显示的占位符                   |
| `required` | `boolean`                                                       | `true`   | 否  | 是否为必填项                         |
| `direction`| `'horizontal' \| 'vertical'`                                      | `'horizontal'` | 否  | 布局方向，影响子元素排列方式         |
| `disabled` | `boolean`                                                       | `false`  | 否  | 是否禁用选择器                       |
| `autofocus`| `boolean`                                                       | `false`  | 否  | 是否自动聚焦                         |
| `readonly` | `boolean`                                                       | `false`  | 否  | 是否只读                             |
| `size`     | `'small' \| 'middle' \| 'large'`                                  | `'middle'` | 否  | 控件尺寸                             |
| `clearable`| `boolean`                                                       | `false`  | 否  | 是否可清除已选项                       |
| `searchable`| `boolean`                                                      | `false`  | 否  | 是否可搜索选项                        |
| `multiple` | `boolean`                                                       | `true`   | 否  | 是否支持多选                          |

---

# Events 事件

| 事件名      | 回调参数             | 说明                     |
|----------|--------------------|--------------------------|
| `update:modelValue` | `(selected: string[])` | 当选项改变时触发，返回选中项的值数组 |
| `change` | `(selected: string[])` | 当选项改变时触发，与 `update:modelValue` 类似 |

---

# Slots 插槽

当前组件未定义具名插槽，所有内容通过 props 控制。

---

# Expose 方法

当前组件未暴露任何方法，无法通过 ref 调用。