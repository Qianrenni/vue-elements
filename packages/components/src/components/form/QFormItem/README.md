# QFormItem

## 用途

表单项容器，用于 `QForm` 内部：提供 label、必填星号与错误信息展示，并按 `validateTrigger` 自动触发该校验。可自带 `rules`（覆盖/追加于表单 rules）或使用表单下同名 `rules`。

```vue
<QForm :model="form" :rules="rules">
  <QFormItem name="name" label="姓名" required>
    <input v-model="form.name" />
  </QFormItem>
  <!-- 错误提示在下方自动展示 -->
</QForm>
```

## Props

| 属性              | 类型                 | 必填 | 默认值   | 说明                      |
| ----------------- | -------------------- | ---- | -------- | ------------------------- |
| `name`            | `string`             | 否   | `无`     | 对应 model 字段名。       |
| `label`           | `string`             | 否   | `无`     | 标签文本。                |
| `rules`           | `QFormRule[]`        | 否   | `无`     | 自有校验规则。            |
| `required`        | `boolean`            | 否   | `false`  | 强制必填（显式星号）。    |
| `validateTrigger` | `'change' \| 'blur'` | 否   | 表单默认 | 触发时机（change/blur）。 |

## 说明

- 必须位于 `QForm` 内部才能工作（通过注入获取校验上下文）。
- 事件监听在 `.q-form-item` 根节点以 capture 捕获子控件冒泡的 `change` / `focusout`，无需给控件绑定额外事件。
- 错误文案来自命中规则的 `message` 或默认提示，展示于控件下方，占位避免跳动。
