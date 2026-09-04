import { describe, expect, it } from 'vitest';

import { useTreeSelect } from '../composable';
import type { TreeSelectEmits, TreeSelectProps } from '../type';

const items = [
  {
    value: 'parent1',
    label: '父级 1',
    children: [
      { value: 'child1-1', label: '子级 1-1' },
      { value: 'child1-2', label: '子级 1-2' },
    ],
  },
  { value: 'leaf', label: '叶子' },
];

const noopEmit: TreeSelectEmits = () => undefined;

function propsOf(overrides: Partial<TreeSelectProps> = {}): TreeSelectProps {
  return { items, expandAll: true, ...overrides };
}

describe('useTreeSelect', () => {
  it('展平含深度', () => {
    const { flat } = useTreeSelect(propsOf(), noopEmit);
    expect(flat.value).toHaveLength(4);
    const parent = flat.value.find((n) => n.value === 'parent1');
    const child = flat.value.find((n) => n.value === 'child1-1');
    expect(parent?.depth).toBe(0);
    expect(child?.depth).toBe(1);
    expect(child?.pathLabel).toEqual(['父级 1', '子级 1-1']);
  });

  it('expandAll=true 时默认展开父级', () => {
    const { isExpanded } = useTreeSelect(propsOf(), noopEmit);
    expect(isExpanded('parent1')).toBe(true);
  });

  it('expandAll=false 不展开', () => {
    const { isExpanded } = useTreeSelect(
      propsOf({ expandAll: false }),
      noopEmit,
    );
    expect(isExpanded('parent1')).toBe(false);
  });

  it('visibleFlat 随展开态过滤', () => {
    const { visibleFlat, toggleExpand } = useTreeSelect(propsOf(), noopEmit);
    expect(visibleFlat.value.map((n) => n.value)).toEqual([
      'parent1',
      'child1-1',
      'child1-2',
      'leaf',
    ]);
    toggleExpand('parent1');
    expect(visibleFlat.value.map((n) => n.value)).toEqual(['parent1', 'leaf']);
  });

  it('选中节点派发', () => {
    const events: unknown[][] = [];
    const emit: TreeSelectEmits = (e, ...args) => events.push([e, ...args]);
    const { selectNode } = useTreeSelect(propsOf(), emit);
    selectNode('child1-2');
    expect(events[0]).toEqual(['update:modelValue', 'child1-2']);
    expect(events[2]?.[0]).toBe('select');
  });

  it('禁用节点不可选', () => {
    const events: unknown[] = [];
    const emit: TreeSelectEmits = (e) => events.push(e);
    const disabledItems = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', selectable: false },
    ];
    const { selectNode } = useTreeSelect(
      propsOf({ items: disabledItems }),
      emit,
    );
    selectNode('a');
    selectNode('b');
    expect(events).toEqual([]);
  });

  it('selectedItem 解析', () => {
    const { selectedItem } = useTreeSelect(
      propsOf({ modelValue: 'child1-1' }),
      noopEmit,
    );
    expect(selectedItem.value?.label).toBe('子级 1-1');
  });
});
