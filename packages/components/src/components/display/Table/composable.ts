import { computed, type ComputedRef, ref, type Ref, watch } from 'vue';

import type {
  QTableColumn,
  QTableEmits,
  QTablePaginationConfig,
  QTableProps,
  QTableRowSelection,
  TableDataIndex,
  TableFilterValue,
  TableKey,
  TableSortOrder,
} from './type';

/** 树形子级字段名 */
export const CHILDREN_KEY = 'children';
/** 未受控默认页码 */
export const DEFAULT_PAGE = 1;
/** 未受控默认每页条数 */
export const DEFAULT_PAGE_SIZE = 10;
/** 默认每页条数可选项 */
export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];
/** 默认树形缩进 */
export const DEFAULT_INDENT_SIZE = 16;
/** 默认筛选为多选 */
export const DEFAULT_FILTER_MULTIPLE = true;

/** 展平后的展示行 */
export interface TableDisplayRow<T> {
  /** 行唯一 key */
  key: TableKey;
  /** 原始行数据 */
  record: T;
  /** 树形缩进层级（0 为顶层） */
  depth: number;
  /** 是否含展开子级 */
  hasChildren: boolean;
  /** 当前是否展开 */
  expanded: boolean;
}

// ============================================================
// 纯函数（可独立测试）
// ============================================================

/** 取行子级数组 */
export function childListOf<T>(record: T): T[] | undefined {
  return (record as unknown as Record<string, unknown>)[CHILDREN_KEY] as
    | T[]
    | undefined;
}

/** dataIndex 转点路径字符串 */
export function dataIndexToString(dataIndex: TableDataIndex): string {
  return Array.isArray(dataIndex) ? dataIndex.join('.') : (dataIndex as string);
}

/** 列 key：显式 key > 点路径 dataIndex > 列索引兜底 */
export function toColumnKey<T>(column: QTableColumn<T>, index: number): string {
  if (column.key !== undefined && column.key !== '') return column.key;
  if (column.dataIndex !== undefined) {
    return dataIndexToString(column.dataIndex);
  }
  return `__q-col-${index}`;
}

/** 按 dataIndex 读取路径值（支持 'a.b' 与数组嵌套） */
export function getDataPathValue(
  record: unknown,
  dataIndex: TableDataIndex | undefined,
): unknown {
  if (dataIndex === undefined || record == null) return undefined;
  const parts =
    typeof dataIndex === 'string'
      ? dataIndex.split('.')
      : ([...dataIndex] as (string | number)[]);
  let current: unknown = record;
  for (const part of parts) {
    if (current == null) return undefined;
    current = (current as Record<string | number, unknown>)[part];
  }
  return current;
}

/** 解析行 key：rowKey 函数 / 字段名 / 行索引兜底 */
export function resolveRowKey<T>(
  rowKey: QTableProps<T>['rowKey'],
  record: T,
  index: number,
): TableKey {
  if (typeof rowKey === 'function') return rowKey(record, index);
  if (typeof rowKey === 'string') {
    const value = (record as Record<string, unknown>)[rowKey];
    if (value !== undefined && value !== null) return value as TableKey;
  }
  return index;
}

/** 通用值比较（null/undefined 排后；字符串按字典序、数字按数值） */
export function compareValues(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'string' && typeof b === 'string') {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  const sa = String(a);
  const sb = String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}

/** 生成某列的排序比较函数（无 sorter 或 sorter:true 但无 dataIndex 时返回 null） */
export function createCompareFn<T>(
  column: QTableColumn<T>,
): ((a: T, b: T) => number) | null {
  if (!column.sorter) return null;
  if (typeof column.sorter === 'function') return column.sorter;
  if (column.dataIndex === undefined) return null;
  return (a: T, b: T) =>
    compareValues(
      getDataPathValue(a, column.dataIndex),
      getDataPathValue(b, column.dataIndex),
    );
}

/** 排序方向循环：ascend -> descend -> null -> ascend */
export function nextSortOrder(order: TableSortOrder): TableSortOrder {
  if (order === 'ascend') return 'descend';
  if (order === 'descend') return null;
  return 'ascend';
}

/** 单行是否匹配某列筛选项集合（缺省按 dataIndex 值相等判定） */
export function columnMatches<T>(
  record: T,
  column: QTableColumn<T>,
  values: TableFilterValue[],
): boolean {
  if (!values || values.length === 0) return true;
  return values.some((value) => {
    if (column.onFilter) return column.onFilter(value, record);
    const cell = getDataPathValue(record, column.dataIndex);
    return cell === value || String(cell) === String(value);
  });
}

/** 递归过滤（节点不匹配即整棵子树隐藏；子级各自过滤） */
export function filterTree<T>(list: T[], keep: (record: T) => boolean): T[] {
  const out: T[] = [];
  for (const node of list) {
    if (!keep(node)) continue;
    const children = childListOf(node);
    if (children && children.length > 0) {
      const next: Record<string, unknown> = { ...(node as object) };
      next[CHILDREN_KEY] = filterTree(children, keep);
      out.push(next as T);
    } else {
      out.push(node);
    }
  }
  return out;
}

/** 递归排序（每层子级独立排序）；compare 为空时原样返回 */
export function sortTree<T>(
  list: T[],
  compare: ((a: T, b: T) => number) | null,
): T[] {
  if (!compare) return list;
  const sorted = [...list].sort(compare);
  return sorted.map((node) => {
    const children = childListOf(node);
    if (children && children.length > 0) {
      const next: Record<string, unknown> = { ...(node as object) };
      next[CHILDREN_KEY] = sortTree(children, compare);
      return next as T;
    }
    return node;
  });
}

/** 是否存在树形子级（顶层或嵌套任一层含 children） */
export function hasAnyChildren<T>(list: T[] | undefined): boolean {
  if (!list) return false;
  for (const node of list) {
    const children = childListOf(node);
    if (children && children.length > 0) return true;
  }
  return false;
}

/** 收集所有含子级节点的 key（用于默认全展开） */
export function collectParentKeys<T>(
  list: T[] | undefined,
  getKey: (record: T, index: number) => TableKey,
): TableKey[] {
  if (!list) return [];
  const keys: TableKey[] = [];
  list.forEach((node, index) => {
    const children = childListOf(node);
    if (children && children.length > 0) {
      keys.push(getKey(node, index));
      keys.push(...collectParentKeys(children, getKey));
    }
  });
  return keys;
}

/** 递归展平为展示行序列（折叠行不包含子级；展开态按 key 记录于任意行） */
export function flattenTree<T>(
  list: T[],
  opts: {
    getKey: (record: T, index: number) => TableKey;
    isExpanded: (key: TableKey) => boolean;
    depth?: number;
  },
): TableDisplayRow<T>[] {
  const depth = opts.depth ?? 0;
  const out: TableDisplayRow<T>[] = [];
  list.forEach((record, index) => {
    const key = opts.getKey(record, index);
    const children = childListOf(record);
    const hasChildren = !!children && children.length > 0;
    const expanded = opts.isExpanded(key);
    out.push({ key, record, depth, hasChildren, expanded });
    if (expanded && hasChildren && children) {
      out.push(...flattenTree(children, { ...opts, depth: depth + 1 }));
    }
  });
  return out;
}

/** 分页切片（对顶层行切片，树形子级随父行保留） */
export function sliceByPage<T>(list: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

/** key 是否存在 */
export function containsKey(
  keys: TableKey[] | undefined,
  key: TableKey,
): boolean {
  return !!keys && keys.includes(key);
}

/** 追加 key（去重） */
export function appendKey(keys: TableKey[], key: TableKey): TableKey[] {
  return keys.includes(key) ? keys : [...keys, key];
}

/** 移除 key */
export function dropKey(keys: TableKey[], key: TableKey): TableKey[] {
  return keys.includes(key) ? keys.filter((k) => k !== key) : keys;
}

// ============================================================
// useQTable 返回值
// ============================================================

/** useQTable 返回值 */
export interface UseQTableReturn<T> {
  /** 解析后的列信息 */
  columnsInfo: ComputedRef<ColumnInfo<T>[]>;
  /** 可见列数（数据列 + 选择列 + 展开列） */
  visibleColCount: ComputedRef<number>;
  /** 是否展示表头 */
  showHeader: ComputedRef<boolean>;
  /** 是否展示选择列 */
  hasSelection: ComputedRef<boolean>;
  /** 选择列类型 */
  selectionType: ComputedRef<Exclude<QTableRowSelection<T>['type'], undefined>>;
  /** 是否展示展开列 */
  hasExpandCol: ComputedRef<boolean>;
  /** 树形模式是否激活 */
  isTree: ComputedRef<boolean>;
  /** 是否允许行级展开渲染（配合 #expandedRowRender 插槽） */
  hasRowRenderExpansion: ComputedRef<boolean>;
  /** 过滤+排序后的顶层数据 */
  processedRows: ComputedRef<T[]>;
  /** 当前页顶层数据 */
  pagedRows: ComputedRef<T[]>;
  /** 展平后的展示行 */
  displayRows: ComputedRef<TableDisplayRow<T>[]>;
  /** 过滤后总行数（顶层） */
  totalCount: ComputedRef<number>;
  /** 是否为空 */
  isEmpty: ComputedRef<boolean>;
  // --- 排序 ---
  /** 当前生效排序（key + order） */
  activeSort: ComputedRef<{
    key: string;
    order: Exclude<TableSortOrder, null>;
  } | null>;
  /** 点击某列头设置排序方向（再次点击同方向则取消） */
  clickSortDirection: (
    column: QTableColumn<T>,
    direction: Exclude<TableSortOrder, null>,
  ) => void;
  // --- 筛选 ---
  /** 当前打开的筛下列 key */
  activeFilterKey: Ref<string | null>;
  /** 已应用的筛选（按列 key） */
  appliedFilters: Ref<Record<string, TableFilterValue[]>>;
  /** 是否有应用中的筛选 */
  hasAppliedFilters: ComputedRef<boolean>;
  /** 打开某列筛下列 */
  openFilter: (key: string) => void;
  /** 关闭筛下列 */
  closeFilter: () => void;
  /** 筛选项是否勾选 */
  isFilterOptionChecked: (key: string, value: TableFilterValue) => boolean;
  /** 切换筛选项（单选即时应用） */
  toggleFilterOption: (
    key: string,
    value: TableFilterValue,
    column: QTableColumn<T>,
  ) => void;
  /** 多选：应用当前草稿 */
  confirmFilter: (key: string) => void;
  /** 多选：清空并应用该列 */
  resetFilter: (key: string) => void;
  /** 应用筛选（供确定/重置复用） */
  applyFilter: (
    key: string,
    values: TableFilterValue[],
    column: QTableColumn<T>,
  ) => void;
  // --- 分页 ---
  /** 是否启用分页 */
  paginationEnabled: ComputedRef<boolean>;
  /** 当前页（受控回退内部） */
  currentPage: ComputedRef<number>;
  /** 每页条数（受控回退内部） */
  pageSize: ComputedRef<number>;
  /** 总页数 */
  totalPages: ComputedRef<number>;
  /** 是否显示每页条数切换 */
  showSizeChanger: ComputedRef<boolean>;
  /** 每页条数可选项 */
  pageSizeOptions: ComputedRef<number[]>;
  /** 是否显示总数 */
  showTotal: ComputedRef<boolean>;
  /** 透传分页栏页码数 */
  maxVisiblePages: ComputedRef<number>;
  /** 页码变化 */
  handlePageChange: (page: number) => void;
  /** 每页条数变化 */
  handlePageSizeChange: (size: number) => void;
  // --- 行选择 ---
  /** 某行是否选中 */
  isRowSelected: (key: TableKey) => boolean;
  /** 某行选择框是否禁用 */
  isRowSelectionDisabled: (record: T, index: number) => boolean;
  /** 点击切换单行 */
  toggleSelectRow: (record: T, index: number) => void;
  /** 全选是否全部勾选（当前页可选项） */
  isAllSelected: ComputedRef<boolean>;
  /** 全选是否半选 */
  isIndeterminate: ComputedRef<boolean>;
  /** 切换全选（当前页可选项） */
  toggleSelectAll: () => void;
  // --- 展开 ---
  /** 某行是否展开 */
  isExpanded: (key: TableKey) => boolean;
  /** 某行是否可展开（树形子级或行级渲染） */
  isRowExpandable: (record: T, index: number) => boolean;
  /** 切换某行展开 */
  toggleExpand: (key: TableKey) => void;
  /** 行点击展开处理 */
  onRowClick: (row: TableDisplayRow<T>, index: number) => void;
  /** 是否允许整行点击展开 */
  expandRowByClick: ComputedRef<boolean>;
  /** 缩进像素 */
  indentSize: number;
  /** 读取单元格值 */
  getCellValue: (record: T, dataIndex: TableDataIndex | undefined) => unknown;
}

/** 解析后的列信息 */
export interface ColumnInfo<T> {
  /** 原始列 */
  column: QTableColumn<T>;
  /** 列 key */
  key: string;
  /** 点路径 dataIndex（可能为 undefined，供自定义列） */
  dataIndex: TableDataIndex | undefined;
  /** dataIndex 字符串（插槽名/取值） */
  dataIndexText: string;
  /** 宽度样式值 */
  widthStyle: string;
  /** 是否可排序 */
  sorterEnabled: boolean;
  /** 是否可筛选 */
  filterEnabled: boolean;
  /** 是否多选筛选 */
  filterMultiple: boolean;
  /** 列头点击排序的当前展示方向 */
  headerSortOrder: TableSortOrder;
}

/**
 * QTable 组件核心逻辑：列解析 / 筛选 / 排序 / 分页 / 选择 / 展开。
 * @typeParam T 数据行类型，默认 Record<string, unknown>
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @param options 运行时选项（供 .vue 注入插槽感知；测试可省略）
 * @returns 状态与操作方法
 */
export const useQTable = <T = Record<string, unknown>>(
  props: QTableProps<T>,
  emit: QTableEmits<T>,
  options: { hasExpandedRowSlot?: boolean } = {},
): UseQTableReturn<T> => {
  const paginationEnabled = computed(() => props.pagination !== false);

  /** 分页配置 */
  const paginationConfig = computed<QTablePaginationConfig>(() =>
    typeof props.pagination === 'object' && props.pagination
      ? props.pagination
      : {},
  );

  // ---------- 内部状态 ----------
  /** 内部排序：{ colKey, order } */
  const internalSort = ref<{
    key: string;
    order: Exclude<TableSortOrder, null>;
  } | null>(null);
  /** 已应用筛选（按列 key） */
  const appliedFilters = ref<Record<string, TableFilterValue[]>>({});
  /** 筛选草稿（编辑中） */
  const filterDraft = ref<Record<string, TableFilterValue[]>>({});
  /** 当前打开的筛下列 key */
  const activeFilterKey = ref<string | null>(null);
  /** 内部页码 */
  const internalCurrent = ref(DEFAULT_PAGE);
  /** 内部每页条数 */
  const internalPageSize = ref<number>(props.pageSize ?? DEFAULT_PAGE_SIZE);
  /** 内部选中 keys */
  const internalSelectedKeys = ref<TableKey[]>([]);
  /** 内部展开 keys */
  const internalExpandedKeys = ref<TableKey[]>([]);

  // ---------- 受控判定 ----------
  /** 列排序是否受控（任一列显式提供 sortOrder） */
  const sortControlled = computed(() =>
    (props.columns ?? []).some((c) => c.sortOrder !== undefined),
  );
  const currentControlled = computed(() => props.current !== undefined);
  const pageSizeControlled = computed(() => props.pageSize !== undefined);
  const selectedControlled = computed(
    () => props.selectedRowKeys !== undefined,
  );
  const expandedControlled = computed(
    () => props.expandedRowKeys !== undefined,
  );

  /** 行 key 解析 */
  const getRowKey = (record: T, index: number): TableKey =>
    resolveRowKey(props.rowKey, record, index);

  // ---------- 列解析 ----------
  /** 各列信息（含 key / 宽度 / 排序 / 筛选能力） */
  const columnsInfo = computed<ColumnInfo<T>[]>(() =>
    (props.columns ?? []).map((column, index) => {
      const key = toColumnKey(column, index);
      const dataIndex = column.dataIndex;
      const dataIndexText =
        dataIndex !== undefined ? dataIndexToString(dataIndex) : '';
      const width =
        column.width === undefined
          ? ''
          : typeof column.width === 'number'
            ? `${column.width}px`
            : column.width;
      const sorterEnabled = !!column.sorter;
      const filterEnabled = !!column.filters && column.filters.length > 0;
      const filterMultiple = column.filterMultiple !== false;
      // 表头当前展示方向：受控读列 sortOrder；否则读内部排序（若作用于此列）
      let headerSortOrder: TableSortOrder = null;
      if (sorterEnabled) {
        if (sortControlled.value) {
          headerSortOrder = column.sortOrder ?? null;
        } else if (internalSort.value && internalSort.value.key === key) {
          headerSortOrder = internalSort.value.order;
        }
      }
      return {
        column,
        key,
        dataIndex,
        dataIndexText,
        widthStyle: width,
        sorterEnabled,
        filterEnabled,
        filterMultiple,
        headerSortOrder,
      };
    }),
  );

  /** 生效中的排序（受控列优先，否则内部） */
  const activeSort = computed<{
    key: string;
    order: Exclude<TableSortOrder, null>;
  } | null>(() => {
    if (sortControlled.value) {
      for (const info of columnsInfo.value) {
        if (
          info.column.sortOrder === 'ascend' ||
          info.column.sortOrder === 'descend'
        ) {
          return { key: info.key, order: info.column.sortOrder };
        }
      }
      return null;
    }
    return internalSort.value;
  });

  /** 当前生效排序比较函数（descend 时取反） */
  const activeCompare = computed<((a: T, b: T) => number) | null>(() => {
    const sort = activeSort.value;
    if (!sort) return null;
    const info = columnsInfo.value.find((c) => c.key === sort.key);
    const base = info ? createCompareFn(info.column) : null;
    if (!base) return null;
    if (sort.order === 'descend') {
      return (a: T, b: T) => -base(a, b);
    }
    return base;
  });

  /** 点击某列头设置排序方向 */
  const clickSortDirection = (
    column: QTableColumn<T>,
    direction: Exclude<TableSortOrder, null>,
  ): void => {
    if (!column.sorter) return;
    const index = (props.columns ?? []).indexOf(column);
    if (index < 0) return;
    const key = toColumnKey(column, index);
    if (sortControlled.value) {
      const next = column.sortOrder === direction ? null : direction;
      emit('sorter-change', column, next);
      return;
    }
    const current =
      internalSort.value && internalSort.value.key === key
        ? internalSort.value.order
        : null;
    const next = current === direction ? null : direction;
    internalSort.value = next === null ? null : { key, order: next };
    emit('sorter-change', column, next);
  };

  // ---------- 筛选 ----------
  const hasAppliedFilters = computed(() =>
    Object.values(appliedFilters.value).some((v) => v.length > 0),
  );

  const filterColumnsById = computed(() => {
    const map = new Map<string, QTableColumn<T>>();
    for (const info of columnsInfo.value) {
      if (info.filterEnabled) map.set(info.key, info.column);
    }
    return map;
  });

  /** 打开筛选：把已应用值拷入草稿 */
  const openFilter = (key: string): void => {
    if (activeFilterKey.value === key) {
      activeFilterKey.value = null;
      return;
    }
    filterDraft.value = {
      ...filterDraft.value,
      [key]: [...(appliedFilters.value[key] ?? [])],
    };
    activeFilterKey.value = key;
  };

  const closeFilter = (): void => {
    activeFilterKey.value = null;
  };

  const isFilterOptionChecked = (
    key: string,
    value: TableFilterValue,
  ): boolean => (filterDraft.value[key] ?? []).includes(value);

  /** 应用某列筛选（更新 applied + 复位页码） */
  const applyFilter = (key: string, values: TableFilterValue[]): void => {
    const next = { ...appliedFilters.value };
    if (values.length > 0) next[key] = [...values];
    else delete next[key];
    appliedFilters.value = next;
    internalCurrent.value = DEFAULT_PAGE;
    if (paginationEnabled.value) emit('update:current', DEFAULT_PAGE);
    emit('filter-change', { ...next });
  };

  /** 切换筛选项；单选即时应用并关闭 */
  const toggleFilterOption = (
    key: string,
    value: TableFilterValue,
    column: QTableColumn<T>,
  ): void => {
    const draft = [...(filterDraft.value[key] ?? [])];
    const idx = draft.indexOf(value);
    const multiple = column.filterMultiple !== false;
    if (idx >= 0) draft.splice(idx, 1);
    else if (multiple) draft.push(value);
    else {
      draft.length = 0;
      draft.push(value);
    }
    // 单选：直接应用
    if (!multiple) {
      applyFilter(key, draft);
      activeFilterKey.value = null;
      return;
    }
    filterDraft.value = { ...filterDraft.value, [key]: draft };
  };

  /** 多选：应用当前草稿并关闭 */
  const confirmFilter = (key: string): void => {
    const values = filterDraft.value[key] ?? [];
    applyFilter(key, values);
    activeFilterKey.value = null;
  };

  /** 清空该列筛选并应用、关闭 */
  const resetFilter = (key: string): void => {
    applyFilter(key, []);
    activeFilterKey.value = null;
  };

  // ---------- 过滤 + 排序 + 分页 ----------
  /** 过滤+排序后的顶层数据（含保留的子级结构） */
  const processedRows = computed<T[]>(() => {
    let rows = props.dataSource ?? [];
    if (hasAppliedFilters.value) {
      rows = filterTree(rows, (record) => {
        for (const [key, values] of Object.entries(appliedFilters.value)) {
          if (values.length === 0) continue;
          const column = filterColumnsById.value.get(key);
          if (!column || !columnMatches(record, column, values)) return false;
        }
        return true;
      });
    }
    if (activeCompare.value) {
      rows = sortTree(rows, activeCompare.value);
    }
    return rows;
  });

  const totalCount = computed(() => processedRows.value.length);

  /** 当前页顶层数据 */
  const pagedRows = computed<T[]>(() =>
    paginationEnabled.value
      ? sliceByPage(processedRows.value, currentPage.value, pageSize.value)
      : processedRows.value,
  );

  /** 是否树形模式（数据中存在 children） */
  const isTree = computed(() => hasAnyChildren(props.dataSource));

  /** 是否允许行级展开渲染 */
  const hasRowRenderExpansion = computed(
    () => props.expandable !== undefined && options.hasExpandedRowSlot === true,
  );

  /** 是否渲染展开列 */
  const hasExpandCol = computed(
    () => isTree.value || hasRowRenderExpansion.value,
  );

  const indentSize = props.expandable?.indentSize ?? DEFAULT_INDENT_SIZE;

  /** 展开 key（受控回退内部） */
  const expandedKeys = computed<TableKey[]>(() =>
    expandedControlled.value
      ? (props.expandedRowKeys ?? [])
      : internalExpandedKeys.value,
  );

  const isExpanded = (key: TableKey): boolean =>
    containsKey(expandedKeys.value, key);

  const toggleExpand = (key: TableKey): void => {
    const current = expandedKeys.value;
    const next = containsKey(current, key)
      ? dropKey(current, key)
      : appendKey(current, key);
    if (expandedControlled.value) {
      emit('update:expandedRowKeys', next);
      return;
    }
    internalExpandedKeys.value = next;
  };

  /** 行级渲染可展开判定 */
  const rowRenderExpandableOf = (record: T, index: number): boolean => {
    if (!hasRowRenderExpansion.value) return false;
    const fn = props.expandable?.rowExpandable;
    return fn ? fn(record, index) : true;
  };

  /** 某行是否可展开 */
  const isRowExpandable = (record: T, index: number): boolean =>
    (childListOf(record)?.length ?? 0) > 0 ||
    rowRenderExpandableOf(record, index);

  /** 默认全展开：数据变化且未受控时收集父级 keys */
  const seedDefaultExpand = (): void => {
    if (expandedControlled.value) return;
    if (props.expandable?.defaultExpandAllRows !== true) return;
    internalExpandedKeys.value = collectParentKeys(props.dataSource, (r, i) =>
      getRowKey(r, i),
    );
  };
  watch(
    () => props.dataSource,
    () => seedDefaultExpand(),
    { immediate: true },
  );

  /** 展平后的当前页展示行 */
  const displayRows = computed<TableDisplayRow<T>[]>(() =>
    flattenTree(pagedRows.value, {
      getKey: getRowKey,
      isExpanded,
    }),
  );

  /** 行点击展开（expandRowByClick 时切换） */
  const onRowClick = (row: TableDisplayRow<T>, index: number): void => {
    if (expandRowByClick.value && isRowExpandable(row.record, index)) {
      toggleExpand(row.key);
    }
  };

  const expandRowByClick = computed(
    () => props.expandable?.expandRowByClick === true,
  );

  /** 是否为空白/空态 */
  const isEmpty = computed(() => totalCount.value === 0);

  // ---------- 分页状态 ----------
  const currentPage = computed<number>(() =>
    currentControlled.value
      ? (props.current ?? DEFAULT_PAGE)
      : internalCurrent.value,
  );
  const pageSize = computed<number>(() =>
    pageSizeControlled.value
      ? (props.pageSize ?? internalPageSize.value)
      : internalPageSize.value,
  );
  const pageSizeOptions = computed<number[]>(
    () => paginationConfig.value.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS,
  );
  const showSizeChanger = computed(
    () => paginationConfig.value.showSizeChanger !== false,
  );
  const showTotal = computed(() => paginationConfig.value.showTotal !== false);
  const maxVisiblePages = computed(
    () => paginationConfig.value.maxVisiblePages ?? 5,
  );

  const totalPages = computed(() =>
    paginationEnabled.value && pageSize.value > 0
      ? Math.max(1, Math.ceil(totalCount.value / pageSize.value))
      : 1,
  );

  /** 同步外部 pageSize 变化到内部（受控 v-model 回写） */
  watch(
    () => props.pageSize,
    (val) => {
      if (val !== undefined) internalPageSize.value = val;
    },
    { immediate: true },
  );

  /** 非受控时以 pagination.pageSize 作为初始每页条数 */
  watch(
    () => paginationConfig.value.pageSize,
    (val) => {
      if (val !== undefined && !pageSizeControlled.value) {
        internalPageSize.value = val;
      }
    },
    { immediate: true },
  );

  /** 数据收缩后夹紧内部页码 */
  watch(totalPages, (pages) => {
    if (internalCurrent.value > pages) internalCurrent.value = pages;
  });

  /** 页码变化 */
  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages.value || page === currentPage.value)
      return;
    internalCurrent.value = page;
    emit('update:current', page);
  };

  /** 每页条数变化（回到第一页） */
  const handlePageSizeChange = (size: number): void => {
    internalPageSize.value = size;
    internalCurrent.value = DEFAULT_PAGE;
    emit('update:pageSize', size);
    emit('update:current', DEFAULT_PAGE);
  };

  // ---------- 行选择 ----------
  const selectionType = computed<
    Exclude<QTableRowSelection<T>['type'], undefined>
  >(() => props.rowSelection?.type ?? 'checkbox');

  const hasSelection = computed(() => props.rowSelection !== undefined);

  const selectedKeys = computed<TableKey[]>(() =>
    selectedControlled.value
      ? (props.selectedRowKeys ?? [])
      : internalSelectedKeys.value,
  );

  const isRowSelected = (key: TableKey): boolean =>
    containsKey(selectedKeys.value, key);

  const isRowSelectionDisabled = (record: T, index: number): boolean =>
    props.rowSelection?.getCheckboxProps?.(record, index)?.disabled === true;

  /** 当前页可选项（树形时含展平后的子行） */
  const currentPageSelectable = computed<TableDisplayRow<T>[]>(() =>
    displayRows.value.filter(
      (row, i) => !isRowSelectionDisabled(row.record, i),
    ),
  );

  const isAllSelected = computed(
    () =>
      currentPageSelectable.value.length > 0 &&
      currentPageSelectable.value.every((row) => isRowSelected(row.key)),
  );
  const isIndeterminate = computed(
    () =>
      currentPageSelectable.value.length > 0 &&
      currentPageSelectable.value.some((row) => isRowSelected(row.key)) &&
      !isAllSelected.value,
  );

  /** 选中行数组（按 selectedKeys 顺序映射回当前 processedRows） */
  const selectedRowsOf = (keys: TableKey[]): T[] => {
    const byKey = new Map<TableKey, T>();
    const walk = (list: T[], depth = 0): void => {
      for (const node of list) {
        byKey.set(getRowKey(node, depth), node);
        const children = childListOf(node);
        if (children) walk(children, depth + 1);
      }
    };
    walk(processedRows.value);
    return keys.map((k) => byKey.get(k)).filter((r): r is T => r !== undefined);
  };

  const commitSelection = (keys: TableKey[]): void => {
    if (!selectedControlled.value) internalSelectedKeys.value = [...keys];
    emit('update:selectedRowKeys', [...keys]);
    emit('selection-change', [...keys], selectedRowsOf(keys));
  };

  /** 切换单行选择（多选 / 单选互斥） */
  const toggleSelectRow = (record: T, index: number): void => {
    if (isRowSelectionDisabled(record, index)) return;
    const key = getRowKey(record, index);
    if (selectionType.value === 'radio') {
      const next = isRowSelected(key) ? [] : [key];
      commitSelection(next);
      return;
    }
    const current = selectedKeys.value;
    const next = isRowSelected(key)
      ? dropKey(current, key)
      : appendKey(current, key);
    commitSelection(next);
  };

  /** 切换全选（当前页可选项） */
  const toggleSelectAll = (): void => {
    const candidates = currentPageSelectable.value;
    if (candidates.length === 0) return;
    const next = isAllSelected.value
      ? dropKeys(
          selectedKeys.value,
          candidates.map((r) => r.key),
        )
      : mergeKeys(
          selectedKeys.value,
          candidates.map((r) => r.key),
        );
    commitSelection(next);
  };

  // ---------- 导出聚合 ----------
  const visibleColCount = computed(() => {
    let count = columnsInfo.value.length;
    if (hasSelection.value) count += 1;
    if (hasExpandCol.value) count += 1;
    return count;
  });

  const showHeader = computed(() => props.showHeader !== false);

  const getCellValue = (
    record: T,
    dataIndex: TableDataIndex | undefined,
  ): unknown => getDataPathValue(record, dataIndex);

  return {
    columnsInfo,
    visibleColCount,
    showHeader,
    hasSelection,
    selectionType,
    hasExpandCol,
    isTree,
    hasRowRenderExpansion,
    processedRows,
    pagedRows,
    displayRows,
    totalCount,
    isEmpty,
    activeSort,
    clickSortDirection,
    activeFilterKey,
    appliedFilters,
    hasAppliedFilters,
    openFilter,
    closeFilter,
    isFilterOptionChecked,
    toggleFilterOption,
    confirmFilter,
    resetFilter,
    applyFilter,
    paginationEnabled,
    currentPage,
    pageSize,
    totalPages,
    showSizeChanger,
    pageSizeOptions,
    showTotal,
    maxVisiblePages,
    handlePageChange,
    handlePageSizeChange,
    isRowSelected,
    isRowSelectionDisabled,
    toggleSelectRow,
    isAllSelected,
    isIndeterminate,
    toggleSelectAll,
    isExpanded,
    isRowExpandable,
    toggleExpand,
    onRowClick,
    expandRowByClick,
    indentSize,
    getCellValue,
  };
};

/** 合并 keys（去重，保持原顺序 + 追加） */
function mergeKeys(base: TableKey[], add: TableKey[]): TableKey[] {
  const out = [...base];
  for (const key of add) {
    if (!out.includes(key)) out.push(key);
  }
  return out;
}

/** 批量移除 keys */
function dropKeys(base: TableKey[], remove: TableKey[]): TableKey[] {
  const set = new Set(remove);
  return base.filter((k) => !set.has(k));
}
