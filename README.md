# QYani Components

A modern front-end component library developed with Vue 3 + TypeScript, featuring a rich collection of UI components, a documentation system, and shared ESLint configurations.

[中文版](./README.zh-CN.md)

## 📁 Project Structure

```
qyani-components/
├── packages/
│   ├── components/     # Core Component Library (qyani-components)
│   ├── docs/          # Documentation Site (@qianrenni-components/docs)
│   └── eslint/        # Shared ESLint Config (@qianrenni/eslint-config)
├── package.json       # Root Configuration
└── pnpm-workspace.yaml # pnpm Workspace Configuration
```

## ✨ Features

- 🎨 **Rich Components**: Over 50+ components covering basics, displays, forms, layouts, loading animations, and more.
- 🔧 **TypeScript Support**: Complete type definitions for an excellent development experience.
- 📦 **On-demand Import**: Supports on-demand loading to reduce project bundle size.
- 🌈 **Theme Customization**: Supports theme switching and style customization.
- 🚀 **Performance Optimized**: Includes performance-optimized components like virtual lists and lazy loading.
- 📝 **Markdown Rendering**: Built-in Markdown rendering component.
- 🎯 **Utility Functions**: Provides various common utility functions (data structures, caching, time processing, etc.).
- 📚 **Comprehensive Docs**: A standalone documentation site for easy reference and usage.
- 🛠️ **Unified Standards**: Shared ESLint configuration to ensure code quality.

## 📦 Installation & Usage

### Install the Component Library

```bash
npm install qyani-components@latest
# or
pnpm add qyani-components
# or
yarn add qyani-components
```

### Quick Start

#### 1. Import Styles

```typescript
import 'qyani-components/dist/style.css';
```

#### 2. Import Components On-demand

```typescript
import { QButton, QFormContainer, QIcon } from 'qyani-components';
```

#### 3. Global Registration

```typescript
import qiannaicomponents from 'qyani-components';
import 'qyani-components/dist/style.css';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);
app.use(qiannaicomponents);
app.mount('#app');
```

#### 4. Use Components

```vue

```

## 📚 Component Categories

### Basic Components

- `QButton` - Button component
- `QFloatButton` - Float button (badge/tooltip/backTop)
- `QIcon` - Icon component
- `QMessage` - Message prompt
- `QNotification` - Notification (imperative util)
- `QPagination` - Pagination component
- `QTag` - Tag
- `QTypography` - Typography (Title / Text / Paragraph)

### Display Components

- `QAvatar` - Avatar component
- `QBadge` - Badge component
- `QBorderBeam` - Border beam
- `QCarousel` / `QCarouselItem` - Carousel
- `QDivider` - Divider
- `QEmpty` - Empty state
- `QLazyImage` - Lazy load image
- `QMarkdownRender` - Markdown renderer
- `QMobileFrame` - Mobile phone frame
- `QProgressBar` - Progress bar
- `QRainFigure` - Rain figure effect
- `QScrollNotice` - Scrolling notice
- `QSegmented` - Segmented control
- `QStatistic` - Statistic
- `QTable` - Data table
- `QDescriptions` - Descriptions list
- `QImage` - Image (with preview)
- `QQRCode` - QR code
- `QPopover` - Popover card
- `QPopconfirm` - Popconfirm
- `QAlert` - Alert
- `QResult` - Result page
- `QWatermark` - Watermark
- `QTimeline` - Timeline
- `QVideoPlayer` - Video player
- `QVirtualList` - Virtual list

### Form Components

- `QFormButton` - Form button
- `QFormCheckboxGroup` - Checkbox group
- `QFormColorPicker` - Color picker
- `QFormContainer` - Form container
- `QFormDatalist` - Data list
- `QFormDatePicker` - Date picker
- `QFormFileUpload` - File upload
- `QFormRadioGroup` - Radio group
- `QFormRangeSlider` - Range slider
- `QFormSelect` - Select
- `QFormSwitch` - Switch
- `QFormTable` - Form table
- `QFormText` - Text input
- `QFormTextarea` - Textarea
- `QSearch` - Search box

### Input Components (Input)

- `QAutoComplete` - Auto complete
- `QCascader` - Cascader
- `QInputNumber` - Number input
- `QRate` - Rate
- `QSlider` - Slider
- `QTimePicker` - Time picker
- `QTransfer` - Transfer
- `QTreeSelect` - Tree select

### Layout Components

- `QAffix` - Affix (scroll pin)
- `QCard` - Card
- `QCol` / `QRow` - 24-grid
- `QCollapse` / `QCollapseItem` - Collapse panel
- `QCollapsibleSection` - Collapsible section
- `QContent` - Layout content
- `QDialog` - Dialog
- `QDrawer` - Drawer
- `QFlex` - Flex layout
- `QFooter` - Layout footer
- `QHeader` - Layout header
- `QLayout` - Layout container
- `QPopContainer` - Pop-up container
- `QSider` - Layout sider (collapsible)
- `QScrollContainer` - Scroll container
- `QSpace` - Space
- `QSplitter` - Splitter (draggable)
- `QSwiperAction` - Swipe action
- `QTooltip` - Tooltip
- `QTree` / `QTreeNode` - Tree control

### Loading Components

- `QLoading` - Loading component
- `QBreathing` - Breathing animation
- `QSkeleton` - Skeleton screen
- `QSpinner` - Spinner loader

### Navigation Components

- `QAnchor` - Anchor
- `QBreadcrumb` - Breadcrumb
- `QDropdown` - Dropdown menu
- `QMenu` - Navigation menu
- `QNavSection` - Navigation section
- `QSteps` - Steps
- `QTab` - Tabs

### Theme Components

- `QApp` - App wrapper (scoped notification)
- `QConfigProvider` - Global config (theme/size/direction)
- `QThemeToggle` - Theme toggle

## 🛠️ Utility Functions

The library also provides a rich set of utility functions:

### Data Structures

- `useAVLTree` - AVL Tree
- `useRedBlackTree` - Red-Black Tree
- `useSkipList` - Skip List
- `useHeap` - Heap
- `useSegmentTree` - Segment Tree

### Caching

- `useLRUCache` - LRU Cache
- `useMemoryCache` - Memory Cache
- `useLocalStorage` - Local Storage

### Event Handling

- `useDebounce` - Debounce
- `useThrottle` - Throttle
- `useDrag` - Drag
- `useMousePosition` - Mouse position

### Other Utilities

- `useClip` - Clipboard
- `useScreenSize` - Screen size
- `useTimeUtils` - Time utilities
- `useNullHandel` - Null value handling
- `useFollowSystemTheme` - Follow system theme

## 🔧 Development Guide

### Environment Setup

```bash
# Install dependencies (run in the project root)
pnpm install
```

### Available Scripts

```bash
# Code Linting
pnpm run lint              # Check code standards
pnpm run lint:fix          # Auto-fix code standard issues

# Code Formatting
pnpm run prettier          # Format all relevant files

# Component Library Build
pnpm run build:components  # Build the component library

# Documentation
pnpm run docs:dev          # Start the documentation dev server
pnpm run docs:update       # Update documentation content
pnpm run docs:build        # Build the documentation site (builds components first)
```

### Component Library Development (packages/components)

```bash
cd packages/components

# Start dev server
pnpm run dev

# Build the component library
pnpm run build

# Type checking
pnpm run type-check

# Run tests
pnpm run test
pnpm run test:watch        # Watch mode
pnpm run test:coverage     # Generate coverage report
```

### Documentation Development (packages/docs)

```bash
cd packages/docs

# Start documentation dev server
pnpm run dev

# Build the documentation site
pnpm run build

# Preview the build result
pnpm run preview

# Update documentation content (auto-generated from component source)
pnpm run update
```

## 📖 Documentation

- [Online Documentation](https://qyani-ui.netlify.app/#)
- [Changelog (更新日志)](./CHANGELOG.md)

## 📄 License

ISC

## 👨‍💻 Author

qianrenni

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

Made with ❤️ by QYani Team
