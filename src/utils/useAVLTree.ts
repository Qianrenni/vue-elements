/**
 * AVL 树节点
 */
export class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null = null;
    right: AVLNode<T> | null = null;
    height: number = 1; // 节点高度（叶子为1）
    count: number = 1;  // 重复元素计数（支持重复值）

    constructor(value: T) {
        this.value = value;
    }
}

/**
 * 自平衡二叉搜索树（AVL Tree），支持自定义比较函数。
 *
 * 默认按自然顺序排序（仅适用于 number/string），生产环境建议显式传入 compare 函数。
 *
 * 支持重复值（内部计数器优化存储）。
 *
 * @template T 树中元素类型
 */
export class UseAVLTree<T> {
    private POOL_SIZE: number;
    // 节点池，用于复用节点
    private nodePool: AVLNode<T>[] = [];
    // 根节点
    private root: AVLNode<T> | null = null;
    /**
     * 比较函数：定义元素大小关系
     * - 返回负数：a < b
     * - 返回 0：a === b
     * - 返回正数：a > b
     */
    private compare: (a: T, b: T) => number;

    /**
     * 构造函数
     *
     * @param compare 自定义比较函数。默认使用自然排序（仅适用于 number/string）
     * @param POOL_SIZE 节点池大小
     */
    constructor(compare?: (a: T, b: T) => number, POOL_SIZE = 16) {
        this.POOL_SIZE = POOL_SIZE;
        if (compare) {
            this.compare = compare;
        } else {
            // 默认比较函数（仅对 number/string 安全）
            this.compare = (a, b) => {
                if (typeof a === 'number' && typeof b === 'number') {
                    return a - b;
                }
                if (typeof a === 'string' && typeof b === 'string') {
                    return a.localeCompare(b);
                }
                throw new Error('Default compare only supports number/string. Please provide custom compare function.');
            };
        }
    }

    // 元素总数
    private _size: number = 0;

    // ========== 工具方法 ==========

    /**
     * 获取元素总数（含重复）
     */
    public get size(): number {
        return this._size;
    }

    /**
     * 插入值（支持重复）
     *
     * @param value 要插入的值
     */
    public insert(value: T): void {
        this.root = this._insertNode(this.root, value);
    }

    /**
     * 删除值
     *
     * @param value 要删除的值
     * @returns 是否删除成功
     */
    public delete(value: T): boolean {
        const prevSize = this._size;
        this.root = this._deleteNode(this.root, value);
        return this._size < prevSize;
    }

    /**
     * 查找值（返回节点，含重复计数）
     *
     * @param value 要查找的值
     * @returns 节点或 null
     */
    public find(value: T): AVLNode<T> | null {
        let current = this.root;
        while (current) {
            const cmp = this.compare(value, current.value);
            if (cmp === 0) return current;
            current = cmp < 0 ? current.left : current.right;
        }
        return null;
    }

    /**
     * 是否包含值
     *
     * @param value 要检查的值
     * @returns 是否存在
     */
    public has(value: T): boolean {
        return this.find(value) !== null;
    }

    // ========== 核心操作 ==========

    /**
     * 获取最小值
     */
    public min(): T | undefined {
        return this._getMinNode(this.root)?.value;
    }

    /**
     * 获取最大值
     */
    public max(): T | undefined {
        return this._getMaxNode(this.root)?.value;
    }

    /**
     * 中序遍历（升序）
     *
     * @param callback 回调函数
     */
    public inOrder(callback: (value: T, count: number) => void): void {
        const traverse = (node: AVLNode<T> | null) => {
            if (!node) return;
            traverse(node.left);
            callback(node.value, node.count);
            traverse(node.right);
        };
        traverse(this.root);
    }

    /**
     * 转换为数组（升序，重复值会展开）
     */
    public toArray(): T[] {
        const result: T[] = [];
        this.inOrder((value, count) => {
            for (let i = 0; i < count; i++) {
                result.push(value);
            }
        });
        return result;
    }

    /**
     * 清空树
     */
    public clear(): void {
        this.root = null;
        this._size = 0;
    }

    /**
     * 检查树是否为空
     */
    public isEmpty(): boolean {
        return this._size === 0;
    }

    /*
     * 创建节点,利用了节点池，避免频繁创建节点
     * @param value 节点值
     */
    private createNode(value: T): AVLNode<T> {
        if (this.nodePool.length > 0) {
            const node = this.nodePool.pop()!;
            node.value = value;
            node.height = 1;
            node.count = 1;
            node.left = null;
            node.right = null;
            return node
        } else {
            return new AVLNode(value);
        }
    }

    /**
     * 释放节点，利用了节点池，避免频繁创建节点
     * @param node 节点
     */
    private releaseNode(node: AVLNode<T>): void {
        if (this.nodePool.length < this.POOL_SIZE) {
            this.nodePool.push(node);
        } else {
            // 清理引用，帮助 GC
            node.left = null;
            node.right = null;
            node.value = undefined as unknown as T; // 清除业务数据引用

        }
    }

    /**
     * 获取树高度（根到最深叶子的边数）
     */
    private getHeight(): number {
        return this.getNodeHeight(this.root);
    }

    /**
     * 验证 AVL 树性质（用于调试）
     */
    private isBalanced(): boolean {
        const check = (node: AVLNode<T> | null): boolean => {
            if (!node) return true;
            const balance = this.getBalanceFactor(node);
            if (balance < -1 || balance > 1) return false;
            return check(node.left) && check(node.right);
        };
        return check(this.root);
    }

    /**
     * 获取节点高度
     */
    private getNodeHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    /**
     * 更新节点高度
     */
    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(
            this.getNodeHeight(node.left),
            this.getNodeHeight(node.right)
        );
    }

    /**
     * 获取平衡因子：左子树高度 - 右子树高度
     */
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getNodeHeight(node.left) - this.getNodeHeight(node.right) : 0;
    }

    /**
     * 右旋转（处理左左情况）
     */
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;

        // 执行旋转
        x.right = y;
        y.left = T2;

        // 更新高度
        this.updateHeight(y);
        this.updateHeight(x);

        return x; // 新的子树根
    }

    /**
     * 左旋转（处理右右情况）
     */
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;

        // 执行旋转
        y.left = x;
        x.right = T2;

        // 更新高度
        this.updateHeight(x);
        this.updateHeight(y);

        return y; // 新的子树根
    }

    private _insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // 1. 执行标准 BST 插入
        if (!node) {
            this._size++;
            return this.createNode(value);
        }

        const cmp = this.compare(value, node.value);

        if (cmp < 0) {
            node.left = this._insertNode(node.left, value);
        } else if (cmp > 0) {
            node.right = this._insertNode(node.right, value);
        } else {
            // 值相等，增加计数器（不创建新节点）
            node.count++;
            this._size++;
            return node;
        }

        // 2. 更新高度
        this.updateHeight(node);

        // 3. 获取平衡因子
        const balance = this.getBalanceFactor(node);

        // 4. 如果失衡，进行旋转
        // Left Left Case
        if (balance > 1 && this.compare(value, node.left!.value) < 0) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.compare(value, node.right!.value) > 0) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && this.compare(value, node.left!.value) > 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && this.compare(value, node.right!.value) < 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    private _deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (!node) return null;

        const cmp = this.compare(value, node.value);

        if (cmp < 0) {
            node.left = this._deleteNode(node.left, value);
        } else if (cmp > 0) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // 找到节点
            if (node.count > 1) {
                // 有重复，减少计数
                node.count--;
                this._size--;
                return node;
            }

            // 真正删除节点
            this._size--;

            // 节点只有一个子节点或无子节点
            if (!node.left || !node.right) {
                const temp = node.left || node.right;
                // 回收节点
                this.releaseNode(node);
                if (!temp) {
                    return null; // 无子节点
                } else {
                    return temp; // 有一个子节点
                }
            }

            // 有两个子节点：找中序后继（右子树最小值）
            const successor = this._getMinNode(node.right)!;
            node.value = successor.value;
            node.count = successor.count;
            successor.count = 1; // 避免递归删除时重复减 size
            node.right = this._deleteNode(node.right, successor.value);
        }

        // 更新高度
        this.updateHeight(node);

        // 检查平衡
        const balance = this.getBalanceFactor(node);

        // Left Left
        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Right
        if (balance < -1 && this.getBalanceFactor(node.right) < 0) {
            return this.rotateLeft(node);
        }

        // Right Left
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    /**
     * 获取最小值节点
     */
    private _getMinNode(node: AVLNode<T> | null): AVLNode<T> | null {
        while (node && node.left) {
            node = node.left;
        }
        return node;
    }

    /**
     * 获取最大值节点
     */
    private _getMaxNode(node: AVLNode<T> | null): AVLNode<T> | null {
        while (node && node.right) {
            node = node.right;
        }
        return node;
    }
}