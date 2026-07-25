import { describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';

import { useFormTable } from '../composable';
import type { FormTableEmits, FormTableProps, TableColumn } from '../type';

// mock utils 桶导出，阻断 useFollowSystemTheme 顶层 window.matchMedia
vi.mock('@/utils', () => ({}));

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param overrides 需要覆盖的 Props 属性
 * @returns props 与 emit 模拟函数
 */
const createTable = (
  overrides: Partial<FormTableProps> = {},
): { props: FormTableProps; emit: ReturnType<typeof vi.fn> } => {
  const columns: TableColumn[] = [
    { value: 'id', label: 'ID', order: true },
    { value: 'name', label: '名称' },
  ];
  const props = reactive<FormTableProps>({
    modelValue: [],
    data: [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ],
    columns,
    ...overrides,
  });
  return { props, emit: vi.fn() };
};

describe('useFormTable', () => {
  it('应该同步 props.data 到本地数据并附加未选中状态', () => {
    const { props, emit } = createTable();
    const { localData } = useFormTable(props, emit as FormTableEmits);

    expect(localData).toHaveLength(3);
    expect(localData[0]).toEqual({ id: 1, name: '张三', isSelected: false });
  });

  it('应该在 props.data 变化时重新同步本地数据', async () => {
    const { props, emit } = createTable();
    const { localData } = useFormTable(props, emit as FormTableEmits);

    props.data = [{ id: 9, name: '赵六' }];
    await nextTick();

    expect(localData).toHaveLength(1);
    expect(localData[0]).toEqual({ id: 9, name: '赵六', isSelected: false });
  });

  it('应该在未启用分页时总页数为 1 且返回全部数据', () => {
    const { props, emit } = createTable();
    const { totalPages, paginatedData } = useFormTable(
      props,
      emit as FormTableEmits,
    );

    expect(totalPages.value).toBe(1);
    expect(paginatedData.value).toHaveLength(3);
  });

  it('应该在启用分页时按 pageSize 计算总页数与分页数据', () => {
    const { props, emit } = createTable({ pagination: true, pageSize: 2 });
    const { totalPages, paginatedData, currentPage, handlePageChange } =
      useFormTable(props, emit as FormTableEmits);

    expect(totalPages.value).toBe(2);
    expect(paginatedData.value).toHaveLength(2);

    handlePageChange(2);

    expect(currentPage.value).toBe(2);
    expect(paginatedData.value).toHaveLength(1);
    expect(emit).toHaveBeenCalledWith('page-change', 2);
  });

  it('应该在单选模式下选中行并互斥其他行', () => {
    const { props, emit } = createTable({ selectionMode: 'single' });
    const { localData, localValue, onSelectRow } = useFormTable(
      props,
      emit as FormTableEmits,
    );

    onSelectRow(localData[0]);
    expect(localData[0].isSelected).toBe(true);
    expect(localValue.value).toHaveLength(1);

    onSelectRow(localData[1]);
    expect(localData[0].isSelected).toBe(false);
    expect(localData[1].isSelected).toBe(true);
    expect(localValue.value).toEqual([localData[1]]);
    expect(emit).toHaveBeenCalledWith('update:modelValue', [localData[1]]);
    expect(emit).toHaveBeenCalledWith('change', [localData[1]]);
  });

  it('应该在单选模式下再次点击选中行取消选中', () => {
    const { props, emit } = createTable({ selectionMode: 'single' });
    const { localData, localValue, onSelectRow } = useFormTable(
      props,
      emit as FormTableEmits,
    );

    onSelectRow(localData[0]);
    onSelectRow(localData[0]);

    expect(localData[0].isSelected).toBe(false);
    expect(localValue.value).toHaveLength(0);
  });

  it('应该在多选模式下累加选中并支持取消单行', () => {
    const { props, emit } = createTable({ selectionMode: 'multiple' });
    const { localData, localValue, onSelectRow } = useFormTable(
      props,
      emit as FormTableEmits,
    );

    onSelectRow(localData[0]);
    onSelectRow(localData[1]);
    expect(localValue.value).toHaveLength(2);

    onSelectRow(localData[0]);
    expect(localData[0].isSelected).toBe(false);
    expect(localValue.value).toEqual([localData[1]]);
  });

  it('应该支持全选与取消全选', () => {
    const { props, emit } = createTable({ selectionMode: 'multiple' });
    const { localData, localValue, isAllSelected, onToggleAllSelection } =
      useFormTable(props, emit as FormTableEmits);

    onToggleAllSelection();
    expect(isAllSelected.value).toBe(true);
    expect(localValue.value).toHaveLength(3);

    onToggleAllSelection();
    expect(isAllSelected.value).toBe(false);
    expect(localValue.value).toHaveLength(0);
    expect(localData.every((row) => !row.isSelected)).toBe(true);
  });

  it('应该在禁用时忽略行选择与全选操作', () => {
    const { props, emit } = createTable({ disabled: true });
    const { localData, localValue, onSelectRow, onToggleAllSelection } =
      useFormTable(props, emit as FormTableEmits);

    onSelectRow(localData[0]);
    onToggleAllSelection();

    expect(localValue.value).toHaveLength(0);
    expect(emit).not.toHaveBeenCalled();
  });

  it('应该在排序变化时翻转列排序并触发 update:columns 事件', () => {
    const { props, emit } = createTable();
    const { sortChange } = useFormTable(props, emit as FormTableEmits);

    sortChange(0);

    expect(emit).toHaveBeenCalledWith(
      'update:columns',
      expect.arrayContaining([expect.objectContaining({ order: false })]),
    );
  });
});
