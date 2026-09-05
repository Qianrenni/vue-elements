# 设计变量 (Tokens)

## 用途

设计变量是整套样式系统的基础，所有组件与工具类均引用这些 `--q-*` CSS 自定义属性。
分为三层：原始调色板 → 语义化颜色 → 向后兼容别名。

命名约定：

```
--q-color-{role}-{shade}    颜色
--q-space-{n}               间距
--q-radius-{size}           圆角
--q-shadow-{level}          阴影
--q-opacity-{n}             透明度
--q-font-{property}-{value} 排版
--q-duration-{speed}        动效时长
--q-easing-{type}           缓动函数
```

## 颜色 (Color)

### 原始调色板（不随主题变化）

| 变量                                           | 值                    | 说明                  |
| ---------------------------------------------- | --------------------- | --------------------- |
| `--q-color-gray-50` ~ `--q-color-gray-900`     | `#f8f9fa` → `#212529` | 灰色阶梯              |
| `--q-color-brown-50` ~ `--q-color-brown-700`   | `#fbf6ee` → `#563619` | 褐色（品牌主色·书香） |
| `--q-color-yellow-50` ~ `--q-color-yellow-700` | `#fffbeb` → `#806100` | 黄色（备用调色板）    |
| `--q-color-red-50` ~ `--q-color-red-700`       | `#fff0f1` → `#871718` | 红色（危险）          |
| `--q-color-green-50` ~ `--q-color-green-700`   | `#e6f9f0` → `#0f5221` | 绿色（成功）          |
| `--q-color-blue-50` ~ `--q-color-blue-700`     | `#e8f4fd` → `#084298` | 蓝色（信息）          |
| `--q-color-orange-50` ~ `--q-color-orange-600` | `#fff8e1` → `#b37800` | 橙色（警告）          |
| `--q-color-white` / `--q-color-black`          | `#ffffff` / `#000000` | 纯色                  |

### 语义化颜色（随主题切换）

| 变量                                                                                   | 说明                                                      |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `--q-color-primary` / `-hover` / `-active` / `-light` / `-lighter`                     | 品牌主色及交互态                                          |
| `--q-color-success` / `-bg` / `-border`                                                | 成功                                                      |
| `--q-color-warning` / `-bg` / `-border`                                                | 警告                                                      |
| `--q-color-danger` / `-bg` / `-border`                                                 | 危险                                                      |
| `--q-color-info` / `-bg` / `-border`                                                   | 信息                                                      |
| `--q-color-text` / `-description` / `-muted` / `-secondary` / `-disabled` / `-inverse` | 文字层级（`-disabled` 禁用文字）                          |
| `--q-color-bg` / `-secondary` / `-card` / `-nav` / `-nav-hover`                        | 背景层级（`-nav` 深色导航底 / `-nav-hover` 其加深触发器） |
| `--q-color-border` / `-light`                                                          | 边框                                                      |
| `--q-color-link` / `-hover`                                                            | 链接                                                      |
| `--q-color-tag`                                                                        | 标签/标记                                                 |
| `--q-color-overlay`                                                                    | 遮罩层                                                    |
| `--q-color-shadow` / `-inverse`                                                        | 阴影色                                                    |

## 间距 (Spacing)

基于 4px 基础单位的 12 档间距阶梯：

| 变量          | 值             | 变量           | 值             |
| ------------- | -------------- | -------------- | -------------- |
| `--q-space-0` | 0              | `--q-space-7`  | 1.25rem (20px) |
| `--q-space-1` | 0.125rem (2px) | `--q-space-8`  | 1.5rem (24px)  |
| `--q-space-2` | 0.25rem (4px)  | `--q-space-9`  | 2rem (32px)    |
| `--q-space-3` | 0.375rem (6px) | `--q-space-10` | 2.5rem (40px)  |
| `--q-space-4` | 0.5rem (8px)   | `--q-space-11` | 3rem (48px)    |
| `--q-space-5` | 0.75rem (12px) | `--q-space-12` | 4rem (64px)    |
| `--q-space-6` | 1rem (16px)    |                |                |

## 圆角 (Radius)

| 变量              | 值             | 变量              | 值             |
| ----------------- | -------------- | ----------------- | -------------- |
| `--q-radius-none` | 0              | `--q-radius-lg`   | 0.75rem (12px) |
| `--q-radius-xs`   | 0.125rem (2px) | `--q-radius-xl`   | 1rem (16px)    |
| `--q-radius-sm`   | 0.25rem (4px)  | `--q-radius-2xl`  | 1.5rem (24px)  |
| `--q-radius-md`   | 0.5rem (8px)   | `--q-radius-full` | 9999px (圆形)  |

## 阴影与层级 (Elevation)

| 变量              | 说明        | 变量                   | 说明 |
| ----------------- | ----------- | ---------------------- | ---- |
| `--q-shadow-none` | 无阴影      | `--q-z-index-base`     | 1    |
| `--q-shadow-xs`   | 0 1px 2px   | `--q-z-index-dropdown` | 100  |
| `--q-shadow-sm`   | 0 2px 4px   | `--q-z-index-sticky`   | 200  |
| `--q-shadow-md`   | 0 4px 8px   | `--q-z-index-fixed`    | 300  |
| `--q-shadow-lg`   | 0 8px 16px  | `--q-z-index-overlay`  | 800  |
| `--q-shadow-xl`   | 0 16px 32px | `--q-z-index-modal`    | 1000 |
|                   |             | `--q-z-index-popover`  | 9999 |

## 透明度 (Opacity)

`--q-opacity-0` 至 `--q-opacity-100`，每 10% 一档（0 → 1）。

## 排版 (Typography)

| 变量                                                                    | 说明                      |
| ----------------------------------------------------------------------- | ------------------------- |
| `--q-font-family-base` / `-mono` / `-markdown`                          | 字体族                    |
| `--q-font-size-xs` / `-sm` / `-base` / `-lg` / `-xl` / `-2xl` / `-3xl`  | 字号阶梯 (0.75rem → 2rem) |
| `--q-font-weight-light` / `-normal` / `-medium` / `-semibold` / `-bold` | 字重 (300 → 700)          |
| `--q-line-height-tight` / `-normal` / `-relaxed`                        | 行高 (1.2 / 1.5 / 1.75)   |
| `--q-letter-spacing-normal` / `-wide` / `-wider`                        | 字间距                    |

## 动效 (Motion)

| 变量                                                                                                | 说明               |
| --------------------------------------------------------------------------------------------------- | ------------------ |
| `--q-duration-instant` / `-fast` / `-normal` / `-slow` / `-slower`                                  | 时长 (0ms → 800ms) |
| `--q-easing-linear` / `-ease` / `-in` / `-out` / `-in-out`                                          | 基础缓动           |
| `--q-easing-standard` / `-decelerate` / `-accelerate` / `-sharp`                                    | Material 风格缓动  |
| `--q-transition-color` / `-background` / `-border` / `-opacity` / `-transform` / `-shadow` / `-all` | 复合过渡           |
| `--q-skeleton-gradient`                                                                             | 骨架屏渐变         |

关键帧：`q-rotate`（旋转）、`q-pulse`（脉冲）。

## 向后兼容别名

旧版变量（如 `--primary-color`、`--text-color`、`--background-color`、`--card-bg`、`--border-color`）均已映射到新 token，可直接混用。
