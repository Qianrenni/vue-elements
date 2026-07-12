import type { Ref } from 'vue';

/**
 * Collapse 组件 Props
 */
export interface CollapseProps {
  /** 当前激活的面板名称 */
  modelValue?: string | string[];
  /** 是否手风琴模式 */
  accordion?: boolean;
}

/**
 * Collapse 组件 Emits
 */
export interface CollapseEmits {
  (e: 'update:modelValue', value: string | string[]): void;
}

/**
 * Collapse 注入上下文类型（供 CollapseItem 使用）
 */
export interface CollapseContext {
  activeNames: Ref<string[]>;
  handleItemClick: (name: string) => void;
}
