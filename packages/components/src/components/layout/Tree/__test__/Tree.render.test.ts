// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QTree from '../Tree.vue';

const data = [
  {
    id: 1,
    label: '父节点',
    expanded: true,
    children: [
      { id: 2, label: '子节点1' },
      { id: 3, label: '子节点2' },
    ],
  },
  { id: 4, label: '独立节点' },
];

describe('QTree 渲染', () => {
  it('应渲染所有顶级节点标签', () => {
    const { getByText } = render(QTree, { props: { data } });
    expect(getByText('父节点')).toBeTruthy();
    expect(getByText('独立节点')).toBeTruthy();
  });

  it('expanded=true 的父节点应渲染子节点', () => {
    const { getByText } = render(QTree, { props: { data } });
    expect(getByText('子节点1')).toBeTruthy();
    expect(getByText('子节点2')).toBeTruthy();
  });

  it('expanded=false 的父节点子节点应隐藏', () => {
    const { container } = render(QTree, {
      props: {
        data: [
          {
            id: 1,
            label: '父',
            expanded: false,
            children: [{ id: 2, label: '子' }],
          },
        ],
      },
    });
    const children = container.querySelector<HTMLElement>(
      '.tree-node-children',
    );
    expect(children).toBeTruthy();
    expect(children!.style.display).toBe('none');
  });

  it('selected=true 的节点应附加 tree-node-selected 类', () => {
    const { container } = render(QTree, {
      props: {
        data: [{ id: 1, label: '选中节点', selected: true }],
      },
    });
    expect(container.querySelector('.tree-node-selected')).toBeTruthy();
  });

  it('disabled=true 的节点应附加 mouse-cursor-disable 类', () => {
    const { container } = render(QTree, {
      props: {
        data: [{ id: 1, label: '禁用节点', disabled: true }],
      },
    });
    expect(
      container.querySelector('.tree-node-content.mouse-cursor-disable'),
    ).toBeTruthy();
  });

  it('点击节点应触发 node-click 事件', async () => {
    const { container, emitted } = render(QTree, {
      props: { data: [{ id: 1, label: '点击我' }] },
    });
    (container.querySelector('.tree-node-content') as HTMLElement).click();
    await nextTick();
    expect(emitted('node-click')).toBeTruthy();
  });
});
