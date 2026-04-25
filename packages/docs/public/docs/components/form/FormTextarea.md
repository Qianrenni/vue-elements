# Props 参数

| 参数          | 类型                             | 默认值         | 必填 | 说明         |
| ------------- | -------------------------------- | -------------- | ---- | ------------ |
| `modelValue`  | `string`                         | —              | 否   | 输入值       |
| `label`       | `string`                         | —              | 否   | 标签文本     |
| `placeholder` | `string`                         | `'请输入内容'` | 否   | 占位文本     |
| `rows`        | `number`                         | `5`            | 否   | 行数         |
| `resizable`   | `boolean`                        | `false`        | 否   | 是否可拉伸   |
| `required`    | `boolean`                        | `true`         | 否   | 是否必填     |
| `direction`   | `'horizontal' \| 'vertical'`     | `'vertical'`   | 否   | 排列方向     |
| `disabled`    | `boolean`                        | `false`        | 否   | 是否禁用     |
| `autofocus`   | `boolean`                        | `false`        | 否   | 是否自动聚焦 |
| `readonly`    | `boolean`                        | `false`        | 否   | 是否只读     |
| `size`        | `'large' \| 'middle' \| 'small'` | `'middle'`     | 否   | 输入框大小   |
| `clearable`   | `boolean`                        | `false`        | 否   | 是否可清空   |

---

# Events 事件

| 事件名              | 回调参数        | 说明         |
| ------------------- | --------------- | ------------ |
| `update:modelValue` | `value: string` | 值变化时触发 |
| `input`             | `value: string` | 输入时触发   |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
| ------ | ---- | ---- |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
