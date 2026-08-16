# QFormTable

## 用途

展示表格数据，支持行选择、可排序列和内置分页。

## 基本用法

```vue
<QFormTable
  :data="rows"
  :columns="columns"
  selectable
  @page-change="onPageChange"
/>
```

## 泛型（类型推断）

`QFormTable` 是泛型组件，`data` 使用 `T[]`。当传入有类型的数组时，`T` 会从 `data` 自动推断，插槽作用域中的 `row`、`v-model` 的 `modelValue` 以及 `change`/`input` 事件参数都会获得对应的类型提示：

```vue
<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  age: number;
}

const rows = ref<User[]>([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
]);
const columns = [
  { label: 'ID', value: 'id' },
  { label: '姓名', value: 'name' },
  { label: '年龄', value: 'age' },
];
</script>

<template>
  <!-- row 会被推断为 User & { isSelected: boolean }，可访问 row.name 等属性 -->
  <QFormTable :data="rows" :columns="columns" selectable>
    <template #name="{ row }">
      <span>{{ row.name }}</span>
    </template>
  </QFormTable>
</template>
```

未传入有类型数据（或使用普通对象数组）时，`T` 默认回退为 `Record<string, unknown>`。

## Props

继承 `FormComponentProps<FormTableModelValueType<T>>`，其中 `FormTableModelValueType<T> = T[]`（`T` 从 `data` 推断，默认 `Record<string, unknown>`）。公共 `modelValue` 类型为 `T[] | null`，其他公共属性包括 `name`、`label`、`disabled`、`readonly`、`size`、`status`、`required`、`placeholder`、`clearable`、`autofocus`、`id`、`direction`、`errorMessage`。

| 属性                    | 类型                                       | 必填 | 默认值         | 说明                                                                                                                          |
| ----------------------- | ------------------------------------------ | ---- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `data`                  | `T[]`                                      | 是   | —              | 表格行数据；`T` 为数据行类型，默认 `Record<string, unknown>`。                                                                |
| `columns`               | `TableColumn[]`                            | 是   | —              | 列配置；`TableColumn` 为 `{ value: string; label: string; width?: string; order?: boolean }`。存在 `order` 即显示排序图标。   |
| `selectable`            | `boolean`                                  | 否   | `false`        | 是否显示选择列。                                                                                                              |
| `selectionMode`         | `'single' \| 'multiple' \| null`           | 否   | `'multiple'`   | 行选择模式。                                                                                                                  |
| `pagination`            | `boolean`                                  | 否   | `true`         | 是否启用分页。                                                                                                                |
| `pageSize`              | `number`                                   | 否   | `10`           | 每页行数。                                                                                                                    |
| `maxVisiblePages`       | `number`                                   | 否   | `5`            | 分页栏最多显示的页码数。                                                                                                      |
| `rowKey`                | `string \| ((row: T) => string \| number)` | 否   | —              | 行唯一标识字段名或取值函数；提供后用作行 `v-for` 的 `key`，提升排序/分页下的 DOM 复用稳定性；未提供时回退行索引（向后兼容）。 |
| `required`              | `boolean`                                  | 否   | `false`        | 当前不影响渲染。                                                                                                              |
| `direction`             | `'vertical' \| 'horizontal'`               | 否   | `'horizontal'` | 当前不影响渲染。                                                                                                              |
| `disabled` / `readonly` | `boolean`                                  | 否   | `false`        | `disabled` 禁止选择行；`readonly` 当前不影响渲染。                                                                            |
| `size`                  | `FormSize`                                 | 否   | `'middle'`     | 影响表格及排序图标尺寸。                                                                                                      |

未列出的继承属性没有组件默认值；`label`、`id`、`name` 用于标签及关联，其余当前不影响渲染。

## 排序（外部 / 受控）

`QFormTable` 采用**受控排序**：点击带 `order` 字段的列头，仅翻转该列 `order` 并触发 `update:columns` 事件，**数据排序由父组件完成**（组件内部不做排序）。

典型用法：

```vue
<QFormTable
  v-model:columns="columns"
  :data="sortedData"
  @update:columns="handleSort"
/>
```

父组件在 `handleSort` 中监听 `update:columns`，读取各列 `order`（`true` 升序 / `false` 降序）自行重排 `data` 后传回。若行内容含输入框等交互状态，建议同时传入 `rowKey`，保证重排后行 DOM 稳定复用。

## Emits

| 事件                | 参数            | 触发时机                        |
| ------------------- | --------------- | ------------------------------- |
| `update:modelValue` | `T[]`           | 行选择或全选状态变化时。        |
| `input`             | `T[]`           | 同上。                          |
| `change`            | `T[]`           | 同上。                          |
| `page-change`       | `number`        | 内部分页组件切换页码时。        |
| `update:columns`    | `TableColumn[]` | 点击带 `order` 的列排序图标时。 |

继承的 `focus`、`blur`、`clear` 当前不会触发。

## Slots

| 插槽                         | 作用域参数                                             | 回退内容                   |
| ---------------------------- | ------------------------------------------------------ | -------------------------- |
| 以 `column.value` 命名的插槽 | `{ row: Row<T>, column: TableColumn, value: unknown }` | 显示 `row[column.value]`。 |

`Row<T>` 为 `T & { isSelected: boolean }` 的行对象。

## 可访问性（Accessibility）

- 全选与行选择框使用 `role="checkbox"` 与 `aria-checked`，禁用时移出 Tab 序；支持 Enter / Space 切换。
- 排序图标带 `role="button"`、`title` 与 `aria-label`（显示当前升降序），禁用时移出 Tab 序。

## Exposes

无。
