# 主题 (Theme)

## 用途

通过 `body.dark-mode` 或 `[data-theme="dark"]` 选择器切换暗色主题。
暗色主题仅覆盖语义化 token，原始调色板不变。

## 切换方式

```html
<!-- 方式一：body 类名 -->
<body class="dark-mode">
  …
</body>

<!-- 方式二：data-theme 属性 -->
<html data-theme="dark">
  …
</html>
```

## 覆盖范围（dark.css）

| 分类       | 说明                                         |
| ---------- | -------------------------------------------- |
| 品牌主色   | `--q-color-primary` 系列，暗色背景上提亮     |
| 中性语义色 | 文字 / 背景 / 边框 / 链接 / 标签             |
| 组件       | 按钮（`--q-color-button-*`）、遮罩层、阴影色 |
| 灰阶       | `--q-color-gray-50` ~ `-900` 反转            |
| 骨架屏     | `--q-skeleton-gradient` 暗色渐变             |

## 配合工具函数

组件库提供 `useFollowSystemTheme`，可自动跟随系统主题并持久化用户选择：

```ts
import { useFollowSystemTheme } from 'qyani-components';

useFollowSystemTheme();
```

组件 `<QThemeToggle>` 提供主题切换按钮，封装了手动切换与图标展示。
