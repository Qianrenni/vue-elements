import { describe, it, expect, beforeEach } from 'vitest';
import { UseSkipList } from '../../src/utils/useSkipList';

describe('UseSkipList', () => {
  let skipList: UseSkipList<number>;
  let stringSkipList: UseSkipList<string>;

  beforeEach(() => {
    skipList = new UseSkipList<number>();
    stringSkipList = new UseSkipList<string>();
  });

  describe('构造函数和基本属性', () => {
    it('应该正确初始化空跳表', () => {
      expect(skipList.length).toBe(0);
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
    });

    it('应该使用默认比较函数处理数字', () => {
      skipList.insert(5);
      skipList.insert(3);
      skipList.insert(8);
      expect(skipList.get_first()).toBe(3);
      expect(skipList.get_last()).toBe(8);
    });

    it('应该使用默认比较函数处理字符串', () => {
      stringSkipList.insert('banana');
      stringSkipList.insert('apple');
      stringSkipList.insert('cherry');
      expect(stringSkipList.get_first()).toBe('apple');
      expect(stringSkipList.get_last()).toBe('cherry');
    });

    it('应该支持自定义比较函数', () => {
      const customSkipList = new UseSkipList<{ value: number }>(undefined, 32, (a, b) => a.value - b.value);
      customSkipList.insert({ value: 5 });
      customSkipList.insert({ value: 3 });
      customSkipList.insert({ value: 8 });
      
      expect(customSkipList.get_first()).toEqual({ value: 3 });
      expect(customSkipList.get_last()).toEqual({ value: 8 });
    });
  });

  describe('插入操作', () => {
    it('应该正确插入元素到跳表', () => {
      expect(skipList.insert(5)).toBe(true);
      expect(skipList.insert(3)).toBe(true);
      expect(skipList.insert(8)).toBe(true);
      expect(skipList.insert(1)).toBe(true);
      
      expect(skipList.length).toBe(4);
      expect(skipList.get_first()).toBe(1);
      expect(skipList.get_last()).toBe(8);
    });

    it('应该拒绝插入重复元素', () => {
      expect(skipList.insert(5)).toBe(true);
      expect(skipList.insert(3)).toBe(true);
      expect(skipList.insert(5)).toBe(false); // 重复插入应返回 false
      
      expect(skipList.length).toBe(2);
    });

    it('应该保持插入后元素有序', () => {
      const values = [5, 3, 8, 1, 9, 2, 7, 4, 6];
      values.forEach(v => skipList.insert(v));
      
      expect(skipList.length).toBe(values.length);
      expect(skipList.get_first()).toBe(1);
      expect(skipList.get_last()).toBe(9);
    });
  });

  describe('删除操作', () => {
    beforeEach(() => {
      // 预先插入一些数据
      skipList.insert(5);
      skipList.insert(3);
      skipList.insert(8);
      skipList.insert(1);
      skipList.insert(9);
    });

    it('应该正确删除存在的元素', () => {
      expect(skipList.delete(3)).toBe(true);
      expect(skipList.length).toBe(4);
      expect(skipList.get_first()).toBe(1);
      expect(skipList.get_rank(3)).toBeNull(); // 确认已删除
    });

    it('应该拒绝删除不存在的元素', () => {
      expect(skipList.delete(10)).toBe(false);
      expect(skipList.length).toBe(5); // 长度应不变
    });

    it('应该正确处理删除所有元素', () => {
      expect(skipList.delete(1)).toBe(true);
      expect(skipList.delete(3)).toBe(true);
      expect(skipList.delete(5)).toBe(true);
      expect(skipList.delete(8)).toBe(true);
      expect(skipList.delete(9)).toBe(true);
      
      expect(skipList.length).toBe(0);
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
    });
  });

  describe('查找操作', () => {
    beforeEach(() => {
      // 预先插入一些有序数据
      skipList.insert(1);
      skipList.insert(3);
      skipList.insert(5);
      skipList.insert(7);
      skipList.insert(9);
    });

    it('应该根据排名获取元素', () => {
      expect(skipList.get_by_rank(0)).toBe(1);
      expect(skipList.get_by_rank(1)).toBe(3);
      expect(skipList.get_by_rank(2)).toBe(5);
      expect(skipList.get_by_rank(3)).toBe(7);
      expect(skipList.get_by_rank(4)).toBe(9);
      expect(skipList.get_by_rank(5)).toBeNull(); // 超出范围
      expect(skipList.get_by_rank(-1)).toBeNull(); // 负数范围
    });

    it('应该获取元素的排名', () => {
      expect(skipList.get_rank(1)).toBe(0);
      expect(skipList.get_rank(3)).toBe(1);
      expect(skipList.get_rank(5)).toBe(2);
      expect(skipList.get_rank(7)).toBe(3);
      expect(skipList.get_rank(9)).toBe(4);
      expect(skipList.get_rank(10)).toBeNull(); // 不存在的元素
    });

    it('应该获取第一个和最后一个元素', () => {
      expect(skipList.get_first()).toBe(1);
      expect(skipList.get_last()).toBe(9);
      
      const emptyList = new UseSkipList<number>();
      expect(emptyList.get_first()).toBeNull();
      expect(emptyList.get_last()).toBeNull();
    });
  });

  describe('范围查询', () => {
    beforeEach(() => {
      // 插入数据: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19
      for (let i = 1; i <= 19; i += 2) {
        skipList.insert(i);
      }
    });

    it('应该正确获取指定范围内的元素', () => {
      expect(skipList.range(0, 3)).toEqual([1, 3, 5]);
      expect(skipList.range(2, 4)).toEqual([5, 7, 9, 11]);
      expect(skipList.range(5, 10)).toEqual([11, 13, 15, 17, 19]); // 超出部分应只返回实际存在的
      expect(skipList.range(10, 5)).toEqual([21, 23, 25, 27, 29].slice(0, 0)); // 起始位置超出范围
    });

    it('应该正确处理边界情况', () => {
      expect(skipList.range(-1, 3)).toEqual([1, 3, 5]); // 负数起始位置
      expect(skipList.range(0, 0)).toEqual([]); // 0个元素
      expect(skipList.range(0, -1)).toEqual([]); // 负数数量
    });

    it('应该正确获取指定范围内的元素（逆序）', () => {
      expect(skipList.reverse_range(0, 3)).toEqual([19, 17, 15]);
      expect(skipList.reverse_range(2, 4)).toEqual([15, 13, 11, 9]);
      expect(skipList.reverse_range(5, 10)).toEqual([9, 7, 5, 3, 1]); // 超出部分应只返回实际存在的
    });

    it('应该正确处理逆序的边界情况', () => {
      expect(skipList.reverse_range(-1, 3)).toEqual([19, 17, 15]); // 负数起始位置
      expect(skipList.reverse_range(0, 0)).toEqual([]); // 0个元素
      expect(skipList.reverse_range(0, -1)).toEqual([]); // 负数数量
    });
  });

  describe('复杂数据类型', () => {
    it('应该支持自定义比较函数的对象', () => {
      interface Person {
        name: string;
        age: number;
      }
      
      const personSkipList = new UseSkipList<Person>(undefined, 32, (a, b) => a.age - b.age);
      
      personSkipList.insert({ name: 'Alice', age: 30 });
      personSkipList.insert({ name: 'Bob', age: 25 });
      personSkipList.insert({ name: 'Charlie', age: 35 });
      
      expect(personSkipList.get_first()).toEqual({ name: 'Bob', age: 25 });
      expect(personSkipList.get_last()).toEqual({ name: 'Charlie', age: 35 });
      
      expect(personSkipList.get_by_rank(1)).toEqual({ name: 'Alice', age: 30 });
      expect(personSkipList.get_rank({ name: 'Alice', age: 30 })).toBe(1);
    });
  });

  describe('边界情况和错误处理', () => {
    it('应该处理重复元素', () => {
      expect(skipList.insert(5)).toBe(true);
      expect(skipList.insert(3)).toBe(true);
      expect(skipList.insert(3)).toBe(false); // 插入重复元素应失败
      expect(skipList.insert(8)).toBe(true);
      
      expect(skipList.length).toBe(3);
      expect(skipList.get_first()).toBe(3);
      expect(skipList.get_last()).toBe(8);
    });

    it('应该处理单元素跳表', () => {
      skipList.insert(42);
      expect(skipList.length).toBe(1);
      expect(skipList.get_first()).toBe(42);
      expect(skipList.get_last()).toBe(42);
      expect(skipList.get_by_rank(0)).toBe(42);
      expect(skipList.get_rank(42)).toBe(0);
      
      expect(skipList.delete(42)).toBe(true);
      expect(skipList.length).toBe(0);
      expect(skipList.get_first()).toBeNull();
      expect(skipList.get_last()).toBeNull();
    });

    it('应该处理大量元素', () => {
      const count = 1000;
      const values: number[] = [];
      for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * 10000);
        if (!values.includes(value)) {
          values.push(value);
        }
      }
      
      // 插入所有值
      values.forEach(v => skipList.insert(v));
      
      expect(skipList.length).toBe(values.length);
      
      // 验证元素有序
      const sortedValues = [...values].sort((a, b) => a - b);
      for (let i = 0; i < sortedValues.length; i++) {
        expect(skipList.get_by_rank(i)).toBe(sortedValues[i]);
        expect(skipList.get_rank(sortedValues[i])).toBe(i);
      }
      
      // 验证首尾元素
      expect(skipList.get_first()).toBe(sortedValues[0]);
      expect(skipList.get_last()).toBe(sortedValues[sortedValues.length - 1]);
    });
    it('不传入比较函数应抛出错误',()=>{
      expect(()=>{
        const skipList = new UseSkipList<object>();
        skipList.insert({ name: 'Alice', age: 30 });
        skipList.insert({ name: 'Bob', age: 25 });
      }).throws('Default compare only supports number/string. Please provide custom compare function.')
    })
    it('删除末尾节点,尾指针需指向前一个节点',()=>{
      skipList.insert(1);
      skipList.insert(2);
      skipList.delete(2);
      expect(skipList.get_last()).toBe(1);
    })
  });
});