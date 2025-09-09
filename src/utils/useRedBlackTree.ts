// 节点颜色枚举
enum Color {
    RED = 'RED',
    BLACK = 'BLACK'
}

// 比较函数类型
type Comparator<T> = (a: T, b: T) => number;
// 返回值：负数（a < b）、0（a = b）、正数（a > b）

// 默认比较函数（适用于数字和字符串）
function defaultComparator<T>(a: T, b: T): number {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

/**
 * 红黑树节点类
 * count: 表示当前 value 的重复次数（频次）
 */
class RBTreeNode<T> {
    public color: Color;
    public left: RBTreeNode<T>;
    public right: RBTreeNode<T>;
    public parent: RBTreeNode<T>;
    public count: number; // value 重复次数，不是子树大小

    constructor(
        public value: T,
        nilNode: RBTreeNode<T>,
        color: Color = Color.RED,
        count: number = 1
    ) {
        this.color = color;
        this.left = nilNode;
        this.right = nilNode;
        this.parent = nilNode;
        this.count = count;
    }

    /**
     * 判断是否为哨兵节点（NIL）
     */
    public get isNil(): boolean {
        return this.value === undefined;
    }

    /**
     * 增加重复计数
     */
    public increment(): void {
        this.count++;
    }

    /**
     * 减少重复计数
     * @returns 是否减到0（需要物理删除）
     */
    public decrement(): boolean {
        this.count--;
        return this.count === 0;
    }
}

/**
 *红黑树性质：
 * 1. 每个节点是红色或黑色
 * 2. 根节点是黑色
 * 3. 所有叶子节点（NIL）是黑色
 * 4. 如果一个节点是红色，则它的两个子节点都是黑色（无连续红节点）
 * 5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点
 * 红黑树实现类，支持重复值存储
 *
 * 具有自动平衡特性，保证操作的时间复杂度为O(log n)。
 * 与普通二叉搜索树不同的是，该实现支持存储重复值，通过节点的count属性记录相同值的出现次数，
 * 避免为每个重复值创建新节点，节省内存空间。
 *
 * @template T 节点值的类型
 */
class UseRedBlackTree<T> {
    private pool: RBTreeNode<T>[] = [];
    private readonly POOL_SIZE: number;
    private root: RBTreeNode<T>;
    private nodeCount: number = 0; // 实际不同 value 的节点数
    private totalCount: number = 0; // 所有 value（含重复）的总数
    private readonly comparator: Comparator<T>;
    private readonly NIL: RBTreeNode<T>; // 哨兵节点，永不为 null

    /**
     * 构造函数
     * @param comparator 比较函数，默认为默认比较函数
     * @param poolSize 节点池大小
     */
    constructor(comparator?: Comparator<T>, poolSize: number = 16) {
        this.comparator = comparator || defaultComparator;
        this.POOL_SIZE = poolSize;
        // 创建哨兵节点
        this.NIL = new RBTreeNode<T>(undefined as unknown as T, null as unknown as RBTreeNode<T>);
        this.NIL.color = Color.BLACK;
        this.NIL.left = this.NIL;
        this.NIL.right = this.NIL;
        this.NIL.parent = this.NIL;
        this.NIL.count = 0;

        this.root = this.NIL;
    }

    /**
     * 插入值（重复则 count++，不创建新节点）
     * @returns 实际插入的新节点数（0=重复值计数+1，1=新增节点）
     */
    public insert(value: T): number {
        let parent = this.NIL;
        let current = this.root;

        // 查找插入位置或重复节点
        while (!current.isNil) {
            parent = current;
            const cmp = this.comparator(value, current.value);

            if (cmp === 0) {
                // 重复值：只增加 count
                current.increment();
                this.totalCount++;
                return 0; // 未创建新节点
            }

            if (cmp < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // 新值：创建节点
        const newNode = this.createNode(value);
        newNode.parent = parent;

        if (parent.isNil) {
            this.root = newNode;
        } else if (this.comparator(value, parent.value) < 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        this.insertFixup(newNode);
        this.nodeCount++;
        this.totalCount++;

        return 1; // 创建了新节点
    }

    /**
     * 删除值（count--，为0时物理删除）
     * @returns 是否成功删除（false=值不存在）
     */
    public delete(value: T): boolean {
        const node = this.findNode(value);
        if (!node) return false;

        if (node.count > 1) {
            // 重复值：只减少 count
            node.decrement();
            this.totalCount--;
            return true;
        }

        // 物理删除节点
        this.deleteNode(node);
        return true;
    }

    /**
     * 是否包含值
     */
    public contains(value: T): boolean {
        return this.findNode(value) !== null;
    }

    /**
     * 获取值的出现次数
     */
    public getCount(value: T): number {
        const node = this.findNode(value);
        return node ? node.count : 0;
    }

    /**
     * 获取不同值的节点数
     */
    public getNodeCount(): number {
        return this.nodeCount;
    }

    /**
     * 获取所有值的总数量（含重复）
     */
    public getTotalCount(): number {
        return this.totalCount;
    }

    /**
     * 是否为空
     */
    public isEmpty(): boolean {
        return this.nodeCount === 0;
    }

    /**
     * 中序遍历（重复值按 count 次输出）
     */
    public inorderTraversal(callback: (value: T) => void): void {
        this.inorderTraversalHelper(this.root, callback);
    }

    /**
     * 转为数组（重复值重复出现）
     */
    public toArray(): T[] {
        const result: T[] = [];
        this.inorderTraversal(value => result.push(value));
        return result;
    }

    /**
     * 清空树
     */
    public clear(): void {
        this.root = this.NIL;
        this.nodeCount = 0;
        this.totalCount = 0;
    }

    /**
     * 验证红黑树性质（调试用）
     */
    public validate(): boolean {
        if (this.root.isNil) return true;
        if (this.root.color !== Color.BLACK) {
            console.error('根节点不是黑色');
            return false;
        }

        try {
            this.validateHelper(this.root);
            return true;
        } catch (error) {
            console.error('红黑树验证失败:', error);
            return false;
        }
    }

    /**
     * 创建新节点（自动关联 NIL）
     */
    private createNode(value: T, count: number = 1): RBTreeNode<T> {
        if (this.pool.length > 0) {
            let node = this.pool.pop()!;
            node.value = value;
            node.count = count;
            node.left = this.NIL;
            node.right = this.NIL;
            node.parent = this.NIL;
            node.color = Color.RED;
            return node;
        }
        return new RBTreeNode<T>(value, this.NIL, Color.RED, count);
    }

    private recycleNode(node: RBTreeNode<T>): void {
        node.parent = this.NIL;
        node.left = this.NIL;
        node.right = this.NIL;
        node.value = undefined as unknown as T;
        if (this.pool.length < this.POOL_SIZE) {
            this.pool.push(node);
        }
    }

    /**
     * 左旋操作
     */
    private rotateLeft(x: RBTreeNode<T>): void {
        const y = x.right;

        x.right = y.left;
        if (!y.left.isNil) {
            y.left.parent = x;
        }

        y.parent = x.parent;
        if (x.parent.isNil) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    /**
     * 右旋操作
     */
    private rotateRight(y: RBTreeNode<T>): void {
        const x = y.left;

        y.left = x.right;
        if (!x.right.isNil) {
            x.right.parent = y;
        }

        x.parent = y.parent;
        if (y.parent.isNil) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        x.right = y;
        y.parent = x;
    }

    /**
     * 插入后修复红黑树性质
     */
    private insertFixup(node: RBTreeNode<T>): void {
        // 1. 父节点为红色
        while (node.parent.color === Color.RED) {
            // 2. 父节点为左侧
            if (node.parent === node.parent.parent.left) {
                const uncle = node.parent.parent.right;
                // 3. 叔节点为红色
                if (uncle.color === Color.RED) {
                    node.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node.parent.parent.color = Color.RED;
                    node = node.parent.parent;
                } else {
                    // 4. 叔节点为黑色，且为父节点的右侧, 则左旋 统一 处理
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    // 5. 叔节点为黑色，且为父节点的左侧
                    node.parent.color = Color.BLACK;
                    node.parent.parent.color = Color.RED;
                    this.rotateRight(node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent.left;

                if (uncle.color === Color.RED) {
                    node.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node.parent.parent.color = Color.RED;
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = Color.BLACK;
                    node.parent.parent.color = Color.RED;
                    this.rotateLeft(node.parent.parent);
                }
            }
        }

        this.root.color = Color.BLACK;
    }

    /**
     * 查找节点（精确匹配 value）
     */
    private findNode(value: T): RBTreeNode<T> | null {
        let current = this.root;
        while (!current.isNil) {
            const cmp = this.comparator(value, current.value);
            if (cmp === 0) return current;
            if (cmp < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    /**
     * 物理删除节点（内部使用）
     */
    private deleteNode(node: RBTreeNode<T>): void {

        // 当前节点,预备替换
        let y = node;

        let x: RBTreeNode<T>;
        // 获取节点的初始颜色
        let yOriginalColor = y.color;

        // 左节点 为空
        if (node.left.isNil) {
            x = node.right;
            // 用右节点 替换当前节点
            this.transplant(node, node.right);
        } else if (node.right.isNil) {
            x = node.left;
            // 用左节点 替换当前节点
            this.transplant(node, node.left);
        } else {
            // 获取右子树最小节点, 并替换当前节点
            y = this.minimum(node.right);
            yOriginalColor = y.color;
            // x 为 y 的右节点
            x = y.right;
            // 如果 y 是 node 的右节点,且没有左节点
            if (y.parent === node) {
                // y 是 node 的直接右孩子，x 是 y 的右孩子
                // 在 transplant(node, y) 后，y 会占据 node 的位置，x 成为 y 的右孩子
                // 所以 x.parent 应指向 y（即将成为其父节点）
                x.parent = y;
            } else {
                // y 在右子树深处，先将 y 从原位置移除
                this.transplant(y, y.right);
                // 将 node 的右子树交给 y（y 即将替换 node）
                y.right = node.right;
                y.right.parent = y; // 设置新右子树的父指针
            }

            this.transplant(node, y);
            y.left = node.left;
            y.left.parent = y;
            y.color = node.color;
        }

        if (yOriginalColor === Color.BLACK) {
            this.deleteFixup(x);
        }

        this.nodeCount--;
        this.totalCount--;
        this.recycleNode(node);
    }

    /**
     * 节点替换操作
     */
    private transplant(u: RBTreeNode<T>, v: RBTreeNode<T>): void {
        // 断开 v 的旧父子关系（生产级加固）
        if (!v.isNil && !v.parent.isNil) {
            if (v.parent.left === v) {
                v.parent.left = this.NIL;
            } else if (v.parent.right === v) {
                v.parent.right = this.NIL;
            }
        }

        // 替换：把 v 挂到 u 的位置
        if (u.parent.isNil) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }

        // 设置 v 的新父节点
        v.parent = u.parent;
    }

    /**
     * 查找最小节点
     */
    private minimum(node: RBTreeNode<T>): RBTreeNode<T> {
        while (!node.left.isNil) {
            node = node.left;
        }
        return node;
    }

    /**
     * 删除后修复
     */
    private deleteFixup(node: RBTreeNode<T>): void {
        while (node !== this.root && node.color === Color.BLACK) {
            if (node === node.parent.left) {
                let sibling = node.parent.right;

                if (sibling.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    node.parent.color = Color.RED;
                    this.rotateLeft(node.parent);
                    sibling = node.parent.right;
                }

                if (sibling.left.color === Color.BLACK && sibling.right.color === Color.BLACK) {
                    sibling.color = Color.RED;
                    node = node.parent;
                } else {
                    if (sibling.right.color === Color.BLACK) {
                        sibling.left.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateRight(sibling);
                        sibling = node.parent.right;
                    }

                    sibling.color = node.parent.color;
                    node.parent.color = Color.BLACK;
                    sibling.right.color = Color.BLACK;
                    this.rotateLeft(node.parent);
                    node = this.root;
                }
            } else {
                let sibling = node.parent.left;

                if (sibling.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    node.parent.color = Color.RED;
                    this.rotateRight(node.parent);
                    sibling = node.parent.left;
                }

                if (sibling.right.color === Color.BLACK && sibling.left.color === Color.BLACK) {
                    sibling.color = Color.RED;
                    node = node.parent;
                } else {
                    if (sibling.left.color === Color.BLACK) {
                        sibling.right.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateLeft(sibling);
                        sibling = node.parent.left;
                    }

                    sibling.color = node.parent.color;
                    node.parent.color = Color.BLACK;
                    sibling.left.color = Color.BLACK;
                    this.rotateRight(node.parent);
                    node = this.root;
                }
            }
        }

        node.color = Color.BLACK;
    }

    private inorderTraversalHelper(node: RBTreeNode<T>, callback: (value: T) => void): void {
        if (node.isNil) return;

        this.inorderTraversalHelper(node.left, callback);
        for (let i = 0; i < node.count; i++) {
            callback(node.value);
        }
        this.inorderTraversalHelper(node.right, callback);
    }

    private validateHelper(node: RBTreeNode<T>): number {
        if (node.isNil) return 1;

        if (node.color === Color.RED) {
            if (node.left.color === Color.RED || node.right.color === Color.RED) {
                throw new Error(`红节点 ${node.value} 有红子节点`);
            }
        }

        const leftHeight = this.validateHelper(node.left);
        const rightHeight = this.validateHelper(node.right);

        if (leftHeight !== rightHeight) {
            throw new Error(`节点 ${node.value} 黑高不等: ${leftHeight} vs ${rightHeight}`);
        }

        return leftHeight + (node.color === Color.BLACK ? 1 : 0);
    }
}

export {UseRedBlackTree, RBTreeNode, Color, Comparator};