# @qianrenni/core

## Purpose

`@qianrenni/core` 提供仅依赖 Node 通用环境的数据结构、算法、业务工具和通用类型，不依赖 Vue、DOM、浏览器存储或 `qyani-components`。所有 API 均从包根路径导出。

## Usage

```ts
import { deepMerge, useDebounce, UseHeap } from '@qianrenni/core';

const heap = new UseHeap<number>();
heap.add(2);
const settings = deepMerge({ enabled: true }, { enabled: false });
const debounced = useDebounce(() => console.log(settings.enabled), 100);
```

## Tests

纯函数和无框架实现的单元测试归属 `packages/core/src`，使用 `pnpm run --filter @qianrenni/core test` 在 Node 环境运行；依赖 Vue、DOM 或浏览器能力的工具测试继续归属 `qyani-components`。

## API

### Types

| API                  | Purpose                                  | Parameters      | Returns        | Throws |
| -------------------- | ---------------------------------------- | --------------- | -------------- | ------ |
| `DeepPartial<T>`     | 将对象及嵌套对象属性递归变为可选。       | `T`：原始类型。 | 转换后的类型。 | None   |
| `DeepReadonly<T>`    | 将对象及嵌套对象属性递归设为只读。       | `T`：原始类型。 | 转换后的类型。 | None   |
| `DeepNonNullable<T>` | 将对象及嵌套对象属性递归设为非空且必填。 | `T`：原始类型。 | 转换后的类型。 | None   |
| `DeepRequired<T>`    | 将对象及嵌套对象属性递归设为必填。       | `T`：原始类型。 | 转换后的类型。 | None   |
| `DeepMutable<T>`     | 将对象及嵌套对象属性递归移除只读修饰。   | `T`：原始类型。 | 转换后的类型。 | None   |

### Algorithms

| API                                                                                  | Purpose                                      | Parameters                                             | Returns                                | Throws |
| ------------------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------ | -------------------------------------- | ------ |
| `binarySearchLeft<T>`                                                                | 查找有序数组中目标值的最左索引。             | `array`、`target`、`func(a,b)` 比较器。                | `number`，未找到为 `-1`。              | None   |
| `binarySearchRight<T>`                                                               | 查找有序数组中目标值的最右索引。             | `array`、`target`、`func(a,b)` 比较器。                | `number`，未找到为 `-1`。              | None   |
| `BFS` / `DFS`                                                                        | 在整数节点邻接表上执行广度/深度优先遍历。    | `nodes`、`edges`、可选 `start=-1`、可选 `weightFunc`。 | `{ dist: number[]; prev: number[] }`。 | None   |
| `BubbleSort`、`SelectionSort`、`InsertionSort`、`HeapSort`、`MergeSort`、`QuickSort` | 使用给定比较器原地排序通用数组。             | `arr`、`compare(a,b)`。                                | 排序后的同一 `T[]`。                   | None   |
| `CountingSort`、`RadixSort`、`BucketSort`                                            | 排序数值数组；桶排序仅适用于 `[0, 1)` 元素。 | `arr`。                                                | 排序后的 `number[]`。                  | None   |

### Data structures

| API                            | Purpose                               | Constructor parameters                                                              | Public methods / returns                                                                                                                                                                                                                                        | Throws                                                                    |
| ------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `UseHeap<T>`                   | 可配置优先级的二叉堆。                | 可选 `compare(a,b)`，`true` 表示 `a` 优先。                                         | `add(item): void`、`pop(): T \| undefined`、`peek(): T \| undefined`、`sort(): void`、`clear(): void`、`isEmpty(): boolean`、`toArray(): T[]`、`size: number`；静态 `heaplify`、`heapPop`、`heapPush`、`heapSort` 均接收数组和比较器并原地处理。                | 默认比较器用于非 `number/string` 时可能发生运行时比较错误；应传入比较器。 |
| `UseSegmentTree<T, Lazy>`      | 支持区间查询和懒更新的线段树。        | `data`、`rootFunc(left,right,lazy,oldValue)`、可选 `mergeFunc`、可选 `defaultVal`。 | `update(left,right,value): void`；`query(left,right): T`。                                                                                                                                                                                                      | None                                                                      |
| `UseAVLTree<T>` / `AVLNode<T>` | 支持重复值的 AVL 搜索树及其可见节点。 | 可选 `compare`、可选 `POOL_SIZE=16`。                                               | `insert`、`delete`、`find`、`has`、`min`、`max`、`inOrder`、`preOrder`、`postOrder`、`toArray`、`clear`、`isEmpty`、`size`。遍历方法返回 `Generator<AVLNode<T>>`。                                                                                              | 未提供比较器且元素不是 `number/string` 时抛出 `Error`。                   |
| `UseRedBlackTree<T>`           | 支持重复值的红黑搜索树。              | 可选 `comparator`、可选 `poolSize=16`。                                             | `insert(): number`、`delete(): boolean`、`contains(): boolean`、`getCount(): number`、`getNodeCount(): number`、`getTotalCount(): number`、`isEmpty(): boolean`、`inorderTraversal(callback): void`、`toArray(): T[]`、`clear(): void`、`validate(): boolean`。 | 比较器抛出的异常会向上传播；`validate` 内部错误会被捕获并返回 `false`。   |
| `UseSkipList<T>`               | 基于概率层级的有序跳表。              | 可选 `P=0.25`、`MAX_LEVEL=32`、可选 `compare`。                                     | `insert`、`delete` 返回 `boolean`；`get_by_rank`、`get_first`、`get_last` 返回 `T \| null`；`get_rank` 返回 `number \| null`；`range`、`reverse_range` 返回 `T[]`；`length: number`。                                                                           | 未提供比较器且元素不是 `number/string` 时抛出 `Error`。                   |

### Utility functions and classes

| API                | Purpose                                                                | Parameters                               | Returns                                                                                                                   | Throws |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| `clipString`       | 将超过长度的文本截断，可追加省略号。                                   | `text`、`length`、可选 `isElipse=true`。 | `string`。                                                                                                                | None   |
| `useDebounce`      | 在连续调用结束后延迟执行函数。                                         | `func`、`delay`（毫秒）。                | 接收原函数参数的防抖函数，返回 `void`。                                                                                   | None   |
| `useThrottle`      | 按最小时间间隔执行函数。                                               | `func`、可选 `interval=16`（毫秒）。     | 接收原函数参数的节流函数，返回 `void`。                                                                                   | None   |
| `letIfNotNull`     | 仅在值非 `null/undefined` 时执行回调。                                 | `value`、`fn`。                          | 回调结果 `R \| undefined`。                                                                                               | None   |
| `isPlainObject`    | 判断值是否为普通对象。                                                 | `value`。                                | 类型守卫 `value is Record<string, unknown>`。                                                                             | None   |
| `deepMerge<T>`     | 深合并普通对象，`undefined` 覆盖值会被忽略，数组和其他叶子值直接覆盖。 | `base`、`override: DeepPartial<T>`。     | 新的 `T`，不会修改 `base`。                                                                                               | None   |
| `handleDateFormat` | 解析日期格式中的占位符及其出现次数。                                   | `format`、`keyWords`。                   | `{ temp: string; p: Map<string, number> }`。                                                                              | None   |
| `UseTimeUtils`     | 继承 `Date` 的格式化和增减时间工具。                                   | 使用原生 `Date` 构造参数。               | `format(format?, padChar?): string`、`add(amount, unit): this`、`subtract(amount, unit): this`、`equals(date): boolean`。 | None   |
| `UseMemoryCache`   | 带滑动过期时间的内存缓存。                                             | 可选 `ttlMs=300000`。                    | `set`、`delete`、`clear` 返回 `void`；`get<T>(): T \| null`；`has(): boolean`；`size(): number`。                         | None   |
| `shareMemoryCache` | 默认 TTL 的共享 `UseMemoryCache` 实例。                                | None                                     | `UseMemoryCache`。                                                                                                        | None   |
