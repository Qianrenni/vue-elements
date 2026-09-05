# QBorderBeam

## 用途

边框流光（对齐 Ant Design BorderBeam，🆕6.4）：沿容器边框持续移动的装饰性光束，用于登录面板、推荐卡片、AI 模块、关键 CTA 等强调场景。仅作装饰，不应替代焦点环 / 校验边框等语义状态。

## 基本用法

包裹任意内容；容器圆角通过 class / style 设置，光束层自动 `border-radius: inherit`：

```vue
<template>
  <QBorderBeam style="border-radius: 16px">
    <div class="card">渐变卡片</div>
  </QBorderBeam>
</template>
```

## 颜色 / 时长 / 数量

```vue
<template>
  <QBorderBeam color="#36cfc9" :duration="4" :count="2">
    <div class="card">多光束 · 快速环绕</div>
  </QBorderBeam>
</template>
```

## 悬停显示

```vue
<template>
  <QBorderBeam hover>
    <div class="card">悬停显示光束</div>
  </QBorderBeam>
</template>
```

## Props

| 属性        | 类型               | 必填 | 默认值                   | 说明                                          |
| ----------- | ------------------ | ---- | ------------------------ | --------------------------------------------- |
| `color`     | `string`           | 否   | `var(--q-color-primary)` | 光束颜色（任意 CSS 颜色 / var()）。           |
| `count`     | `number`           | 否   | `1`                      | 光束数量（沿边框均匀分布）。                  |
| `duration`  | `number`           | 否   | `6`                      | 环绕一圈秒数。                                |
| `size`      | `number \| string` | 否   | `100`                    | 可见光束弧长（数字视为 px，内部换算为角度）。 |
| `lineWidth` | `number \| string` | 否   | `1`                      | 光束线宽（数字视为 px）。                     |
| `outset`    | `number \| string` | 否   | `0`                      | 光束层相对容器外扩距离（数字视为 px）。       |
| `hover`     | `boolean`          | 否   | `false`                  | 仅悬停容器时显示光束。                        |

## Slots

| 插槽     | 说明               |
| -------- | ------------------ |
| 默认插槽 | 被光束装饰的内容。 |

## Exposes / Emits

无。

## 说明

- 组件自身**不产生边框**：光束沿容器边缘移动，需要内容本身具备背景/圆角以形成视觉容器。
- 圆角同步：在 `QBorderBeam` 根节点（class/style 透传）设置 `border-radius`，光束层 `border-radius: inherit` 自动跟随。
- 开启系统「减弱动态效果」时（`prefers-reduced-motion`）光束隐藏。
- `size` 为本库近似换算（px 语义映射到角度区间 20°–300°），用于控制弧段长短；如需更精细可后续按实测容器周长换算。
