import type { TreeNodeData } from '../Tree/type';

/**
 * TreeNode 组件 Props
 */
export interface TreeNodeProps {
  /** 树节点数据 */
  node: TreeNodeData;
  /** 节点层级 */
  level: number;
}

/**
 * TreeNode 组件 Emits
 */
export interface TreeNodeEmits {
  (e: 'node-click', node: TreeNodeData): void;
  (e: 'node-toggle', node: TreeNodeData): void;
}
