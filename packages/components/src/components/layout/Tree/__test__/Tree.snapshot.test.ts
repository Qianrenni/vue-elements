// @vitest-environment jsdom
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import QTree from '../Tree.vue';
import type { TreeNodeData } from '../type';

/**
 * QTree 快照测试：树节点内嵌 QIcon（Folder/File），需 stub fetch 后等待图标渲染。
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

describe('QTree 快照测试', () => {
  it('含展开子节点的树渲染', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(svgResponse()));
    const data: TreeNodeData[] = [
      {
        id: 1,
        label: '根节点',
        expanded: true,
        children: [{ id: 2, label: '子节点' }],
      },
      { id: 3, label: '独立节点' },
    ];
    const wrapper = mount(QTree, { props: { data } });
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
