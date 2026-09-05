import { describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

import {
  appendKey,
  childListOf,
  collectParentKeys,
  columnMatches,
  compareValues,
  containsKey,
  createCompareFn,
  dataIndexToString,
  dropKey,
  filterTree,
  flattenTree,
  getDataPathValue,
  hasAnyChildren,
  nextSortOrder,
  resolveRowKey,
  sliceByPage,
  sortTree,
  toColumnKey,
  useQTable,
} from '../composable';
import type { QTableColumn, QTableEmits, QTableProps, TableKey } from '../type';

type Row = Record<string, unknown>;

/** 测试数据行工厂 */
const makeRows = (): Row[] => [
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 2, name: '李四', age: 30, status: 1 },
  { id: 3, name: '王五', age: 20, status: 0 },
  { id: 4, name: '赵六', age: 35, status: 0 },
];

/** 乱序数据（用于验证排序方向） */
const scrambled = (): Row[] => [
  { id: 3, name: '王五', age: 20, status: 0 },
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 4, name: '赵六', age: 35, status: 0 },
  { id: 2, name: '李四', age: 30, status: 1 },
];

/** 创建测试 Props 与 Emits */
const createTable = (
  overrides: Partial<QTableProps<Row>> = {},
): { props: QTableProps<Row>; emit: ReturnType<typeof vi.fn> } => {
  const columns: QTableColumn<Row>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      sorter: true,
    },
    {
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text: '启用', value: 1 },
        { text: '停用', value: 0 },
      ],
    },
  ];
  const props = reactive<QTableProps<Row>>({
    dataSource: makeRows(),
    columns,
    rowKey: 'id',
    ...overrides,
  });
  return { props, emit: vi.fn() };
};

describe('纯函数', () => {
  it('childListOf / hasAnyChildren 识别 children 字段', () => {
    const parent = { id: 1, children: [{ id: 2 }] };
    expect(childListOf(parent)).toHaveLength(1);
    expect(childListOf({ id: 3 })).toBeUndefined();
    expect(hasAnyChildren([parent])).toBe(true);
    expect(hasAnyChildren([{ id: 3 }])).toBe(false);
    expect(hasAnyChildren(undefined)).toBe(false);
  });

  it('dataIndexToString / toColumnKey 生成列 key', () => {
    expect(dataIndexToString('a.b')).toBe('a.b');
    expect(dataIndexToString(['a', 'b'])).toBe('a.b');
    expect(toColumnKey({ title: 'x', key: 'k' }, 2)).toBe('k');
    expect(toColumnKey({ title: 'x', dataIndex: 'a.b' }, 2)).toBe('a.b');
    expect(toColumnKey({ title: 'x' }, 5)).toBe('__q-col-5');
  });

  it('getDataPathValue 读取嵌套/点路径', () => {
    const row = { a: { b: { c: 1 } }, list: [9, 8] };
    expect(getDataPathValue(row, 'a.b.c')).toBe(1);
    expect(getDataPathValue(row, ['a', 'b', 'c'])).toBe(1);
    expect(getDataPathValue(row, ['list', 1])).toBe(8);
    expect(getDataPathValue(row, 'a.x')).toBeUndefined();
    expect(getDataPathValue(row, undefined)).toBeUndefined();
    expect(getDataPathValue(null, 'a')).toBeUndefined();
  });

  it('resolveRowKey 函数 / 字段名 / 索引兜底', () => {
    expect(resolveRowKey('id', { id: 7 }, 0)).toBe(7);
    expect(
      resolveRowKey((r: Row, i) => `${i}-${String(r.id)}`, { id: 7 }, 3),
    ).toBe('3-7');
    expect(resolveRowKey(undefined, { id: 7 }, 2)).toBe(2);
  });

  it('compareValues 排序规则', () => {
    expect(compareValues(1, 2)).toBeLessThan(0);
    expect(compareValues(2, 1)).toBeGreaterThan(0);
    expect(compareValues('a', 'b')).toBeLessThan(0);
    expect(compareValues('b', 'a')).toBeGreaterThan(0);
    expect(compareValues(null, 1)).toBeGreaterThan(0);
    expect(compareValues(1, null)).toBeLessThan(0);
    expect(compareValues(undefined, undefined)).toBe(0);
    expect(compareValues(1, 1)).toBe(0);
  });

  it('createCompareFn 支持函数 / true(按 dataIndex) / null', () => {
    const fn = createCompareFn<Row>({
      key: 'a',
      title: 'x',
      sorter: (a: Row, b: Row) => Number(b.age) - Number(a.age),
    });
    expect(fn).not.toBeNull();
    expect(fn!(makeRows()[0], makeRows()[1])).toBeGreaterThan(0);

    const byIndex = createCompareFn<Row>({
      key: 'id',
      title: 'x',
      dataIndex: 'id',
      sorter: true,
    });
    expect(byIndex!(makeRows()[0], makeRows()[1])).toBeLessThan(0);

    expect(createCompareFn<Row>({ key: 'x', title: 'x' })).toBeNull();
    expect(
      createCompareFn<Row>({
        key: 'x',
        title: 'x',
        dataIndex: 'id',
      }),
    ).toBeNull();
  });

  it('columnMatches 支持 onFilter 与默认取值比较', () => {
    const col: QTableColumn<Row> = {
      key: 'status',
      title: 's',
      dataIndex: 'status',
      onFilter: (v, r) => r.age !== v,
    };
    expect(columnMatches(makeRows()[0], col, [30])).toBe(true);
    expect(columnMatches(makeRows()[0], col, [25])).toBe(false);

    const plain: QTableColumn<Row> = {
      key: 'status',
      title: 's',
      dataIndex: 'status',
    };
    expect(columnMatches(makeRows()[0], plain, [1])).toBe(true);
    expect(columnMatches(makeRows()[0], plain, ['1'])).toBe(true);
    expect(columnMatches(makeRows()[0], plain, [])).toBe(true);
  });

  it('filterTree 递归过滤（父不匹配则子树隐藏）', () => {
    const tree: Row[] = [
      { id: 1, status: 1, children: [{ id: 11, status: 1 }] },
      { id: 2, status: 0, children: [{ id: 21, status: 0 }] },
    ];
    const out = filterTree(tree, (r) => r.status === 1);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe(1);
    expect(childListOf(out[0])).toHaveLength(1);
  });

  it('sortTree 递归排序且 compare 为空时原样返回', () => {
    const tree: Row[] = [
      { id: 2, children: [{ id: 22 }, { id: 21 }] },
      { id: 1, children: [{ id: 12 }, { id: 11 }] },
    ];
    const cmp = createCompareFn<Row>({
      key: 'id',
      title: 'x',
      dataIndex: 'id',
      sorter: true,
    });
    const sorted = sortTree(tree, cmp);
    expect(sorted[0].id).toBe(1);
    const childAges = childListOf(sorted[0])!.map((c) => c.id);
    expect(childAges).toEqual([11, 12]);
    expect(sortTree(tree, null)).toBe(tree);
  });

  it('collectParentKeys / flattenTree 展平与折叠', () => {
    const tree: Row[] = [
      { id: 1, children: [{ id: 11, children: [{ id: 111 }] }, { id: 12 }] },
      { id: 2 },
    ];
    const getKey = (r: Row) => r.id as TableKey;
    expect(collectParentKeys(tree, getKey)).toEqual([1, 11]);

    const expanded = new Set([1]);
    const flat = flattenTree(tree, {
      getKey,
      isExpanded: (k) => expanded.has(k),
    });
    expect(flat.map((r) => r.key)).toEqual([1, 11, 12, 2]);
    expect(flat[0].expanded).toBe(true);
    expect(flat[0].hasChildren).toBe(true);
    expect(flat[1].depth).toBe(1);

    const all = flattenTree(tree, {
      getKey,
      isExpanded: () => true,
    });
    expect(all.map((r) => r.key)).toEqual([1, 11, 111, 12, 2]);
    expect(all.find((r) => r.key === 111)!.depth).toBe(2);
  });

  it('sliceByPage / key 工具', () => {
    const list = [1, 2, 3, 4, 5];
    expect(sliceByPage(list, 2, 2)).toEqual([3, 4]);
    expect(appendKey([1, 2], 3)).toEqual([1, 2, 3]);
    expect(appendKey([1, 2], 2)).toEqual([1, 2]);
    expect(dropKey([1, 2, 3], 2)).toEqual([1, 3]);
    expect(dropKey([1, 2], 9)).toEqual([1, 2]);
    expect(containsKey([1, 2], 2)).toBe(true);
    expect(containsKey(undefined, 2)).toBe(false);
    expect(nextSortOrder('ascend')).toBe('descend');
    expect(nextSortOrder('descend')).toBeNull();
    expect(nextSortOrder(null)).toBe('ascend');
  });
});

describe('useQTable 排序', () => {
  it('未受控：设置升序 / 同向取消 / 降序', async () => {
    const { props, emit } = createTable({ dataSource: scrambled() });
    const table = useQTable(props, emit as QTableEmits<Row>);

    table.clickSortDirection(props.columns![0], 'ascend');
    await nextTick();
    expect(table.displayRows.value.map((r) => r.record.id)).toEqual([
      1, 2, 3, 4,
    ]);
    expect(table.activeSort.value).toEqual({ key: 'id', order: 'ascend' });
    expect(emit).toHaveBeenCalledWith(
      'sorter-change',
      props.columns![0],
      'ascend',
    );

    table.clickSortDirection(props.columns![0], 'ascend');
    await nextTick();
    expect(table.activeSort.value).toBeNull();
    expect(table.displayRows.value.map((r) => r.record.id)).toEqual([
      3, 1, 4, 2,
    ]);

    table.clickSortDirection(props.columns![0], 'descend');
    await nextTick();
    expect(table.displayRows.value.map((r) => r.record.id)).toEqual([
      4, 3, 2, 1,
    ]);
  });

  it('点击另一列排序时切换排序目标', async () => {
    const { props } = createTable({
      dataSource: [
        { id: 2, name: '李四', age: 30, status: 1 },
        { id: 3, name: '王五', age: 20, status: 0 },
        { id: 1, name: '张三', age: 25, status: 1 },
        { id: 4, name: '赵六', age: 35, status: 0 },
      ],
    });
    props.columns![0].key = 'name';
    props.columns![0].dataIndex = 'name';
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.clickSortDirection(props.columns![0], 'ascend');
    await nextTick();
    expect(table.displayRows.value.map((r) => r.record.name)).toEqual([
      '张三',
      '李四',
      '王五',
      '赵六',
    ]);
  });

  it('受控（列含 sortOrder）：仅发出事件不内部排序', async () => {
    const { props, emit } = createTable();
    props.columns![0].sortOrder = 'ascend';
    const table = useQTable(props, emit as QTableEmits<Row>);
    expect(table.activeSort.value).toEqual({ key: 'id', order: 'ascend' });
    expect(table.displayRows.value.map((r) => r.record.id)).toEqual([
      1, 2, 3, 4,
    ]);

    table.clickSortDirection(props.columns![0], 'descend');
    expect(emit).toHaveBeenCalledWith(
      'sorter-change',
      props.columns![0],
      'descend',
    );
    // 父级未回写前内部仍按 ascend
    expect(table.activeSort.value?.order).toBe('ascend');
  });
});

describe('useQTable 筛选', () => {
  it('多选：打开/勾选/确定应用，行按筛选项收敛', async () => {
    const { props, emit } = createTable();
    const table = useQTable(props, emit as QTableEmits<Row>);
    const statusCol = props.columns![2];

    table.openFilter('status');
    expect(table.activeFilterKey.value).toBe('status');

    table.toggleFilterOption('status', 1, statusCol);
    expect(table.isFilterOptionChecked('status', 1)).toBe(true);
    expect(table.hasAppliedFilters.value).toBe(false);

    table.confirmFilter('status');
    await nextTick();
    expect(table.hasAppliedFilters.value).toBe(true);
    expect(table.totalCount.value).toBe(2);
    expect(table.displayRows.value.map((r) => r.record.name)).toEqual([
      '张三',
      '李四',
    ]);
    expect(emit).toHaveBeenCalledWith(
      'filter-change',
      expect.objectContaining({ status: [1] }),
    );
  });

  it('重置清空该列筛选', async () => {
    const { props } = createTable();
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.toggleFilterOption('status', 1, props.columns![2]);
    table.toggleFilterOption('status', 0, props.columns![2]);
    table.confirmFilter('status');
    await nextTick();
    expect(table.totalCount.value).toBe(4);
    table.resetFilter('status');
    await nextTick();
    expect(table.hasAppliedFilters.value).toBe(false);
    expect(table.displayRows.value).toHaveLength(4);
  });

  it('单选（filterMultiple false）即时应用并关闭', async () => {
    const { props } = createTable();
    props.columns![2].filterMultiple = false;
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.openFilter('status');
    table.toggleFilterOption('status', 0, props.columns![2]);
    await nextTick();
    expect(table.activeFilterKey.value).toBeNull();
    expect(table.totalCount.value).toBe(2);
    expect(table.displayRows.value.map((r) => r.record.name)).toEqual([
      '王五',
      '赵六',
    ]);
  });

  it('筛选后页码复位到第 1 页', async () => {
    const { props } = createTable({ pagination: { pageSize: 2 } });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.handlePageChange(2);
    await nextTick();
    expect(table.currentPage.value).toBe(2);
    table.toggleFilterOption('status', 1, props.columns![2]);
    table.confirmFilter('status');
    await nextTick();
    expect(table.currentPage.value).toBe(1);
  });
});

describe('useQTable 分页', () => {
  it('分页切片与页码事件', async () => {
    const { props, emit } = createTable({ pagination: { pageSize: 2 } });
    const table = useQTable(props, emit as QTableEmits<Row>);
    expect(table.totalPages.value).toBe(2);
    expect(table.currentPage.value).toBe(1);
    expect(table.pagedRows.value).toHaveLength(2);

    table.handlePageChange(2);
    await nextTick();
    expect(table.currentPage.value).toBe(2);
    expect(table.displayRows.value.map((r) => r.record.name)).toEqual([
      '王五',
      '赵六',
    ]);
    expect(emit).toHaveBeenCalledWith('update:current', 2);
  });

  it('每页条数变化回到第一页', async () => {
    const { props, emit } = createTable({ pagination: { pageSize: 2 } });
    const table = useQTable(props, emit as QTableEmits<Row>);
    table.handlePageChange(2);
    table.handlePageSizeChange(4);
    await nextTick();
    expect(table.pageSize.value).toBe(4);
    expect(table.currentPage.value).toBe(1);
    expect(table.totalPages.value).toBe(1);
    expect(emit).toHaveBeenCalledWith('update:pageSize', 4);
    expect(emit).toHaveBeenCalledWith('update:current', 1);
  });

  it('pagination=false 展示全部', () => {
    const { props } = createTable({ pagination: false });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    expect(table.paginationEnabled.value).toBe(false);
    expect(table.pagedRows.value).toHaveLength(4);
    expect(table.totalPages.value).toBe(1);
  });

  it('受控页码/条数：current/pageSize 提供后内部不改变', async () => {
    const { props, emit } = createTable({ pageSize: 2, current: 2 });
    const table = useQTable(props, emit as QTableEmits<Row>);
    expect(table.currentPage.value).toBe(2);
    expect(table.displayRows.value.map((r) => r.record.name)).toEqual([
      '王五',
      '赵六',
    ]);

    table.handlePageChange(1);
    await nextTick();
    expect(table.currentPage.value).toBe(2);
    expect(emit).toHaveBeenCalledWith('update:current', 1);
  });
});

describe('useQTable 行选择', () => {
  it('多选：勾选/取消单行并触发事件', async () => {
    const { props, emit } = createTable({
      rowSelection: { type: 'checkbox' },
    });
    const table = useQTable(props, emit as QTableEmits<Row>);
    const first = props.dataSource![0];

    table.toggleSelectRow(first, 0);
    await nextTick();
    expect(table.isRowSelected(1)).toBe(true);
    expect(table.isAllSelected.value).toBe(false);
    expect(table.isIndeterminate.value).toBe(true);
    expect(emit).toHaveBeenCalledWith('update:selectedRowKeys', [1]);
    expect(emit).toHaveBeenCalledWith('selection-change', [1], [first]);

    table.toggleSelectRow(first, 0);
    await nextTick();
    expect(table.isRowSelected(1)).toBe(false);
  });

  it('全选仅作用于当前页且跳过禁用行', async () => {
    const { props } = createTable({
      pagination: { pageSize: 2 },
      rowSelection: {
        type: 'checkbox',
        getCheckboxProps: (r: Row) =>
          r.id === 2 ? { disabled: true } : undefined,
      },
    });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);

    table.toggleSelectAll();
    await nextTick();
    // 当前页可选项仅 id=1（id=2 禁用），全选后仅选中它
    expect(table.isRowSelected(1)).toBe(true);
    expect(table.isRowSelected(2)).toBe(false);
    expect(table.isAllSelected.value).toBe(true);

    table.toggleSelectAll();
    await nextTick();
    expect(table.isRowSelected(1)).toBe(false);
  });

  it('单选：互斥选中', async () => {
    const { props } = createTable({
      rowSelection: { type: 'radio' },
    });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.toggleSelectRow(props.dataSource![0], 0);
    table.toggleSelectRow(props.dataSource![1], 1);
    await nextTick();
    expect(table.isRowSelected(1)).toBe(false);
    expect(table.isRowSelected(2)).toBe(true);
  });

  it('受控：selectedRowKeys 提供后由外部回写', async () => {
    const { props } = createTable({
      rowSelection: { type: 'checkbox' },
      selectedRowKeys: [],
    });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    table.toggleSelectRow(props.dataSource![0], 0);
    await nextTick();
    // 未回写，内部视为 props（空）
    expect(table.isRowSelected(1)).toBe(false);
  });
});

describe('useQTable 展开', () => {
  const tree: Row[] = [
    {
      id: 1,
      name: '总部',
      children: [
        { id: 11, name: '华东' },
        { id: 12, name: '华北' },
      ],
    },
    { id: 2, name: '分部', children: [{ id: 21, name: '西南' }] },
  ];

  it('树形：展开/折叠显示子行', async () => {
    const { props } = createTable({ dataSource: tree });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);

    expect(table.isTree.value).toBe(true);
    expect(table.hasExpandCol.value).toBe(true);
    expect(table.displayRows.value).toHaveLength(2);
    expect(table.displayRows.value[0].hasChildren).toBe(true);

    table.toggleExpand(1);
    await nextTick();
    expect(table.isExpanded(1)).toBe(true);
    expect(table.displayRows.value.map((r) => r.key)).toEqual([1, 11, 12, 2]);
    expect(table.displayRows.value.find((r) => r.key === 11)!.depth).toBe(1);

    table.toggleExpand(1);
    await nextTick();
    expect(table.displayRows.value).toHaveLength(2);
  });

  it('defaultExpandAllRows 全展开', async () => {
    const { props } = createTable({
      dataSource: tree,
      expandable: { defaultExpandAllRows: true },
    });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    expect(table.displayRows.value.map((r) => r.key)).toEqual([
      1, 11, 12, 2, 21,
    ]);
  });

  it('受控展开：点击发出切换后的 keys（父级回写后折叠）', async () => {
    const { props, emit } = createTable({
      dataSource: tree,
      expandable: {},
      expandedRowKeys: [1],
    });
    const table = useQTable(props, emit as QTableEmits<Row>);
    expect(table.isExpanded(1)).toBe(true);

    table.toggleExpand(1);
    expect(emit).toHaveBeenCalledWith('update:expandedRowKeys', []);

    table.toggleExpand(11);
    expect(emit).toHaveBeenCalledWith('update:expandedRowKeys', [1, 11]);
  });

  it('行级渲染展开（hasExpandedRowSlot）', async () => {
    const { props } = createTable({ expandable: {} });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>, {
      hasExpandedRowSlot: true,
    });
    expect(table.hasRowRenderExpansion.value).toBe(true);
    expect(table.isRowExpandable(props.dataSource![0], 0)).toBe(true);

    table.toggleExpand(1);
    await nextTick();
    expect(table.isExpanded(1)).toBe(true);

    table.toggleExpand(1);
    await nextTick();
    expect(table.isExpanded(1)).toBe(false);
  });

  it('无插槽或无 expandable 时不可行级展开', () => {
    const { props } = createTable();
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    expect(table.hasRowRenderExpansion.value).toBe(false);
    expect(table.isRowExpandable(props.dataSource![0], 0)).toBe(false);
  });
});

describe('useQTable 数据变化', () => {
  it('dataSource 更新后重算展示与总数', async () => {
    const { props } = createTable();
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    props.dataSource = [
      { id: 9, name: '新一', age: 1, status: 1 },
      { id: 8, name: '新二', age: 2, status: 0 },
    ];
    await nextTick();
    expect(table.totalCount.value).toBe(2);
    expect(table.displayRows.value[0].record.name).toBe('新一');
  });

  it('空数据 isEmpty', () => {
    const { props } = createTable({ dataSource: [] });
    const table = useQTable(props, vi.fn() as QTableEmits<Row>);
    expect(table.isEmpty.value).toBe(true);
    expect(table.totalCount.value).toBe(0);
  });
});
