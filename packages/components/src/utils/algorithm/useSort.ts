import { UseHeap } from './useHeap';

/**
 * 冒泡排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function BubbleSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
/**
 * 选择排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function SelectionSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number,
): T[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[j], arr[minIndex]) < 0) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
/**
 * 插入排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function InsertionSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number,
): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}
/**
 * 堆排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function HeapSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  UseHeap.heapSort(arr, (a, b) => compare(a, b) < 0);
  return arr;
}
/**
 * 归并排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function MergeSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  const merge = (arr: T[], left: number, right: number) => {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    merge(arr, left, mid);
    merge(arr, mid + 1, right);
    const temp = Array(right - left + 1) as T[];
    let [i, j, k] = [left, mid + 1, 0];
    while (i <= mid && j <= right) {
      if (compare(arr[i], arr[j]) < 0) {
        temp[k++] = arr[i++];
      } else {
        temp[k++] = arr[j++];
      }
    }
    while (i <= mid) {
      temp[k++] = arr[i++];
    }
    while (j <= right) {
      temp[k++] = arr[j++];
    }
    for (let p = 0; p < temp.length; p++) {
      arr[left + p] = temp[p];
    }
  };
  merge(arr, 0, arr.length - 1);
  return arr;
}
/**
 * 快速排序
 * @param arr 待排序数组
 * @param compare 比较函数
 *  - 返回值小于 0，表示 a 应该排在 b 之前
 *  - 返回值等于 0，表示 a 和 b 相等，不发生顺序改变
 *  - 返回值大于 0，表示 a 应该排在 b 之后
 * @returns 排序后的数组
 */
export function QuickSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
  const quickSort = (arr: T[], left: number, right: number) => {
    if (left >= right) {
      return;
    }
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (compare(arr[j], pivot) < 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    quickSort(arr, left, i);
    quickSort(arr, i + 2, right);
  };
  quickSort(arr, 0, arr.length - 1);
  return arr;
}
/**
 * 计数排序
 * @param arr 待排序数组
 * @returns 排序后的数组
 */
export function CountingSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const n = arr.length;
  let [minElement, maxElement] = [arr[0], arr[0]];
  for (let i = 1; i < n; i++) {
    if (arr[i] < minElement) minElement = arr[i];
    if (arr[i] > maxElement) maxElement = arr[i];
  }
  const count = Array(maxElement - minElement + 1).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] -= minElement;
  }
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  const result = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    result[count[arr[i]] - 1] = arr[i] + minElement;
    count[arr[i]]--;
  }
  return result;
}
/**
 * 基数排序
 * @param arr 待排序数组
 * @returns 排序后的数组
 */
export function RadixSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const maxDigit = Math.max(...arr).toString().length;
  const n = arr.length;
  for (let digit = 0; digit < maxDigit; digit++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((arr[i] / Math.pow(10, digit)) % 10);
      buckets[bucketIndex].push(arr[i]);
    }
    arr = buckets.flat();
  }
  return arr;
}
/**
 * 桶排序
 * @param arr 待排序数组.元素大小在[0,1)之间
 * @returns 排序后的数组
 */
export function BucketSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const n = arr.length;
  const buckets: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor(arr[i] * n);
    buckets[bucketIndex].push(arr[i]);
  }
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
  }
  const sortedArray = buckets.flat();
  return sortedArray;
}
