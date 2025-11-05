import {AVLNode, UseAVLTree} from "../../src";
import {beforeEach, describe, expect, it} from "vitest";

describe('AVLTree', () => {
    let tree: UseAVLTree<number>;

    beforeEach(() => {
        tree = new UseAVLTree<number>();
    });

    describe('基本插入与查找', () => {
        it('插入单个元素后 size 为 1', () => {
            tree.insert(10);
            expect(tree.size).toBe(1);
        });

        it('插入重复元素后 count 增加，size 增加', () => {
            tree.insert(10);
            tree.insert(10);
            const node = tree.find(10);
            expect(node).not.toBeNull();
            expect(node!.count).toBe(2);
            expect(tree.size).toBe(2);
        });

        it('查找不存在的元素返回 null', () => {
            expect(tree.find(999)).toBeNull();
        });

        it('has 方法对存在元素返回 true', () => {
            tree.insert(5);
            expect(tree.has(5)).toBe(true);
            expect(tree.has(6)).toBe(false);
        });
    });

    describe('删除操作', () => {
        it('删除不存在的元素返回 false', () => {
            expect(tree.delete(999)).toBe(false);
        });

        it('删除重复元素中的一个，count 减少', () => {
            tree.insert(10);
            tree.insert(10);
            expect(tree.delete(10)).toBe(true);
            const node = tree.find(10);
            expect(node!.count).toBe(1);
            expect(tree.size).toBe(1);
        });

        it('删除最后一个重复元素，节点被移除', () => {
            tree.insert(10);
            tree.insert(10);
            tree.delete(10);
            tree.delete(10);
            expect(tree.find(10)).toBeNull();
            expect(tree.size).toBe(0);
        });
    });

    describe('边界值：min 和 max', () => {
        it('空树 min/max 返回 undefined', () => {
            expect(tree.min()).toBeUndefined();
            expect(tree.max()).toBeUndefined();
        });

        it('插入多个值后 min/max 正确', () => {
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            expect(tree.min()).toBe(3);
            expect(tree.max()).toBe(8);
        });
    });

    describe('中序遍历与 toArray', () => {
        it('toArray 返回升序数组', () => {
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(3); // 重复
            expect(tree.toArray()).toEqual([3, 3, 5, 8]);
        });

        it('toArray 去重功能', () => {
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(3); // 重复
            expect(tree.toArray(true)).toEqual([3, 5, 8]); // unique = true
        });

        it('inOrder 回调按顺序触发', () => {
            const calls: [number, number][] = [];
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(3);
            for(let node of tree.inOrder()){
                calls.push([node.value, node.count]);
            }
            expect(calls).toEqual([
                [3, 2],
                [5, 1],
                [8, 1]
            ]);
        });

        it('inOrder 降序遍历', () => {
            const calls: number[] = [];
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            for(let node of tree.inOrder(false)){ // ascending = false
                calls.push(node.value);
            }
            expect(calls).toEqual([8, 5, 3]);
        });
    });

    describe('前序遍历', () => {
        it('preOrder 左优先遍历', () => {
            // 构建一个特定结构的树
            //       5
            //      / \
            //     3   8
            //    /   /
            //   2   6
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(2);
            tree.insert(6);

            const calls: number[] = [];
            for(let node of tree.preOrder()){ // leftPriority = true (default)
                calls.push(node.value);
            }
            
            // 前序遍历应该是 5, 3, 2, 8, 6
            expect(calls).toEqual([5, 3, 2, 8, 6]);
        });

        it('preOrder 右优先遍历', () => {
            // 使用相同树结构
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(2);
            tree.insert(6);

            const calls: number[] = [];
            for(let node of tree.preOrder(false)){ // leftPriority = false
                calls.push(node.value);
            }
            
            // 右优先前序遍历应该是 5, 8, 6, 3, 2
            expect(calls).toEqual([5, 8, 6, 3, 2]);
        });
    });

    describe('后序遍历', () => {
        it('postOrder 左优先遍历', () => {
            // 使用相同树结构
            //       5
            //      / \
            //     3   8
            //    /   /
            //   2   6
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(2);
            tree.insert(6);

            const calls: number[] = [];
            for(let node of tree.postOrder()){ // leftPriority = true (default)
                calls.push(node.value);
            }
            
            // 后序遍历应该是 2, 3, 6, 8, 5
            expect(calls).toEqual([2, 3, 6, 8, 5]);
        });

        it('postOrder 右优先遍历', () => {
            // 使用相同树结构
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(2);
            tree.insert(6);

            const calls: number[] = [];
            for(let node of tree.postOrder(false)){ // leftPriority = false
                calls.push(node.value);
            }
            
            // 右优先后序遍历应该是 6, 8, 2, 3, 5
            expect(calls).toEqual([6, 8, 2, 3, 5]);
        });
    });

    describe('树平衡性验证', () => {
        it('插入序列后树保持平衡', () => {
            // 插入会触发 LL/RR/LR/RL 旋转的序列
            const values = [10, 20, 30, 40, 50, 25]; // 经典右右 -> 左旋
            values.forEach(v => tree.insert(v));

            // 检查是否仍为 AVL（内部 isBalanced 应为 true）
            // 注意：isBalanced 是 private，你可以临时改为 public 测试，或通过反射访问
            // 或者：你可以在测试时临时暴露它，或写一个测试专用子类

            // 方法一：反射（不推荐用于生产，但测试可用）
            const isBalanced = (tree as any).isBalanced();
            expect(isBalanced).toBe(true);

            // 方法二（推荐）：在 AVLTree 类中加一个仅供测试的方法
            // 例如：public _testIsBalanced() { return this.isBalanced(); }
            // 然后调用：expect(tree._testIsBalanced()).toBe(true);
        });

        it('删除后树保持平衡', () => {
            const values = [10, 20, 30, 40, 50, 25];
            values.forEach(v => tree.insert(v));
            tree.delete(30);
            const isBalanced = (tree as any).isBalanced();
            expect(isBalanced).toBe(true);
        });

        it('大量插入后仍保持平衡', () => {
            // 插入大量数据以测试平衡性
            for (let i = 1; i <= 100; i++) {
                tree.insert(i);
            }
            
            const isBalanced = (tree as any).isBalanced();
            expect(isBalanced).toBe(true);
            expect(tree.size).toBe(100);
        });
    });

    describe('自定义比较函数', () => {
        it('支持字符串按长度排序', () => {
            const lenCompare = (a: string, b: string) => a.length - b.length;
            const strTree = new UseAVLTree<string>(lenCompare);

            strTree.insert("a");
            strTree.insert("bb");
            strTree.insert("ccc");
            strTree.insert("bb"); // 重复

            expect(strTree.toArray()).toEqual(["a", "bb", "bb", "ccc"]);
            expect(strTree.min()).toBe("a");
            expect(strTree.max()).toBe("ccc");
        });

        it('不传比较函数时，number 正常工作', () => {
            const numTree = new UseAVLTree<number>();
            numTree.insert(3);
            numTree.insert(1);
            numTree.insert(2);
            expect(numTree.toArray()).toEqual([1, 2, 3]);
        });

        it('不传比较函数时，string 正常工作', () => {
            const strTree = new UseAVLTree<string>();
            strTree.insert("banana");
            strTree.insert("apple");
            strTree.insert("cherry");
            expect(strTree.toArray()).toEqual(["apple", "banana", "cherry"]);
        });
    });

    describe('clear 和 isEmpty', () => {
        it('clear 后树为空', () => {
            tree.insert(1);
            tree.clear();
            expect(tree.isEmpty()).toBe(true);
            expect(tree.size).toBe(0);
        });
    });

    describe('其他功能测试', () => {
        it('getHeight 方法测试', () => {
            expect(tree.isEmpty()).toBe(true);
            
            tree.insert(10);
            tree.insert(5);
            tree.insert(15);
            tree.insert(3);
            tree.insert(7);
            
            // 反射获取私有方法 getHeight
            const getHeight = (tree as any).getHeight.bind(tree);
            const height = getHeight();
            expect(height).toBeGreaterThanOrEqual(3); // 至少3层高度
        });

        it('不同数据类型的测试', () => {
            // 测试使用自定义比较函数的对象
            const objTree = new UseAVLTree<{id: number, name: string}>((a, b) => a.id - b.id);
            
            objTree.insert({id: 3, name: 'Charlie'});
            objTree.insert({id: 1, name: 'Alice'});
            objTree.insert({id: 2, name: 'Bob'});
            
            expect(objTree.min()).toEqual({id: 1, name: 'Alice'});
            expect(objTree.max()).toEqual({id: 3, name: 'Charlie'});
            expect(objTree.toArray()).toEqual([
                {id: 1, name: 'Alice'},
                {id: 2, name: 'Bob'},
                {id: 3, name: 'Charlie'}
            ]);
        });

        it('性能测试 - 大量数据插入', () => {
            const start = performance.now();
            
            // 插入1000个随机数
            for (let i = 0; i < 1000; i++) {
                tree.insert(Math.floor(Math.random() * 10000));
            }
            
            const end = performance.now();
            
            // 确保操作在合理时间内完成（不超过1秒）
            expect(end - start).toBeLessThan(1000);
            expect(tree.size).toBe(1000);
        });
    });

    describe('节点池功能（可选测试）', () => {
        it('节点池在删除后回收节点', () => {
            const poolTree = new UseAVLTree<number>(undefined, 2);
            poolTree.insert(1);
            poolTree.insert(2);
            poolTree.delete(1);
            poolTree.delete(2);

            // 反射访问私有属性测试
            const pool = (poolTree as any).nodePool as AVLNode<number>[];
            expect(pool.length).toBe(2);
        });
    });

    // 添加缺失的测试用例以提高覆盖率
    describe('缺失的测试用例', () => {
        it('应该测试默认比较函数抛出错误的情况', () => {
            // 创建一个不提供比较函数的树，使用对象类型会触发错误
            expect(() => {
                const tree = new UseAVLTree<object>();
                tree.insert({a: 1});
                tree.insert({b: 2});
            }).toThrow('Default compare only supports number/string. Please provide custom compare function.');
        });

        it('应该测试 inOrder 降序遍历（右->根->左）', () => {
            const tree = new UseAVLTree<number>();
            tree.insert(5);
            tree.insert(3);
            tree.insert(7);
            
            const result: number[] = [];
            for (const node of tree.inOrder(false)) {
                result.push(node.value);
            }
            
            expect(result).toEqual([7, 5, 3]);
        });

        it('应该测试 preOrder 右优先遍历（根->右->左）', () => {
            const tree = new UseAVLTree<number>();
            tree.insert(5);
            tree.insert(3);
            tree.insert(7);
            tree.insert(2);
            tree.insert(4);
            tree.insert(6);
            tree.insert(8);
            
            const result: number[] = [];
            for (const node of tree.preOrder(false)) {
                result.push(node.value);
            }
            
            expect(result).toEqual([5, 7, 8, 6, 3, 4, 2]);
        });

        it('应该测试 postOrder 右优先遍历（右->左->根）', () => {
            const tree = new UseAVLTree<number>();
            tree.insert(5);
            tree.insert(3);
            tree.insert(7);
            tree.insert(2);
            tree.insert(4);
            tree.insert(6);
            tree.insert(8);
            
            const result: number[] = [];
            for (const node of tree.postOrder(false)) {
                result.push(node.value);
            }
            
            expect(result).toEqual([8, 6, 7, 4, 2, 3, 5]);
        });

        it('应该测试 toArray 去重功能', () => {
            const tree = new UseAVLTree<number>();
            tree.insert(5);
            tree.insert(3);
            tree.insert(5);
            tree.insert(7);
            tree.insert(3);
            
            const resultWithDuplicates = tree.toArray(false);
            const resultWithoutDuplicates = tree.toArray(true);
            
            expect(resultWithDuplicates).toEqual([3, 3, 5, 5, 7]);
            expect(resultWithoutDuplicates).toEqual([3, 5, 7]);
        });

        it('应该测试 getHeight 方法', () => {
            const tree = new UseAVLTree<number>();
            
            // 空树的高度为0
            const emptyHeight = (tree as any).getHeight();
            expect(emptyHeight).toBe(0);
            
            // 插入节点后检查高度
            tree.insert(10);
            const height1 = (tree as any).getHeight();
            expect(height1).toBe(1);
            
            tree.insert(5);
            tree.insert(15);
            const height2 = (tree as any).getHeight();
            expect(height2).toBe(2);
        });

        it('应该测试 isBalanced 方法', () => {
            const tree = new UseAVLTree<number>();
            
            // 空树是平衡的
            expect((tree as any).isBalanced()).toBe(true);
            
            // 插入一些节点并检查平衡性
            tree.insert(10);
            tree.insert(5);
            tree.insert(15);
            expect((tree as any).isBalanced()).toBe(true);
            
            // 插入更多节点触发旋转
            tree.insert(3);
            tree.insert(7);
            tree.insert(12);
            tree.insert(17);
            expect((tree as any).isBalanced()).toBe(true);
        });

        it('应该测试 getNodeHeight 方法', () => {
            const tree = new UseAVLTree<number>();
            
            // null 节点的高度为 0
            expect((tree as any).getNodeHeight(null)).toBe(0);
            
            // 插入节点并检查高度
            tree.insert(10);
            const root = (tree as any).root;
            expect((tree as any).getNodeHeight(root)).toBe(1);
        });

        it('应该测试 getBalanceFactor 方法', () => {
            const tree = new UseAVLTree<number>();
            
            // null 节点的平衡因子为 0
            expect((tree as any).getBalanceFactor(null)).toBe(0);
            
            // 插入节点并检查平衡因子
            tree.insert(10);
            const root = (tree as any).root;
            expect((tree as any).getBalanceFactor(root)).toBe(0);
        });
    });
});