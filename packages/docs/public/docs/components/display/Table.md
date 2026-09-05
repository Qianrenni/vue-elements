# QTable

## 用途

通用数据表格：数据源 `dataSource` + 列配置 `columns` 自研驱动，内置排序 `sorter`、筛选 `filters`、分页 `pagination`、行展开 `expandable`（树形子级 / 行级渲染）与行选择 `rowSelection`，对齐 Ant Design Table 常用能力（由 `QFormTable` 表单场景改造、泛化而来）。

## 基本用法

```vue
<template>
  <QTable :data-source="rows" :columns="columns" row-key="id" />
</template>

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
  { id: 3, name: '王五', age: 20 },
]);
const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 80 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age', sorter: true },
];
</script>
```

## 泛型（类型推断）

`QTable` 是泛型组件，`T` 由 `dataSource` 推断（默认 `Record<string, unknown>`）。插槽作用域中的 `record`、`value` 以及 `columns` 的 `sorter` / `onFilter` 参数都会获得对应类型提示。

## Props

| 属性              | 类型                                      | 必填 | 默认值     | 说明                                                                                                                                   |
| ----------------- | ----------------------------------------- | ---- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `dataSource`      | `T[]`                                     | 否   | `[]`       | 表格数据源。行含 `children` 子级数组时自动以树形展示，子级展开受 `expandedRowKeys` 控制。                                              |
| `columns`         | `QTableColumn<T>[]`                       | 否   | `[]`       | 列配置，见下方「列配置」。                                                                                                             |
| `rowKey`          | `string \| ((record, index) => TableKey)` | 否   | 行索引     | 行唯一标识（字段名或取值函数）。**行选择 / 展开 / 树形 / 分页下建议提供稳定标识**，否则回退行索引。                                    |
| `loading`         | `boolean`                                 | 否   | `false`    | 加载中：显示遮罩旋转并禁用选择交互。                                                                                                   |
| `size`            | `'small' \| 'middle' \| 'large'`          | 否   | `'middle'` | 表格密度。                                                                                                                             |
| `bordered`        | `boolean`                                 | 否   | `false`    | 是否显示外框与全部分隔边框。                                                                                                           |
| `showHeader`      | `boolean`                                 | 否   | `true`     | 是否显示表头。                                                                                                                         |
| `pagination`      | `boolean \| QTablePaginationConfig`       | 否   | `true`     | 分页。`false` 关闭；对象可配置 `pageSize`（非受控初始条数）/ `pageSizeOptions` / `showSizeChanger` / `maxVisiblePages` / `showTotal`。 |
| `current`         | `number`                                  | 否   | `1`        | 当前页码。提供后为受控（配合 `v-model:current` 回写）。                                                                                |
| `pageSize`        | `number`                                  | 否   | `10`       | 每页条数。提供后为受控（配合 `v-model:page-size` 回写）。非受控初始条数请用 `pagination.pageSize`。                                    |
| `rowSelection`    | `QTableRowSelection<T>`                   | 否   | —          | 选择列配置 `{ type?, columnWidth?, columnTitle?, getCheckboxProps? }`；提供后渲染选择列。                                              |
| `selectedRowKeys` | `TableKey[]`                              | 否   | `[]`       | 选中行 key 集合。提供后为受控（配合 `v-model:selected-row-keys`）。                                                                    |
| `expandable`      | `QTableExpandable<T>`                     | 否   | —          | 展开配置 `{ defaultExpandAllRows?, expandRowByClick?, rowExpandable?, indentSize? }`；与树形子级或 `#expandedRowRender` 插槽配合。     |
| `expandedRowKeys` | `TableKey[]`                              | 否   | `[]`       | 展开行 key 集合。提供后为受控（配合 `v-model:expanded-row-keys`）。                                                                    |

`TableKey = string | number`。

## 列配置（`QTableColumn<T>`）

| 字段               | 类型                            | 默认值      | 说明                                                                                                       |
| ------------------ | ------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `key`              | `string`                        | `dataIndex` | 列唯一标识；缺省回退点路径 `dataIndex`，二者皆无则用列索引。                                               |
| `title`            | `string`                        | —           | 表头标题。                                                                                                 |
| `dataIndex`        | `string \| (string\|number)[]`  | —           | 行数据取值路径：`'name'`、`'a.b'` 或 `['a','b']`。缺省时该列用于自定义（走 `#<key>` / `#bodyCell` 插槽）。 |
| `width`            | `number \| string`              | —           | 列宽（数字=px 或 CSS 长度）。                                                                              |
| `align`            | `'left' \| 'center' \| 'right'` | `'left'`    | 内容对齐。                                                                                                 |
| `ellipsis`         | `boolean`                       | `false`     | 单元格内容是否溢出省略。                                                                                   |
| `sorter`           | `boolean \| (a, b) => number`   | —           | 排序开关/比较函数。`true` 按 `dataIndex` 默认比较（数值/字符串，null 排后）；函数则完全自定义。            |
| `defaultSortOrder` | `'ascend' \| 'descend'`         | —           | 未受控时该列首次点击采用的初始方向。                                                                       |
| `sortOrder`        | `'ascend' \| 'descend' \| null` | —           | 受控排序方向。**任一列显式提供后整体切为受控排序**，点击列头仅触发 `sorter-change`，需父级回写。           |
| `filters`          | `{ text, value }[]`             | —           | 筛选项列表；提供后表头出现漏斗按钮。                                                                       |
| `filterMultiple`   | `boolean`                       | `true`      | 是否多选筛选；`false` 时下拉为单选且点击即时生效。                                                         |
| `onFilter`         | `(value, record) => boolean`    | —           | 行过滤判定；缺省按 `record[dataIndex] === value`（含字符串宽松比较）。                                     |

### 排序

点击表头升/降箭头设定该列排序（同方向再点取消）。未受控时组件内部完成数据排序（作用于过滤后的数据，树形时逐层排序）；需要受控时给列提供 `sortOrder` 并在 `@sorter-change` 中回写：

```vue
<QTable
  :columns="columns"
  :data-source="sorted"
  @sorter-change="(col, order) => (col.sortOrder = order)"
/>
```

### 筛选

提供 `filters` 后表头出现漏斗按钮。多选：勾选后点「确定」生效、「重置」清空；单选：点击选项即时生效。筛选自动作用于数据并复位到第 1 页，通过 `@filter-change` 通知（参数为按列 key 的应用值映射）。树形数据筛选会递归应用到各层，父行不匹配则整棵子树隐藏。

## 行选择（rowSelection）

```vue
<QTable
  v-model:selected-row-keys="keys"
  :data-source="rows"
  :columns="columns"
  row-key="id"
  :row-selection="{
    type: 'checkbox',
    getCheckboxProps: (r) => (r.id === 2 ? { disabled: true } : undefined),
  }"
  @selection-change="onSelectionChange"
/>
```

- `type`：`'checkbox'` 多选 / `'radio'` 单选。
- 表头复选框为**当前页**范围的全选（跳过 `getCheckboxProps` 禁用的行），半选态以中间态呈现。
- 提供 `v-model:selected-row-keys` 即为受控（keys 由父级维护）；未提供时组件内部维护并照样触发事件。
- 建议始终提供稳定的 `rowKey`，否则跨页选择会因索引复用而错位。

## 展开（expandable）

### 树形数据

数据行含 `children` 数组即出现展开列与层级缩进：

```vue
<QTable
  row-key="id"
  :data-source="tree"
  :columns="columns"
  :expandable="{ defaultExpandAllRows: true }"
  v-model:expanded-row-keys="keys"
/>
```

### 行级渲染（`#expandedRowRender`）

配合 `expandable` 与插槽展开任意行：

```vue
<QTable
  row-key="id"
  :data-source="rows"
  :columns="columns"
  :expandable="{ expandRowByClick: true }"
>
  <template #expandedRowRender="{ record }">
    <p>详情：{{ record.description }}</p>
  </template>
</QTable>
```

`rowExpandable` 可逐行控制是否可展开；`defaultExpandAllRows` 在未受控时于数据变化时默认全展开；`indentSize` 控制树形缩进（默认 16）。

## 分页

默认开启。非受控场景：

```vue
<QTable
  :data-source="rows"
  :columns="columns"
  :pagination="{
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: true,
    showTotal: true,
  }"
/>
```

受控页码 / 条数（可配合远程数据）：

```vue
<QTable
  v-model:current="page"
  v-model:page-size="pageSize"
  :data-source="rows"
  :columns="columns"
/>
```

## Slots

| 插槽                      | 作用域参数                         | 回退内容                                                          |
| ------------------------- | ---------------------------------- | ----------------------------------------------------------------- |
| 以 `dataIndex` 命名的插槽 | `{ record, value, index, column }` | 若提供 `#bodyCell` 则走 bodyCell，否则渲染文本 `row[dataIndex]`。 |
| `bodyCell`                | `{ record, value, index, column }` | 渲染文本 `row[dataIndex]`。                                       |
| `expandedRowRender`       | `{ record, index }`                | 无（展开行的额外内容）。                                          |
| `empty`                   | —                                  | 默认 `QEmpty`（“暂无数据”）。                                     |

优先级：具名（`dataIndex` 或列 `key`）插槽 > `bodyCell` > 默认文本。无 `dataIndex` 的列请用列 `key` 命名插槽或在 `bodyCell` 中按 `column` 分支。

## Emits

| 事件                     | 参数                                             | 触发时机                                         |
| ------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `update:current`         | `number`                                         | 页码变化 / 每页条数或筛选后复位页码时。          |
| `update:pageSize`        | `number`                                         | 每页条数切换时。                                 |
| `update:selectedRowKeys` | `TableKey[]`                                     | 选中 key 集合变化时。                            |
| `update:expandedRowKeys` | `TableKey[]`                                     | 展开 key 集合变化时。                            |
| `selection-change`       | `(keys: TableKey[], rows: T[])`                  | 选中状态变化时（key + 对应行数组）。             |
| `sorter-change`          | `(column, order: 'ascend' \| 'descend' \| null)` | 点击列头排序箭头时（受控时需回写 `sortOrder`）。 |
| `filter-change`          | `Record<string, TableFilterValue[]>`             | 筛选应用 / 重置时。                              |

## 可访问性（Accessibility）

- 表头使用 `<th scope="col">`；选择列使用原生 checkbox / radio（`indeterminate` 呈半选），排序箭头为带 `aria-pressed` 与键盘 Enter / Space 支持的按钮。
- 展开按钮带 `aria-expanded`；加载遮罩带 `role="status"` 与 `aria-label`。

## Exposes

无。

## 限制与说明

- 当前为单列排序、单层筛下列；暂未提供列固定（`fixed`）/ 横向滚动（`scroll.x`）与「全选跨页」。远程分页请用受控 `current` / `pageSize`，并在外部数据变化时自行控制（组件不做请求）。
- 数据 pipeline：筛选 → 排序 → 分页（分页按顶层行计数，树形子行随父行展示）。
- `QFormTable`（表单编辑场景）仍保留；需要通用展示 / 排序 / 筛选 / 展开 / 选择请使用 `QTable`。
