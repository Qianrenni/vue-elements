# useSort

## 用途

提供多种排序算法。除 `CountingSort`、`RadixSort`、`BucketSort` 外，比较器均为 `(a, b) => number`：负数表示 `a` 排在 `b` 前，`0` 表示相等，正数表示 `a` 排在 `b` 后。

## API

| 函数               | 参数                                                                  | 返回       | 说明                                                   | Throws |
| ------------------ | --------------------------------------------------------------------- | ---------- | ------------------------------------------------------ | ------ |
| `BubbleSort<T>`    | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地冒泡排序，返回同一数组。                           | 无。   |
| `SelectionSort<T>` | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地选择排序，返回同一数组。                           | 无。   |
| `InsertionSort<T>` | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地插入排序，返回同一数组。                           | 无。   |
| `HeapSort<T>`      | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地堆排序，返回同一数组。                             | 无。   |
| `MergeSort<T>`     | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地归并排序，返回同一数组。                           | 无。   |
| `QuickSort<T>`     | `arr: T[]`（待排序数组）；`compare: (a: T, b: T) => number`（比较器） | `T[]`      | 原地快速排序，返回同一数组。                           | 无。   |
| `CountingSort`     | `arr: number[]`（待排序数值数组）                                     | `number[]` | 计数排序；会先原地减去最小值，最终返回新建的升序数组。 | 无。   |
| `RadixSort`        | `arr: number[]`（待排序数值数组）                                     | `number[]` | 基数排序，返回桶合并得到的新数组。                     | 无。   |
| `BucketSort`       | `arr: number[]`（元素应在 `[0, 1)` 内）                               | `number[]` | 桶排序，返回新建的升序数组。                           | 无。   |
