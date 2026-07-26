# useRedBlackTree

## 用途

提供支持重复值的红黑树。相同值保存在同一个节点的 `count` 中；树通过旋转和着色维持平衡。模块公开 `UseRedBlackTree`、`RBTreeNode`、`Color` 与 `Comparator`。

## `Color`

节点颜色枚举：`Color.RED = 'RED'`、`Color.BLACK = 'BLACK'`。

## `Comparator<T>`

比较器类型：`(a: T, b: T) => number`。返回负数表示 `a < b`，`0` 表示相等，正数表示 `a > b`。

## `RBTreeNode<T>`

### 职责

表示红黑树节点，保存节点值、颜色、父子引用和重复次数。通常由 `UseRedBlackTree` 内部创建和维护。

### 构造函数

| 参数      | 类型            | 必填 | 默认值      | 含义                         |
| --------- | --------------- | ---- | ----------- | ---------------------------- |
| `value`   | `T`             | 是   | —           | 节点值。                     |
| `nilNode` | `RBTreeNode<T>` | 是   | —           | 作为初始父子引用的哨兵节点。 |
| `color`   | `Color`         | 否   | `Color.RED` | 节点颜色。                   |
| `count`   | `number`        | 否   | `1`         | 值的重复次数。               |

- Throws：无。

### 公开属性

| 属性     | 类型              | 含义                                     |
| -------- | ----------------- | ---------------------------------------- |
| `value`  | `T`               | 节点值。                                 |
| `color`  | `Color`           | 节点颜色。                               |
| `left`   | `RBTreeNode<T>`   | 左子节点或 NIL 哨兵。                    |
| `right`  | `RBTreeNode<T>`   | 右子节点或 NIL 哨兵。                    |
| `parent` | `RBTreeNode<T>`   | 父节点或 NIL 哨兵。                      |
| `count`  | `number`          | 当前值的出现次数。                       |
| `isNil`  | `boolean`（只读） | 是否为值为 `undefined` 的 NIL 哨兵节点。 |

### 公开方法

| 方法        | 参数 | 返回      | 说明                                     | Throws |
| ----------- | ---- | --------- | ---------------------------------------- | ------ |
| `increment` | 无   | `void`    | 将重复次数加一。                         | 无。   |
| `decrement` | 无   | `boolean` | 将重复次数减一；减至 `0` 时返回 `true`。 | 无。   |

## `UseRedBlackTree<T>`

### 职责

维护红黑树及节点池，支持重复值的插入、删除、计数、升序遍历和树性质校验。默认比较器使用 JavaScript 的 `<` 比较规则。

### 构造函数

| 参数         | 类型            | 必填 | 默认值     | 含义                     |
| ------------ | --------------- | ---- | ---------- | ------------------------ |
| `comparator` | `Comparator<T>` | 否   | 默认比较器 | 元素比较器。             |
| `poolSize`   | `number`        | 否   | `16`       | 最多复用的已删除节点数。 |

- Throws：无。

### 公开属性

无。

### 公开方法

| 方法               | 参数                           | 返回      | 说明                                                   | Throws |
| ------------------ | ------------------------------ | --------- | ------------------------------------------------------ | ------ |
| `insert`           | `value: T`                     | `number`  | 插入值；新增节点返回 `1`，重复值仅增加计数并返回 `0`。 | 无。   |
| `delete`           | `value: T`                     | `boolean` | 删除一个值；不存在时返回 `false`。                     | 无。   |
| `contains`         | `value: T`                     | `boolean` | 判断是否包含值。                                       | 无。   |
| `getCount`         | `value: T`                     | `number`  | 返回值的出现次数；不存在为 `0`。                       | 无。   |
| `getNodeCount`     | 无                             | `number`  | 返回不同值对应的节点数。                               | 无。   |
| `getTotalCount`    | 无                             | `number`  | 返回包含重复值在内的元素总数。                         | 无。   |
| `isEmpty`          | 无                             | `boolean` | 判断树是否为空。                                       | 无。   |
| `inorderTraversal` | `callback: (value: T) => void` | `void`    | 按升序调用回调；重复值会调用多次。                     | 无。   |
| `toArray`          | 无                             | `T[]`     | 返回包含重复值的升序数组。                             | 无。   |
| `clear`            | 无                             | `void`    | 清空树。                                               | 无。   |
| `validate`         | 无                             | `boolean` | 校验红黑树性质；失败时输出错误到控制台并返回 `false`。 | 无。   |
