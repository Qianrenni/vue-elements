/**
 * 通用堆数据结构封装类，支持最小堆/最大堆，可作为优先队列使用。
 *
 * 默认行为是最小堆（compare: (a, b) => a < b），但可通过自定义比较函数支持任意类型和排序逻辑。
 *
 * @template T 堆中元素的类型
 */
export class UseHeap<T> {
    /** 内部存储堆元素的数组 */
    private queue: T[] = [];
    /** 比较函数：定义元素优先级，compare(a, b) 为 true 表示 a 优先级高于 b */
    private compare: (a: T, b: T) => boolean;

    /**
     * 构造函数
     *
     * @param compare 自定义比较函数，默认为最小堆（a < b）
     *                ⚠️ 注意：默认函数仅适用于 number/string，生产中建议显式传入
     */
    constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b as unknown as boolean) {
        // 生产环境中建议移除默认比较函数，强制用户传入，避免运行时错误
        // 这里保留是为了兼容，但添加类型断言抑制编译错误（实际运行可能出错）
        this.compare = compare;
    }

    /**
     * 获取堆中元素数量
     */
    public get size(): number {
        return this.queue.length;
    }

    /**
     * 将数组原地堆化（构建堆结构）
     *
     * @param arr 待堆化的数组
     * @param compare 比较函数
     */
    static heaplify<T>(arr: T[], compare: (a: T, b: T) => boolean): void {
        const n = arr.length;
        // 从最后一个非叶子节点开始向上调整
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            UseHeap._down(i, n, arr, compare);
        }
    }

    /**
     * 弹出堆顶元素（优先级最高元素）
     *
     * @param arr 堆数组
     * @param compare 比较函数
     * @returns 堆顶元素，若堆为空则返回 undefined
     */
    static heapPop<T>(arr: T[], compare: (a: T, b: T) => boolean): T | undefined {
        if (arr.length === 0) return undefined;

        const lastIdx = arr.length - 1;
        [arr[0], arr[lastIdx]] = [arr[lastIdx], arr[0]]; // 将堆尾元素移到堆顶
        const item = arr.pop(); // 弹出原堆顶（现堆尾）
        if (arr.length > 1) {
            UseHeap._down(0, arr.length, arr, compare); // 重新调整堆
        }
        return item;
    }

    // ========= 实例方法 =========

    /**
     * 向堆中插入一个新元素
     *
     * @param arr 堆数组
     * @param item 要插入的元素
     * @param compare 比较函数
     */
    static heapPush<T>(arr: T[], item: T, compare: (a: T, b: T) => boolean): void {
        arr.push(item);
        UseHeap._up(arr.length - 1, arr, compare);
    }

    /**
     * 堆排序：原地排序数组
     *
     * ⚠️ 注意：堆排序使用的比较函数应与堆性质一致。
     * 例如：若构建最小堆（a < b），则排序后为升序；
     *       若构建最大堆（a > b），则排序后为降序。
     *
     * @param arr 待排序数组
     * @param compare 比较函数（默认为最小堆：a < b → 升序）
     */
    static heapSort<T>(arr: T[], compare: (a: T, b: T) => boolean = (a, b) => a < b): void {
        // Step 1: 堆化（构建最大堆或最小堆）
        UseHeap.heaplify(arr, compare);

        // Step 2: 逐个弹出堆顶到数组末尾
        for (let i = arr.length - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]]; // 将堆顶移到末尾
            UseHeap._down(0, i, arr, compare);   // 调整剩余部分
        }

        // Step 3: 反转数组
        arr.reverse();
    }

    /**
     * 向下调整堆：从索引 i 开始，使其子树满足堆性质。
     *
     * @param i 当前节点索引
     * @param bound 堆的有效边界（不包含）
     * @param arr 堆数组
     * @param compare 比较函数，若 compare(a, b) 为 true，则 a 应排在 b 前面（即 a 优先级更高）
     * @private
     */
    private static _down<T>(
        i: number,
        bound: number,
        arr: T[],
        compare: (a: T, b: T) => boolean
    ): void {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // 找出三者（当前节点、左孩子、右孩子）中优先级最高的索引
        if (left < bound && compare(arr[left], arr[largest])) {
            largest = left;
        }
        if (right < bound && compare(arr[right], arr[largest])) {
            largest = right;
        }

        // 如果最大值不是当前节点，则交换并递归向下调整
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            UseHeap._down(largest, bound, arr, compare);
        }
    }

    /**
     * 向上调整堆：从索引 i 开始，向上调整使其满足堆性质。
     *
     * @param i 当前节点索引
     * @param arr 堆数组
     * @param compare 比较函数
     * @private
     */
    private static _up<T>(i: number, arr: T[], compare: (a: T, b: T) => boolean): void {
        while (i > 0) {
            const parent = (i - 1) >>> 1; // 父节点索引
            // 如果当前节点优先级更高，则与父节点交换
            if (!compare(arr[i], arr[parent])) break;
            [arr[i], arr[parent]] = [arr[parent], arr[i]];
            i = parent;
        }
    }

    /**
     * 添加元素到堆中
     *
     * @param item 要添加的元素
     */
    public add(item: T): void {
        UseHeap.heapPush(this.queue, item, this.compare);
    }

    /**
     * 弹出堆顶元素（优先级最高）
     *
     * @returns 堆顶元素，若堆为空则返回 undefined
     */
    public pop(): T | undefined {
        return UseHeap.heapPop(this.queue, this.compare);
    }

    /**
     * 对内部数组进行堆排序（⚠️ 排序后堆结构被破坏，不可继续作为堆使用）
     *
     * 排序后数组按 compare 定义的优先级逆序排列：
     * - 若 compare(a,b) = a < b（最小堆），排序后为升序
     * - 若 compare(a,b) = a > b（最大堆），排序后为降序
     */
    public sort(): void {
        UseHeap.heapSort(this.queue, this.compare);
    }

    /**
     * 清空堆
     */
    public clear(): void {
        this.queue = [];
    }

    /**
     * 查看堆顶元素（不弹出）
     *
     * @returns 堆顶元素，若堆为空则返回 undefined
     */
    public peek(): T | undefined {
        return this.queue.length > 0 ? this.queue[0] : undefined;
    }

    /**
     * 判断堆是否为空
     */
    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    /**
     * 获取堆内所有元素的副本（不影响堆结构）
     */
    public toArray(): T[] {
        return [...this.queue];
    }
}