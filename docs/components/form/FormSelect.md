# Props 参数

| 参数            | 类型                         | 默认值         | 必填 | 说明       |
| --------------- | ---------------------------- | -------------- | ---- | ---------- |
| `modelValue`    | `string`                     | `null`         | 否   | 选中值     |
| `options`       | `Options[]`                  | —              | 是   | 选项列表   |
| `label`         | `string`                     | —              | 否   | 标签文本   |
| `placeholder`   | `string`                     | `'请选择'`     | 否   | 占位文本   |
| `required`      | `boolean`                    | `true`         | 否   | 是否必填   |
| `direction`     | `'horizontal' \| 'vertical'` | `'horizontal'` | 否   | 排列方向   |
| `disabled`      | `boolean`                    | `false`        | 否   | 是否禁用   |
| `searchable`    | `boolean`                    | `false`        | 否   | 是否可搜索 |
| `optionsHeight` | `string`                     | `'auto'`       | 否   | 下拉框高度 |

---

# Events 事件

| 事件名              | 回调参数        | 说明         |
| ------------------- | --------------- | ------------ |
| `update:modelValue` | `value: string` | 值变化时触发 |
| `input`             | `value: string` | 输入时触发   |
| `change`            | `value: string` | 改变时触发   |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
| ------ | ---- | ---- |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
