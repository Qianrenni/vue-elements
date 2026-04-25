# Props 参数

| 参数          | 类型                                                            | 默认值         | 必填 | 说明         |
| ------------- | --------------------------------------------------------------- | -------------- | ---- | ------------ |
| `modelValue`  | `string`                                                        | —              | 否   | 输入值       |
| `label`       | `string`                                                        | —              | 否   | 标签文本     |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`       | 否   | 输入类型     |
| `pattern`     | `string`                                                        | `undefined`    | 否   | 正则表达式   |
| `placeholder` | `string`                                                        | `''`           | 否   | 占位文本     |
| `required`    | `boolean`                                                       | `true`         | 否   | 是否必填     |
| `direction`   | `'horizontal' \| 'vertical'`                                    | `'horizontal'` | 否   | 排列方向     |
| `disabled`    | `boolean`                                                       | `false`        | 否   | 是否禁用     |
| `autofocus`   | `boolean`                                                       | `false`        | 否   | 是否自动聚焦 |
| `readonly`    | `boolean`                                                       | `false`        | 否   | 是否只读     |
| `size`        | `'large' \| 'middle' \| 'small'`                                | `'middle'`     | 否   | 输入框大小   |
| `clearable`   | `boolean`                                                       | `true`         | 否   | 是否可清空   |
| `editable`    | `boolean`                                                       | `true`         | 否   | 是否可编辑   |

---

# Events 事件

| 事件名              | 回调参数        | 说明         |
| ------------------- | --------------- | ------------ |
| `update:modelValue` | `value: string` | 值变化时触发 |
| `input`             | `value: string` | 输入时触发   |
| `change`            | `value: string` | 改变时触发   |
| `focus`             | —               | 聚焦时触发   |
| `blur`              | —               | 失焦时触发   |
| `clear`             | —               | 清空时触发   |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
| ------ | ---- | ---- |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
