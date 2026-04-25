# Props 参数

| 参数                  | 类型      | 默认值   | 必填 | 说明             |
| --------------------- | --------- | -------- | ---- | ---------------- |
| `visible`             | `boolean` | `false`  | 否   | 是否显示         |
| `title`               | `string`  | `''`     | 否   | 标题             |
| `showClose`           | `boolean` | `true`   | 否   | 是否显示关闭按钮 |
| `showFooter`          | `boolean` | `true`   | 否   | 是否显示底部     |
| `showCancel`          | `boolean` | `true`   | 否   | 是否显示取消按钮 |
| `confirmText`         | `string`  | `'确定'` | 否   | 确认按钮文本     |
| `cancelText`          | `string`  | `'取消'` | 否   | 取消按钮文本     |
| `closeOnClickOverlay` | `boolean` | `true`   | 否   | 点击遮罩是否关闭 |
| `width`               | `string`  | —        | 否   | 对话框宽度       |
| `customClass`         | `string`  | `''`     | 否   | 自定义类名       |

---

# Events 事件

| 事件名           | 回调参数         | 说明             |
| ---------------- | ---------------- | ---------------- |
| `update:visible` | `value: boolean` | 可见性变化时触发 |
| `confirm`        | —                | 确认时触发       |
| `cancel`         | —                | 取消时触发       |
| `close`          | —                | 关闭时触发       |

---

# Slots 插槽

| 插槽名    | 说明       | 示例                                    |
| --------- | ---------- | --------------------------------------- |
| `header`  | 对话框头部 | `<template #header>头部内容</template>` |
| `default` | 对话框主体 | `<Dialog>主体内容</Dialog>`             |
| `footer`  | 对话框底部 | `<template #footer>底部内容</template>` |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
