# QYani Components

一个基于 Vue 3 + TypeScript 开发的现代化前端组件库项目，包含丰富的 UI 组件、文档系统和共享的 ESLint 配置。

## 📁 项目结构

```
qyani-components/
├── packages/
│   ├── components/     # 核心组件库 (qyani-components)
│   ├── docs/          # 文档站点 (@qianrenni-components/docs)
│   └── eslint/        # 共享 ESLint 配置 (@qianrenni/eslint-config)
├── package.json       # 根目录配置
└── pnpm-workspace.yaml # pnpm 工作区配置
```

## ✨ 特性

- 🎨 **丰富的组件**：涵盖基础组件、展示组件、表单组件、布局组件、加载动画等 50+ 组件
- 🔧 **TypeScript 支持**：完整的类型定义，良好的开发体验
- 📦 **按需引入**：支持按需加载，减小项目体积
- 🌈 **主题定制**：支持主题切换和样式定制
- 🚀 **性能优化**：虚拟列表、懒加载等性能优化组件
- 📝 **Markdown 渲染**：内置 Markdown 渲染组件
- 🎯 **工具函数**：提供多种常用工具函数（数据结构、缓存、时间处理等）
- 📚 **完整文档**：独立的文档站点，方便查阅和使用
- 🛠️ **统一规范**：共享的 ESLint 配置，保证代码质量

## 📦 安装与使用

### 安装组件库

```bash
npm install qyani-components@latest
# 或
pnpm add qyani-components
# 或
yarn add qyani-components
```

### 快速开始

#### 1. 引入样式

```typescript
import 'qyani-components/dist/style.css';
```

#### 2. 按需引入组件

```typescript
import { QButton, QFormContainer, QIcon } from 'qyani-components';
```

#### 3. 全局安装

```typescript
import qiannaicomponents from 'qyani-components';
import 'qyani-components/dist/style.css';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);
app.use(qiannaicomponents);
app.mount('#app');
```

#### 4. 使用组件

```vue
<template>
  <div>
    <QAvatar src="avatar.jpg" size="large" />
    <QFormContainer label="用户名" v-model="username" />
    <QButton type="primary">提交</QButton>
  </div>
</template>

<script setup lang="ts">
import { QAvatar, QButton, QFormContainer } from 'qyani-components';
import { ref } from 'vue';

const username = ref('');
</script>
```

## 📚 组件分类

### 基础组件 (Basic)

- `QButton` - 通用按钮组件
- `QIcon` - 图标组件
- `QMessage` - 消息提示
- `QPagination` - 分页组件
- `QTag` - 标签
- `QTypography` - 排版（Title / Text / Paragraph）

### 展示组件 (Display)

- `QAvatar` - 头像组件
- `QBadge` - 徽章组件
- `QCarousel` / `QCarouselItem` - 轮播图
- `QDivider` - 分割线
- `QEmpty` - 空状态
- `QLazyImage` - 懒加载图片
- `QMarkdownRender` - Markdown 渲染
- `QMobileFrame` - 手机框架
- `QProgressBar` - 进度条
- `QRainFigure` - 雨图
- `QScrollNotice` - 滚动公告
- `QSegmented` - 分段控制器
- `QStatistic` - 统计数值
- `QTimeline` - 时间轴
- `QVideoPlayer` - 视频播放器
- `QVirtualList` - 虚拟列表

### 表单组件 (Form)

- `QFormButton` - 表单按钮
- `QFormCheckboxGroup` - 复选框组
- `QFormColorPicker` - 颜色选择器
- `QFormContainer` - 表单容器
- `QFormDatalist` - 数据列表
- `QFormDatePicker` - 日期选择器
- `QFormFileUpload` - 文件上传
- `QFormRadioGroup` - 单选框组
- `QFormRangeSlider` - 范围滑块
- `QFormSelect` - 选择器
- `QFormSwitch` - 开关
- `QFormTable` - 表单表格
- `QFormText` - 文本输入框
- `QFormTextarea` - 多行文本框
- `QSearch` - 搜索框

### 通用录入组件 (Input)

- `QAutoComplete` - 自动完成
- `QCascader` - 级联选择
- `QInputNumber` - 数字输入框
- `QRate` - 评分
- `QSlider` - 滑动条
- `QTransfer` - 穿梭框
- `QTreeSelect` - 树选择

### 布局组件 (Layout)

- `QCard` - 卡片
- `QCol` / `QRow` - 24 栅格
- `QCollapse` / `QCollapseItem` - 折叠面板
- `QCollapsibleSection` - 可折叠区域
- `QContent` - 内容区
- `QDialog` - 对话框
- `QDrawer` - 抽屉
- `QFooter` - 底部栏
- `QHeader` - 顶栏
- `QLayout` - 布局容器
- `QPopContainer` - 弹出容器
- `QSider` - 侧边栏（可折叠）
- `QScrollContainer` - 滚动容器
- `QSpace` - 间距
- `QSwiperAction` - 滑动操作
- `QTooltip` - 文字提示
- `QTree` / `QTreeNode` - 树形控件

### 加载组件 (Loading)

- `QLoading` - 加载组件
- `QBreathing` - 呼吸动画
- `QSkeleton` - 骨架屏
- `QSpinner` - 旋转加载器

### 导航组件 (Navigation)

- `QAnchor` - 锚点
- `QBreadcrumb` - 面包屑
- `QDropdown` - 下拉菜单
- `QMenu` - 导航菜单
- `QNavSection` - 导航区域
- `QSteps` - 步骤条
- `QTab` - 标签页

### 主题组件 (Theme)

- `QThemeToggle` - 主题切换

## 🛠️ 工具函数

组件库还提供了丰富的工具函数：

### 数据结构

- `useAVLTree` - AVL 树
- `useRedBlackTree` - 红黑树
- `useSkipList` - 跳表
- `useHeap` - 堆
- `useSegmentTree` - 线段树

### 缓存

- `useLRUCache` - LRU 缓存
- `useMemoryCache` - 内存缓存
- `useLocalStorage` - 本地存储

### 事件处理

- `useDebounce` - 防抖
- `useThrottle` - 节流
- `useDrag` - 拖拽
- `useMousePosition` - 鼠标位置

### 其他工具

- `useClip` - 剪贴板
- `useScreenSize` - 屏幕尺寸
- `useTimeUtils` - 时间工具
- `useNullHandel` - 空值处理
- `useFollowSystemTheme` - 跟随系统主题

## 🔧 开发指南

### 环境准备

```bash
# 安装依赖（在项目根目录执行）
pnpm install
```

### 可用脚本命令

```bash
# 代码检查
pnpm run lint              # 检查代码规范
pnpm run lint:fix          # 自动修复代码规范问题

# 代码格式化
pnpm run prettier          # 格式化所有相关文件

# 组件库构建
pnpm run build:components  # 构建组件库

# 文档相关
pnpm run docs:dev          # 启动文档开发服务器
pnpm run docs:update       # 更新文档内容
pnpm run docs:build        # 构建文档站点（先构建组件再构建文档）
```

### 组件库开发（packages/components）

```bash
cd packages/components

# 启动开发服务器
pnpm run dev

# 构建组件库
pnpm run build

# 类型检查
pnpm run type-check

# 运行测试
pnpm run test
pnpm run test:watch        # 监听模式
pnpm run test:coverage     # 生成覆盖率报告
```

### 文档开发（packages/docs）

```bash
cd packages/docs

# 启动文档开发服务器
pnpm run dev

# 构建文档站点
pnpm run build

# 预览构建结果
pnpm run preview

# 更新文档内容（从组件源码自动生成）
pnpm run update
```

## 📖 文档

- [在线文档](https://qyani-ui.netlify.app/#)
- [更新日志 (Changelog)](./CHANGELOG.md)

## 📄 License

ISC

## 👨‍💻 作者

qianrenni

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ by QYani Team
