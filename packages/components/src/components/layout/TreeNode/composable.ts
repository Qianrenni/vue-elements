import { computed, type ComputedRef } from 'vue';
import type { TreeNodeData } from '../Tree/type';
import type { TreeNodeProps, TreeNodeEmits } from './type';

/**
 * TreeNode 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns hasChildren、handleNodeClick、handleToggle
 */
export const useTreeNode = (
  props: TreeNodeProps,
  emit: TreeNodeEmits,
): {
  hasChildren: ComputedRef<boolean>;
  handleNodeClick: () => void;
  handleToggle: () => void;
  handleChildNodeClick: (node: TreeNodeData) => void;
  handleChildNodeToggle: (node: TreeNodeData) => void;
} => {
  /** 判断是否有子节点 */
  const hasChildren = computed(() => {
    return !!(props.node.children && props.node.children.length > 0);
  });

  /** 处理节点点击 */
  const handleNodeClick = (): void => {
    if (props.node.disabled) return;
    emit('node-click', props.node);
    if (hasChildren.value) {
      handleToggle();
    }
  };

  /** 处理切换展开/收起 */
  const handleToggle = (): void => {
    if (props.node.disabled) return;
    emit('node-toggle', props.node);
  };

  /** 处理子节点点击（事件冒泡转发） */
  const handleChildNodeClick = (node: TreeNodeData): void => {
    emit('node-click', node);
  };

  /** 处理子节点切换（事件冒泡转发） */
  const handleChildNodeToggle = (node: TreeNodeData): void => {
    emit('node-toggle', node);
  };

  return {
    hasChildren,
    handleNodeClick,
    handleToggle,
    handleChildNodeClick,
    handleChildNodeToggle,
  };
};
