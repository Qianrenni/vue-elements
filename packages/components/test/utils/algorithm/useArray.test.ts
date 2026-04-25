import { describe, it, expect } from 'vitest';
import { binarySearchLeft, binarySearchRight } from '@/utils';

describe('useArray - Binary Search Functions', () => {
  // 比较函数：用于数字比较
  const compareNumbers = (a: number, b: number): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  // 比较函数：用于字符串比较
  const compareStrings = (a: string, b: string): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  describe('binarySearchLeft', () => {
    it('should find the leftmost index of target in sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchLeft(arr, 3, compareNumbers)).toBe(2);
    });

    it('should return -1 when target is not found', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchLeft(arr, 6, compareNumbers)).toBe(-1);
    });

    it('should find the leftmost occurrence of duplicate elements', () => {
      const arr = [1, 2, 2, 2, 3, 4];
      expect(binarySearchLeft(arr, 2, compareNumbers)).toBe(1); // 第一个2的索引是1
    });

    it('should work with single element array - found', () => {
      const arr = [5];
      expect(binarySearchLeft(arr, 5, compareNumbers)).toBe(0);
    });

    it('should work with single element array - not found', () => {
      const arr = [5];
      expect(binarySearchLeft(arr, 3, compareNumbers)).toBe(-1);
    });

    it('should work with empty array', () => {
      const arr: number[] = [];
      expect(binarySearchLeft(arr, 1, compareNumbers)).toBe(-1);
    });

    it('should find first element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchLeft(arr, 1, compareNumbers)).toBe(0);
    });

    it('should find last element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchLeft(arr, 5, compareNumbers)).toBe(4);
    });

    it('should work with string arrays', () => {
      const arr = ['apple', 'banana', 'cherry', 'date'];
      expect(binarySearchLeft(arr, 'cherry', compareStrings)).toBe(2);
    });

    it('should handle negative numbers', () => {
      const arr = [-5, -3, -1, 0, 2, 4];
      expect(binarySearchLeft(arr, -1, compareNumbers)).toBe(2);
    });

    it('should handle all duplicates', () => {
      const arr = [2, 2, 2, 2, 2];
      expect(binarySearchLeft(arr, 2, compareNumbers)).toBe(0); // 最左边的索引是0
    });
  });

  describe('binarySearchRight', () => {
    it('should find the rightmost index of target in sorted array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchRight(arr, 3, compareNumbers)).toBe(2);
    });

    it('should return -1 when target is not found', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchRight(arr, 6, compareNumbers)).toBe(-1);
    });

    it('should find the rightmost occurrence of duplicate elements', () => {
      const arr = [1, 2, 2, 2, 3, 4];
      expect(binarySearchRight(arr, 2, compareNumbers)).toBe(3); // 最后一个2的索引是3
    });

    it('should work with single element array - found', () => {
      const arr = [5];
      expect(binarySearchRight(arr, 5, compareNumbers)).toBe(0);
    });

    it('should work with single element array - not found', () => {
      const arr = [5];
      expect(binarySearchRight(arr, 3, compareNumbers)).toBe(-1);
    });

    it('should work with empty array', () => {
      const arr: number[] = [];
      expect(binarySearchRight(arr, 1, compareNumbers)).toBe(-1);
    });

    it('should find first element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchRight(arr, 1, compareNumbers)).toBe(0);
    });

    it('should find last element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearchRight(arr, 5, compareNumbers)).toBe(4);
    });

    it('should work with string arrays', () => {
      const arr = ['apple', 'banana', 'cherry', 'date'];
      expect(binarySearchRight(arr, 'cherry', compareStrings)).toBe(2);
    });

    it('should handle negative numbers', () => {
      const arr = [-5, -3, -1, 0, 2, 4];
      expect(binarySearchRight(arr, -1, compareNumbers)).toBe(2);
    });

    it('should handle all duplicates', () => {
      const arr = [2, 2, 2, 2, 2];
      expect(binarySearchRight(arr, 2, compareNumbers)).toBe(4); // 最右边的索引是4
    });
  });

  describe('Edge cases and special scenarios', () => {
    it('should handle large arrays efficiently', () => {
      const largeArr = Array.from({ length: 1000 }, (_, i) => i);
      expect(binarySearchLeft(largeArr, 500, compareNumbers)).toBe(500);
      expect(binarySearchRight(largeArr, 500, compareNumbers)).toBe(500);
    });

    it('should handle arrays with one duplicate at edges', () => {
      const arr = [1, 1, 2, 3, 4, 5];
      expect(binarySearchLeft(arr, 1, compareNumbers)).toBe(0);
      expect(binarySearchRight(arr, 1, compareNumbers)).toBe(1);
    });

    it('should handle custom comparison functions', () => {
      interface Person {
        age: number;
        name: string;
      }

      const people: Person[] = [
        { age: 20, name: 'Alice' },
        { age: 25, name: 'Bob' },
        { age: 30, name: 'Charlie' },
        { age: 35, name: 'David' },
      ];

      const compareByAge = (a: Person, b: Person): number => {
        if (a.age < b.age) return -1;
        if (a.age > b.age) return 1;
        return 0;
      };

      const target: Person = { age: 30, name: 'Target' };
      expect(binarySearchLeft(people, target, compareByAge)).toBe(2);
      expect(binarySearchRight(people, target, compareByAge)).toBe(2);
    });
  });
});
