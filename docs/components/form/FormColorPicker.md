# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `name`     | `string`                                                    | `undefined` | 是  | 输入框的名称，用于表单绑定和标签关联 |
| `label`    | `string`                                                    | `undefined` | 否  | 标签文本，显示在输入框上方或左侧 |
| `modelValue` | `string`                                                  | `'#fff'`    | 否  | 当前选中的颜色值（十六进制格式） |
| `direction` | `'horizontal' \| 'vertical'`                               | `'horizontal'` | 否  | 布局方向：水平或垂直排列 |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 控件尺寸大小 |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用该组件 |
| `autofocus` | `boolean`                                                  | `false`     | 否  | 是否自动聚焦 |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读状态 |
| `placeholder` | `string`                                                 | `'请选择颜色'` | 否  | 输入框占位符文本 |
| `clearable` | `boolean`                                                  | `true`      | 否  | 是否支持清除功能 |

> 💡 提示：支持原生 `input[type="color"]` 的所有属性（如 `required`, `aria-label` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明        |
|----------|------|-----------|
| `update:modelValue` | `string` | 用户选择颜色后触发，返回新的颜色值（十六进制字符串） |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormColorPicker><template #default>自定义内容</template></FormColorPicker>` |

---

# Expose 方法

> 暂无内容