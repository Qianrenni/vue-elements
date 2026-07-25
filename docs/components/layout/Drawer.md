# Props 参数

| 参数                  | 类型                                     | 默认值    | 必填 | 说明             |
| --------------------- | ---------------------------------------- | --------- | ---- | ---------------- |
| `visible`             | `boolean`                                | `false`   | 否   | 是否显示         |
| `title`               | `string`                                 | `''`      | 否   | 标题             |
| `direction`           | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | 否   | 弹出方向         |
| `showClose`           | `boolean`                                | `true`    | 否   | 是否显示关闭按钮 |
| `closeOnClickOverlay` | `boolean`                                | `true`    | 否   | 点击遮罩是否关闭 |
| `overlay`             | `boolean`                                | `true`    | 否   | 是否显示遮罩     |
| `appendToBody`        | `boolean`                                | `true`    | 否   | 是否挂载到body   |

---

# Events 事件

| 事件名           | 回调参数         | 说明             |
| ---------------- | ---------------- | ---------------- |
| `update:visible` | `value: boolean` | 可见性变化时触发 |
| `close`          | —                | 关闭时触发       |

---

# Slots 插槽

| 插槽名    | 说明     | 示例                                    |
| --------- | -------- | --------------------------------------- |
| `header`  | 抽屉头部 | `<template #header>头部内容</template>` |
| `default` | 抽屉主体 | `<Drawer>主体内容</Drawer>`             |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
| ------ | ---- | ------ | ---- |
