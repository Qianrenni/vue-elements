import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

import type { TreeNodeData } from '../../Tree/type';
import { useTreeNode } from '../composable';
import type { TreeNodeEmits, TreeNodeProps } from '../type';

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param node 节点数据
 * @returns props 与 emit 模拟函数
 */
const createTreeNode = (
  node: TreeNodeData,
): { props: TreeNodeProps; emit: ReturnType<typeof vi.fn> } => {
  const props = reactive<TreeNodeProps>({ node, level: 0 });
  return { props, emit: vi.fn() };
};

describe('useTreeNode', () => {
  it('应该正确判断是否存在子节点', () => {
    const { props: withChildren, emit: emitA } = createTreeNode({
      id: 1,
      label: '父节点',
      children: [{ id: 11, label: '子节点' }],
    });
    const { hasChildren } = useTreeNode(withChildren, emitA as TreeNodeEmits);
    expect(hasChildren.value).toBe(true);

    const { props: leaf, emit: emitB } = createTreeNode({
      id: 2,
      label: '叶子节点',
      children: [],
    });
    const { hasChildren: leafHasChildren } = useTreeNode(
      leaf,
      emitB as TreeNodeEmits,
    );
    expect(leafHasChildren.value).toBe(false);
  });

  it('应该在点击叶子节点时仅触发 node-click 事件', () => {
    const { props, emit } = createTreeNode({ id: 1, label: '叶子节点' });
    const { handleNodeClick } = useTreeNode(props, emit as TreeNodeEmits);

    handleNodeClick();

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith('node-click', props.node);
  });

  it('应该在点击含子节点的节点时同时触发 node-toggle 事件', () => {
    const { props, emit } = createTreeNode({
      id: 1,
      label: '父节点',
      children: [{ id: 11, label: '子节点' }],
    });
    const { handleNodeClick } = useTreeNode(props, emit as TreeNodeEmits);

    handleNodeClick();

    expect(emit).toHaveBeenCalledWith('node-click', props.node);
    expect(emit).toHaveBeenCalledWith('node-toggle', props.node);
  });

  it('应该在节点禁用时忽略点击与切换', () => {
    const { props, emit } = createTreeNode({
      id: 1,
      label: '禁用节点',
      disabled: true,
    });
    const { handleNodeClick, handleToggle } = useTreeNode(
      props,
      emit as TreeNodeEmits,
    );

    handleNodeClick();
    handleToggle();

    expect(emit).not.toHaveBeenCalled();
  });

  it('应该转发子节点的点击与切换事件', () => {
    const { props, emit } = createTreeNode({ id: 1, label: '父节点' });
    const { handleChildNodeClick, handleChildNodeToggle } = useTreeNode(
      props,
      emit as TreeNodeEmits,
    );

    const child: TreeNodeData = { id: 11, label: '子节点' };
    handleChildNodeClick(child);
    handleChildNodeToggle(child);

    expect(emit).toHaveBeenCalledWith('node-click', child);
    expect(emit).toHaveBeenCalledWith('node-toggle', child);
  });
});
