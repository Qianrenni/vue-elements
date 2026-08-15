// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QTreeNode from '../TreeNode.vue';

describe('QTreeNode 渲染', () => {
  it('应渲染节点标签', () => {
    const { getByText } = render(QTreeNode, {
      props: { node: { id: 1, label: '节点A' }, level: 0 },
    });
    expect(getByText('节点A')).toBeTruthy();
  });

  it('有 children 的节点应渲染展开图标（toggle 存在）', () => {
    const { container } = render(QTreeNode, {
      props: {
        node: {
          id: 1,
          label: '父',
          children: [{ id: 2, label: '子' }],
        },
        level: 0,
      },
    });
    expect(container.querySelector('.tree-node-toggle')).toBeTruthy();
  });

  it('expanded=true 且有 children 时应渲染子节点区域', () => {
    const { container } = render(QTreeNode, {
      props: {
        node: {
          id: 1,
          label: '父',
          expanded: true,
          children: [{ id: 2, label: '子' }],
        },
        level: 0,
      },
    });
    expect(container.querySelector('.tree-node-children')).toBeTruthy();
  });

  it('expanded=false 且有 children 时子节点区域应隐藏', () => {
    const { container } = render(QTreeNode, {
      props: {
        node: {
          id: 1,
          label: '父',
          expanded: false,
          children: [{ id: 2, label: '子' }],
        },
        level: 0,
      },
    });
    const children = container.querySelector<HTMLElement>(
      '.tree-node-children',
    );
    expect(children).toBeTruthy();
    expect(children!.style.display).toBe('none');
  });

  it('selected=true 应附加 tree-node-selected 类', () => {
    const { container } = render(QTreeNode, {
      props: {
        node: { id: 1, label: '选中', selected: true },
        level: 0,
      },
    });
    expect(container.querySelector('.tree-node-selected')).toBeTruthy();
  });

  it('disabled=true 应附加 mouse-cursor-disable 类', () => {
    const { container } = render(QTreeNode, {
      props: {
        node: { id: 1, label: '禁用', disabled: true },
        level: 0,
      },
    });
    expect(
      container.querySelector('.tree-node-content.mouse-cursor-disable'),
    ).toBeTruthy();
  });

  it('点击节点内容应触发 node-click', async () => {
    const { container, emitted } = render(QTreeNode, {
      props: { node: { id: 1, label: 'x' }, level: 0 },
    });
    (container.querySelector('.tree-node-content') as HTMLElement).click();
    await nextTick();
    expect(emitted('node-click')).toBeTruthy();
  });
});
