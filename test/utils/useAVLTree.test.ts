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

        it('inOrder 回调按顺序触发', () => {
            const calls: [number, number][] = [];
            tree.insert(5);
            tree.insert(3);
            tree.insert(8);
            tree.insert(3);
            tree.inOrder((v, c) => calls.push([v, c]));
            expect(calls).toEqual([
                [3, 2],
                [5, 1],
                [8, 1]
            ]);
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
});