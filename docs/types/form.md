# Props 参数

| 参数         | 类型                                                          | 默认值         | 必填 | 说明                             |
|--------------|---------------------------------------------------------------|----------------|------|----------------------------------|
| `modelValue` | `T \| null`                                                   | `undefined`    | 否   | 表单项绑定值（支持 null）        |
| `name`       | `string`                                                      | `undefined`    | 否   | 表单项名称，用于表单提交         |
| `label`      | `string`                                                      | `undefined`    | 否   | label 文本                       |
| `disabled`   | `boolean`                                                     | `false`        | 否   | 是否禁用                           |
| `readonly`   | `boolean`                                                     | `false`        | 否   | 是否只读                           |
| `size`       | `'small' \| 'middle' \| 'large'`                              | `'middle'`     | 否   | 表单组件尺寸                       |
| `status`     | `'default' \| 'success' \| 'warning' \| 'error'`              | `undefined`    | 否   | 状态，用于边框颜色和校验反馈       |
| `required`   | `boolean`                                                     | `false`        | 否   | 是否必填（显示红色星号提示）       |
| `placeholder`| `string`                                                      | `undefined`    | 否   | 占位符文本                         |
| `clearable`  | `boolean`                                                     | `false`        | 否   | 是否可清空，显示 × 按钮            |
| `autofocus`  | `boolean`                                                     | `false`        | 否   | 是否自动聚焦                       |
| `id`         | `string`                                                      | `undefined`    | 否   | 唯一标识，用于 label 关联和 a11y  |
| `direction`  | `'vertical' \| 'horizontal'`                                  | `'vertical'`   | 否   | 排列方向：竖向或横向               |
| `errorMessage`| `string`                                                     | `undefined`    | 否   | 自定义错误信息                     |

---

# Events 事件

| 事件名           | 回调参数                                      | 说明                         |
|------------------|-----------------------------------------------|------------------------------|
| `update:modelValue` | `(value: T): void`                          | 当绑定值变化时触发             |
| `change`            | `(value: T): void`                          | 表单值发生变化时触发（可用于验证） |
| `focus`             | `(event: FocusEvent): void`                 | 聚焦时触发                     |
| `blur`              | `(event: FocusEvent): void`                 | 失焦时触发                     |
| `input`             | `(value: T, event: InputEvent \| Event): void` | 输入时触发                     |
| `clear`             | `(): void`                                   | 清空操作时触发                 |

---

# Slots 插槽

| 插槽名       | 说明                       | 示例                                               |
|--------------|----------------------------|----------------------------------------------------|
| `prefix`     | 自定义前缀图标/文本          | `<template #prefix="{ value }">前缀内容</template>` |
| `suffix`     | 自定义后缀图标/文本          | `<template #suffix="{ value }">后缀内容</template>` |
| `clear`      | 自定义清空按钮               | `<template #clear>自定义清空图标</template>`        |
| `error`      | 自定义错误信息区域           | `<template #error="{ error }">{{ error }}</template>` |
| `default`    | 默认插槽，用于复杂内容定制     | `<template #default>自定义表单内容</template>`      |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| 无     | —    | —      | 当前接口未定义任何需要暴露的方法 |