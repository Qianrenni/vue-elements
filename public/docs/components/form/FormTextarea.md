# Props 参数

| 参数         | 类型                                             | 默认值     | 必填 | 说明                         |
|------------|------------------------------------------------|---------|----|----------------------------|
| `label`    | `string`                                       | `''`    | 否  | 表单项标签                     |
| `size`     | `'small' \| 'middle' \| 'large'`               | `'middle'` | 否  | 文本框尺寸                     |
| `disabled` | `boolean`                                      | `false` | 否  | 是否禁用文本框                   |
| `placeholder` | `string`                                    | `'请输入内容'` | 否  | 输入提示内容                    |
| `required` | `boolean`                                      | `true`  | 否  | 是否为必填项                    |
| `rows`     | `number`                                       | `3`     | 否  | 文本框行数                     |
| `resizable`| `boolean`                                      | `false` | 否  | 是否允许拖拽调整大小                |
| `direction`| `'vertical' \| 'horizontal'`                  | `'vertical'` | 否  | 布局方向，垂直或水平排列标签和文本框     |
| `modelValue`| `string`                                     | `''`    | 否  | 绑定输入值                      |

---

# Events 事件

| 事件名      | 回调参数 | 说明            |
|----------|------|-----------------|
| `input`  | `string` | 输入内容变化时触发，返回当前值 |

---

# Slots 插槽

暂无自定义插槽

---

# Expose 方法

暂无暴露方法