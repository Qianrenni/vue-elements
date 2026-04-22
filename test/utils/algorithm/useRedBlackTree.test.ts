import { Color, Comparator, UseRedBlackTree } from '@/utils';
import {beforeEach, describe, expect, it} from 'vitest';
// 辅助函数：获取树中所有值（含重复），按中序
function getAllValues<T>(tree: UseRedBlackTree<T>): T[] {
    const result: T[] = [];
    tree.inorderTraversal(value => result.push(value));
    return result;
}

describe('RedBlackTree', () => {
    let tree: UseRedBlackTree<number>;

    beforeEach(() => {
        tree = new UseRedBlackTree<number>();
    });

    describe('基本插入与结构', () => {
        it('空树应返回正确状态', () => {
            expect(tree.isEmpty()).toBe(true);
            expect(tree.getNodeCount()).toBe(0);
            expect(tree.getTotalCount()).toBe(0);
            expect(tree.contains(5)).toBe(false);
            expect(tree.getCount(5)).toBe(0);
            expect(getAllValues(tree)).toEqual([]);
            expect(tree.validate()).toBe(true); // 空树合法
        });

        it('插入单个节点', () => {
            tree.insert(10);
            expect(tree.isEmpty()).toBe(false);
            expect(tree.getNodeCount()).toBe(1);
            expect(tree.getTotalCount()).toBe(1);
            expect(tree.contains(10)).toBe(true);
            expect(tree.getCount(10)).toBe(1);
            expect(getAllValues(tree)).toEqual([10]);
            expect(tree.validate()).toBe(true);
        });

        it('插入重复值应增加 count，不增加节点数', () => {
            tree.insert(10);
            expect(tree.insert(10)).toBe(0); // 未创建新节点
            expect(tree.getNodeCount()).toBe(1);
            expect(tree.getTotalCount()).toBe(2);
            expect(tree.getCount(10)).toBe(2);
            expect(getAllValues(tree)).toEqual([10, 10]);
            expect(tree.validate()).toBe(true);
        });

        it('插入多个不同值应保持有序', () => {
            tree.insert(3);
            tree.insert(1);
            tree.insert(4);
            tree.insert(1); // 重复
            tree.insert(5);
            tree.insert(9);
            tree.insert(2);
            tree.insert(6);

            expect(tree.getNodeCount()).toBe(7); // 1,2,3,4,5,6,9（1重复）
            expect(tree.getTotalCount()).toBe(8);
            expect(getAllValues(tree)).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
            expect(tree.validate()).toBe(true);
        });
    });

    describe('删除操作', () => {
        it('删除不存在的值应返回 false', () => {
            expect(tree.delete(999)).toBe(false);
            expect(tree.isEmpty()).toBe(true);
        });

        it('删除重复值应减少 count，不删除节点', () => {
            tree.insert(10);
            tree.insert(10);
            expect(tree.delete(10)).toBe(true);
            expect(tree.getNodeCount()).toBe(1);
            expect(tree.getTotalCount()).toBe(1);
            expect(tree.getCount(10)).toBe(1);
            expect(getAllValues(tree)).toEqual([10]);
            expect(tree.validate()).toBe(true);
        });

        it('删除至 count=0 应物理删除节点', () => {
            tree.insert(10);
            tree.insert(10);
            expect(tree.delete(10)).toBe(true); // count=1
            expect(tree.delete(10)).toBe(true); // count=0，物理删除
            expect(tree.getNodeCount()).toBe(0);
            expect(tree.getTotalCount()).toBe(0);
            expect(tree.contains(10)).toBe(false);
            expect(getAllValues(tree)).toEqual([]);
            expect(tree.validate()).toBe(true);
        });

        it('删除复杂树中的节点并保持性质', () => {
            const values = [7, 3, 18, 10, 22, 8, 11, 26];
            values.forEach(v => tree.insert(v));

            expect(tree.validate()).toBe(true);

            // 删除叶子节点
            expect(tree.delete(8)).toBe(true);
            expect(tree.validate()).toBe(true);

            // 删除有单孩子的节点
            expect(tree.delete(22)).toBe(true);
            expect(tree.validate()).toBe(true);

            // 删除有双孩子的节点（会找后继）
            expect(tree.delete(18)).toBe(true);
            expect(tree.validate()).toBe(true);

            // 最终验证结构
            expect(getAllValues(tree)).toEqual([3, 7, 10, 11, 26]);
        });
    });

    describe('边界与压力测试', () => {
        it('插入升序序列（应触发多次旋转）', () => {
            for (let i = 1; i <= 100; i++) {
                tree.insert(i);
                expect(tree.validate()).toBe(true); // 每次插入后都应合法
            }
            expect(tree.getTotalCount()).toBe(100);
            expect(tree.getNodeCount()).toBe(100);
            expect(getAllValues(tree).length).toBe(100);
        });

        it('插入降序序列', () => {
            for (let i = 100; i >= 1; i--) {
                tree.insert(i);
                expect(tree.validate()).toBe(true);
            }
            const values = getAllValues(tree);
            for (let i = 0; i < values.length; i++) {
                expect(values[i]).toBe(i + 1);
            }
        });

        it('交替插入删除保持平衡', () => {
            const ops = [
                () => tree.insert(10),
                () => tree.insert(20),
                () => tree.delete(10),
                () => tree.insert(5),
                () => tree.insert(15),
                () => tree.delete(20),
                () => tree.insert(17),
                () => tree.delete(5),
            ];

            ops.forEach((op, i) => {
                op();
                expect(tree.validate(), `操作 ${i} 后树非法`).toBe(true);
            });
        });

        it('清空树后应恢复初始状态', () => {
            tree.insert(1);
            tree.insert(2);
            tree.clear();
            expect(tree.isEmpty()).toBe(true);
            expect(tree.getNodeCount()).toBe(0);
            expect(tree.getTotalCount()).toBe(0);
            expect(tree.validate()).toBe(true);
        });
    });

    describe('自定义比较器支持', () => {
        it('支持字符串按长度比较', () => {
            const lenComparator: Comparator<string> = (a, b) => a.length - b.length;
            const strTree = new UseRedBlackTree<string>(lenComparator);

            strTree.insert("a");
            strTree.insert("bb");
            strTree.insert("ccc");
            strTree.insert("bb"); // 重复

            expect(strTree.getTotalCount()).toBe(4);
            expect(strTree.getNodeCount()).toBe(3);
            expect(getAllValues(strTree)).toEqual(["a", "bb", "bb", "ccc"]);
            expect(strTree.validate()).toBe(true);
        });

        it('支持对象按属性比较', () => {
            interface Person {
                name: string;
                age: number;
            }

            const personComparator: Comparator<Person> = (a, b) => a.age - b.age;
            const personTree = new UseRedBlackTree<Person>(personComparator);

            personTree.insert({name: "Alice", age: 30});
            personTree.insert({name: "Bob", age: 25});
            personTree.insert({name: "Charlie", age: 35});
            personTree.insert({name: "Bob", age: 25}); // 重复

            const values = getAllValues(personTree);
            expect(values.map(p => p.age)).toEqual([25, 25, 30, 35]);
            expect(personTree.validate()).toBe(true);
        });
    });

    describe('验证红黑树五大性质（深度验证）', () => {
        it('根节点必须为黑色', () => {
            tree.insert(10);
            expect(tree['root'].color).toBe(Color.BLACK);
        });

        it('红色节点的子节点必须为黑色', () => {
            // 插入会触发修复，我们信任 validate()，但可手动构造测试
            // 本测试依赖 validate() 的内部检查
            tree.insert(10);
            tree.insert(5);
            tree.insert(15);
            expect(tree.validate()).toBe(true);
        });

        it('所有路径黑色节点数相等', () => {
            // 同样依赖 validate() 内部的黑高检查
            for (let i = 1; i <= 15; i++) {
                tree.insert(i);
            }
            expect(tree.validate()).toBe(true);
        });

        it('validate() 应能检测非法颜色', () => {
            tree.insert(10);
            tree.insert(5);

            // 手动破坏：设左孩子为红色（若父也是红则非法）
            if (!tree['root'].left.isNil) {
                tree['root'].left.color = Color.RED;
                console.log('手动篡改root颜色')
                tree['root'].color = Color.RED; // 根变红 —— 非法！
            }

            expect(tree.validate()).toBe(false);
        });
    });

    describe('遍历与 toArray', () => {
        it('inorderTraversal 应按升序访问所有重复值', () => {
            tree.insert(3);
            tree.insert(1);
            tree.insert(1);
            tree.insert(2);

            const visited: number[] = [];
            tree.inorderTraversal(x => visited.push(x));
            expect(visited).toEqual([1, 1, 2, 3]);
        });

        it('toArray 应返回与 inorderTraversal 相同结果', () => {
            tree.insert(5);
            tree.insert(3);
            tree.insert(7);
            tree.insert(3);

            const arr = tree.toArray();
            const visited: number[] = [];
            tree.inorderTraversal(x => visited.push(x));

            expect(arr).toEqual(visited);
        });
    });
    // ========== 节点池专项测试 ==========
    describe('节点池（Pool）功能测试', () => {
        let tree: UseRedBlackTree<number>;

        beforeEach(() => {
            // 使用小池子便于观察
            tree = new UseRedBlackTree<number>(undefined, 3); // poolSize = 3
        });

        it('删除节点应进入池中（物理删除后）', () => {
            tree.insert(10);
            tree.insert(20);
            expect(tree.getNodeCount()).toBe(2);

            const poolBefore = (tree as any).pool.length; // 0
            expect(tree.delete(10)).toBe(true); // 物理删除
            const poolAfter = (tree as any).pool.length;
            expect(poolAfter).toBe(poolBefore + 1); // 池中多一个节点
        });

        it('插入时应优先复用池中节点', () => {
            tree.insert(10);
            tree.delete(10); // 节点进入池
            expect((tree as any).pool.length).toBe(1);

            // 插入新值，应复用池中节点
            const beforePoolLength = (tree as any).pool.length;
            tree.insert(999);
            const afterPoolLength = (tree as any).pool.length;

            expect(afterPoolLength).toBe(beforePoolLength - 1); // 池中少一个
        });

        it('池大小不应超过 POOL_SIZE', () => {
            // 插入并删除 5 个节点，池大小上限为 3
            for (let i = 1; i <= 5; i++) {
                tree.insert(i);
            }
            for (let i = 1; i <= 5; i++) {
                tree.delete(i);
            }

            expect((tree as any).pool.length).toBe(3); // 最大为 3
        });

        it('复用节点时属性应被正确重置', () => {
            tree.insert(100);
            const nodeAddr = (tree as any).root; // 记录地址

            tree.delete(100); // 回收
            tree.insert(200); // 复用

            const reusedNode = (tree as any).root;
            expect(reusedNode).toBe(nodeAddr); // 同一个对象（地址相同）

            // 验证属性被重置
            expect(reusedNode.value).toBe(200);
            expect(reusedNode.count).toBe(1);
            expect(reusedNode.left === (tree as any).NIL).toBe(true);
            expect(reusedNode.right === (tree as any).NIL).toBe(true);
            expect(reusedNode.parent === (tree as any).NIL).toBe(true);
        });

        it('复用节点不应影响树结构和性质', () => {
            // 插入 -> 删除 -> 插入（触发复用）
            tree.insert(50);
            tree.delete(50);
            tree.insert(30);
            tree.insert(70);

            // 验证树结构正确
            expect(tree.toArray()).toEqual([30, 70]);
            expect(tree.validate()).toBe(true);

            // 再次删除并插入
            tree.delete(30);
            tree.insert(20);
            tree.insert(40);

            expect(tree.toArray()).toEqual([20, 40, 70]);
            expect(tree.validate()).toBe(true);
        });

        it('清空树时池应被清空（可选行为，根据你的设计）', () => {
            tree.insert(1);
            tree.insert(2);
            tree.delete(1);
            tree.delete(2);

            expect((tree as any).pool.length).toBeGreaterThan(0);

            tree.clear();

            // 👇 根据你的当前实现，clear() 不清空池 —— 是否合理？
            // 如果你希望 clear 也清空池，需修改 clear 方法
            // 目前你的 clear() 只重置 root/nodeCount/totalCount

            // 如果你希望测试“clear 后池清空”，请取消下面注释并修改实现
            // expect((tree as any).pool.length).toBe(0);

            // 目前行为：池不清空 —— 也是合理的（保留池供下次使用）
            expect((tree as any).pool.length).toBeGreaterThan(0);
        });

        // 可选：测试池中节点不会被外部修改影响
        it('池中节点隔离性测试（高级）', () => {
            tree.insert(10);
            const originalNode = (tree as any).root;
            tree.delete(10);

            // 尝试修改池中节点（模拟污染）
            originalNode.value = 999;
            originalNode.color = Color.BLACK;
            originalNode.left = null as any;

            // 重新插入
            tree.insert(50);
            const reusedNode = (tree as any).root;

            // 即使之前被污染，插入时应被重置！
            expect(reusedNode.value).toBe(50); // 不是 999
            expect(reusedNode.left === (tree as any).NIL).toBe(true); // 不是 null
            expect(tree.validate()).toBe(true);
        });
    });
});