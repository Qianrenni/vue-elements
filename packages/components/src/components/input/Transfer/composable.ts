import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type {
  TransferDirection,
  TransferEmits,
  TransferItem,
  TransferKey,
  TransferProps,
} from './type';

/** 按 targetKeys 拆分左右列表 */
export function splitDataSource(
  dataSource: TransferItem[] | undefined,
  targetKeys: TransferKey[] | undefined,
): { left: TransferItem[]; right: TransferItem[] } {
  const list = dataSource ?? [];
  const keys = targetKeys ?? [];
  const keySet = new Set(keys);
  const right = keys
    .map((k) => list.find((i) => i.key === k))
    .filter((i): i is TransferItem => !!i);
  return {
    left: list.filter((i) => !keySet.has(i.key)),
    right,
  };
}

/** 保留可用（未禁用）项 */
export function enabledItems(list: TransferItem[]): TransferItem[] {
  return list.filter((i) => i.disabled !== true);
}

/** 按关键字过滤（标题/描述忽略大小写包含） */
export function filterByKeyword(
  list: TransferItem[],
  keyword: string,
): TransferItem[] {
  const k = keyword.trim().toLowerCase();
  if (!k) return list;
  return list.filter(
    (i) =>
      i.title.toLowerCase().includes(k) ||
      (i.description ?? '').toLowerCase().includes(k),
  );
}

/** 追加 key 到末尾（去重） */
export function appendKeys(
  targetKeys: TransferKey[],
  moving: TransferKey[],
): TransferKey[] {
  const set = new Set(targetKeys);
  const add = moving.filter((k) => !set.has(k));
  return [...targetKeys, ...add];
}

/** 移除 key */
export function removeKeys(
  targetKeys: TransferKey[],
  moving: TransferKey[],
): TransferKey[] {
  const set = new Set(moving);
  return targetKeys.filter((k) => !set.has(k));
}

/** useTransfer 返回值 */
export interface UseTransferReturn {
  /** 左侧数据（按 dataSource 顺序） */
  leftList: ComputedRef<TransferItem[]>;
  /** 右侧数据（按 targetKeys 顺序） */
  rightList: ComputedRef<TransferItem[]>;
  /** 左侧过滤展示 */
  filteredLeft: ComputedRef<TransferItem[]>;
  /** 右侧过滤展示 */
  filteredRight: ComputedRef<TransferItem[]>;
  /** 左/右选中 key */
  leftChecked: Ref<TransferKey[]>;
  rightChecked: Ref<TransferKey[]>;
  /** 左/右搜索词 */
  leftSearch: Ref<string>;
  rightSearch: Ref<string>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 全选态 */
  isLeftAll: ComputedRef<boolean>;
  isLeftIndeterminate: ComputedRef<boolean>;
  isRightAll: ComputedRef<boolean>;
  isRightIndeterminate: ComputedRef<boolean>;
  /** 是否可执行移动 */
  canMoveRight: ComputedRef<boolean>;
  canMoveLeft: ComputedRef<boolean>;
  /** 是否选中某 key */
  isChecked: (side: TransferDirection, key: TransferKey) => boolean;
  /** 切换勾选 */
  toggleItem: (side: TransferDirection, key: TransferKey) => void;
  /** 切换全选 */
  toggleAll: (side: TransferDirection) => void;
  /** 向右移动（可指定 keys；缺省用左侧勾选） */
  moveRight: (keys?: TransferKey[]) => void;
  /** 向左移动（可指定 keys；缺省用右侧勾选） */
  moveLeft: (keys?: TransferKey[]) => void;
}

/**
 * QTransfer 组件核心逻辑：左右拆分 / 勾选 / 全选 / 移动。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useTransfer = (
  props: TransferProps,
  emit: TransferEmits,
): UseTransferReturn => {
  const isDisabled = computed(() => props.disabled === true);
  const targetKeys = computed(() => props.modelValue ?? []);

  const leftList = computed<TransferItem[]>(
    () => splitDataSource(props.dataSource, targetKeys.value).left,
  );
  const rightList = computed<TransferItem[]>(
    () => splitDataSource(props.dataSource, targetKeys.value).right,
  );

  const leftChecked = ref<TransferKey[]>([]);
  const rightChecked = ref<TransferKey[]>([]);
  const leftSearch = ref('');
  const rightSearch = ref('');

  const filteredLeft = computed<TransferItem[]>(() =>
    filterByKeyword(leftList.value, leftSearch.value),
  );
  const filteredRight = computed<TransferItem[]>(() =>
    filterByKeyword(rightList.value, rightSearch.value),
  );

  /** 某侧可勾选 key */
  const enabledKeysOf = (side: TransferDirection): TransferKey[] =>
    enabledItems(side === 'left' ? leftList.value : rightList.value).map(
      (i) => i.key,
    );

  const checkedOf = (side: TransferDirection) =>
    side === 'left' ? leftChecked : rightChecked;

  const isChecked = (side: TransferDirection, key: TransferKey) =>
    checkedOf(side).value.includes(key);

  /** 清理已不在本侧/被禁用的勾选 */
  function prune() {
    const lk = new Set(enabledKeysOf('left'));
    leftChecked.value = leftChecked.value.filter((k) => lk.has(k));
    const rk = new Set(enabledKeysOf('right'));
    rightChecked.value = rightChecked.value.filter((k) => rk.has(k));
  }

  watch([() => props.dataSource, targetKeys], prune, { immediate: true });

  function toggleItem(side: TransferDirection, key: TransferKey) {
    if (isDisabled.value) return;
    const list = side === 'left' ? leftList.value : rightList.value;
    const item = list.find((i) => i.key === key);
    if (!item || item.disabled) return;
    const cur = checkedOf(side);
    const set = new Set(cur.value);
    if (set.has(key)) set.delete(key);
    else set.add(key);
    cur.value = [...set];
  }

  function toggleAll(side: TransferDirection) {
    if (isDisabled.value) return;
    const cur = checkedOf(side);
    const keys = enabledKeysOf(side);
    const all = keys.every((k) => cur.value.includes(k));
    cur.value = all ? [] : [...keys];
  }

  const isLeftAll = computed(
    () =>
      enabledKeysOf('left').length > 0 &&
      enabledKeysOf('left').every((k) => leftChecked.value.includes(k)),
  );
  const isLeftIndeterminate = computed(
    () => leftChecked.value.length > 0 && !isLeftAll.value,
  );
  const isRightAll = computed(
    () =>
      enabledKeysOf('right').length > 0 &&
      enabledKeysOf('right').every((k) => rightChecked.value.includes(k)),
  );
  const isRightIndeterminate = computed(
    () => rightChecked.value.length > 0 && !isRightAll.value,
  );

  const canMoveRight = computed(
    () => !isDisabled.value && leftChecked.value.length > 0,
  );
  const canMoveLeft = computed(
    () =>
      !isDisabled.value &&
      props.oneWay !== true &&
      rightChecked.value.length > 0,
  );

  /** 校验待移动 keys 仍在本侧且未禁用 */
  function sanitize(
    side: TransferDirection,
    keys: TransferKey[] | undefined,
  ): TransferKey[] {
    const list = side === 'left' ? leftList.value : rightList.value;
    const avail = new Set(enabledItems(list).map((i) => i.key));
    return (keys ?? checkedOf(side).value).filter((k) => avail.has(k));
  }

  function moveRight(keys?: TransferKey[]) {
    if (isDisabled.value) return;
    const moving = sanitize('left', keys);
    if (!moving.length) return;
    const next = appendKeys(targetKeys.value, moving);
    emit('update:modelValue', next);
    emit('change', next, 'right', [...moving]);
    leftChecked.value = [];
  }

  function moveLeft(keys?: TransferKey[]) {
    if (isDisabled.value || props.oneWay === true) return;
    const moving = sanitize('right', keys);
    if (!moving.length) return;
    const next = removeKeys(targetKeys.value, moving);
    emit('update:modelValue', next);
    emit('change', next, 'left', [...moving]);
    rightChecked.value = [];
  }

  return {
    leftList,
    rightList,
    filteredLeft,
    filteredRight,
    leftChecked,
    rightChecked,
    leftSearch,
    rightSearch,
    isDisabled,
    isLeftAll,
    isLeftIndeterminate,
    isRightAll,
    isRightIndeterminate,
    canMoveRight,
    canMoveLeft,
    isChecked,
    toggleItem,
    toggleAll,
    moveRight,
    moveLeft,
  };
};
