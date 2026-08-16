# 通用样式（CSS 设计系统）

## 用途

提供组件库统一的视觉变量、基础样式与工具类，保证跨组件一致的视觉语言。
所有模块通过单入口 `src/style/index.css` 按层叠优先级组织，构建时合并为 `dist/style.css`。

## 引入方式

```css
/* 全量引入（组件库默认行为） */
@import 'qyani-components/dist/style.css';
```

## 加载顺序

样式按 CSS 层叠优先级从低到高依次加载：

| 顺序 | 模块       | 说明                                                     |
| ---- | ---------- | -------------------------------------------------------- |
| 1    | Tokens     | 设计变量：颜色、间距、圆角、阴影、透明度、排版、动效     |
| 2    | Theme      | 暗色主题覆盖（`body.dark-mode` / `[data-theme="dark"]`） |
| 3    | Base       | 重置与基础元素样式                                       |
| 4    | Utilities  | 工具类：布局、间距、颜色、排版、显示、响应式             |
| 5    | Components | 组件级共享样式类                                         |

## 目录结构

```
src/style/
├── index.css        # 入口（@import 全部模块）
├── tokens/          # 设计变量
│   ├── color.css    # 颜色
│   ├── spacing.css  # 间距
│   ├── radius.css   # 圆角
│   ├── elevation.css# 阴影与层级
│   ├── opacity.css  # 透明度
│   ├── typography.css # 排版
│   └── motion.css   # 动效
├── theme/
│   └── dark.css     # 暗色主题
├── base/
│   ├── reset.css    # CSS 重置
│   └── base.css     # 基础元素样式
├── utilities/
│   ├── layout.css   # 布局（Flex / Grid）
│   ├── spacing.css  # 间距（margin / padding）
│   ├── color.css    # 颜色（背景 / 文字）
│   ├── typography.css # 排版
│   ├── display.css  # 显示 / 定位 / 圆角 / 阴影
│   └── responsive.css # 响应式
└── components/      # 组件级共享样式
```

## 各模块文档

| 模块     | 说明                                                      |
| -------- | --------------------------------------------------------- |
| 设计变量 | 颜色、间距、圆角、阴影、透明度、排版、动效的 `--q-*` 变量 |
| 工具类   | 布局、间距、颜色、排版、显示、响应式语义化类名            |
| 基础样式 | 重置规则与 body、pre、code 等基础元素样式                 |
| 主题     | 暗色主题切换方式与覆盖变量                                |

## 约定

- 变量统一 `--q-*` 前缀，类名统一语义化短横线命名。
- 保留旧版别名（如 `--primary-color`、`.padding-rem`、`.radius-half-rem`）实现零破坏迁移。
- 暗色主题只覆盖语义化 token，原始调色板不变，保证两种主题下设计语言一致。
