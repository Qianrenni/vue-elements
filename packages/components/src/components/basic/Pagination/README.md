# QPagination

## 用途

提供上一页、下一页和输入页码跳转能力，支持通过 `v-model:currentPage` 同步当前页。

## 基本用法

```vue
<QPagination
  v-model:currentPage="page"
  :total-pages="20"
  @change="handleChange"
/>
```

## Props

| 名称          | 类型     | 必填 | 默认值 | 说明       |
| ------------- | -------- | ---- | ------ | ---------- |
| `currentPage` | `number` | 是   | 无     | 当前页码。 |
| `totalPages`  | `number` | 是   | 无     | 总页数。   |

## Emits

| 事件名               | 参数类型        | 触发时机                                                                       |
| -------------------- | --------------- | ------------------------------------------------------------------------------ |
| `change`             | `page: number`  | 用户通过上一页、下一页或跳转操作请求切换到一个有效且不同于当前值的页码时触发。 |
| `update:currentPage` | `value: number` | 与 `change` 同时触发，用于更新 `v-model:currentPage`。                         |

## Slots

无。

## Exposes

无。
