export interface TreeNodeData {
  id: string | number;
  label: string;
  children?: TreeNodeData[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

/**
 * Tree 组件 Props
 */
export interface TreeProps {
  /** 树节点数据 */
  data: TreeNodeData[];
}

/**
 * Tree 组件 Emits
 */
export interface TreeEmits {
  (event: 'node-click', node: TreeNodeData): void;
}
