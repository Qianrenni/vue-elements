# Props 参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|------|------|------|
| `data` | `Record<string, any>[]` | - | 是 | 表格数据 |
| `columns` | `TableColumn[]` | - | 是 | 列配置，格式：`{ value: string, label: string, width?: string }` |
| `selectable` | `boolean` | `false` | 否 | 是否显示选择列 |
| `selectionMode` | `"single" \| "multiple" \| null` | `'multiple'` | 否 | 选择模式：单选/多选/不可选 |
| `sortable` | `boolean` | `true` | 否 | 是否允许列排序 |
| `pagination` | `boolean` | `true` | 否 | 是否启用分页 |
| `pageSize` | `number` | `10` | 否 | 每页显示的行数 |
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 50, 100]` | 否 | 可选的每页行数选项 |
| `modelValue` | `Record<string, any>[]` | - | 否 | 双向绑定选中行数据 |
| `required` | `boolean` | `false` | 否 | 是否为必填项 |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | 否 | 表单方向布局 |
| `disabled` | `boolean` | `false` | 否 | 是否禁用组件 |
| `readonly` | `boolean` | `false` | 否 | 是否只读 |
| `size` | `"small" \| "middle" \| "large"` | `"middle"` | 否 | 控件尺寸 |

---

# Events 事件

| 事件名 | 回调参数 | 说明 |
|-------|----------|------|
| `update:modelValue` | `(value: Record<string, any>[]) => void` | 数据变化时触发，用于同步选中行数据 |
| `change` | `(value: Record<string, any>[]) => void` | 数据变化时触发（表单通用事件） |
| `input` | `(value: Record<string, any>[]) => void` | 输入时触发（表单通用事件） |
| `focus` | `(event: FocusEvent) => void` | 聚焦时触发 |
| `blur` | `(event: FocusEvent) => void` | 失焦时触发 |

---

# Slots 插槽

| 插槽名 | 说明 | 示例 |
|--------|------|------|
| `default` | 默认插槽，用于自定义单元格内容 | `<template #default="{ row, column }">{{ row[column.value] }}</template>` |
| `empty` | 无数据时的自定义内容 | `<template #empty>暂无数据</template>` |
| `header` | 自定义表头内容 | `<template #header>自定义表头</template>` |
| `footer` | 表格底部插槽 | `<template #footer>表格底部内容</template>` |

---

# Expose 方法

无 expose 暴露方法。

---

# 依赖引入

- `Icon` 组件：用于显示排序图标
- `Pagination` 组件：用于分页控制
- `useFormEvents`：提供通用表单事件处理逻辑（focus、blur、input、change）

---

# 其他特性

- 支持本地选中状态管理（不直接修改 `modelValue`）
- 支持按列排序（点击表头切换升序/降序）
- 支持分页展示（可配置每页行数）
- 支持响应式尺寸（small/middle/large）
- 支持样式隔离（`scoped`）
- 支持无障碍属性（如 `role="none"`）