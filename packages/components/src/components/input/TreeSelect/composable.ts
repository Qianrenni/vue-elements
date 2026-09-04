import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { TreeSelectEmits, TreeSelectItem, TreeSelectProps } from './type';

/** 展平节点（带路径标签） */
export interface FlatTreeItem {
  value: string | number;
  label: string;
  depth: number;
  disabled: boolean;
  selectable: boolean;
  hasChildren: boolean;
  /** 祖先 label（从根到父） */
  pathLabel: string[];
  /** 父链 value */
  parentValues: (string | number)[];
}

/** useTreeSelect 返回值接口 */
export interface UseTreeSelectReturn {
  /** 展平节点列表 */
  flat: ComputedRef<FlatTreeItem[]>;
  /** 按展开态过滤后可见的节点 */
  visibleFlat: ComputedRef<FlatTreeItem[]>;
  /** 展开 value 集合 */
  expandedValues: Ref<Set<string | number>>;
  /** 是否展开某节点 */
  isExpanded: (value: string | number) => boolean;
  /** 切换展开 */
  toggleExpand: (value: string | number) => void;
  /** 当前选中项（完整节点信息） */
  selectedItem: ComputedRef<TreeSelectItem | undefined>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 选中某节点 */
  selectNode: (value: string | number) => void;
  /** 清空 */
  clear: () => void;
}

/** 递归展平树 */
function flattenTree(
  items: TreeSelectItem[],
  out: FlatTreeItem[],
  depth: number,
  parents: TreeSelectItem[],
) {
  for (const item of items) {
    const hasChildren = !!item.children?.length;
    out.push({
      value: item.value,
      label: item.label,
      depth,
      disabled: item.disabled === true,
      selectable: item.selectable !== false && item.disabled !== true,
      hasChildren,
      pathLabel: [...parents.map((p) => p.label), item.label],
      parentValues: parents.map((p) => p.value),
    });
    if (hasChildren) {
      flattenTree(item.children ?? [], out, depth + 1, [...parents, item]);
    }
  }
}

/** 收集所有含子节点的 value（供默认展开） */
function collectExpandable(items: TreeSelectItem[], set: Set<string | number>) {
  for (const item of items) {
    if (item.children?.length) {
      set.add(item.value);
      collectExpandable(item.children, set);
    }
  }
}

/**
 * QTreeSelect 组件核心逻辑：数据驱动的树展平 / 展开 / 选中。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useTreeSelect = (
  props: TreeSelectProps,
  emit: TreeSelectEmits,
): UseTreeSelectReturn => {
  /** 展开集合（默认展开全部含子节点） */
  const expandedValues = ref<Set<string | number>>(new Set());

  const flat = computed<FlatTreeItem[]>(() => {
    const out: FlatTreeItem[] = [];
    flattenTree(props.items ?? [], out, 0, []);
    return out;
  });

  /** items 变化时重置展开 */
  watch(
    () => props.items,
    () => {
      const set = new Set<string | number>();
      if (props.expandAll !== false) {
        collectExpandable(props.items ?? [], set);
      }
      expandedValues.value = set;
    },
    { immediate: true },
  );

  const isDisabled = computed(() => props.disabled === true);

  const isExpanded = (value: string | number) =>
    expandedValues.value.has(value);

  function toggleExpand(value: string | number) {
    const next = new Set(expandedValues.value);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    expandedValues.value = next;
  }

  /** 可见节点：所有祖先均展开 */
  const visibleFlat = computed<FlatTreeItem[]>(() => {
    const exp = expandedValues.value;
    return flat.value.filter((n) => n.parentValues.every((v) => exp.has(v)));
  });

  /** 查找节点 */
  function findNode(
    items: TreeSelectItem[],
    value: string | number,
  ): TreeSelectItem | undefined {
    for (const item of items) {
      if (item.value === value) return item;
      if (item.children?.length) {
        const found = findNode(item.children, value);
        if (found) return found;
      }
    }
    return undefined;
  }

  /** 当前选中节点 */
  const selectedItem = computed<TreeSelectItem | undefined>(() => {
    if (props.modelValue === undefined || props.modelValue === null)
      return undefined;
    return findNode(props.items ?? [], props.modelValue);
  });

  /** 选中某节点：更新 v-model 并派发 select/change */
  function selectNode(value: string | number) {
    if (isDisabled.value) return;
    const item = findNode(props.items ?? [], value);
    if (!item) return;
    if (item.disabled || item.selectable === false) return;
    emit('update:modelValue', value);
    emit('change', value);
    emit('select', item);
  }

  /** 清空 */
  function clear() {
    if (isDisabled.value) return;
    emit('update:modelValue', null);
    emit('change', null);
  }

  return {
    flat,
    visibleFlat,
    expandedValues,
    isExpanded,
    toggleExpand,
    selectedItem,
    isDisabled,
    selectNode,
    clear,
  };
};
