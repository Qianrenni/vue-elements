# QProgressBar

## 用途

渲染水平或垂直方向的进度条。

## 基本用法

```vue
<QProgressBar percent="60%" color="#409eff" />
```

## Props

| 名称        | 类型                         | 必填 | 默认值                   | 说明                                                               |
| ----------- | ---------------------------- | ---- | ------------------------ | ------------------------------------------------------------------ |
| `percent`   | `string`                     | 是   | 无                       | 进度值，例如 `'30%'`；水平模式设置填充宽度，垂直模式设置填充高度。 |
| `color`     | `string`                     | 否   | `'var(--primary-color)'` | 填充部分背景色。                                                   |
| `direction` | `'horizontal' \| 'vertical'` | 否   | `'horizontal'`           | 进度条方向。                                                       |

## Emits

无。

## Slots

无。

## Exposes

无。
