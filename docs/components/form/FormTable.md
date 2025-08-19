# Props 参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| `modelValue` | `(Record<string, any>)[]` | `undefined` | 否 | 绑定的表格选中行数据，支持 v-model |
| `data` | `Record<string, any>[]` | `undefined` | 是 | 表格显示的数据列表 |
| `columns` | `TableColumn[]` | `undefined` | 是 | 列配置数组，每项包含 `value` 和 `label` |
| `selectable` | `boolean` | `false` | 否 | 是否可选择行 |
| `selectionMode` | `"single" \| "multiple" \| null` | `"multiple"` | 否 | 选择模式：单选、多选或不可选 |
| `sortable` | `boolean` | `true` | 否 | 是否支持列排序 |
| `pagination` | `boolean` | `true` | 否 | 是否启用分页 |
| `pageSize` | `number` | `10` | 否 | 每页显示的行数 |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50, 100]` | 否 | 可选的每页行数选项 |
| `required` | `boolean` | `false` | 否 | 是否为必填项（用于表单校验） |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | 否 | 布局方向，水平或垂直 |
| `disabled` | `boolean` | `false` | 否 | 是否禁用组件 |
| `readonly` | `boolean` | `false` | 否 | 是否只读状态 |
| `size` | `"small" \| "middle" \| "large"` | `"middle"` | 否 | 组件尺寸 |

---

# Events 事件

| 事件名 | 回调参数 | 说明 |
|--------|----------|------|
| `change` | `(value: (Record<string, any>)[]) => void` | 当选中行发生变化时触发，返回当前选中的行数据 |
| `input` | `(value: (Record<string, any>)[]) => void` | 输入时触发，与 `change` 类似，用于 v-model 通信 |
| `focus` | `(e: FocusEvent) => void` | 聚焦时触发 |
| `blur` | `(e: FocusEvent) => void` | 失焦时触发 |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
|--------|------|------|
| `default` | 默认内容插槽 | 无特殊用途，通常不使用 |
| `column` | 自定义列内容渲染 | `<template #column="{ row, column }">自定义内容</template>` |
| `empty` | 自定义无数据提示 | `<template #empty>暂无数据，请添加</template>` |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `focus` | — | — | 聚焦到表格容器 |
| `blur` | — | — | 失去焦点 |
| `reset` | — | — | 重置选中状态和分页，恢复初始值 |
| `refresh` | — | — | 重新刷新数据并更新视图 |
| `getSelectedRows` | — | `(Record<string, any>)[]` | 获取当前选中的行数据（不含 tdId） |
| `setSelectedRows` | `(rows: (Record<string, any>)[])` | — | 手动设置选中行（传入原始数据对象） |