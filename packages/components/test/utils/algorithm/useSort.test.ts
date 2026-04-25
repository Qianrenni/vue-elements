import { describe, it, expect } from 'vitest';
import {
  BubbleSort,
  SelectionSort,
  InsertionSort,
  HeapSort,
  MergeSort,
  QuickSort,
  CountingSort,
  RadixSort,
  BucketSort,
} from '@/utils';

describe('Sorting Algorithms', () => {
  // 通用比较函数 - 升序排列
  const ascendingCompare = (a: number, b: number) => a - b;

  // 通用比较函数 - 降序排列
  const descendingCompare = (a: number, b: number) => b - a;

  describe('BubbleSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = BubbleSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = BubbleSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = BubbleSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = BubbleSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = BubbleSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = BubbleSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = BubbleSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = BubbleSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = BubbleSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  describe('SelectionSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = SelectionSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = SelectionSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = SelectionSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = SelectionSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = SelectionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = SelectionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = SelectionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = SelectionSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = SelectionSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  describe('InsertionSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = InsertionSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = InsertionSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = InsertionSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = InsertionSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = InsertionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = InsertionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = InsertionSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = InsertionSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = InsertionSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  describe('HeapSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = HeapSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = HeapSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = HeapSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = HeapSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = HeapSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = HeapSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = HeapSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = HeapSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = HeapSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  describe('MergeSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = MergeSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = MergeSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = MergeSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = MergeSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = MergeSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = MergeSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = MergeSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = MergeSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = MergeSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  describe('QuickSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = QuickSort([...arr], ascendingCompare);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should sort numbers in descending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = QuickSort([...arr], descendingCompare);
      expect(result).toEqual([90, 64, 34, 25, 22, 12, 11]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = QuickSort(arr, ascendingCompare);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = QuickSort(arr, ascendingCompare);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = QuickSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = QuickSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = QuickSort([...arr], ascendingCompare);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = QuickSort([...arr], ascendingCompare);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should sort strings alphabetically', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      const result = QuickSort([...arr], (a, b) => a.localeCompare(b));
      expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
    });
  });

  // 跨算法一致性测试
  describe('Cross-algorithm consistency', () => {
    const testCases = [
      [],
      [1],
      [3, 1, 2],
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
      [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
      [-3, -1, -4, -1, -5, -9, -2, -6],
      [100, 1, 50, 25, 75],
    ];

    testCases.forEach((testCase, index) => {
      it(`should produce same result for all algorithms - case ${index + 1}`, () => {
        const expected = [...testCase].sort((a, b) => a - b);

        const bubbleResult = BubbleSort([...testCase], ascendingCompare);
        const selectionResult = SelectionSort([...testCase], ascendingCompare);
        const insertionResult = InsertionSort([...testCase], ascendingCompare);
        const heapResult = HeapSort([...testCase], ascendingCompare);
        const mergeResult = MergeSort([...testCase], ascendingCompare);
        const quickResult = QuickSort([...testCase], ascendingCompare);

        expect(bubbleResult).toEqual(expected);
        expect(selectionResult).toEqual(expected);
        expect(insertionResult).toEqual(expected);
        expect(heapResult).toEqual(expected);
        expect(mergeResult).toEqual(expected);
        expect(quickResult).toEqual(expected);
      });
    });
  });

  describe('CountingSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = CountingSort([...arr]);
      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = CountingSort(arr);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = CountingSort(arr);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = CountingSort([...arr]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = CountingSort([...arr]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = CountingSort([...arr]);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle negative numbers', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6];
      const result = CountingSort([...arr]);
      expect(result).toEqual([-9, -6, -5, -4, -3, -2, -1, -1]);
    });

    it('should handle large range of numbers', () => {
      const arr = [1000, 1, 500, 250, 750];
      const result = CountingSort([...arr]);
      expect(result).toEqual([1, 250, 500, 750, 1000]);
    });
  });

  describe('RadixSort', () => {
    it('should sort numbers in ascending order', () => {
      const arr = [170, 45, 75, 90, 802, 24, 2, 66];
      const result = RadixSort([...arr]);
      expect(result).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = RadixSort(arr);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [42];
      const result = RadixSort(arr);
      expect(result).toEqual([42]);
    });

    it('should handle already sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = RadixSort([...arr]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = RadixSort([...arr]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
      const result = RadixSort([...arr]);
      expect(result).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should handle numbers with different digit lengths', () => {
      const arr = [100, 10, 1, 1000, 10000];
      const result = RadixSort([...arr]);
      expect(result).toEqual([1, 10, 100, 1000, 10000]);
    });

    it('should handle two-digit numbers', () => {
      const arr = [99, 88, 77, 66, 55, 44, 33, 22, 11];
      const result = RadixSort([...arr]);
      expect(result).toEqual([11, 22, 33, 44, 55, 66, 77, 88, 99]);
    });
  });

  describe('BucketSort', () => {
    it('should sort numbers in [0,1) range', () => {
      const arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
      const result = BucketSort([...arr]);
      expect(result).toEqual([
        0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94,
      ]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const result = BucketSort(arr);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const arr = [0.5];
      const result = BucketSort(arr);
      expect(result).toEqual([0.5]);
    });

    it('should handle already sorted array', () => {
      const arr = [0.1, 0.2, 0.3, 0.4, 0.5];
      const result = BucketSort([...arr]);
      expect(result).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
    });

    it('should handle reverse sorted array', () => {
      const arr = [0.5, 0.4, 0.3, 0.2, 0.1];
      const result = BucketSort([...arr]);
      expect(result).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
    });

    it('should handle duplicate elements', () => {
      const arr = [0.3, 0.1, 0.4, 0.1, 0.5, 0.9, 0.2, 0.6, 0.5, 0.3, 0.5];
      const result = BucketSort([...arr]);
      expect(result).toEqual([
        0.1, 0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.5, 0.5, 0.6, 0.9,
      ]);
    });

    it('should handle uniform distribution', () => {
      const arr = [0.1, 0.3, 0.5, 0.7, 0.9];
      const result = BucketSort([...arr]);
      expect(result).toEqual([0.1, 0.3, 0.5, 0.7, 0.9]);
    });

    it('should handle clustered values', () => {
      const arr = [0.11, 0.12, 0.13, 0.14, 0.15];
      const result = BucketSort([...arr]);
      expect(result).toEqual([0.11, 0.12, 0.13, 0.14, 0.15]);
    });
  });
});
