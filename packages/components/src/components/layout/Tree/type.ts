import type { TreeNodeData } from '@/types';

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
