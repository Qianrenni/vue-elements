# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `name`     | `string`                                                    | `undefined` | 是  | 输入框的名称，用于表单数据绑定 |
| `label`    | `string`                                                    | `undefined` | 否  | 标签文本，显示在输入框上方或左侧 |
| `modelValue` | `string`                                                  | `''`        | 是  | 绑定的日期值，支持 `date`, `time`, `datetime-local`, `month`, `week` 类型 |
| `type`     | `'date' \| 'time' \| 'datetime-local' \| 'month' \| 'week'` | `'date'`    | 否  | 输入框类型，控制日期选择器的格式 |
| `direction`| `'horizontal' \| 'vertical'`                                | `'horizontal'` | 否  | 布局方向，`horizontal` 表示横向排列，`vertical` 表示纵向排列 |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 输入框尺寸，影响字体大小和内边距 |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用输入框 |
| `required` | `boolean`                                                   | `true`      | 否  | 是否为必填项，影响表单验证 |
| `autofocus`| `boolean`                                                   | `false`     | 否  | 是否自动聚焦 |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读 |
| `placeholder`| `string`                                                  | `'请选择日期'` | 否  | 占位符文本 |
| `clearable`| `boolean`                                                   | `true`      | 否  | 是否显示清除按钮（当前未实现，仅作为配置存在） |

> 💡 提示：支持原生 `input` 的所有属性（如 `autocomplete`, `min`, `max`, `step` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明        |
|----------|------|-----------|
| `update:modelValue` | `string` | 当输入框值变化时触发，用于双向绑定更新 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormDatePicker><template #default>自定义内容</template></FormDatePicker>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦输入框 |
| `blur`    | —  | —   | 失去焦点 |