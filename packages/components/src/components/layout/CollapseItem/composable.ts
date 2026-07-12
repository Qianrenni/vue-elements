import { computed, inject, type ComputedRef } from 'vue';
import type { CollapseItemProps } from './type';
import type { CollapseContext } from '../Collapse/type';

/** 默认的 CollapseContext（兜底值） */
const defaultCollapseContext: CollapseContext = {
  activeNames: { value: [] } as unknown as CollapseContext['activeNames'],
  handleItemClick: () => {},
};

/**
 * CollapseItem 组件核心逻辑
 * @param props 组件 Props
 * @returns isActive 当前项是否激活
 */
export const useCollapseItem = (
  props: CollapseItemProps,
): {
  isActive: ComputedRef<boolean>;
  handleClick: () => void;
} => {
  /** 注入父组件 Collapse 提供的上下文 */
  const collapse = inject<CollapseContext>('collapse', defaultCollapseContext);

  /** 判断当前项是否激活 */
  const isActive = computed(() => {
    return collapse.activeNames.value.includes(props.name);
  });

  /** 处理点击事件 */
  const handleClick = () => {
    if (props.disabled) return;
    collapse.handleItemClick(props.name);
  };

  return { isActive, handleClick };
};
