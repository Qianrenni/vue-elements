# Props 参数

| 参数        | 类型      | 默认值  | 必填 | 说明             |
|-----------|---------|------|----|------------------|
| `animation` | `boolean` | `false` | 否  | 是否启用悬停动画效果 |

---

# Events 事件

当前组件未定义任何事件。

---

# Slots 插槽

| 插槽名       | 说明           | 示例                                                |
|-----------|--------------|---------------------------------------------------|
| `header`  | 卡片头部插槽      | `<template #header>这里是头部内容</template>`         |
| `default` | 卡片主体内容插槽（中间区域） | `<template #default>这里是卡片主要内容</template>`     |
| `left`    | 卡片左侧插槽      | `<template #left><div>左侧内容</div></template>`     |
| `right`   | 卡片右侧插槽      | `<template #right><div>右侧内容</div></template>`    |
| `footer`  | 卡片底部插槽      | `<template #footer>这里是底部信息</template>`         |

---

# Expose 方法

当前组件未暴露任何方法（没有使用 `defineExpose` 定义）。