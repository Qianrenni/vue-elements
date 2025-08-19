# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明        |
|------------|-------------------------------------------------------------|-------------|----|-----------|
| `options`  | `Options[]`                                                 | `[]`        | 是  | 可选项列表，每个选项包含 label 和 value 等属性 |
| `placeholder` | `string`                                                  | `'请选择'`  | 否  | 输入框占位符文本 |
| `required` | `boolean`                                                   | `true`      | 否  | 是否为必填项 |
| `direction` | `'horizontal' \| 'vertical'`                              | `'horizontal'` | 否  | 布局方向，水平或垂直 |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用组件 |
| `autofocus` | `boolean`                                                  | `false`     | 否  | 是否自动聚焦 |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读 |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 组件尺寸大小 |
| `clearable` | `boolean`                                                  | `false`     | 否  | 是否支持清空选择 |
| `searchable` | `boolean`                                                | `false`     | 否  | 是否支持搜索筛选选项 |
| `multiple` | `boolean`                                                   | `true`      | 否  | 是否支持多选 |

> 💡 提示：`options` 中的 `label` 用于显示，`value` 用于绑定值（当前未直接使用，但结构预留）

---

# Events 事件

| 事件名       | 回调参数     | 说明                     |
|------------|------------|------------------------|
| `update:modelValue` | `string[]` | 当选择项发生变化时触发，返回当前选中的选项值数组 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormSelectMultiple><template #default>自定义内容</template></FormSelectMultiple>` |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 聚焦到选择器输入区域 |
| `blur`    | —  | —   | 失去焦点 |
| `reset`   | —  | —   | 重置选择状态，清除所有已选项 |