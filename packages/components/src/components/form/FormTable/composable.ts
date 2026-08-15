import { useFormEvents } from '@/events';
import {
  computed,
  type ComputedRef,
  reactive,
  ref,
  type Ref,
  shallowRef,
  watch,
} from 'vue';

import type { FormTableEmits, FormTableProps, Row } from './type';

/**
 * FormTable 组件核心逻辑
 * @typeParam T 外部传入的数据行类型，默认 Record<string, unknown>
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns 响应式状态和操作方法
 */
export const useFormTable = <T = Record<string, unknown>>(
  props: FormTableProps<T>,
  emit: FormTableEmits<T>,
): {
  localData: Row<T>[];
  localValue: Ref<T[]>;
  currentPage: Ref<number>;
  totalPages: ComputedRef<number>;
  paginatedData: ComputedRef<Row<T>[]>;
  isAllSelected: ComputedRef<boolean>;
  sortChange: (columnIndex: number) => void;
  handlePageChange: (page: number) => void;
  onSelectRow: (row: Row<T>) => void;
  onToggleAllSelection: () => void;
} => {
  const { handleInput, handleChange } = useFormEvents<T[]>(emit);

  /**
   * 本地选中值（v-model）
   * @description 使用 shallowRef 而非 ref，避免泛型数组被 UnwrapRef 递归转换，
   * 保证 localValue.value 的类型与 T[] 严格一致
   */
  const localValue = shallowRef<T[]>([]);
  /**
   * 本地数据（避免直接修改 props）
   * @description 保持 reactive 深度响应式（row.isSelected 变更需驱动 UI 高亮），
   * 但通过类型断言固定公开类型为 Row<T>[]，规避泛型数组被 UnwrapRef 递归转换后
   * UnwrapRefSimple<Row<T>> 与 Row<T> 不兼容的问题
   */
  const localData = reactive<Row<T>[]>([]) as Row<T>[];
  /** 当前页码 */
  const currentPage = ref(1);
  /** 每页行数 */
  const internalPageSize = ref<number>(props.pageSize ?? 10);

  // 同步传入的 data
  watch(
    () => props.data,
    () => {
      localData.splice(0, localData.length);
      localData.push(
        ...props.data.map(
          (item) => ({ ...item, isSelected: false }) satisfies Row<T>,
        ),
      );
    },
    { immediate: true },
  );

  // 同步 pageSize 变化
  watch(
    () => props.pageSize,
    (newVal) => {
      if (newVal !== undefined) {
        internalPageSize.value = newVal;
      }
    },
    { immediate: true },
  );

  /** 总页数 */
  const totalPages = computed(() => {
    if (!props.pagination || localData.length === 0) return 1;
    return Math.ceil(localData.length / internalPageSize.value);
  });

  /** 分页后的数据 */
  const paginatedData = computed(() => {
    if (!props.pagination) return localData;
    const startIndex = (currentPage.value - 1) * internalPageSize.value;
    const endIndex = Math.min(
      startIndex + internalPageSize.value,
      localData.length,
    );
    return localData.slice(startIndex, endIndex);
  });

  /** 全选状态 */
  const isAllSelected = computed(() => {
    return localData.length > 0 && localData.every((row) => row.isSelected);
  });

  /** 处理排序变化 */
  const sortChange = (columnIndex: number) => {
    const temp = [...props.columns];
    temp[columnIndex].order = !temp[columnIndex].order;
    emit('update:columns', temp);
  };

  /** 处理页码变化 */
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    emit('page-change', page);
  };

  /** 多选切换 */
  const onToggleRowSelection = (row: Row<T>) => {
    if (row.isSelected) {
      row.isSelected = false;
      const index = localValue.value.indexOf(row);
      if (index > -1) {
        localValue.value.splice(index, 1);
      }
    } else {
      row.isSelected = true;
      localValue.value.push(row);
    }
    handleInput(localValue.value);
    handleChange(localValue.value);
  };

  /** 全选/取消全选 */
  const onToggleAllSelection = () => {
    if (props.disabled) return;
    localValue.value = [];
    if (!isAllSelected.value) {
      for (let i = 0, len = localData.length; i < len; i++) {
        localData[i].isSelected = true;
        localValue.value.push(localData[i]);
      }
    } else {
      for (let i = 0, len = localData.length; i < len; i++) {
        localData[i].isSelected = false;
      }
    }
    handleInput(localValue.value);
    handleChange(localValue.value);
  };

  /** 行选择（路由单选/多选） */
  const onSelectRow = (row: Row<T>) => {
    if (props.disabled) return;
    if (props.selectionMode === 'multiple') {
      onToggleRowSelection(row);
      return;
    }
    const isSelected = row.isSelected;
    for (let i = 0, len = localData.length; i < len; i++) {
      localData[i].isSelected = false;
    }
    row.isSelected = !isSelected;
    localValue.value = row.isSelected ? [row] : [];
    handleInput(localValue.value);
    handleChange(localValue.value);
  };

  return {
    localData,
    localValue,
    currentPage,
    totalPages,
    paginatedData,
    isAllSelected,
    sortChange,
    handlePageChange,
    onSelectRow,
    onToggleAllSelection,
  };
};
