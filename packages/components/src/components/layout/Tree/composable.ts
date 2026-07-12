import type { TreeNodeData, TreeProps, TreeEmits } from './type';

/**
 * Tree 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns handleNodeClick、handleNodeToggle
 */
export const useTree = (
  props: TreeProps,
  emit: TreeEmits,
): {
  handleNodeClick: (node: TreeNodeData) => void;
  handleNodeToggle: (node: TreeNodeData) => void;
} => {
  /**
   * 递归选择节点
   */
  const traverseAndSelect = (
    currentNode: TreeNodeData,
    targetId: string | number,
  ): void => {
    if (currentNode.id === targetId) {
      currentNode.selected = true;
      emit('node-click', currentNode);
    } else {
      currentNode.selected = false;
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        traverseAndSelect(child, targetId);
      }
    }
  };

  /** 处理节点点击 */
  const handleNodeClick = (node: TreeNodeData): void => {
    // 选择节点逻辑
    props.data.forEach((n) => traverseAndSelect(n, node.id));
  };

  /** 处理节点展开/收起 */
  const handleNodeToggle = (node: TreeNodeData): void => {
    node.expanded = !node.expanded;
  };

  return { handleNodeClick, handleNodeToggle };
};
