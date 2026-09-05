import type { FormSize } from '@/types';

/** 行唯一标识：字符串或数字 */
export type TableKey = string | number;

/** 排序方向 */
export type TableSortOrder = 'ascend' | 'descend' | null;

/** 列内容对齐 */
export type TableColumnAlign = 'left' | 'center' | 'right';

/** 选择列类型 */
export type TableSelectionType = 'checkbox' | 'radio';

/** 筛选项取值类型 */
export type TableFilterValue = string | number | boolean;

/** 列 dataIndex：单层字符串 / 点路径字符串 / 嵌套路径数组 */
export type TableDataIndex = string | readonly (string | number)[];

/** 筛选选项 */
export interface QTableFilterOption {
  /** 展示文案 */
  text: string;
  /** 筛选取值（传给 onFilter） */
  value: TableFilterValue;
}

/**
 * 列配置
 * @typeParam T 数据行类型，默认 Record<string, unknown>
 */
export interface QTableColumn<T = Record<string, unknown>> {
  /**
   * @property key
   * @defaultValue dataIndex
   * @description 列唯一标识；缺省回退 dataIndex（点路径拼接），二者皆无则用列索引
   */
  key?: string;
  /**
   * @property title
   * @defaultValue 无
   * @description 表头标题
   */
  title: string;
  /**
   * @property dataIndex
   * @defaultValue 无
   * @description 行数据取值路径：'name' | 'a.b' | ['a','b']；缺省时该列用于 #key 插槽/自定义列
   */
  dataIndex?: TableDataIndex;
  /**
   * @property width
   * @defaultValue 无
   * @description 列宽（数字=px 或 CSS 长度）
   */
  width?: number | string;
  /**
   * @property align
   * @defaultValue 'left'
   * @description 内容对齐方式
   */
  align?: TableColumnAlign;
  /**
   * @property ellipsis
   * @defaultValue false
   * @description 是否超出省略（单元格单行溢出隐藏）
   */
  ellipsis?: boolean;
  /**
   * @property sorter
   * @defaultValue 无
   * @description 排序：true 按 dataIndex 默认比较；或传入比较函数 (a, b) => number
   */
  sorter?: boolean | ((a: T, b: T) => number);
  /**
   * @property defaultSortOrder
   * @defaultValue 无
   * @description 未受控时该列首次点击的初始排序方向
   */
  defaultSortOrder?: Exclude<TableSortOrder, null>;
  /**
   * @property sortOrder
   * @defaultValue 无
   * @description 受控排序方向；任一列显式提供后整体切换为受控排序，点击仅触发 sorter-change，需父级回写
   */
  sortOrder?: TableSortOrder;
  /**
   * @property filters
   * @defaultValue 无
   * @description 筛选项列表；提供后表头出现筛选按钮
   */
  filters?: QTableFilterOption[];
  /**
   * @property filterMultiple
   * @defaultValue true
   * @description 是否多选筛选；false 时下拉为单选
   */
  filterMultiple?: boolean;
  /**
   * @property onFilter
   * @defaultValue 无
   * @description 行过滤判定 (value, record) => boolean；缺省按 dataIndex 值相等判定
   */
  onFilter?: (value: TableFilterValue, record: T) => boolean;
}

/** 选择列配置 */
export interface QTableRowSelection<T = Record<string, unknown>> {
  /**
   * @property type
   * @defaultValue 'checkbox'
   * @description 选择类型：checkbox 多选 / radio 单选
   */
  type?: TableSelectionType;
  /**
   * @property columnWidth
   * @defaultValue 32
   * @description 选择列宽度（数字=px 或 CSS 长度）
   */
  columnWidth?: number | string;
  /**
   * @property columnTitle
   * @defaultValue 无
   * @description 表头文案；多选时缺省渲染全选框，单选时缺省为空
   */
  columnTitle?: string;
  /**
   * @property getCheckboxProps
   * @defaultValue 无
   * @description 行选择框附加属性 (record, index) => { disabled?: boolean }
   */
  getCheckboxProps?: (
    record: T,
    index: number,
  ) => { disabled?: boolean } | undefined;
}

/** 展开配置 */
export interface QTableExpandable<T = Record<string, unknown>> {
  /**
   * @property defaultExpandAllRows
   * @defaultValue false
   * @description 未受控且数据变化时是否默认展开所有含子级的行
   */
  defaultExpandAllRows?: boolean;
  /**
   * @property expandRowByClick
   * @defaultValue false
   * @description 是否点击整行切换展开（可展开行）
   */
  expandRowByClick?: boolean;
  /**
   * @property rowExpandable
   * @defaultValue 无
   * @description 行级展开渲染（#expandedRowRender 插槽）时每行是否允许展开
   */
  rowExpandable?: (record: T, index: number) => boolean;
  /**
   * @property indentSize
   * @defaultValue 16
   * @description 树形子级每层缩进像素
   */
  indentSize?: number;
}

/** 分页配置（pagination 传对象时的额外选项） */
export interface QTablePaginationConfig {
  /**
   * @property pageSize
   * @defaultValue 10
   * @description 初始每页条数（未受控默认；与 v-model:page-size 互不影响）
   */
  pageSize?: number;
  /**
   * @property pageSizeOptions
   * @defaultValue [10, 20, 50]
   * @description 每页条数可选项
   */
  pageSizeOptions?: number[];
  /**
   * @property showSizeChanger
   * @defaultValue true
   * @description 是否显示每页条数切换
   */
  showSizeChanger?: boolean;
  /**
   * @property maxVisiblePages
   * @defaultValue 5
   * @description 分页栏最多显示的页码（透传给 QPagination）
   */
  maxVisiblePages?: number;
  /**
   * @property showTotal
   * @defaultValue true
   * @description 是否在分页栏显示「共 N 条」
   */
  showTotal?: boolean;
}

/**
 * QTable 组件 Props
 * @typeParam T 数据行类型，由 dataSource 推断，默认 Record<string, unknown>
 */
export interface QTableProps<T = Record<string, unknown>> {
  /**
   * @property dataSource
   * @defaultValue []
   * @description 表格数据源；含 children 子级数组时渲染为树形（子级展示受 expandedRowKeys 控制）
   */
  dataSource?: T[];
  /**
   * @property columns
   * @defaultValue []
   * @description 列配置
   */
  columns?: QTableColumn<T>[];
  /**
   * @property rowKey
   * @defaultValue 行索引
   * @description 行唯一标识：字段名或取值函数 (record, index) => string | number；选择/展开/树形建议提供稳定标识
   */
  rowKey?: string | ((record: T, index: number) => TableKey);
  /**
   * @property loading
   * @defaultValue false
   * @description 是否加载中（显示遮罩并禁用交互）
   */
  loading?: boolean;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 表格密度：small / middle / large
   */
  size?: FormSize;
  /**
   * @property bordered
   * @defaultValue false
   * @description 是否显示全部边框
   */
  bordered?: boolean;
  /**
   * @property showHeader
   * @defaultValue true
   * @description 是否显示表头
   */
  showHeader?: boolean;
  /**
   * @property pagination
   * @defaultValue true
   * @description 分页：false 关闭；true 使用默认配置；对象可配置 pageSizeOptions/showSizeChanger/maxVisiblePages/showTotal
   */
  pagination?: boolean | QTablePaginationConfig;
  /**
   * @property current
   * @defaultValue 1
   * @description 当前页码（支持 v-model:current；提供后为受控）
   */
  current?: number;
  /**
   * @property pageSize
   * @defaultValue 10
   * @description 每页条数（支持 v-model:page-size；提供后为受控）
   */
  pageSize?: number;
  /**
   * @property rowSelection
   * @defaultValue 无
   * @description 选择列配置；提供后渲染选择列
   */
  rowSelection?: QTableRowSelection<T>;
  /**
   * @property selectedRowKeys
   * @defaultValue []
   * @description 选中行 key 集合（支持 v-model:selected-row-keys）
   */
  selectedRowKeys?: TableKey[];
  /**
   * @property expandable
   * @defaultValue 无
   * @description 展开配置；提供后渲染展开列（配合 children 树形或 #expandedRowRender 插槽）
   */
  expandable?: QTableExpandable<T>;
  /**
   * @property expandedRowKeys
   * @defaultValue []
   * @description 展开行 key 集合（支持 v-model:expanded-row-keys）
   */
  expandedRowKeys?: TableKey[];
}

/**
 * QTable 组件 Emits
 * @typeParam T 数据行类型，默认 Record<string, unknown>
 */
export interface QTableEmits<T = Record<string, unknown>> {
  /**
   * @property update:current
   * @description 页码变化时触发（受控 v-model:current）
   */
  (e: 'update:current', page: number): void;
  /**
   * @property update:pageSize
   * @description 每页条数变化时触发（受控 v-model:page-size）
   */
  (e: 'update:pageSize', pageSize: number): void;
  /**
   * @property update:selectedRowKeys
   * @description 选中行 key 集合变化时触发
   */
  (e: 'update:selectedRowKeys', keys: TableKey[]): void;
  /**
   * @property update:expandedRowKeys
   * @description 展开行 key 集合变化时触发
   */
  (e: 'update:expandedRowKeys', keys: TableKey[]): void;
  /**
   * @property selection-change
   * @description 选中状态变化时触发（key 集合 + 对应行数组）
   */
  (e: 'selection-change', keys: TableKey[], rows: T[]): void;
  /**
   * @property sorter-change
   * @description 点击可排序列头时触发（列对象 + 下一方向；受控时需父级回写 sortOrder）
   */
  (
    e: 'sorter-change',
    column: QTableColumn<T>,
    order: Exclude<TableSortOrder, null> | null,
  ): void;
  /**
   * @property filter-change
   * @description 筛选应用/重置时触发（按列 key 的应用值映射）
   */
  (e: 'filter-change', filters: Record<string, TableFilterValue[]>): void;
}
