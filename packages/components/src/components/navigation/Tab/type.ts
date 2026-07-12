/**
 * Tab 组件 Props
 */
export interface TabProps {
  /** 标签列表 */
  list: string[];
  /** 激活项的 class 名称，默认 'active' */
  activeClass?: string;
}

/**
 * Tab 组件 Emits
 */
export interface TabEmits {
  (e: 'select', index: number): void;
}
