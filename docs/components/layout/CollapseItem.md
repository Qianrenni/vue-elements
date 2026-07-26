# QCollapseItem

## 用途

折叠面板项，应作为 `QCollapse` 的子组件使用。点击标题可切换内容的展开状态。

## 基本用法

```vue
<QCollapse v-model="activeNames">
  <QCollapseItem name="profile" title="个人资料">
    面板内容
  </QCollapseItem>
</QCollapse>
```

## Props

| 名称       | 类型      | 必填 | 默认值           | 说明                                  |
| ---------- | --------- | ---- | ---------------- | ------------------------------------- |
| `name`     | `string`  | 是   | 无               | 面板的唯一标识。                      |
| `title`    | `string`  | 否   | 无（源码未设置） | 标题文本；未提供或为空时显示 `name`。 |
| `disabled` | `boolean` | 否   | 无（源码未设置） | 为真时点击标题不会切换展开状态。      |

## Emits

无。状态更新由父级 `QCollapse` 的 `update:modelValue` 事件提供。

## Slots

| 名称      | 作用域参数 | 后备内容 |
| --------- | ---------- | -------- |
| `default` | 无         | 无。     |

## Exposes

无。
