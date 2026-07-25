import { describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

import { useTree } from '../composable';
import type { TreeEmits, TreeNodeData, TreeProps } from '../type';

/**
 * 创建测试用的树形数据
 * @returns 两层结构的节点数组
 */
const createTreeData = (): TreeNodeData[] => [
  {
    id: 1,
    label: '节点一',
    selected: false,
    children: [
      { id: 11, label: '子节点一', selected: false },
      { id: 12, label: '子节点二', selected: false },
    ],
  },
  { id: 2, label: '节点二', selected: true },
];

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @returns props 与 emit 模拟函数
 */
const createTree = (): { props: TreeProps; emit: ReturnType<typeof vi.fn> } => {
  const props = reactive<TreeProps>({ data: createTreeData() });
  return { props, emit: vi.fn() };
};

describe('useTree', () => {
  it('应该在点击节点时选中该节点并触发 node-click 事件', () => {
    const { props, emit } = createTree();
    const { handleNodeClick } = useTree(props, emit as TreeEmits);

    handleNodeClick(props.data[0]);

    expect(props.data[0].selected).toBe(true);
    expect(emit).toHaveBeenCalledWith('node-click', props.data[0]);
  });

  it('应该在选中新节点时取消其他节点的选中状态', () => {
    const { props, emit } = createTree();
    const { handleNodeClick } = useTree(props, emit as TreeEmits);

    handleNodeClick(props.data[0]);

    expect(props.data[1].selected).toBe(false);
  });

  it('应该支持递归选中深层子节点', () => {
    const { props, emit } = createTree();
    const { handleNodeClick } = useTree(props, emit as TreeEmits);

    const child = props.data[0].children![1];
    handleNodeClick(child);

    expect(child.selected).toBe(true);
    expect(props.data[0].selected).toBe(false);
    expect(props.data[0].children![0].selected).toBe(false);
    expect(emit).toHaveBeenCalledWith('node-click', child);
  });

  it('应该在切换节点时翻转其展开状态', () => {
    const { props, emit } = createTree();
    const { handleNodeToggle } = useTree(props, emit as TreeEmits);

    handleNodeToggle(props.data[0]);
    expect(props.data[0].expanded).toBe(true);

    handleNodeToggle(props.data[0]);
    expect(props.data[0].expanded).toBe(false);
  });
});
