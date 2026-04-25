# Props 参数

| 参数         | 类型                             | 默认值         | 必填 | 说明     |
| ------------ | -------------------------------- | -------------- | ---- | -------- |
| `modelValue` | `boolean`                        | `false`        | 否   | 开关状态 |
| `label`      | `string`                         | `''`           | 否   | 标签文本 |
| `disabled`   | `boolean`                        | `false`        | 否   | 是否禁用 |
| `name`       | `string`                         | `''`           | 否   | 名称     |
| `direction`  | `'horizontal' \| 'vertical'`     | `'horizontal'` | 否   | 排列方向 |
| `size`       | `'large' \| 'middle' \| 'small'` | `'middle'`     | 否   | 开关大小 |

---

# Events 事件

| 事件名              | 回调参数         | 说明         |
| ------------------- | ---------------- | ------------ |
| `update:modelValue` | `value: boolean` | 值变化时触发 |
| `input`             | `value: boolean` | 输入时触发   |
| `change`            | `value: boolean` | 改变时触发   |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
| ------ | ---- | ---- |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
