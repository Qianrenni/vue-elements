/**
 * 通用线段树（支持区间更新 + 区间查询）
 * 支持自定义合并函数、懒标记更新函数、默认值
 * 适用于：区间求和、最大值、最小值、区间加、区间覆盖等场景
 */
export class UseSegmentTree<T = number, Lazy = number> {
    private n: number;                     // 原始数据长度
    private merge: (a: T, b: T) => T;      // 节点合并函数（如求和、最大值）
    private rootFunc: (
        left: number,
        right: number,
        lazyValue: Lazy,
        oldValue: T
    ) => T;                                // 懒标记生效函数：决定 lazy 如何影响节点值
    private size: number;                  // 线段树底层满二叉树的“叶子层”大小（≥n 的最小 2 的幂）
    private defaultVal: T;                 // 查询无效区间时的返回值（单位元）

    private tree: T[];                     // 线段树节点值数组（1-based，tree[1] 是根）
    private lazy: Lazy[];                  // 懒标记数组（默认值为 0，表示无标记）

    /**
     * 初始化线段树
     *
     * @param data - 原始数据数组
     * @param rootFunc - 懒标记应用函数，签名：
     *                   (left: number, right: number, lazyValue: Lazy, oldValue: T) => T
     *                   用于计算：当区间 [left, right] 被赋予 lazyValue 时，节点应变成什么值
     *                   例如：
     *                     - 覆盖型：(l, r, v, _) => v
     *                     - 增量型（区间加）：(l, r, v, old) => old + v * (r - l + 1)
     * @param mergeFunc - 合并函数，签名：(a: T, b: T) => T，如求和、最大值、最小值
     * @param defaultVal - 查询无效区间时的返回值（单位元），如 0（sum）、-Infinity（max）、Infinity（min）
     */
    constructor(
        data: T[],
        rootFunc: (left: number, right: number, lazyValue: Lazy, oldValue: T) => T,
        mergeFunc: (a: T, b: T) => T = ((a: number, b: number) => (a as number) + (b as number)) as any,
        defaultVal: T = 0 as unknown as T
    ) {
        this.n = data.length;
        this.merge = mergeFunc;
        this.rootFunc = rootFunc;
        this.defaultVal = defaultVal;

        // 计算 size：扩展成满二叉树叶子数（≥n 的最小 2 的幂）
        this.size = 1;
        while (this.size < this.n) {
            this.size *= 2;
        }

        // 初始化线段树和懒标记数组（1-based，索引从 1 开始）
        this.tree = Array(2 * this.size).fill(this.defaultVal);
        this.lazy = Array(2 * this.size).fill(0 as unknown as Lazy); // 默认无懒标记

        // 叶子节点赋值：原始数据放在 [size, size + n - 1]
        for (let i = 0; i < this.n; i++) {
            this.tree[this.size + i] = data[i];
        }

        // 自底向上构建内部节点：从 size-1 到 1
        for (let i = this.size - 1; i >= 1; i--) {
            this.tree[i] = this.merge(this.tree[2 * i], this.tree[2 * i + 1]);
        }
    }

    /**
     * 对外接口：更新区间 [left, right]（闭区间，0-based）
     *
     * @param left - 更新区间左端点（0-based，原始数组索引）
     * @param right - 更新区间右端点
     * @param value - 要设置/增加的值
     */
    update(left: number, right: number, value: Lazy): void {
        // 根节点管理 [0, size-1]，递归更新
        this._update(1, 0, this.size - 1, left, right, value);
    }

    /**
     * 对外接口：查询区间 [left, right] 的合并值（闭区间，0-based）
     *
     * @param left - 查询区间左端点（0-based）
     * @param right - 查询区间右端点
     * @returns 合并结果（如区间和、最大值等）
     */
    query(left: number, right: number): T {
        return this._query(1, 0, this.size - 1, left, right);
    }

    /**
     * 懒标记下推函数（Lazy Propagation）
     * 将当前节点的 lazy 值推给子节点，并更新子节点的 tree 值
     *
     * @param root - 当前节点编号（1-based）
     * @param left - 当前节点管理的左边界（逻辑索引）
     * @param right - 当前节点管理的右边界（逻辑索引）
     */
    private _push(root: number, left: number, right: number): void {
        if (this.lazy[root] !== (0 as unknown as Lazy)) { // 有懒标记需要下推
            if (left !== right) { // 不是叶子节点 → 需要推给左右子树
                const mid = Math.floor((left + right) / 2);

                // 更新左子树的 lazy 和 tree 值
                this.lazy[root * 2] = this.lazy[root];
                this.tree[root * 2] = this.rootFunc(left, mid, this.lazy[root], this.tree[root * 2]);

                // 更新右子树的 lazy 和 tree 值
                this.lazy[root * 2 + 1] = this.lazy[root];
                this.tree[root * 2 + 1] = this.rootFunc(mid + 1, right, this.lazy[root], this.tree[root * 2 + 1]);
            }

            // 清空当前节点的 lazy 标记
            this.lazy[root] = 0 as unknown as Lazy;
        }
    }

    /**
     * 递归更新函数：将区间 [left, right] 的值设为 value（或按 rootFunc 计算）
     *
     * @param root - 当前节点编号
     * @param start - 当前节点管理的区间左端点
     * @param end - 当前节点管理的区间右端点
     * @param left - 待更新区间的左端点（用户输入）
     * @param right - 待更新区间的右端点（用户输入）
     * @param value - 要设置/增加的值
     */
    private _update(
        root: number,
        start: number,
        end: number,
        left: number,
        right: number,
        value: Lazy
    ): void {
        // 区间无交集，直接返回
        if (end < left || right < start) {
            return;
        }

        // 当前节点区间完全被 [left, right] 覆盖
        if (left <= start && end <= right) {
            // 应用 lazy：更新当前节点值
            this.tree[root] = this.rootFunc(start, end, value, this.tree[root]);
            // 设置懒标记（子节点暂不更新）
            this.lazy[root] = value;
            return;
        }

        // 递归前先下推懒标记，确保子节点数据最新
        this._push(root, start, end);

        // 递归更新左右子树
        const mid = Math.floor((start + end) / 2);
        this._update(root * 2, start, mid, left, right, value);
        this._update(root * 2 + 1, mid + 1, end, left, right, value);

        // 回溯：用子节点更新当前节点
        this.tree[root] = this.merge(this.tree[root * 2], this.tree[root * 2 + 1]);
    }

    /**
     * 递归查询函数：查询区间 [queryLeft, queryRight] 的合并值
     *
     * @param node - 当前节点编号
     * @param left - 当前节点管理的左边界
     * @param right - 当前节点管理的右边界
     * @param queryLeft - 查询区间的左端点
     * @param queryRight - 查询区间的右端点
     * @returns 区间合并值
     */
    private _query(
        node: number,
        left: number,
        right: number,
        queryLeft: number,
        queryRight: number
    ): T {
        // 无交集 → 返回单位元
        if (left > queryRight || right < queryLeft) {
            return this.defaultVal;
        }

        // 下推懒标记，确保当前节点值是最新的
        this._push(node, left, right);

        // 当前节点区间完全在查询区间内 → 直接返回
        if (left >= queryLeft && right <= queryRight) {
            return this.tree[node];
        }

        // 递归查询左右子树
        const mid = Math.floor((left + right) / 2);
        const leftRes = this._query(node * 2, left, mid, queryLeft, queryRight);
        const rightRes = this._query(node * 2 + 1, mid + 1, right, queryLeft, queryRight);

        // 合并左右子树结果
        return this.merge(leftRes, rightRes);
    }
}

export default UseSegmentTree;