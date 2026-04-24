/**
 * BFS (Breadth-First Search) - 广度优先搜索
 * @param nodes 节点集合,默认强连通图
 * @param edges 边集合
 * @param start 起始节点,默认为-1
 * @param weightFunc 边的权重函数，默认权重为1
 * @returns
 */
export function BFS(
  nodes: Set<number>,
  edges: number[][],
  start: number = -1,
  weightFunc: (u: number, v: number) => number = () => 1
) {
  const queue: number[] = [];
  const [WHITE, GRAY, BLACK] = [0, 1, 2];
  const colors: number[] = Array.from({ length: nodes.size }, () => WHITE);
  const dist = Array.from({ length: nodes.size }, () => Infinity);
  const prev = Array.from({ length: nodes.size }, () => -1);
  const helper = (start: number) => {
    colors[start] = GRAY;
    dist[start] = 0;
    queue.push(start);
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (const v of edges[u]) {
        if (colors[v] === WHITE) {
          colors[v] = GRAY;
          dist[v] = dist[u] + weightFunc(u, v);
          prev[v] = u;
          queue.push(v);
        }
      }
      colors[u] = BLACK;
    }
  };
  if (start === -1) {
    for (const start of nodes) {
      if (colors[start] === WHITE) {
        helper(start);
      }
    }
  } else {
    helper(start);
  }
  return { dist, prev };
}

/**
 * DFS (Depth-First Search) - 深度优先搜索
 * @param nodes 节点集合
 * @param edges 边集合
 * @param start 起始节点,默认为-1
 * @param weightFunc 边的权重函数，默认权重为1
 * @returns
 */
export function DFS(
  nodes: Set<number>,
  edges: number[][],
  start: number = -1,
  weightFunc: (u: number, v: number) => number = () => 1
) {
  const stack: number[] = [];
  const [WHITE, GRAY, BLACK] = [0, 1, 2];
  const colors: number[] = Array.from({ length: nodes.size }, () => WHITE);
  const dist = Array.from({ length: nodes.size }, () => Infinity);
  const prev = Array.from({ length: nodes.size }, () => -1);
  const helper = (start: number) => {
    colors[start] = GRAY;
    dist[start] = 0;
    stack.push(start);
    while (stack.length > 0) {
      const u = stack.pop()!;
      for (const v of edges[u]) {
        if (colors[v] === WHITE) {
          colors[v] = GRAY;
          dist[v] = dist[u] + weightFunc(u, v);
          prev[v] = u;
          stack.push(v);
        }
      }
      colors[u] = BLACK;
    }
  };
  if (start === -1) {
    for (const start of nodes) {
      if (colors[start] === WHITE) {
        helper(start);
      }
    }
  } else {
    helper(start);
  }
  return { dist, prev };
}
