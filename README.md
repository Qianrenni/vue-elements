# QYani Components

A modern front-end component library developed with Vue 3 + TypeScript, featuring a rich collection of UI components, a documentation system, and shared ESLint configurations.

[中文版](./README.zh-CN.md)

## 📁 Project Structure

```
qyani-components/
├── packages/
│   ├── components/     # Core Component Library (qyani-components)
│   ├── docs/          # Documentation Site (@qyani-components/docs)
│   └── eslint/        # Shared ESLint Config (@qyani/eslint-config)
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
import { QIcon, QButton, QFormContainer } from 'qyani-components';
```

#### 3. Global Registration

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import qiannaicomponents from 'qyani-components';
import 'qyani-components/dist/style.css';

const app = createApp(App);
app.use(qiannaicomponents);
app.mount('#app');
```

#### 4. Use Components

```vue

```

## 📚 Component Categories

### Basic Components

- `QIcon` - Icon component
- `QMessage` - Message prompt
- `QPagination` - Pagination component

### Display Components

- `QAvatar` - Avatar component
- `QBadge` - Badge component
- `QCarousel` / `QCarouselItem` - Carousel
- `QDivider` - Divider
- `QLazyImage` - Lazy load image
- `QMarkdownRender` - Markdown renderer
- `QMobileFrame` - Mobile phone frame
- `QProgressBar` - Progress bar
- `QRainFigure` - Rain figure effect
- `QScrollNotice` - Scrolling notice
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

### Layout Components

- `QCard` - Card
- `QCollapse` / `QCollapseItem` - Collapse panel
- `QCollapsibleSection` - Collapsible section
- `QDialog` - Dialog
- `QDrawer` - Drawer
- `QPopContainer` - Pop-up container
- `QScrollContainer` - Scroll container
- `QSwiperAction` - Swipe action
- `QTree` / `QTreeNode` - Tree control

### Loading Components

- `QLoading` - Loading component
- `QBreathing` - Breathing animation
- `QSkeleton` - Skeleton screen
- `QSpinner` - Spinner loader

### Navigation Components

- `QNavSection` - Navigation section
- `QTab` - Tabs

### Theme Components

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

## 📄 License

ISC

## 👨‍💻 Author

qianrenni

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

Made with ❤️ by QYani Team
