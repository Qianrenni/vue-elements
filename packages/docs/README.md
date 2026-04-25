# QYani Components Docs

QYani Components 的官方文档站点，提供组件库的完整使用指南、API 参考和示例代码。

## 📖 简介

这是 QYani Components 组件库的文档项目，基于 Vite + Vue 3 构建，提供：

- 📚 完整的组件 API 文档
- 💡 丰富的使用示例
- 🎨 实时预览和交互演示
- 🔍 便捷的组件搜索
- 🌙 深色/浅色主题切换

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

访问 `http://localhost:5173` 查看文档站点。

### 构建生产版本

```bash
pnpm run build
```

### 预览构建结果

```bash
pnpm run preview
```

## 📝 更新文档

文档内容会从组件源码自动生成，运行以下命令更新：

```bash
pnpm run update
```

该命令会执行以下脚本：
- `scripts/init.py` - 初始化文档结构
- `scripts/index_python.py` - 生成组件索引
- `scripts/get_component_info.py` - 提取组件信息

## 📁 项目结构

```
packages/docs/
├── src/              # 文档源代码
│   ├── components/   # 文档页面组件
│   ├── router/       # 路由配置
│   ├── styles/       # 样式文件
│   └── ...
├── scripts/          # 文档生成脚本
│   ├── init.py
│   ├── index_python.py
│   └── get_component_info.py
├── public/           # 静态资源
├── example/          # 示例代码
└── package.json
```

## 🔧 开发指南

### 添加新组件文档

1. 在 `packages/components/src` 中添加新组件
2. 运行 `pnpm run update` 自动更新文档
3. 在 `example/` 目录添加使用示例（可选）
4. 手动调整文档页面（如需要）

### 自定义文档页面

文档页面位于 `src/components/` 目录，可以手动编辑和优化：

- 添加更详细的说明
- 补充使用场景
- 优化示例代码
- 添加注意事项

## 📦 依赖说明

### 核心依赖

- `vue` - Vue 3 框架
- `vue-router` - 路由管理
- `qyani-components` - 组件库（workspace 依赖）

### 开发依赖

- `vite` - 构建工具
- `@vitejs/plugin-vue` - Vue 支持
- `typescript` - TypeScript 支持
- `vue-tsc` - Vue 类型检查

## 🌐 在线文档

访问 [在线文档](https://qyani-ui.netlify.app/#) 查看完整版本文档。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进文档！

### 改进建议

- 补充缺失的组件文档
- 优化现有文档内容
- 添加更多使用示例
- 修复文档错误
- 改进文档样式和交互

## 📄 License

ISC

---

Made with ❤️ by QYani Team
