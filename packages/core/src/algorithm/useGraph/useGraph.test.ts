import { BFS, DFS } from '@/algorithm/useGraph/useGraph';
import { describe, expect, it } from 'vitest';

/** 创建一个简单的图：0-1-2-3 链式图 */
const createChainGraph = () => {
  const nodes = new Set([0, 1, 2, 3]);
  const edges: number[][] = [[1], [0, 2], [1, 3], [2]];
  return { nodes, edges };
};

/** 创建一个不相连的图：0-1 和 2-3 两个连通分量 */
const createDisconnectedGraph = () => {
  const nodes = new Set([0, 1, 2, 3]);
  const edges: number[][] = [[1], [0], [3], [2]];
  return { nodes, edges };
};

describe('BFS', () => {
  it('应该从起始节点 BFS 遍历链式图', () => {
    const { nodes, edges } = createChainGraph();
    const { dist, prev } = BFS(nodes, edges, 0);

    expect(dist).toEqual([0, 1, 2, 3]);
    expect(prev).toEqual([-1, 0, 1, 2]);
  });

  it('应该在 start=-1 时遍历所有连通分量', () => {
    const { nodes, edges } = createDisconnectedGraph();
    const { dist } = BFS(nodes, edges);

    expect(dist[0]).toBe(0);
    expect(dist[1]).toBe(1);
    expect(dist[2]).toBe(0);
    expect(dist[3]).toBe(1);
  });

  it('应该支持自定义权重函数', () => {
    const { nodes, edges } = createChainGraph();
    const { dist } = BFS(nodes, edges, 0, () => 2);

    expect(dist).toEqual([0, 2, 4, 6]);
  });
});

describe('DFS', () => {
  it('应该从起始节点 DFS 遍历链式图', () => {
    const { nodes, edges } = createChainGraph();
    const { dist, prev } = DFS(nodes, edges, 0);

    expect(dist[0]).toBe(0);
    expect(prev[0]).toBe(-1);
  });

  it('应该在 start=-1 时遍历所有连通分量', () => {
    const { nodes, edges } = createDisconnectedGraph();
    const { dist } = DFS(nodes, edges);

    expect(dist[0]).toBe(0);
    expect(dist[2]).toBe(0);
  });

  it('应该支持自定义权重函数', () => {
    const { nodes, edges } = createChainGraph();
    const { dist } = DFS(nodes, edges, 0, () => 3);

    expect(dist).toEqual([0, 3, 6, 9]);
  });
});
