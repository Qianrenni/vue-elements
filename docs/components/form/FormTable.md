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

## Props

继承 `FormComponentProps<FormTableModelValueType>`，其中 `FormTableModelValueType = Record<string, unknown>[]`。公共 `modelValue` 类型为 `FormTableModelValueType | null`，其他公共属性包括 `name`、`label`、`disabled`、`readonly`、`size`、`status`、`required`、`placeholder`、`clearable`、`autofocus`、`id`、`direction`、`errorMessage`。

| 属性                    | 类型                             | 必填 | 默认值         | 说明                                                                                                                        |
| ----------------------- | -------------------------------- | ---- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `data`                  | `Record<string, unknown>[]`      | 是   | —              | 表格行数据。                                                                                                                |
| `columns`               | `TableColumn[]`                  | 是   | —              | 列配置；`TableColumn` 为 `{ value: string; label: string; width?: string; order?: boolean }`。存在 `order` 即显示排序图标。 |
| `selectable`            | `boolean`                        | 否   | `false`        | 是否显示选择列。                                                                                                            |
| `selectionMode`         | `'single' \| 'multiple' \| null` | 否   | `'multiple'`   | 行选择模式。                                                                                                                |
| `pagination`            | `boolean`                        | 否   | `true`         | 是否启用分页。                                                                                                              |
| `pageSize`              | `number`                         | 否   | `10`           | 每页行数。                                                                                                                  |
| `maxVisiblePages`       | `number`                         | 否   | `5`            | 分页栏最多显示的页码数。                                                                                                    |
| `required`              | `boolean`                        | 否   | `false`        | 当前不影响渲染。                                                                                                            |
| `direction`             | `'vertical' \| 'horizontal'`     | 否   | `'horizontal'` | 当前不影响渲染。                                                                                                            |
| `disabled` / `readonly` | `boolean`                        | 否   | `false`        | `disabled` 禁止选择行；`readonly` 当前不影响渲染。                                                                          |
| `size`                  | `FormSize`                       | 否   | `'middle'`     | 影响表格及排序图标尺寸。                                                                                                    |

未列出的继承属性没有组件默认值；`label`、`id`、`name` 用于标签及关联，其余当前不影响渲染。

## Emits

| 事件                | 参数                        | 触发时机                        |
| ------------------- | --------------------------- | ------------------------------- |
| `update:modelValue` | `Record<string, unknown>[]` | 行选择或全选状态变化时。        |
| `input`             | `Record<string, unknown>[]` | 同上。                          |
| `change`            | `Record<string, unknown>[]` | 同上。                          |
| `page-change`       | `number`                    | 内部分页组件切换页码时。        |
| `update:columns`    | `TableColumn[]`             | 点击带 `order` 的列排序图标时。 |

继承的 `focus`、`blur`、`clear` 当前不会触发。

## Slots

| 插槽                         | 作用域参数                                          | 回退内容                   |
| ---------------------------- | --------------------------------------------------- | -------------------------- |
| 以 `column.value` 命名的插槽 | `{ row: Row, column: TableColumn, value: unknown }` | 显示 `row[column.value]`。 |

`Row` 为包含 `isSelected: boolean` 的行对象。

## Exposes

无。
