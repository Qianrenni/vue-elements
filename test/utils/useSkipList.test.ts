import { describe, it, expect, beforeEach } from 'vitest';
import { UseSkipList } from '../../src/utils/useSkipList';

describe('UseSkipList', () => {
  let skipList: UseSkipList<number>;

  beforeEach(() => {
    skipList = new UseSkipList<number>();
  });

  describe('基本操作', () => {
    it('应该正确初始化一个空的跳表', () => {
      expect(skipList.length).toBe(0);
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
    });

    it('应该能够插入元素', () => {
      expect(skipList.insert(1, 10)).toBe(true);
      expect(skipList.length).toBe(1);
      expect(skipList.get_first()).toEqual([1, 10]);
      expect(skipList.get_last()).toEqual([1, 10]);
    });

    it('应该阻止插入重复元素', () => {
      skipList.insert(1, 10);
      expect(skipList.insert(1, 10)).toBe(false);
      expect(skipList.length).toBe(1);
    });

    it('应该能够删除元素', () => {
      skipList.insert(1, 10);
      expect(skipList.delete(1, 10)).toBe(true);
      expect(skipList.length).toBe(0);
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
    });

    it('应该正确处理删除不存在的元素', () => {
      expect(skipList.delete(1, 10)).toBe(false);
      expect(skipList.length).toBe(0);
    });
  });

  describe('查找操作', () => {
    beforeEach(() => {
      // 插入一些测试数据
      skipList.insert(1, 10);
      skipList.insert(2, 20);
      skipList.insert(3, 30);
      skipList.insert(4, 40);
    });

    it('应该能够根据排名获取元素', () => {
      expect(skipList.get_by_rank(0)).toEqual([1, 10]);
      expect(skipList.get_by_rank(1)).toEqual([2, 20]);
      expect(skipList.get_by_rank(2)).toEqual([3, 30]);
      expect(skipList.get_by_rank(3)).toEqual([4, 40]);
      expect(skipList.get_by_rank(-1)).toBeNull();
      expect(skipList.get_by_rank(4)).toBeNull();
    });

    it('应该能够获取元素的排名', () => {
      expect(skipList.get_rank(1, 10)).toBe(0);
      expect(skipList.get_rank(2, 20)).toBe(1);
      expect(skipList.get_rank(3, 30)).toBe(2);
      expect(skipList.get_rank(4, 40)).toBe(3);
      expect(skipList.get_rank(5, 50)).toBeNull();
    });

    it('应该能够获取第一个和最后一个元素', () => {
      expect(skipList.get_first()).toEqual([1, 10]);
      expect(skipList.get_last()).toEqual([4, 40]);
    });
  });

  describe('范围查询', () => {
    beforeEach(() => {
      // 插入一些测试数据
      for (let i = 1; i <= 10; i++) {
        skipList.insert(i, i * 10);
      }
    });

    it('应该能够获取指定范围的元素', () => {
      const result = skipList.range(2, 5);
      expect(result).toEqual([
        [30, 3],
        [40, 4],
        [50, 5],
        [60, 6],
        [70, 7]
      ]);
    });

    it('应该正确处理边界情况', () => {
      expect(skipList.range(-1, 3)).toEqual([
        [10, 1],
        [20, 2],
        [30, 3]
      ]);
      
      expect(skipList.range(8, 5)).toEqual([
        [90, 9],
        [100, 10]
      ]);
      
      expect(skipList.range(10, 1)).toEqual([]);
      expect(skipList.range(0, 0)).toEqual([]);
    });

    it('应该能够逆序获取指定范围的元素', () => {
      const result = skipList.reverse_range(2, 5);
      expect(result).toEqual([
        [80, 8],
        [70, 7],
        [60, 6],
        [50, 5],
        [40, 4]
      ]);
    });

    it('应该正确处理逆序的边界情况', () => {
      expect(skipList.reverse_range(-1, 3)).toEqual([
        [100, 10],
        [90, 9],
        [80, 8]
      ]);
      
      expect(skipList.reverse_range(8, 5)).toEqual([
        [20, 2],
        [10, 1]
      ]);
      
      expect(skipList.reverse_range(10, 1)).toEqual([]);
      expect(skipList.reverse_range(0, 0)).toEqual([]);
    });
  });

  describe('大量数据测试', () => {
    it('应该能够处理大量数据的插入和查询', () => {
      // 插入1000个元素
      for (let i = 1; i <= 1000; i++) {
        skipList.insert(i, i * 10);
      }
      
      expect(skipList.length).toBe(1000);
      expect(skipList.get_first()).toEqual([1, 10]);
      expect(skipList.get_last()).toEqual([1000, 10000]);
      
      // 测试随机访问
      expect(skipList.get_by_rank(500)).toEqual([501, 5010]);
      expect(skipList.get_rank(501, 5010)).toBe(500);
      
      // 测试删除
      expect(skipList.delete(501, 5010)).toBe(true);
      expect(skipList.length).toBe(999);
      expect(skipList.get_by_rank(500)).toEqual([502, 5020]);
    });
  });

  describe('边界情况测试', () => {
    it('应该正确处理空跳表的各种操作', () => {
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
      expect(skipList.get_by_rank(0)).toBeNull();
      expect(skipList.get_rank(1, 10)).toBeNull();
      expect(skipList.range(0, 10)).toEqual([]);
      expect(skipList.reverse_range(0, 10)).toEqual([]);
    });

    it('应该正确处理只有一个元素的跳表', () => {
      skipList.insert(1, 10);
      
      expect(skipList.get_first()).toEqual([1, 10]);
      expect(skipList.get_last()).toEqual([1, 10]);
      expect(skipList.get_by_rank(0)).toEqual([1, 10]);
      expect(skipList.get_by_rank(1)).toBeNull();
      expect(skipList.get_rank(1, 10)).toBe(0);
      expect(skipList.get_rank(2, 20)).toBeNull();
      
      const rangeResult = skipList.range(0, 10);
      expect(rangeResult).toEqual([[10, 1]]);
      
      const reverseRangeResult = skipList.reverse_range(0, 10);
      expect(reverseRangeResult).toEqual([[10, 1]]);
    });
  });

  describe('随机层级生成测试', () => {
    it('应该能够使用不同的概率因子创建跳表', () => {
      const skipList1 = new UseSkipList<number>(false, 0.5, 16);
      const skipList2 = new UseSkipList<number>(false, 0.25, 32);
      
      for (let i = 1; i <= 100; i++) {
        skipList1.insert(i, i * 10);
        skipList2.insert(i, i * 10);
      }
      
      expect(skipList1.length).toBe(100);
      expect(skipList2.length).toBe(100);
      
      // 验证基本功能仍然正常工作
      expect(skipList1.get_first()).toEqual([1, 10]);
      expect(skipList2.get_first()).toEqual([1, 10]);
    });
  });

  describe('重复元素测试', () => {
    it('应该能够处理具有相同分数但不同成员的元素', () => {
      expect(skipList.insert(1, 10)).toBe(true);
      expect(skipList.insert(1, 20)).toBe(true); // 相同分数，不同成员
      expect(skipList.insert(2, 30)).toBe(true);
      
      expect(skipList.length).toBe(3);
      
      expect(skipList.get_by_rank(0)).toEqual([1, 10]);
      expect(skipList.get_by_rank(1)).toEqual([1, 20]);
      expect(skipList.get_by_rank(2)).toEqual([2, 30]);
      
      expect(skipList.get_rank(1, 10)).toBe(0);
      expect(skipList.get_rank(1, 20)).toBe(1);
      
      // 删除其中一个
      expect(skipList.delete(1, 10)).toBe(true);
      expect(skipList.length).toBe(2);
      expect(skipList.get_by_rank(0)).toEqual([1, 20]);
    });
  });

  describe('性能测试', () => {
    it('应该在大量数据下保持较好的性能', () => {
      const startInsert = performance.now();
      
      // 插入大量数据
      for (let i = 1000; i >= 1; i--) {
        skipList.insert(i, i * 10);
      }
      
      const endInsert = performance.now();
      
      // 验证插入正确性
      expect(skipList.length).toBe(1000);
      expect(skipList.get_first()).toEqual([1, 10]);
      expect(skipList.get_last()).toEqual([1000, 10000]);
      
      const startQuery = performance.now();
      
      // 执行大量查询操作
      for (let i = 0; i < 100; i++) {
        skipList.get_by_rank(Math.floor(Math.random() * 1000));
        skipList.get_rank(Math.floor(Math.random() * 1000) + 1, (Math.floor(Math.random() * 1000) + 1) * 10);
      }
      
      const endQuery = performance.now();
      
      // 确保操作在合理时间内完成（这个阈值可能需要根据实际环境调整）
      expect(endInsert - startInsert).toBeLessThan(1000); // 插入应在1秒内完成
      expect(endQuery - startQuery).toBeLessThan(100);    // 查询应在100毫秒内完成
      
      const startDelete = performance.now();
      
      // 删除部分数据
      for (let i = 1; i <= 500; i++) {
        skipList.delete(i, i * 10);
      }
      
      const endDelete = performance.now();
      
      expect(skipList.length).toBe(500);
      expect(endDelete - startDelete).toBeLessThan(500); // 删除应在500毫秒内完成
    });
  });
});