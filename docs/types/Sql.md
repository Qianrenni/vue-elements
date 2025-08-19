# Query Schema 文档

## 类型定义

### `SqlFieldType`

SQL 字段类型，表示字段的数据类型。

```ts
type SqlFieldType = 'string' | 'number' | 'boolean' | 'datetime'
```

### `SqlOperator`

SQL 操作符，表示查询条件中的比较操作。

```ts
type SqlOperator = 'between' | '=' | '!=' | '>' | '<' | '>=' | '<='
```

### `SqlValue`

SQL 值的类型，支持多种基础类型和数组类型。

```ts
type SqlValue = number | string | null | undefined | number[] | string[] | null[] | undefined[]
```

### `SqlField`

描述一个 SQL 字段的基本信息。

```ts
type SqlField = {
  type: SqlFieldType
  name: string
  label: string
  formatter?: (val: SqlValue) => SqlValue
  isDefault?: boolean
}
```

### `Condition`

表示一个查询条件。

```ts
type Condition = {
  field: string
  operator: SqlOperator | ''
  value: SqlValue
  type: keyof typeof SQL_FIELD_TYPES
}
```

### `SqlRenderProps`

用于渲染查询组件的属性接口。

```ts
interface SqlRenderProps {
  type: SqlFieldType
  modelValue: SqlValue
  'onUpdate:modelValue': (val: SqlValue) => void
}
```

---

## 常量定义

### `SQL_FIELD_TYPES`

字段类型与支持的操作符映射表。

```ts
export const SQL_FIELD_TYPES: { [key in SqlFieldType]: { operators: SqlOperator[] } } = {
  number: {
    operators: ['=', '!=', '>', '<', '>=', '<=', 'between'],
  },
  string: {
    operators: ['=', '!=', '>', '<', 'between'],
  },
  datetime: {
    operators: ['between'],
  },
  boolean: {
    operators: ['='],
  },
}
```

### `SQL_OPERATORS`

操作符语义定义，包括标签和期望值类型。

```ts
export const SQL_OPERATORS: { [key in SqlOperator]: Record<string, string> } = {
  '=': { label: '等于', expects: 'single' },
  '!=': { label: '不等于', expects: 'single' },
  '>': { label: '大于', expects: 'single' },
  '<': { label: '小于', expects: 'single' },
  '>=': { label: '大于等于', expects: 'single' },
  '<=': { label: '小于等于', expects: 'single' },
  between: { label: '介于', expects: 'range' }, // 需要两个值
}
```

### `SQL_TYPE_TO_COMPONENT`

字段类型与 Vue 组件的映射关系。

```ts
export const SQL_TYPE_TO_COMPONENT: Record<string, Component> = {
  string: ElInput,
  number: ElInputNumber,
  boolean: ElSwitch,
  datetime: ElDatePicker,
}
```

---

## 工具函数

### `isArrayValue`

判断值是否为合法的数组值（长度为 2 的数组）。

```ts
function isArrayValue(value: SqlValue): value is number[] | string[] | null[] | undefined[]
```

---

## 操作符渲染函数

### `SQL_OPERATOR_TO_COMPONENT`

操作符到组件的映射表，用于动态渲染对应的输入组件。

#### `'range'`

处理范围操作符（如 `between`），根据字段类型渲染不同的输入组件：

- `datetime`：渲染 `ElDatePicker`（`datetimerange` 类型）
- `number`：两个 `ElInputNumber` 组成的范围输入
- `string`：两个 `ElInput` 组成的范围输入

#### `'list'`

处理列表操作符（如 `in`），输入值以逗号分隔。

#### `'single'`

处理单值操作符（如 `=`, `>`），根据字段类型使用对应的组件：

- `datetime`：使用 `ElDatePicker` 并设置 `type="datetime"`
- `boolean`：使用 `ElSwitch`
- 其他：使用 `ElInput` 并带有默认占位符

---

## 示例说明

### 渲染一个 `number` 类型的 `between` 查询条件

```ts
const props = {
  type: 'number',
  modelValue: [10, 20],
  'onUpdate:modelValue': (val) => console.log(val),
}
const rangeComponent = SQL_OPERATOR_TO_COMPONENT.range(props)
```

### 渲染一个 `string` 类型的 `=` 查询条件

```ts
const props = {
  type: 'string',
  modelValue: 'test',
  'onUpdate:modelValue': (val) => console.log(val),
}
const singleComponent = SQL_OPERATOR_TO_COMPONENT.single(props)
```

### 渲染一个 `datetime` 类型的 `between` 查询条件

```ts
const props = {
  type: 'datetime',
  modelValue: ['2023-01-01', '2023-12-31'],
  'onUpdate:modelValue': (val) => console.log(val),
}
const rangeComponent = SQL_OPERATOR_TO_COMPONENT.range(props)
```

---

## 用法建议

### 动态渲染查询条件组件

```ts
function renderCondition(field: SqlField, condition: Condition) {
  const operatorDef = SQL_OPERATORS[condition.operator]
  const renderer = SQL_OPERATOR_TO_COMPONENT[operatorDef.expects]
  return renderer({
    type: field.type,
    modelValue: condition.value,
    'onUpdate:modelValue': (val) => updateConditionValue(condition, val),
  })
}
```

### 字段类型与组件映射

```ts
function getComponentForFieldType(type: SqlFieldType): Component {
  return SQL_TYPE_TO_COMPONENT[type] || ElInput
}
```

### 判断值是否为合法范围

```ts
if (isArrayValue(condition.value)) {
  // 处理范围值
}
```

---

## 注意事项

- `SQL_OPERATOR_TO_COMPONENT` 中的渲染函数依赖 Vue 的 `h` 函数，需在组件上下文中使用。
- `modelValue` 和 `onUpdate:modelValue` 是响应式绑定的关键，需确保正确传递。
- `formatter` 字段可用于在显示或提交前格式化字段值。
- `SQL_OPERATORS` 支持扩展，可添加 `in`、`contains` 等操作符。

---

## 推荐学习路径

1. **Vue Composition API**：理解 `h` 函数、组件动态渲染、响应式数据绑定。
2. **TypeScript 泛型与映射类型**：掌握 `key in SqlFieldType`、`Record<string, T>` 等高级类型用法。
3. **Element Plus 组件库**：熟悉 `ElInput`, `ElInputNumber`, `ElDatePicker`, `ElSwitch` 等组件的使用。
4. **SQL 查询构建原理**：了解如何将用户输入转换为 SQL 查询条件。