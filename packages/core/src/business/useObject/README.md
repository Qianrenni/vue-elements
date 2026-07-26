# useObject

对象深度操作工具，提供纯对象判断和深度合并能力。

---

## isPlainObject

判断一个值是否为纯对象（通过 `Object` 构造函数创建的普通对象，非数组、非 `null`、非宿主对象等）。

```typescript
function isPlainObject(value: unknown): value is Record<string, unknown>;
```

### 参数

| 参数  | 类型      | 必填 | 默认值 | 说明       |
| ----- | --------- | ---- | ------ | ---------- |
| value | `unknown` | 是   | —      | 待检查的值 |

### 返回

`value is Record<string, unknown>` — 类型谓词，为纯对象时返回 `true`，否则返回 `false`。

### throws

无

---

## deepMerge

深度合并两个对象。递归合并纯对象属性，非纯对象属性（如数组、原始值等）由 `override` 直接覆盖。`override` 中值为 `undefined` 的属性会被跳过，保留 `base` 中的原值。

```typescript
function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: DeepPartial<T>,
): T;
```

### 参数

| 参数     | 类型                                  | 必填 | 默认值 | 说明                        |
| -------- | ------------------------------------- | ---- | ------ | --------------------------- |
| base     | `T`（继承 `Record<string, unknown>`） | 是   | —      | 基础对象，提供默认值        |
| override | `DeepPartial<T>`                      | 是   | —      | 覆盖对象，优先级高于 `base` |

### 返回

`T` — 合并后的新对象，不修改 `base` 和 `override` 原对象。

### throws

无
