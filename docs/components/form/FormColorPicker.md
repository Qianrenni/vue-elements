# Props 参数

| 参数         | 类型                                                                 | 默认值         | 必填 | 说明                                                                 |
|------------|--------------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `label`    | `string`                                                          | `undefined` | 否  | 标签文字                                                               |
| `name`     | `string`                                                          | `undefined` | 是  | 表单字段名称                                                             |
| `direction`| `'horizontal' \| 'vertical'`                                      | `'horizontal'` | 否  | 布局方向，影响 label 排列方式                                             |
| `disabled` | `boolean`                                                         | `false`     | 否  | 是否禁用输入                                                             |
| `size`     | `'small' \| 'middle' \| 'large'`                                  | `'middle'`  | 否  | 控件尺寸，影响 label 字体大小                                             |
| `modelValue`| `string`                                                         | `'#fff'`    | 否  | 绑定的颜色值                                                             |
| `required` | `boolean`                                                         | `true`      | 否  | 是否为必填项                                                             |
| `autofocus`| `boolean`                                                         | `false`     | 否  | 是否自动聚焦                                                             |
| `clearable`| `boolean`                                                         | `true`      | 否  | 是否可清除颜色值                                                          |

---

# Events 事件

| 事件名      | 回调参数       | 说明             |
|----------|------------|----------------|
| `update:modelValue` | `(value: string)` | 输入颜色值发生变化时触发 |

---

# Slots 插槽

当前组件未使用插槽。

---

# Expose 方法

当前组件未暴露任何方法。