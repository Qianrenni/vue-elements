import { computed, ref, watch } from 'vue';
import type { ComputedRef } from 'vue';

import type { MenuClickInfo, MenuEmits, MenuItem, MenuProps } from './type';

/** useMenu 返回值接口 */
export interface UseMenuReturn {
  /** 是否受控选中 */
  selectedControlled: ComputedRef<boolean>;
  /** 当前选中 key 集合（受控优先） */
  selectedKeys: ComputedRef<string[]>;
  /** 当前展开 key 集合（受控优先） */
  openKeys: ComputedRef<string[]>;
  /** 子菜单是否展开 */
  isOpen: (key: string) => boolean;
  /** 子菜单是否含某 key */
  hasOpenKey: (key: string) => boolean;
  /** 点击菜单项 */
  handleItemClick: (item: MenuItem, ancestors?: MenuItem[]) => void;
  /** 点击/悬停子菜单标题（切换展开） */
  handleSubmenuTrigger: (
    item: MenuItem,
    force?: boolean,
    ancestors?: MenuItem[],
  ) => void;
}

/**
 * QMenu 组件核心逻辑：受控/非受控选中与展开状态。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与事件处理器
 */
export const useMenu = (props: MenuProps, emit: MenuEmits): UseMenuReturn => {
  /** 是否受控选中（selectedKeys 传入即为受控） */
  const selectedControlled = computed(() => props.selectedKeys !== undefined);

  /** 是否受控展开 */
  const openControlled = computed(() => props.openKeys !== undefined);

  /** 内部选中（非受控时兜底） */
  const innerSelected = ref<string[]>([]);
  /** 内部展开（非受控时兜底） */
  const innerOpen = ref<string[]>([]);

  /** 同步受控值到内部（保证鼠标悬停等内部操作有依据） */
  watch(
    () => props.selectedKeys,
    (v) => {
      if (v !== undefined) innerSelected.value = v;
    },
    { immediate: true },
  );
  watch(
    () => props.openKeys,
    (v) => {
      if (v !== undefined) innerOpen.value = v;
    },
    { immediate: true },
  );

  /** 当前选中集合 */
  const selectedKeys = computed<string[]>(() =>
    selectedControlled.value ? (props.selectedKeys ?? []) : innerSelected.value,
  );

  /** 当前展开集合 */
  const openKeys = computed<string[]>(() =>
    openControlled.value ? (props.openKeys ?? []) : innerOpen.value,
  );

  /** 选中项 key 的 Set（快速判定） */
  const selectedSet = computed(() => new Set(selectedKeys.value));

  /** 展开项 key 的 Set */
  const openSet = computed(() => new Set(openKeys.value));

  /** 子菜单是否展开 */
  const isOpen = (key: string): boolean => openSet.value.has(key);

  /** 子菜单是否含某 key（与 isOpen 同义，保留便于模板语义） */
  const hasOpenKey = (key: string): boolean => isOpen(key);

  /** 写入选中集合并派发 */
  function commitSelected(next: string[]) {
    if (!selectedControlled.value) innerSelected.value = next;
    emit('update:selectedKeys', next);
  }

  /** 写入展开集合并派发 */
  function commitOpen(next: string[]) {
    if (!openControlled.value) innerOpen.value = next;
    emit('update:openKeys', next);
    emit('openChange', next);
  }

  /** 计算点击项（含父级）的 keyPath */
  function resolveKeyPath(item: MenuItem, ancestors: MenuItem[]): string[] {
    return [...ancestors.map((a) => a.key), item.key];
  }

  /** 点击叶子菜单项：单选/多选更新 + click 事件 */
  function handleItemClick(item: MenuItem, ancestors: MenuItem[] = []) {
    if (props.disabled || item.disabled) return;

    const next = props.multiple
      ? selectedSet.value.has(item.key)
        ? selectedKeys.value.filter((k) => k !== item.key)
        : [...selectedKeys.value, item.key]
      : [item.key];

    commitSelected(next);

    const info: MenuClickInfo = {
      key: item.key,
      keyPath: resolveKeyPath(item, ancestors),
    };
    emit('click', info);
  }

  /** 触发（悬停/点击）子菜单：切换或指定展开状态 */
  function handleSubmenuTrigger(
    item: MenuItem,
    force?: boolean,
    ancestors: MenuItem[] = [],
  ) {
    if (props.disabled || item.disabled) return;

    const currently = openSet.value.has(item.key);
    const willOpen = force !== undefined ? force : !currently;
    const nextSet = new Set(openKeys.value);
    if (willOpen) {
      nextSet.add(item.key);
    } else {
      nextSet.delete(item.key);
    }
    commitOpen([...nextSet]);

    // 展开子菜单时，父级 keyPath 一并作为点击信息派发（不含选中）
    if (willOpen && ancestors.length > 0) {
      emit('click', {
        key: item.key,
        keyPath: resolveKeyPath(item, ancestors),
      });
    }
  }

  return {
    selectedControlled,
    selectedKeys,
    openKeys,
    isOpen,
    hasOpenKey,
    handleItemClick,
    handleSubmenuTrigger,
  };
};
