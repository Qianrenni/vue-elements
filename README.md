# qiannai Components

一个基于 Vue 3 + TypeScript 开发的现代化前端组件库，提供丰富的高质量 UI 组件和实用工具函数。

## ✨ 特性

- 🎨 **丰富的组件**：涵盖基础组件、展示组件、表单组件、布局组件、加载动画等
- 🔧 **TypeScript 支持**：完整的类型定义，良好的开发体验
- 📦 **按需引入**：支持按需加载，减小项目体积
- 🌈 **主题定制**：支持主题切换和样式定制
- 🚀 **性能优化**：虚拟列表、懒加载等性能优化组件
- 📝 **Markdown 渲染**：内置 Markdown 渲染组件
- 🎯 **工具函数**：提供多种常用工具函数（数据结构、缓存、时间处理等）

## 📦 安装

```bash
npm install qiannai-components@latest
# 或
pnpm add qiannai-components
# 或
yarn add qiannai-components
```

## 🚀 快速开始

### 1. 引入样式

```typescript
import 'qiannai-components/dist/style.css';
```

### 2. 按需引入组件

```typescript
import { QIcon, QButton, QFormContainer } from 'qiannai-components';
```

### 3. 全局安装

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import qiannaicomponents from 'qiannai-components'
import 'qiannai-components/dist/style.css'

const app = createApp(App)
app.use(qiannaicomponents)
app.mount('#app')
```

### 4. 使用组件

```vue
<template>
  <div>
    <QAvatar src="avatar.jpg" size="large" />
    <QFormContainer label="用户名" v-model="username" />
    <QButton type="primary">提交</QButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QAvatar, QFormContainer, QButton } from 'qiannai-components'

const username = ref('')
</script>
```

## 📚 组件列表

### 基础组件 (Basic)
- `QIcon` - 图标组件
- `QMessage` - 消息提示
- `QPagination` - 分页组件

### 展示组件 (Display)
- `QAvatar` - 头像组件
- `QBadge` - 徽章组件
- `QCarousel` / `QCarouselItem` - 轮播图
- `QDivider` - 分割线
- `QLazyImage` - 懒加载图片
- `QMarkdownRender` - Markdown 渲染
- `QMobileFrame` - 手机框架
- `QProgressBar` - 进度条
- `QRainFigure` - 雨图
- `QScrollNotice` - 滚动公告
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

### 布局组件 (Layout)
- `QCard` - 卡片
- `QCollapse` / `QCollapseItem` - 折叠面板
- `QCollapsibleSection` - 可折叠区域
- `QDialog` - 对话框
- `QDrawer` - 抽屉
- `QPopContainer` - 弹出容器
- `QScrollContainer` - 滚动容器
- `QSwiperAction` - 滑动操作
- `QTree` / `QTreeNode` - 树形控件

### 加载组件 (Loading)
- `QLoading` - 加载组件
- `QBreathing` - 呼吸动画
- `QSkeleton` - 骨架屏
- `QSpinner` - 旋转加载器

### 导航组件 (Navigation)
- `QNavSection` - 导航区域
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
# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm run dev
```

### 构建打包

```bash
# 构建组件库
pnpm run build
```

### 运行测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm run test:watch

# 生成覆盖率报告
pnpm run test:coverage
```

### 类型检查

```bash
pnpm run type-check
```

## 📖 文档

- [在线文档](https://qyani-ui.netlify.app/#)
- [文档源码](https://github.com/Qianrenni/qyani-ui)

## 📄 License

ISC

## 👨‍💻 作者

qianrenni

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 包名为 `qiannai-components`，