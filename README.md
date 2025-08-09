# 项目结构

```shell
qyani-components/                     # 项目根目录，一个基于 Vue 的 UI 组件库项目
├── index.html                        # 项目入口 HTML 文件，Vite 构建的主页面，用于开发和测试组件
├── index_python.py                   # Python 脚本文件，可能用于自动化任务（如生成文档、测试等），非核心前端功能
├── LICENSE                           # 开源许可证文件，声明项目的使用条款（如 MIT、Apache 等）
├── mock/                             # 模拟数据目录，存放用于开发测试的假数据或资源
|   └── pic.md                        # 示例 Markdown 文件，可能用于测试图片渲染或文档展示功能
├── package.json                      # 项目元信息文件，定义依赖、脚本命令、项目名称、版本等
├── pnpm-lock.yaml                    # pnpm 包管理器的锁定文件，确保依赖版本一致性
├── qyani-components.iml              # IntelliJ IDEA 项目配置文件，用于 IDE 识别项目结构
├── qyani-components_structure.txt    # 项目结构说明文本文件，便于开发者快速了解整体架构
├── README.md                         # 项目说明文档，介绍项目功能、安装、使用方法和贡献指南
├── src/                              # 源码目录，存放所有前端源代码
|   ├── components/                   # 所有可复用 Vue 组件的主目录
|   |   ├── basic/                    # 基础组件，如图标、图标配对等
|   |   |   ├── Icon.vue              # 图标组件，封装 SVG 或字体图标，支持动态类型和颜色
|   |   |   └── IconGroups.vue        # 图标组组件，用于批量展示多个图标，支持布局配置
|   |   ├── display/                  # 展示类组件，用于信息呈现
|   |   |   ├── Avatar.vue            # 头像组件，显示用户或对象的圆形/方形图像
|   |   |   ├── Badge.vue             # 徽章组件，用于标记状态、数量等小标签
|   |   |   ├── Carousel.vue          # 轮播图组件，支持自动播放、分页、左右切换
|   |   |   ├── CarouselItem.vue      # 轮播项组件，Carousel 的子组件，定义每一页内容
|   |   |   ├── Divider.vue           # 分割线组件，用于划分内容区块
|   |   |   ├── MarkdownRender.vue    # Markdown 渲染组件，将 Markdown 文本转为 HTML 展示
|   |   |   ├── MobileFrame.vue       # 移动端模拟框架组件，用于在网页中展示移动端界面效果
|   |   |   ├── ProgressBar.vue       # 进度条组件，显示任务完成进度
|   |   |   ├── RainFigure.vue        # 雨滴动画组件，装饰性动效（可能用于加载或背景）
|   |   |   └── ScrollNotice.vue      # 滚动通知组件，横向或纵向滚动显示公告信息
|   |   ├── form/                     # 表单相关组件
|   |   |   ├── FormButton.vue        # 表单按钮组件，封装常用提交、重置等操作
|   |   |   ├── FormCheckboxGroup.vue # 多选框组组件，支持多选输入
|   |   |   ├── FormColorPicker.vue   # 颜色选择器组件，允许用户选择颜色值
|   |   |   ├── FormContainer.vue     # 表单容器组件，统一管理表单样式与布局
|   |   |   ├── FormDatalist.vue      # 数据列表输入组件，提供输入建议（类似 autocomplete）
|   |   |   ├── FormDatePicker.vue    # 日期选择器组件，支持日期/时间选择
|   |   |   ├── FormFileUpload.vue    # 文件上传组件，支持拖拽、多选、预览等
|   |   |   ├── FormRadioGroup.vue    # 单选框组组件，支持单选输入
|   |   |   ├── FormRangeSlider.vue   # 范围滑块组件，用于选择数值区间
|   |   |   ├── FormSelect.vue        # 下拉选择组件，支持单选/多选
|   |   |   ├── FormTable.vue         # 表单表格组件，用于结构化数据输入
|   |   |   ├── FormText.vue          # 文本输入框组件，支持多种类型（text/password 等）
|   |   |   ├── FormTextarea.vue      # 多行文本输入组件
|   |   |   └── Search.vue            # 搜索框组件，集成清空、搜索图标等功能
|   |   ├── layout/                   # 布局类组件
|   |   |   ├── Card.vue              # 卡片组件，用于内容容器封装，支持标题、操作等
|   |   |   └── CollapsibleSection.vue # 可折叠区域组件，点击可展开/收起内容
|   |   ├── navigation/               # 导航类组件
|   |   |   ├── NavSection.vue        # 导航区域组件，用于组织导航菜单区块
|   |   |   └── Tab.vue               # 标签页组件，实现多标签切换功能
|   |   └── theme/                    # 主题相关组件
|   |       └── ThemeToggle.vue       # 主题切换组件，支持亮色/暗色模式切换
|   ├── events/                       # 事件逻辑封装目录，存放可复用的组合式函数（Composables）
|   |   ├── index.ts                  # 事件模块的导出入口，统一暴露所有事件 Hook
|   |   ├── useDrag.ts                # 拖拽事件 Hook，封装 drag & drop 交互逻辑
|   |   ├── useFormEvents.ts          # 表单事件 Hook，处理表单验证、提交等逻辑
|   |   └── useMousePosition.ts       # 鼠标位置监听 Hook，实时获取鼠标坐标
|   ├── icons/                        # 图标资源目录，存放 SVG 图标或图标映射文件（可能为空或由脚本生成）
|   ├── index.ts                      # 源码主入口文件，导出所有组件和工具，供外部引用
|   ├── style/                        # 全局样式目录
|   |   ├── common.css                # 通用样式，重置默认样式、定义基础类等
|   |   ├── gitub-markdown.css        # GitHub 风格的 Markdown 样式，用于美化 Markdown 渲染
|   |   └── katex.css                 # KaTeX 数学公式渲染样式，支持 LaTeX 公式展示
|   ├── template/                     # 模板代码目录，存放代码生成模板
|   |   └── Api.ts                    # API 请求模板，可能用于生成接口调用代码
|   ├── types/                        # TypeScript 类型定义目录
|   |   ├── form.ts                   # 表单相关的类型定义（如字段类型、验证规则等）
|   |   └── index.ts                  # 类型导出入口，集中导出所有类型
|   └── utils/                        # 工具函数目录，存放可复用的纯函数
|       ├── useDebounce.ts           # 防抖工具函数，限制高频函数执行
|       ├── index.ts                  # 工具模块导出入口，统一导出所有工具函数
|       ├── useThrottle.ts           # 节流工具函数，控制函数执行频率
|       └── useTime.ts               # 时间处理工具函数，如格式化、计算等
├── test/                             # 测试目录，存放组件演示和测试用例
|   ├── display/                      # 展示类组件的测试页面
|   |   ├── DisplayAvatar.vue         # Avatar 组件的测试/演示页面
|   |   ├── DisplayBadge.vue          # Badge 组件的测试/演示页面
|   |   ├── DisplayCard.vue           # Card 组件的测试/演示页面
|   |   ├── DisplayCarousel.vue       # Carousel 组件的测试/演示页面
|   |   ├── DisplayCollapsibleSection.vue # CollapsibleSection 组件测试页
|   |   ├── DisplayDivider.vue        # Divider 组件的测试/演示页面
|   |   ├── DisplayDragUtil.vue       # useDrag Hook 的测试页面
|   |   ├── DisplayForm.vue           # 表单组件集成测试页面
|   |   ├── DisplayIcon.vue           # Icon 组件的测试/演示页面
|   |   ├── DisplayIconGroups.vue     # IconGroups 组件的测试/演示页面
|   |   ├── DisplayMarkdownRender.vue # MarkdownRender 组件测试页
|   |   ├── DisplayMobileFrame.vue    # MobileFrame 组件的测试/演示页面
|   |   ├── DisplayNavSection.vue     # NavSection 组件的测试/演示页面
|   |   ├── DisplayProgressBar.vue    # ProgressBar 组件的测试/演示页面
|   |   ├── DisplayRainFigure.vue     # RainFigure 组件的测试/演示页面
|   |   ├── DisplayScrollNotice.vue   # ScrollNotice 组件的测试/演示页面
|   |   ├── DisplaySearch.vue         # Search 组件的测试/演示页面
|   |   ├── DisplayTab.vue            # Tab 组件的测试/演示页面
|   |   ├── DisplayTag.vue            # 可能遗漏定义的 Tag 组件测试页（项目中未见 Tag.vue）
|   |   ├── DisplayThemeToggle.vue    # ThemeToggle 组件的测试/演示页面
|   |   ├── DisplayTimeUtil.vue       # timeUtil 工具函数的测试演示
|   |   ├── DisplayTypeText.vue       # 可能是打字动画组件的测试页（未在 src 中找到）
|   |   └── DisplayUseMousePosition.vue # useMousePosition Hook 的测试页面
|   ├── html/                         # 独立 HTML 测试页面，用于测试原生功能或 Canvas 动画
|   |   ├── canvas.html               # Canvas 相关功能测试页面（如图形绘制）
|   |   ├── form.html                 # 原生表单功能测试页面
|   |   └── loadingAnimation.html     # 加载动画测试页面（可能使用 CSS/JS 实现）
|   ├── main.ts                       # 测试项目的入口 TypeScript 文件，用于挂载测试组件
|   └── Test.vue                      # 通用测试组件，可能用于集成多个组件测试
├── tsconfig.json                     # TypeScript 配置文件，定义编译选项和路径别名
├── types/                            # 项目级类型定义目录（可能与 src/types 重复或用于全局声明）
└── vite.config.ts                    # Vite 构建工具配置文件，定义开发服务器、插件、别名等
```

# 快速开始

**1.引入组件库**

```
npm install qyani-components@latest
```

**2.引入样式(任意.css结尾)**

```
import 'qyani-components/dist/qyani-components.*.css';
```

**3.引入组件**

```
import { the-components } from 'qyani-components';
```

# 打开展示页面

**1.注释掉Vite.config.json中的postcss**

# 打包组件库

**启用postcss插件**

# 启动测试页面

```shell
pnpm run test
```