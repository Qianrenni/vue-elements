import { describe, it, expect, beforeEach } from 'vitest';
import { UseHeap } from '../../src/utils/useHeap';

describe('UseHeap', () => {
  let minHeap: UseHeap<number>;
  let maxHeap: UseHeap<number>;

  beforeEach(() => {
    minHeap = new UseHeap<number>((a, b) => a < b);
    maxHeap = new UseHeap<number>((a, b) => a > b);
  });

  describe('构造函数和基本属性', () => {
    it('应该正确初始化空堆', () => {
      expect(minHeap.size).toBe(0);
      expect(minHeap.isEmpty()).toBe(true);
    });

    it('应该使用默认比较函数处理数字', () => {
      const heap = new UseHeap<number>();
      heap.add(5);
      heap.add(3);
      heap.add(8);
      expect(heap.pop()).toBe(3); // 最小堆
    });

    it('应该使用默认比较函数处理字符串', () => {
      const heap = new UseHeap<string>();
      heap.add('banana');
      heap.add('apple');
      heap.add('cherry');
      expect(heap.pop()).toBe('apple'); // 字典序最小
    });
  });

  describe('添加和删除元素', () => {
    it('应该正确添加元素到最小堆', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      minHeap.add(1);
      
      expect(minHeap.size).toBe(4);
      expect(minHeap.isEmpty()).toBe(false);
    });

    it('应该正确从最小堆弹出元素', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      minHeap.add(1);
      
      expect(minHeap.pop()).toBe(1);
      expect(minHeap.pop()).toBe(3);
      expect(minHeap.pop()).toBe(5);
      expect(minHeap.pop()).toBe(8);
      expect(minHeap.pop()).toBeUndefined();
    });

    it('应该正确从最大堆弹出元素', () => {
      maxHeap.add(5);
      maxHeap.add(3);
      maxHeap.add(8);
      maxHeap.add(1);
      
      expect(maxHeap.pop()).toBe(8);
      expect(maxHeap.pop()).toBe(5);
      expect(maxHeap.pop()).toBe(3);
      expect(maxHeap.pop()).toBe(1);
      expect(maxHeap.pop()).toBeUndefined();
    });

    it('应该正确查看堆顶元素而不删除', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      
      expect(minHeap.peek()).toBe(3);
      expect(minHeap.size).toBe(3); // 确保元素未被删除
    });

    it('应该在空堆中查看返回undefined', () => {
      expect(minHeap.peek()).toBeUndefined();
    });
  });

  describe('静态方法', () => {
    it('应该正确堆化数组', () => {
      const arr = [5, 3, 8, 1, 9];
      UseHeap.heaplify(arr, (a, b) => a < b);
      
      // 验证堆性质：父节点 <= 子节点
      expect(arr[0]).toBe(1); // 根节点是最小值
      expect(arr[1]).toBe(3);
      expect(arr[2]).toBe(8);
    });

    it('应该正确使用heapPush添加元素', () => {
      const arr: number[] = [];
      UseHeap.heapPush(arr, 5, (a, b) => a < b);
      UseHeap.heapPush(arr, 3, (a, b) => a < b);
      UseHeap.heapPush(arr, 8, (a, b) => a < b);
      
      expect(arr[0]).toBe(3); // 最小值在堆顶
    });

    it('应该正确使用heapPop弹出元素', () => {
      const arr = [1, 3, 8, 5, 9];
      const popped = UseHeap.heapPop(arr, (a, b) => a < b);
      
      expect(popped).toBe(1);
      expect(arr.length).toBe(4);
      expect(arr[0]).toBe(3); // 新的最小值在堆顶
    });

    it('应该正确处理空数组的heapPop', () => {
      const arr: number[] = [];
      const popped = UseHeap.heapPop(arr, (a, b) => a < b);
      
      expect(popped).toBeUndefined();
      expect(arr.length).toBe(0);
    });
  });

  describe('堆排序', () => {
    it('应该正确对数字数组进行升序排序（最小堆）', () => {
      const arr = [5, 3, 8, 1, 9, 2];
      UseHeap.heapSort(arr, (a, b) => a < b);
      
      expect(arr).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it('应该正确对数字数组进行降序排序（最大堆）', () => {
      const arr = [5, 3, 8, 1, 9, 2];
      UseHeap.heapSort(arr, (a, b) => a > b);
      
      expect(arr).toEqual([9, 8, 5, 3, 2, 1]);
    });

    it('应该正确对字符串数组排序', () => {
      const arr = ['banana', 'apple', 'cherry', 'date'];
      UseHeap.heapSort(arr, (a, b) => a < b);
      
      expect(arr).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    it('应该正确使用实例sort方法', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      minHeap.add(1);
      
      minHeap.sort();
      expect(minHeap.toArray()).toEqual([1,3,5,8]); // 由于是最小堆，排序后是降序
      maxHeap.add(1);
      maxHeap.add(3);
      maxHeap.add(8);
      maxHeap.add(5);
      maxHeap.sort();
      expect(maxHeap.toArray()).toEqual([8,5,3,1]);
    });
  });

  describe('toArray和clear方法', () => {
    it('应该返回堆元素的副本', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      
      const arr = minHeap.toArray();
      expect(arr).toEqual([3, 5, 8]); // 堆数组的当前状态
      
      // 修改返回的数组不应影响堆
      arr.push(10);
      expect(minHeap.toArray()).toEqual([3, 5, 8]);
    });

    it('应该正确清空堆', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(8);
      
      minHeap.clear();
      expect(minHeap.size).toBe(0);
      expect(minHeap.isEmpty()).toBe(true);
      expect(minHeap.peek()).toBeUndefined();
    });
  });

  describe('复杂数据类型', () => {
    it('应该支持自定义比较函数的对象', () => {
      interface Person {
        name: string;
        age: number;
      }
      
      const personHeap = new UseHeap<Person>((a, b) => a.age < b.age);
      
      personHeap.add({ name: 'Alice', age: 30 });
      personHeap.add({ name: 'Bob', age: 25 });
      personHeap.add({ name: 'Charlie', age: 35 });
      
      const youngest = personHeap.pop();
      expect(youngest).toEqual({ name: 'Bob', age: 25 });
    });
  });

  describe('边界情况和错误处理', () => {
    it('应该处理重复元素', () => {
      minHeap.add(5);
      minHeap.add(3);
      minHeap.add(3);
      minHeap.add(8);
      
      expect(minHeap.pop()).toBe(3);
      expect(minHeap.pop()).toBe(3);
      expect(minHeap.pop()).toBe(5);
      expect(minHeap.pop()).toBe(8);
    });

    it('应该处理单元素堆', () => {
      minHeap.add(42);
      expect(minHeap.size).toBe(1);
      expect(minHeap.peek()).toBe(42);
      expect(minHeap.pop()).toBe(42);
      expect(minHeap.size).toBe(0);
      expect(minHeap.isEmpty()).toBe(true);
    });

    it('应该处理大量元素', () => {
      const count = 1000;
      for (let i = 0; i < count; i++) {
        minHeap.add(Math.floor(Math.random() * 1000));
      }
      
      expect(minHeap.size).toBe(count);
      
      // 连续弹出所有元素，确保是有序的
      const result: number[] = [];
      while (!minHeap.isEmpty()) {
        result.push(minHeap.pop()!);
      }
      
      // 验证结果是有序的
      for (let i = 1; i < result.length; i++) {
        expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
      }
    });
  });
});