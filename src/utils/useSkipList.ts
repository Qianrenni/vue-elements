// skip-list.ts
/**
 * 跳表层级结构接口
 * 每一层级包含指向下一个节点的指针和跨越的节点数
 * @template T 节点存储的数据类型
 */
interface SkipListLevel<T> {
  /** 指向同一层级下一个节点的指针 */
  forward: SkipListNode<T> | null;
  /** 跨越的节点数（相对于底层链表） */
  span: number; // 跨越的节点数（底层）
}

/**
 * 跳表节点类
 * 表示跳表中的一个节点，包含数据、分数和多层级的连接信息
 * @template T 节点存储的数据类型
 */
class SkipListNode<T> {
  /** 节点的分数，用于排序 */
  score: number;
  /** 节点存储的数据 */
  member: T;
  /** 指向前一个节点的指针（底层链表中的前驱节点） */
  backward: SkipListNode<T> | null;
  /** 节点在各层级上的连接信息数组 */
  levels: SkipListLevel<T>[];

  /**
   * 构造一个新的跳表节点
   * @param score 节点的分数
   * @param member 节点存储的数据
   * @param level 节点所处的最高层级数
   */
  constructor(score: number, member: T, level: number) {
    this.score = score;
    this.member = member;
    this.backward = null;
    this.levels = Array.from({length: level},(_,index)=>({ forward: null, span: 0 }))
  }
}

/**
 * 跳表数据结构实现类
 * 跳表是一种基于概率的数据结构，可以在 O(log n) 时间复杂度内完成查找、插入和删除操作
 * 它通过维护一个多层级的链表结构来实现快速访问，是平衡树的一种替代方案
 * @template T 跳表中存储的数据类型
 */
export class UseSkipList<T> {
  /** 当前跳表的最大层级 */
  private _maxLevel: number = 1;
  /** 跳表头节点（哨兵节点，不存储实际数据） */
  private _header: SkipListNode<T>;
  /** 跳表尾节点指针 */
  private _tail: SkipListNode<T> | null = null;
  /** 跳表中元素的数量 */
  private _length: number = 0;
  /** 随机层级生成概率因子 */
  private _P:number;
  /** 跳表允许的最大层级 */
  private _MAX_LEVEL:number;

  /**
   * 构造一个新的跳表实例
   * @param threadSafe 是否线程安全（预留参数，当前实现非线程安全）
   * @param P 随机层级生成概率因子，默认为 0.25
   * @param MAX_LEVEL 跳表最大层级，默认为 32
   */
  constructor(threadSafe: boolean = false,P=0.25,MAX_LEVEL=32) {
    this._header = new SkipListNode<T>(0, null as T, MAX_LEVEL);
    this._P = P;
    this._MAX_LEVEL = MAX_LEVEL;
    // 初始化 header 的 span
    for (let i = 0; i < MAX_LEVEL; i++) {
      this._header.levels[i].span = 0;
    }
  }

  /**
   * 随机生成节点的层级数
   * 使用抛硬币方法，每次有 P 的概率升级到更高一层
   * @returns 生成的层级数
   */
  private _randomLevel(): number {
    let level = 1;
    while (Math.random() < this._P && level < this._MAX_LEVEL) {
      level++;
    }
    return level;
  }

  /**
   * 向跳表中插入一个新元素
   * @param score 元素的分数，用于排序
   * @param member 要插入的元素
   * @returns 如果成功插入返回 true，如果元素已存在返回 false
   */
  insert(score: number, member: T): boolean {
      // update 数组记录每一层需要更新的节点（即新节点各层的前驱节点）
      const update: (SkipListNode<T> | null)[] = new Array(this._MAX_LEVEL).fill(this._header);
      // rank 数组记录遍历过程中每一层已走过的节点数
      const rank: number[] = new Array(this._MAX_LEVEL).fill(0);

      // 从最高层开始向下查找插入位置
      let x:(SkipListNode<T>|null) = this._header;
      for (let i = this._maxLevel - 1; i >= 0; i--) {
        if (i === this._maxLevel - 1) {
          rank[i] = 0;
        } else {
          rank[i] = rank[i + 1];
        }
        // 在当前层向右查找，直到找到大于等于目标分数的节点
        while (
          x.levels[i].forward &&
          (x.levels[i].forward!.score < score ||
            (x.levels[i].forward!.score === score && x.levels[i].forward!.member < member))
        ) {
          rank[i] += x.levels[i].span;
          x = x.levels[i].forward!;
        }
        update[i] = x;
      }

      // 检查节点是否已经存在
      x = x.levels[0].forward;
      if (x && x.score === score && x.member === member) {
        return false; // 已存在
      }

      // 随机生成新节点的层级
      const level = this._randomLevel();
      // 如果新节点的层级超过了当前跳表的最大层级，需要更新相关数据
      if (level > this._maxLevel) {
        for (let i = this._maxLevel; i < level; i++) {
          update[i] = this._header;
          rank[i] = 0;
          this._header.levels[i].span = this._length;
        }
        this._maxLevel = level;
      }

      // 创建新节点
      const newNode = new SkipListNode(score, member, level);

      // 更新各层级的连接关系
      for (let i = 0; i < level; i++) {
        const updateNode = update[i]!;
        newNode.levels[i].forward = updateNode.levels[i].forward;
        updateNode.levels[i].forward = newNode;

        // 更新跨度信息
        newNode.levels[i].span = updateNode.levels[i].span - (rank[0] - rank[i]);
        updateNode.levels[i].span = rank[0] - rank[i] + 1;
      }

      // 更新更高层级的跨度信息
      for (let i = level; i < this._maxLevel; i++) {
        update[i]!.levels[i].span += 1;
      }

      // 更新后继节点的 backward 指针
      if (newNode.levels[0].forward) {
        newNode.levels[0].forward.backward = newNode;
      } else {
        this._tail = newNode;
      }

      // 设置新节点的 backward 指针
      if (!newNode.backward && this._header.levels[0].forward !== newNode) {
        newNode.backward = update[0]!;
      }

      this._length++;
      return true;
  }

  /**
   * 从跳表中删除指定元素
   * @param score 元素的分数
   * @param member 要删除的元素
   * @returns 如果成功删除返回 true，如果元素不存在返回 false
   */
  delete(score: number, member: T): boolean {
      // update 数组记录每一层需要更新的节点（即被删除节点各层的前驱节点）
      const update: (SkipListNode<T> | null)[] = new Array(this._MAX_LEVEL).fill(null);
      let x:SkipListNode<T>|null = this._header;

      // 从最高层开始向下查找待删除节点
      for (let i = this._maxLevel - 1; i >= 0; i--) {
        // 在当前层向右查找，直到找到大于等于目标分数的节点
        while (
          x.levels[i].forward &&
          (x.levels[i].forward!.score < score ||
            (x.levels[i].forward!.score === score && x.levels[i].forward!.member < member))
        ) {
          x = x.levels[i].forward!;
        }
        update[i] = x;
      }

      // 找到待删除节点
      x = x.levels[0].forward;
      // 检查节点是否存在且匹配
      if (!x || x.score !== score || x.member !== member) {
        return false;
      }

      // 更新各层级的连接关系
      for (let i = 0; i < this._maxLevel; i++) {
        const up = update[i]!;
        if (up.levels[i].forward === x) {
          // 如果当前层的 forward 指向被删除节点，则更新连接关系
          up.levels[i].span += x.levels[i].span - 1;
          up.levels[i].forward = x.levels[i].forward;
        } else {
          // 否则只需减少跨度
          up.levels[i].span -= 1;
        }
      }

      // 更新后继节点的 backward 指针
      if (x.levels[0].forward) {
        x.levels[0].forward.backward = x.backward;
      } else if (x.backward) {
        this._tail = x.backward;
      } else {
        this._tail = null;
      }

      // 更新跳表最大层级
      while (this._maxLevel > 1 && this._header.levels[this._maxLevel - 1].forward === null) {
        this._maxLevel--;
      }

      this._length--;
      return true;
  }

  /**
   * 根据排名获取元素
   * @param rank 元素的排名（从 0 开始）
   * @returns 返回 [分数, 元素] 的元组，如果排名无效则返回 null
   */
  get_by_rank(rank: number): [number, T] | null {
    // 检查排名有效性
    if (rank < 0 || rank >= this._length) return null;
    let traversed = 0;
    let x = this._header;
    // 从最高层开始向下查找
    for (let i = this._maxLevel - 1; i >= 0; i--) {
    // 在当前层向右移动，直到跨越目标排名
    while (x.levels[i].forward && traversed + x.levels[i].span <= rank + 1) {
        traversed += x.levels[i].span;
        x = x.levels[i].forward!;
    }
    // 如果正好到达目标节点则跳出循环
    if (traversed === rank + 1) break;
    }
    return [x.score, x.member];
  }

  /**
   * 获取元素的排名
   * @param score 元素的分数
   * @param member 要查找的元素
   * @returns 元素的排名（从 0 开始），如果元素不存在则返回 null
   */
  get_rank(score: number, member: T): number | null {
      let rank = 0;
      let x:SkipListNode<T>|null = this._header;
      // 从最高层开始向下查找
      for (let i = this._maxLevel - 1; i >= 0; i--) {
        // 在当前层向右查找，直到找到大于等于目标分数的节点
        while (
          x.levels[i].forward &&
          (x.levels[i].forward!.score < score ||
            (x.levels[i].forward!.score === score && x.levels[i].forward!.member < member))
        ) {
          rank += x.levels[i].span;
          x = x.levels[i].forward!;
        }
      }
      x = x.levels[0].forward;
      // 检查节点是否存在且匹配
      if (x && x.score === score && x.member === member) {
        return rank;
      }
      return null;
  }

  /**
   * 获取跳表中第一个元素
   * @returns 返回 [分数, 元素] 的元组，如果跳表为空则返回 null
   */
  get_first(): [number, T] | null {
    if (this._length === 0) return null;
    const first = this._header.levels[0].forward;
    return first ? [first.score, first.member] : null;
  }

  /**
   * 获取跳表中最后一个元素
   * @returns 返回 [分数, 元素] 的元组，如果跳表为空则返回 null
   */
  get_last(): [number, T] | null {
    return this._tail ? [this._tail.score, this._tail.member] : null;
  }

  /**
   * 获取指定范围内的元素
   * @param start 起始位置（从 0 开始）
   * @param count 要获取的元素数量
   * @returns 包含 [元素, 分数] 的数组
   */
  range(start: number, count: number): [T, number][] {
    // 参数校验
    if (count <= 0 || this._length === 0) return [];
    if (start < 0) start = 0;
    if (start >= this._length) return [];

      let traversed = 0;
      let x = this._header;
      // 从最高层开始向下定位起始位置
      for (let i = this._maxLevel - 1; i >= 0; i--) {
        while (x.levels[i].forward && traversed + x.levels[i].span <= start + 1) {
          traversed += x.levels[i].span;
          x = x.levels[i].forward!;
        }
      }

      // 从起始位置开始收集元素
      const result: [any, number][] = [];
      let current:SkipListNode<T>|null = x;
      let fetched = 0;
      while (current && fetched < count) {
        result.push([current.member, current.score]);
        current = current.levels[0].forward;
        fetched++;
      }
      return result;
  }

  /**
   * 获取指定范围内的元素（逆序）
   * @param start 起始位置（从 0 开始，从末尾计算）
   * @param count 要获取的元素数量
   * @returns 包含 [元素, 分数] 的数组
   */
  reverse_range(start: number, count: number): [T, number][] {
    // 参数校验
    if (count <= 0 || this._length === 0) return [];
    if (start < 0) start = 0;
    if (start >= this._length) return [];

      // 计算正向排名
      const forwardRank = this._length - 1 - start;

      let traversed = 0;
      let x = this._header;
      // 从最高层开始向下定位起始位置
      for (let i = this._maxLevel - 1; i >= 0; i--) {
        while (x.levels[i].forward && traversed + x.levels[i].span <= forwardRank + 1) {
          traversed += x.levels[i].span;
          x = x.levels[i].forward!;
        }
      }

      // 从起始位置开始逆向收集元素
      const result: [any, number][] = [];
      let current:SkipListNode<T>|null = x;
      let fetched = 0;
      while (current && fetched < count) {
        result.push([current.member, current.score]);
        current = current.backward;
        fetched++;
      }
      return result;
  }

  /**
   * 获取跳表中元素的数量
   */
  get length(): number {
    return this._length;
  }
}