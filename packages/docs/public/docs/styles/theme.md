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

| 分类       | 说明                                     |
| ---------- | ---------------------------------------- |
| 品牌主色   | `--q-color-primary` 系列，暗色背景上提亮 |
| 中性语义色 | 文字 / 背景 / 边框 / 链接 / 标签         |
| 组件       | 按钮（跟随主色语义）、遮罩层、阴影色     |
| 灰阶       | `--q-color-gray-50` ~ `-900` 反转        |
| 骨架屏     | `--q-skeleton-gradient` 暗色渐变         |

## 自定义品牌主色（覆盖语义 token）

给业务端换主色时，**必须覆盖 `--q-color-*` 语义 token**，只覆盖旧别名（`--primary-color` 等）不生效。

> ⚠️ 原因：旧别名只是 `var(--q-color-*)` 的转发；组件与工具类（`.text-primary`、`.bg-primary`、
> `.active-common`、`.link-primary`、按钮/表格/选中态等）直接引用新语义 token，别名覆盖会被绕过。

### 需要覆盖的 token 清单

| 语义 token                                | 对应旧别名                      | 说明                         |
| ----------------------------------------- | ------------------------------- | ---------------------------- |
| `--q-color-primary`                       | `--primary-color`               | 品牌主色                     |
| `--q-color-primary-hover`                 | `--primary-hover`               | 悬停态                       |
| `--q-color-primary-active`                | —                               | 按压态（不覆盖会闪回默认色） |
| `--q-color-primary-light`                 | `--primary-light`               | 主色浅色                     |
| `--q-color-primary-lighter`               | —                               | 更浅色（表格选中行背景等）   |
| `--q-color-link` / `--q-color-link-hover` | `--link-color` / `--link-hover` | 链接色                       |
| `--q-color-tag`                           | `--tag-primary-color`           | 标签背景色（`.tag` 类用）    |
| `--q-color-shadow-inverse`                | `--shadow-inverse`              | 反色阴影                     |

### 正确示例（沿用旧别名，保证端内旧样式不断）

```css
:root {
  /* 覆盖语义 token（qyani 组件真正读取的） */
  --q-color-primary: #1d4ed8;
  --q-color-primary-hover: #15399a;
  --q-color-primary-active: #15399a;
  --q-color-primary-light: #4e7dff;
  --q-color-primary-lighter: #e6edff;
  --q-color-link: #0240ed;
  --q-color-link-hover: #0240ed;
  --q-color-tag: #1d4ed8;

  /* 兼容别名跟随语义 token */
  --primary-color: var(--q-color-primary);
  --primary-hover: var(--q-color-primary-hover);
  --primary-light: var(--q-color-primary-light);
  --link-hover: var(--q-color-link-hover);
  --tag-primary-color: var(--q-color-tag);
}

/* 暗色模式要再次覆盖（qyani `dark.css` 会重置为默认黄） */
body.dark-mode {
  --q-color-primary: #1d4ed8;
  /* …同上，保持端内主色不变… */
}
```

### 注意

- `-active` / `-lighter` 漏了会闪回 qyani 默认黄（按钮按压态、表格选中行可见）。
- QTag 组件默认 `background: var(--tag-primary-color)`（走旧别名），`.tag` 工具类走 `--q-color-tag`（新 token）——要改标签色需两头都覆盖。

## 配合工具函数

组件库提供 `useFollowSystemTheme`，可自动跟随系统主题并持久化用户选择：

```ts
import { useFollowSystemTheme } from 'qyani-components';

useFollowSystemTheme();
```

组件 `<QThemeToggle>` 提供主题切换按钮，封装了手动切换与图标展示。
