# QFloatButton

## 用途

悬浮按钮（对齐 Ant Design FloatButton）：常用于页面右下角的操作入口，支持圆形/方形、primary/default、图标插槽、角标（数字/红点）、tooltip、链接与**返回顶部**模式。

## 基本用法

```vue
<template>
  <div style="position: fixed; right: 24px; bottom: 24px">
    <QFloatButton type="primary" :badge="{ count: 3 }" @click="onClick">
      <template #icon>＋</template>
    </QFloatButton>
  </div>
</template>
```

## 形状与类型

```vue
<template>
  <QFloatButton type="primary" shape="circle" />
  <QFloatButton type="primary" shape="square">
    <template #icon>
      <span>📌</span>
    </template>
  </QFloatButton>
  <QFloatButton shape="square" description="问">
    <template #icon>?</template>
  </QFloatButton>
</template>
```

## 返回顶部 backTop

滚动超过 `visibilityHeight`（默认 400px）后显示，点击平滑回顶：

```vue
<template>
  <QFloatButton back-top />
</template>
```

## Props

| 属性               | 类型                             | 必填 | 默认值      | 说明                                                          |
| ------------------ | -------------------------------- | ---- | ----------- | ------------------------------------------------------------- |
| `type`             | `'default' \| 'primary'`         | 否   | `'default'` | 语义类型；primary 使用主题色填充。                            |
| `shape`            | `'circle' \| 'square'`           | 否   | `'circle'`  | 形状。                                                        |
| `description`      | `string`                         | 否   | —           | 方形按钮下方文字。                                            |
| `tooltip`          | `string`                         | 否   | —           | 悬停气泡提示文案。                                            |
| `href`             | `string`                         | 否   | —           | 传入后渲染为链接悬浮按钮。                                    |
| `target`           | `string`                         | 否   | —           | 链接打开方式（配合 href）。                                   |
| `backTop`          | `boolean`                        | 否   | `false`     | 返回顶部模式。                                                |
| `visibilityHeight` | `number`                         | 否   | `400`       | backTop 出现/隐藏阈值(px)。                                   |
| `disabled`         | `boolean`                        | 否   | `false`     | 禁用。                                                        |
| `badge`            | `{ count?, dot?, color?, max? }` | 否   | —           | 角标：count 数字 / dot 红点 / color 颜色 / max 上限(默认99)。 |

## Slots

| 插槽    | 说明                                |
| ------- | ----------------------------------- |
| `#icon` | 图标内容（可用 QIcon 或任意内容）。 |

## Emits

| 事件    | 参数         | 触发时机                                |
| ------- | ------------ | --------------------------------------- |
| `click` | `MouseEvent` | 点击时触发（disabled / 隐藏时不触发）。 |

## 说明

- 位置由使用者控制（如 `position: fixed` + 容器定位），组件本身不内置固定定位。
- `backTop` 模式默认监听窗口滚动；默认图标为「↑」，可用 `#icon` 覆盖。
