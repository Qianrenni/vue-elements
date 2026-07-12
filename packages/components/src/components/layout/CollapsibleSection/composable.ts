import { computed, ref, type ComputedRef, type Ref } from 'vue';
import type { CollapsibleSectionProps } from './type';

/**
 * CollapsibleSection 组件核心逻辑
 * @param props 组件 Props
 * @returns isExpanded、toggle、close、open、transitionName
 */
export const useCollapsibleSection = (
  props: CollapsibleSectionProps,
): {
  isExpanded: Ref<boolean>;
  toggle: () => void;
  close: () => void;
  open: () => void;
  transitionName: ComputedRef<string>;
} => {
  /** 控制展开/收起状态 */
  const isExpanded = ref(props.initialExpanded ?? true);

  /** 切换展开/收起 */
  const toggle = (): void => {
    isExpanded.value = !isExpanded.value;
  };

  /** 收起 */
  const close = (): void => {
    isExpanded.value = false;
  };

  /** 展开 */
  const open = (): void => {
    isExpanded.value = true;
  };

  /** 根据方向计算过渡动画名称 */
  const transitionName = computed(() => {
    const map: Record<string, string> = {
      up: 'slide-up',
      down: 'slide-down',
      left: 'slide-left',
      right: 'slide-right',
    };
    return map[props.direction ?? 'down'];
  });

  return { isExpanded, toggle, close, open, transitionName };
};
