// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QTreeNode from '../TreeNode.vue';
import type { TreeNodeData } from '../type';

/**
 * QTreeNode 快照测试：节点内嵌 QIcon（无子节点显示 File），需 stub fetch 后等待渲染。
 */
const svgResponse = (): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: { get: () => 'image/svg+xml' },
    text: () => Promise.resolve('<svg viewBox="0 0 24 24"></svg>'),
  }) as unknown as Response;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('QTreeNode 快照测试', () => {
  it('叶子节点渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const node: TreeNodeData = { id: 1, label: '叶子节点', children: [] };
    const wrapper = mount(QTreeNode, { props: { node, level: 0 } });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('选中状态渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const node: TreeNodeData = {
      id: 2,
      label: '选中节点',
      selected: true,
      expanded: true,
      children: [{ id: 3, label: '子节点' }],
    };
    const wrapper = mount(QTreeNode, { props: { node, level: 0 } });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
