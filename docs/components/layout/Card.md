# Props 参数

| 参数       | 类型      | 默认值  | 必填 | 说明               |
|----------|---------|------|----|------------------|
| `animation` | `boolean` | `false` | 否  | 是否启用悬停动画效果 |

---

# Events 事件

| 事件名 | 回调参数 | 说明 |
|------|------|----|
| —    | —    | 无事件定义 |

---

# Slots 插槽

| 插槽名     | 说明                     | 示例                                   |
|--------|------------------------|--------------------------------------|
| `header` | 卡片头部内容插槽              | `<template #header><h3>标题</h3></template>` |
| `left`   | 卡片左侧内容插槽              | `<template #left><icon /></template>`         |
| `default`| 卡片主体默认内容插槽            | `<template #default>主要内容</template>`       |
| `right`  | 卡片右侧内容插槽              | `<template #right><button>操作</button></template>` |
| `footer` | 卡片底部内容插槽              | `<template #footer><p>备注信息</p></template>` |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
|------|----|-----|----|
| —    | —  | —   | 无暴露方法 |