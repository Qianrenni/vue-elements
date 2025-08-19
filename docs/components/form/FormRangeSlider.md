# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                                                                 |
|------------|-------------------------------------------------------------|-------------|----|----------------------------------------------------------------------|
| `name`     | `string`                                                    | `undefined` | 是  | 输入控件的名称，用于表单提交和标签关联                                               |
| `modelValue` | `number`                                                    | `undefined` | 是  | 当前选中的值，支持 v-model 双向绑定                                                   |
| `label`    | `string`                                                    | `undefined` | 否  | 标签文本，显示在滑块上方或左侧（根据方向）                                           |
| `id`       | `string`                                                    | `undefined` | 否  | 组件唯一标识，用于关联 label 和 input 的 aria-labelledby 属性                           |
| `min`      | `number`                                                    | `0`         | 否  | 滑块最小值                                                           |
| `max`      | `number`                                                    | `100`       | 否  | 滑块最大值                                                           |
| `step`     | `number`                                                    | `1`         | 否  | 步长，控制滑块每次移动的增量                                                       |
| `direction`| `'horizontal' \| 'vertical'`                                | `'horizontal'` | 否  | 滑块方向：水平或垂直                                                         |
| `size`     | `'small' \| 'middle' \| 'large'`                            | `'middle'`  | 否  | 控件尺寸大小，影响字体和组件整体高度                                                 |
| `disabled` | `boolean`                                                   | `false`     | 否  | 是否禁用滑块，禁用时不可交互且不可聚焦                                             |
| `readonly` | `boolean`                                                   | `false`     | 否  | 是否只读，仅限制修改，但仍可聚焦并显示当前值                                         |
| `required` | `boolean`                                                   | `true`      | 否  | 是否为必填项，用于表单验证                                                     |
| `clearable`| `boolean`                                                   | `false`     | 否  | 是否支持清空（虽不适用此组件，但保持接口统一）                                       |
| `valueText`| `string`                                                    | `undefined` | 否  | 自定义输出值的文本描述，用于 ARIA 属性 `aria-valuetext`                              |
| `formatter`| `(value: number) => string`                                 | `(val) => String(val)` | 否  | 自定义格式化函数，用于渲染 `output` 显示的值，如添加单位、千分位等                     |

> 💡 提示：支持原生 `<input type="range">` 的所有属性（如 `autofocus`, `tabindex` 等）

---

# Events 事件

| 事件名      | 回调参数 | 说明                             |
|----------|------|----------------------------------|
| `update:modelValue` | `number` | 当滑块值变化时触发，用于双向绑定更新               |
| `change`   | `number` | 用户完成拖动后松开鼠标时触发，表示值已确认改变           |
| `focus`    | `FocusEvent` | 获得焦点时触发                         |
| `blur`     | `FocusEvent` | 失去焦点时触发                         |
| `input`    | `InputEvent` | 每次滑块移动时实时触发，用于实时反馈变化        |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<FormRangeSlider><template #default>自定义标签</template></FormRangeSlider>` |
| `slot1`   | 插槽用途    | `<template #slot1>附加内容</template>`              |
| `slot2`   | 插槽用途    | `<template #slot2>附加内容</template>`              |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明   |
|-----------|----|-----|------|
| `focus`   | —  | —   | 使滑块获得焦点，可用于程序化聚焦            |
| `blur`    | —  | —   | 移除滑块焦点，可用于程序化失焦             |