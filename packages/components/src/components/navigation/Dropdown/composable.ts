import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { DropdownEmits, DropdownItem, DropdownProps } from './type';

/** useDropdown 返回值接口 */
export interface UseDropdownReturn {
  /** 是否受控（open 传入即为受控） */
  isControlled: ComputedRef<boolean>;
  /** 是否展开（受控优先） */
  isOpen: Ref<boolean>;
  /** 展开方向（top / bottom） */
  verticalSide: ComputedRef<'top' | 'bottom'>;
  /** 水平对齐（left / right） */
  horizontalAlign: ComputedRef<'left' | 'right'>;
  /** 点击项处理 */
  handleSelect: (item: DropdownItem) => void;
  /** 切换展开 */
  toggle: () => void;
  /** 打开 */
  openMenu: () => void;
  /** 关闭 */
  closeMenu: () => void;
}

/**
 * QDropdown 组件核心逻辑：受控/非受控展开 + 菜单项选择。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useDropdown = (
  props: DropdownProps,
  emit: DropdownEmits,
): UseDropdownReturn => {
  /** 是否受控 */
  const isControlled = computed(() => props.open !== undefined);

  /** 内部展开（非受控兜底） */
  const innerOpen = ref(false);

  /** 是否展开 */
  const isOpen = ref(false);

  watch(
    () => props.open,
    (v) => {
      if (v !== undefined) {
        innerOpen.value = v;
        isOpen.value = v;
      }
    },
    { immediate: true },
  );

  /** 展开方向 */
  const verticalSide = computed<'top' | 'bottom'>(() =>
    props.placement?.startsWith('top') ? 'top' : 'bottom',
  );

  /** 水平对齐 */
  const horizontalAlign = computed<'left' | 'right'>(() =>
    props.placement?.endsWith('Right') ? 'right' : 'left',
  );

  /** 写入展开状态并同步（受控时仍 emit） */
  function commitOpen(open: boolean) {
    isOpen.value = open;
    if (!isControlled.value) innerOpen.value = open;
    emit('update:open', open);
  }

  /** 切换展开 */
  function toggle() {
    if (props.disabled) return;
    commitOpen(!isOpen.value);
  }

  /** 打开（悬停进入） */
  function openMenu() {
    if (props.disabled) return;
    if (!isOpen.value) commitOpen(true);
  }

  /** 关闭（悬停离开 / 外点） */
  function closeMenu() {
    if (isOpen.value) commitOpen(false);
  }

  /** 点击菜单项：选中 + 自动关闭 */
  function handleSelect(item: DropdownItem) {
    if (props.disabled || item.disabled) return;
    emit('select', item);
    closeMenu();
  }

  return {
    isControlled,
    isOpen,
    verticalSide,
    horizontalAlign,
    handleSelect,
    toggle,
    openMenu,
    closeMenu,
  };
};
