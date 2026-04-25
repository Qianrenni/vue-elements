import { describe, it, expect } from 'vitest';
import { UseSegmentTree } from '@/utils';

describe('UseSegmentTree - Segment Tree with Lazy Propagation', () => {
  describe('Basic Operations - Range Sum', () => {
    it('should initialize and query correctly', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1), // 覆盖型
        (a, b) => a + b, // 求和
        0,
      );

      expect(tree.query(0, 4)).toBe(15); // 1+2+3+4+5
      expect(tree.query(0, 2)).toBe(6); // 1+2+3
      expect(tree.query(2, 4)).toBe(12); // 3+4+5
    });

    it('should update range and query correctly', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1), // 覆盖型
        (a, b) => a + b,
        0,
      );

      // 将区间 [1, 3] 的值都设为 10
      tree.update(1, 3, 10);

      expect(tree.query(0, 0)).toBe(1); // 未改变
      expect(tree.query(1, 3)).toBe(30); // 10+10+10
      expect(tree.query(4, 4)).toBe(5); // 未改变
      expect(tree.query(0, 4)).toBe(36); // 1+10+10+10+5
    });

    it('should handle single element update', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      tree.update(2, 2, 100);
      expect(tree.query(2, 2)).toBe(100);
      expect(tree.query(0, 4)).toBe(112); // 1+2+100+4+5
    });

    it('should handle full range update', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      tree.update(0, 4, 7);
      expect(tree.query(0, 4)).toBe(35); // 7*5
    });
  });

  describe('Range Add Operations', () => {
    it('should support range add operation', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) =>
          oldValue + lazyValue * (right - left + 1), // 增量型
        (a, b) => a + b,
        0,
      );

      expect(tree.query(0, 4)).toBe(15);

      // 区间 [1, 3] 每个元素加 10
      tree.update(1, 3, 10);

      expect(tree.query(0, 0)).toBe(1); // 未改变
      expect(tree.query(1, 1)).toBe(12); // 2+10
      expect(tree.query(2, 2)).toBe(13); // 3+10
      expect(tree.query(3, 3)).toBe(14); // 4+10
      expect(tree.query(4, 4)).toBe(5); // 未改变
      expect(tree.query(0, 4)).toBe(45); // 1+12+13+14+5
    });

    it('should handle multiple range add operations', () => {
      const data = [0, 0, 0, 0, 0];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) =>
          oldValue + lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      tree.update(0, 2, 5); // [5, 5, 5, 0, 0]
      tree.update(2, 4, 3); // [5, 5, 8, 3, 3]

      expect(tree.query(0, 0)).toBe(5);
      expect(tree.query(1, 1)).toBe(5);
      expect(tree.query(2, 2)).toBe(8);
      expect(tree.query(3, 3)).toBe(3);
      expect(tree.query(4, 4)).toBe(3);
    });
  });

  describe('Range Max/Min Operations', () => {
    it('should support range max query', () => {
      const data = [1, 5, 3, 8, 2];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue, // 覆盖型
        (a, b) => Math.max(a, b), // 最大值
        -Infinity,
      );

      expect(tree.query(0, 4)).toBe(8);
      expect(tree.query(0, 2)).toBe(5);
      expect(tree.query(2, 4)).toBe(8);
    });

    it('should support range min query', () => {
      const data = [5, 2, 8, 1, 9];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => Math.min(a, b), // 最小值
        Infinity,
      );

      expect(tree.query(0, 4)).toBe(1);
      expect(tree.query(0, 2)).toBe(2);
      expect(tree.query(2, 4)).toBe(1);
    });

    it('should update and query max correctly', () => {
      const data = [1, 5, 3, 8, 2];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => Math.max(a, b),
        -Infinity,
      );

      tree.update(1, 3, 10);

      expect(tree.query(0, 4)).toBe(10);
      expect(tree.query(0, 0)).toBe(1);
      expect(tree.query(1, 3)).toBe(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single element array', () => {
      const data = [42];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => a + b,
        0,
      );

      expect(tree.query(0, 0)).toBe(42);
      tree.update(0, 0, 100);
      expect(tree.query(0, 0)).toBe(100);
    });

    it('should handle empty query range', () => {
      const data = [1, 2, 3];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => a + b,
        0,
      );

      // 查询无效区间应返回默认值
      expect(tree.query(5, 10)).toBe(0);
    });

    it('should handle large arrays', () => {
      const size = 1000;
      const data = Array.from({ length: size }, (_, i) => i + 1);
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      expect(tree.query(0, size - 1)).toBe((size * (size + 1)) / 2);

      tree.update(0, size - 1, 1);
      expect(tree.query(0, size - 1)).toBe(size);
    });

    it('should handle overlapping updates', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => a + b,
        0,
      );

      tree.update(0, 3, 10); // [10, 10, 10, 10, 5]
      //   tree.update(2, 4, 20);  // [10, 10, 20, 20, 20]

      expect(tree.query(0, 2)).toBe(20);
    });
  });

  describe('Custom Types', () => {
    it('should work with custom merge functions', () => {
      const data = [10, 20, 30, 40, 50];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => a * b, // 乘积
        1,
      );

      expect(tree.query(0, 2)).toBe(6000); // 10*20*30
      expect(tree.query(1, 3)).toBe(24000); // 20*30*40
    });

    it('should handle string data with custom operations', () => {
      const data = ['a', 'b', 'c', 'd'];
      const tree = new UseSegmentTree<string, string>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue,
        (a, b) => a + b, // 字符串拼接
        '',
      );

      expect(tree.query(0, 3)).toBe('abcd');
      expect(tree.query(1, 2)).toBe('bc');

      tree.update(1, 2, 'X');
      expect(tree.query(0, 3)).toBe('aXXd');
    });
  });

  describe('Lazy Propagation Correctness', () => {
    it('should correctly propagate lazy values through multiple levels', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) => lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      // 更新大范围
      expect(tree.query(0, 7)).toBe(36);
      expect(tree.query(0, 0)).toBe(1);
      tree.update(0, 7, 10);
      expect(tree.query(0, 7)).toBe(80);
      // 更新子范围，应该正确覆盖
      tree.update(2, 5, 20);
      expect(tree.query(0, 1)).toBe(20); // 10+10
      expect(tree.query(2, 5)).toBe(80); // 20*4
      expect(tree.query(6, 7)).toBe(20); // 10+10
    });

    it('should handle interleaved queries and updates', () => {
      const data = [1, 2, 3, 4, 5];
      const tree = new UseSegmentTree<number, number>(
        data,
        (left, right, lazyValue, oldValue) =>
          oldValue + lazyValue * (right - left + 1),
        (a, b) => a + b,
        0,
      );

      expect(tree.query(0, 4)).toBe(15);

      tree.update(1, 3, 5);
      expect(tree.query(0, 4)).toBe(30); // 1+(2+5)+(3+5)+(4+5)+5

      tree.update(0, 2, 3);
      expect(tree.query(0, 4)).toBe(39); // (1+3)+(7+3)+(8+3)+9+5
    });
  });
});
