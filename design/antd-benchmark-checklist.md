# 对标 Ant Design 组件清单 / 缺口检查表

> 目标：qyani-components 对标 **Ant Design**（官方 ant.design，当前文档 **v6.6.x**）。
> 用途：列出 Ant Design 官方全部基础组件，对照本库已有组件，形成「待建设」勾选清单。
> 更新日期：2026-09-05

- ✅ 已有对应组件（本库可直接/大致对应）
- ⬜ 待建设（本库缺失）
- 🆕 v6 新增（v5 无，如非对标 v5 可忽略）

---

## 一、Ant Design 官方组件总览

### 通用 General（4）

| 组件        | 说明                         | 本库状态                             |
| ----------- | ---------------------------- | ------------------------------------ |
| Button      | 按钮（唯一标准按钮）         | ✅ QButton（basic/Button）           |
| FloatButton | 悬浮按钮                     | ✅ QFloatButton（basic/FloatButton） |
| Icon        | 图标                         | ✅ QIcon（basic/Icon）               |
| Typography  | 排版（Title/Text/Paragraph） | ✅ QTypography（basic/Typography）   |

### 布局 Layout（7）

| 组件     | 说明                                | 本库状态                                            |
| -------- | ----------------------------------- | --------------------------------------------------- |
| Divider  | 分割线                              | ✅ QDivider（display/Divider）                      |
| Flex     | 弹性布局                            | ✅ QFlex（layout/Flex）                             |
| Grid     | 栅格（Row/Col）                     | ✅ QRow + QCol（layout/Row、layout/Col）            |
| Layout   | 布局（Header/Sider/Content/Footer） | ✅ QLayout + Header/Sider/Content/Footer（layout/） |
| Masonry  | 瀑布流 🆕6.0                        | ✅ QMasonry（layout/Masonry）                       |
| Space    | 间距                                | ✅ QSpace（layout/Space）                           |
| Splitter | 分隔面板                            | ✅ QSplitter（layout/Splitter）                     |

### 导航 Navigation（7）

| 组件       | 说明     | 本库状态                                                  |
| ---------- | -------- | --------------------------------------------------------- |
| Anchor     | 锚点     | ✅ QAnchor（navigation/Anchor）                           |
| Breadcrumb | 面包屑   | ✅ QBreadcrumb（navigation/Breadcrumb）                   |
| Dropdown   | 下拉菜单 | ✅ QDropdown（navigation/Dropdown）                       |
| Menu       | 导航菜单 | ✅ QMenu（navigation/Menu；QNavSection 承担部分导航能力） |
| Pagination | 分页     | ✅ QPagination（basic/Pagination）                        |
| Steps      | 步骤条   | ✅ QSteps（navigation/Steps）                             |
| Tabs       | 标签页   | ✅ QTab（navigation/Tab）                                 |

### 数据录入 Data Entry（18）

| 组件                   | 本库状态                                                   |
| ---------------------- | ---------------------------------------------------------- |
| AutoComplete 自动完成  | ✅ QAutoComplete（input/AutoComplete）                     |
| Cascader 级联选择      | ✅ QCascader（input/Cascader）                             |
| Checkbox 多选框        | ✅ FormCheckboxGroup                                       |
| ColorPicker 颜色选择器 | ✅ FormColorPicker                                         |
| DatePicker 日期选择    | ✅ FormDatePicker                                          |
| Form 表单              | ✅ QForm（form/Form，容器+校验）+ QFormItem 单字段         |
| Input 输入框           | ✅ FormText                                                |
| InputNumber 数字输入   | ✅ QInputNumber（input/InputNumber）                       |
| Mentions 提及          | ✅ QMentions（input/Mentions）                             |
| Radio 单选框           | ✅ FormRadioGroup                                          |
| Rate 评分              | ✅ QRate（input/Rate）                                     |
| Select 选择器          | ✅ FormSelect                                              |
| Slider 滑动输入条      | ✅ QSlider（input/ 单值）+ QFormRangeSlider（form/ Range） |
| Switch 开关            | ✅ FormSwitch                                              |
| TimePicker 时间选择    | ✅ QTimePicker（input/TimePicker）                         |
| Transfer 穿梭框        | ✅ QTransfer（input/Transfer）                             |
| TreeSelect 树选择      | ✅ QTreeSelect（input/TreeSelect）                         |
| Upload 上传            | ✅ FormFileUpload                                          |

### 数据展示 Data Display（21）

| 组件                  | 本库状态                                       |
| --------------------- | ---------------------------------------------- |
| Avatar 头像           | ✅ QAvatar（display/Avatar）                   |
| Badge 徽标数          | ✅ QBadge（display/Badge）                     |
| Calendar 日历         | ✅ QCalendar（display/Calendar）               |
| Card 卡片             | ✅ QCard（layout/Card）                        |
| Carousel 走马灯       | ✅ QCarousel + CarouselItem                    |
| Collapse 折叠面板     | ✅ QCollapse + CollapseItem/CollapsibleSection |
| Descriptions 描述列表 | ✅ QDescriptions（display/Descriptions）       |
| Empty 空状态          | ✅ QEmpty（display/Empty）                     |
| Image 图片            | ✅ QImage（display/Image，可全屏预览）         |
| List 列表（已废弃）   | ⬜                                             |
| Listy 虚拟列表 🆕6.6  | ✅ QListy（display/Listy）                     |
| Popover 气泡卡片      | ✅ QPopover（layout/Popover）                  |
| QRCode 二维码         | ✅ QQRCode（display/QRCode）                   |
| Segmented 分段控制器  | ✅ QSegmented（display/Segmented）             |
| Statistic 统计数值    | ✅ QStatistic（display/Statistic）             |
| Table 表格            | ✅ QTable（display/Table，通用数据表格）       |
| Tag 标签              | ✅ QTag（basic/Tag）                           |
| Timeline 时间轴       | ✅ QTimeline（display/Timeline）               |
| Tooltip 文字提示      | ✅ QTooltip（layout/Tooltip）                  |
| Tour 漫游引导         | ✅ QTour（display/Tour）                       |
| Tree 树形控件         | ✅ QTree + TreeNode（layout/Tree）             |

### 反馈 Feedback（11）

| 组件                    | 本库状态                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| Alert 警告提示          | ✅ QAlert（display/Alert）                                          |
| Drawer 抽屉             | ✅ QDrawer（layout/Drawer）                                         |
| Message 全局提示        | ✅ QMessage（basic/Message）                                        |
| Modal 对话框            | ✅ QDialog（layout/Dialog）≈ Modal                                  |
| Notification 通知提醒框 | ✅ QNotification（basic/Notification + useNotification 命令式单例） |
| Popconfirm 气泡确认框   | ✅ QPopconfirm（layout/Popconfirm）                                 |
| Progress 进度条         | ✅ QProgressBar（display/ProgressBar）                              |
| Result 结果             | ✅ QResult（display/Result）                                        |
| Skeleton 骨架屏         | ✅ QSkeleton（loading/animations）                                  |
| Spin 加载中             | ✅ QLoading / QSpinner（loading/）                                  |
| Watermark 水印          | ✅ QWatermark（display/Watermark）                                  |

### 其他 Other（5）

| 组件                      | 本库状态                                                                       |
| ------------------------- | ------------------------------------------------------------------------------ |
| Affix 固钉                | ✅ QAffix（layout/Affix，吸顶/吸底 + target 滚动容器）                         |
| App 包裹组件              | ✅ QApp（theme/App，作用域 message + notification + modal，useQApp）           |
| BorderBeam 边框流光 🆕6.4 | ✅ QBorderBeam（display/BorderBeam）                                           |
| ConfigProvider 全局化配置 | ✅ QConfigProvider（theme/ConfigProvider，cssVars 局部主题/尺寸/方向 provide） |
| Util 工具类               | — 非视觉组件                                                                   |

### 重型 Pro 组件（独立包 @ant-design/pro-components）

ProLayout、ProForm、ProTable、ProDescriptions、ProList、EditableProTable（暂不在基础对标范围）

---

## 二、qyani-components 现有组件（`packages/components/src/components/`）

> 统计口径：组件 `.vue`（不含 `__test__`）。更新时间 2026-09-05，共 **96** 个。

| 分类目录    | 数量   | 组件                                                                                                                                                                                                                                                 |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| basic/      | 8      | Button、FloatButton、Icon、Message、Notification、Pagination、Tag、Typography                                                                                                                                                                        |
| display/    | 24     | Alert、Avatar、Badge、BorderBeam、Calendar、Carousel、CarouselItem、Descriptions、Divider、Empty、Image、LazyImage、Listy、MarkdownRender、ProgressBar、QRCode、Result、ScrollNotice、Segmented、Statistic、Table、Timeline、Tour、Watermark         |
| form/       | 15     | FormButton、FormCheckboxGroup、FormColorPicker、FormDatePicker、FormFileUpload、FormRadioGroup、FormRangeSlider、FormSelect、FormSwitch、FormTable、FormText、FormTextarea、Search、Form、FormItem                                                   |
| input/      | 9      | AutoComplete、Cascader、InputNumber、Mentions、Rate、Slider、TimePicker、Transfer、TreeSelect                                                                                                                                                        |
| layout/     | 26     | Affix、Card、Col、Collapse、CollapseItem、CollapsibleSection、Content、Dialog、Drawer、Flex、Footer、Header、Layout、Masonry、PopContainer、Popconfirm、Popover、Row、ScrollContainer、Sider、Space、Splitter、SwiperAction、Tooltip、Tree、TreeNode |
| loading/    | 4      | Loading、Breathing、Skeleton、Spinner（animations/）                                                                                                                                                                                                 |
| navigation/ | 7      | Anchor、Breadcrumb、Dropdown、Menu、NavSection、Steps、Tab                                                                                                                                                                                           |
| theme/      | 3      | App、ConfigProvider、ThemeToggle                                                                                                                                                                                                                     |
| **合计**    | **96** | 与 MCP 索引 `qyani-components/component=96` 一致                                                                                                                                                                                                     |

**qyani 独有（Ant Design 无直接对应）**：QMarkdownRender、QLazyImage、QScrollNotice、QSwiperAction、QThemeToggle、QNavSection、QPopContainer、QScrollContainer、QBreathing、QCollapsibleSection、QApp、QConfigProvider 等。

---

## 三、命名对照速查

| qyani 组件                         | 对应 Ant Design                           |
| ---------------------------------- | ----------------------------------------- |
| FormText / FormTextarea            | Input / Input.TextArea                    |
| FormSelect                         | Select                                    |
| FormCheckboxGroup / FormRadioGroup | Checkbox.Group / Radio.Group              |
| FormColorPicker                    | ColorPicker                               |
| FormDatePicker                     | DatePicker                                |
| FormFileUpload                     | Upload                                    |
| FormRangeSlider                    | Slider (range)                            |
| FormSwitch                         | Switch                                    |
| FormButton                         | Button（表单提交场景）                    |
| FormTable                          | Table（表单编辑场景）                     |
| QTable                             | Table（通用数据展示，由 QFormTable 泛化） |
| Search                             | Input.Search / AutoComplete               |
| Dialog                             | Modal                                     |
| ProgressBar                        | Progress                                  |
| Tab                                | Tabs                                      |
| Tree / TreeNode                    | Tree                                      |

---

## 四、早期建设记录（P0–P4，已完成）

### P0 基础设施 / 常用

- [x] QButton（独立通用按钮，对齐 Button 全部形态/尺寸/加载态）
- [x] QTypography（Title / Text / Paragraph + 可复制、省略）
- [x] QSpace（纵向/横向间距、自动换行、分隔符）
- [x] QTooltip（气泡文字提示，为 Popover/Popconfirm/锚点铺垫）

### P1 布局与导航

- [x] QLayout（Header / Sider / Content / Footer + 折叠 Sider）
- [x] QGrid（Row / Col，24 栅格 + 响应式）【以 QRow/QCol 实现，响应式待补】
- [x] QMenu（横向 / 纵向 / inline 导航菜单，两级 + 受控选中）
- [x] QBreadcrumb（面包屑导航）
- [x] QSteps（步骤条）
- [x] QAnchor（锚点，含滚动高亮，复用 MarkdownRender 的 scrollspy 经验）
- [x] QDropdown（下拉菜单，hover/click + 受控展开）

### P2 数据录入

- [x] QInputNumber（数字输入框）【input/】
- [x] QSlider（独立单值滑动条）【input/】
- [x] QRate（评分）【input/】
- [x] QTreeSelect（基于树数据自研下拉树）【input/】
- [x] QTransfer（穿梭框 dataSource+targetKeys，勾选/全选/搜索/双击/单向）【input/】
- [x] QCascader（级联多列面板，changeOnSelect/搜索/懒加载）【input/】
- [x] QAutoComplete（自动完成下拉候选 Combobox）【input/】

### P3 数据展示

- [x] QTable（通用数据表格 dataSource+columns：排序/筛选/分页/展开/行选择）【display/】
- [x] QEmpty（空状态）【display/】
- [x] QStatistic（统计数值 + 滚动动画 countUp）【display/】
- [x] QSegmented（分段控制器，roving radio 键盘导航/图标/禁用/block/vertical）【display/】
- [x] QTimeline（时间轴 left/right/alternate + 标签/自定义圆点/倒序/幽灵待定）【display/】
- [x] QDescriptions（描述列表：bordered/column/span/vertical）【display/】
- [x] QPopover（气泡卡片：hover/focus/click、12 方向、点击外部关闭）【layout/】
- [x] QImage（图片 + 全屏预览：缩放/旋转/还原/关闭）【display/】
- [x] QQRCode（二维码：qrcode 生成 SVG + 图标/纠错）【display/】

### P4 反馈与其他

- [x] QAlert（警告提示）【display/】
- [x] QNotification（通知提醒框：命令式 useNotification 单例 + QApp 作用域）
- [x] QPopconfirm（气泡确认框）【layout/，复用 QPopover + 异步确认 loading】
- [x] QResult（结果页）【display/】
- [x] QWatermark（水印）【display/】
- [x] QConfigProvider（全局主题/尺寸/方向/cssVars 局部主题）【theme/】
- [x] QApp（App 包裹：作用域 notification + useQApp）【theme/】
- [x] QAffix（固钉：吸顶/吸底 + 自定义滚动容器 target + onChange）【layout/】

---

## 五、下一步 Roadmap：完整对齐 antd（2026-09-05 起）

> 基线：本库 **96** 个组件（见上「二」，P5–P8 已收官）。上文「一、速览表」为早期记录、个别状态滞后，**当前覆盖以「二」+「P 系列勾选」+ 源码为准**。
> 覆盖现状（P5–P8 后）：导航 7/7、反馈 11/11 已完成；通用/数据录入/数据展示/布局经 P5–P8 大幅补齐（FloatButton Flex Splitter Masonry Mentions TimePicker Calendar Tour Listy Form FormItem 均已落地，见下方批勾选与「二」表）。

### 剩余缺口（对应 antd v6 基础可视组件）

| antd 组件       | 分类           | 建议目录           | 说明                                                                       |
| --------------- | -------------- | ------------------ | -------------------------------------------------------------------------- |
| FloatButton     | 通用           | basic/FloatButton  | ✅ QFloatButton（圆形/方形、badge/tooltip/backTop）                        |
| BorderBeam      | 其他 🆕6.4     | display/BorderBeam | ✅ QBorderBeam（color/count/duration/hover）                               |
| Flex            | 布局           | layout/Flex        | ✅ QFlex（justify/align/gap/wrap/vertical/tag）                            |
| Splitter        | 布局           | layout/Splitter    | ✅ QSplitter（row/column、拖拽+键盘、min/max）                             |
| Masonry         | 布局 🆕6.0     | layout/Masonry     | ✅ QMasonry（columns/gap 瀑布流）                                          |
| Mentions        | 数据录入       | input/Mentions     | ✅ QMentions（@ 提及下拉）                                                 |
| TimePicker      | 数据录入       | input/TimePicker   | ✅ QTimePicker（HH:mm[:ss] 列表面板、步长/清除）                           |
| Calendar        | 数据展示       | display/Calendar   | ✅ QCalendar（月视图 + 选中/禁用）                                         |
| Tour            | 数据展示       | display/Tour       | ✅ QTour（steps 引导 + 遮罩挖孔）                                          |
| Listy           | 数据展示 🆕6.6 | display/Listy      | ✅ QListy（定高虚拟列表）                                                  |
| Form / FormItem | 数据录入       | form/              | ✅ QForm + QFormItem（model/rules/validate 校验体系，可驱动 QForm\* 控件） |

### P5 轻量批次

- [x] 一致性整理：刷新「一、速览表」与源码一致（2026-09-05，P5–P8 后共 96）
- [x] QFloatButton（basic/FloatButton）：shape/type/icon/#icon/badge/tooltip/backTop
- [x] QBorderBeam（display/BorderBeam）：动画边框容器 size/duration/color

### P6 中等批次

- [x] QFlex（layout/Flex）：justify/align/gap/wrap/vertical
- [x] QSplitter（layout/Splitter）：pane size/min/max、拖拽 resize、折叠、horizontal/vertical
- [x] QTimePicker（input/TimePicker）：format/use12Hours/value(v-model)/allowClear/disabled

### P7 重度批次

- [x] QMentions（input/Mentions）：textarea + @ 提及下拉 options/prefix/autoSize
- [x] QCalendar（display/Calendar）：月视图 v-model + dateCellRender/cellRender/header
- [x] QTour（display/Tour）：steps 定位引导 + 遮罩 / prev / next / close
- [x] QListy（display/Listy）：窗口化虚拟滚动
- [x] QMasonry（layout/Masonry）：columns/gap 瀑布流

### P8 基础设施 / 体系

- [x] QForm + QFormItem（form/）：model / rules / validate / required，驱动 QForm\* 控件注册校验
- [x] QApp 扩展 message / modal 作用域上下文（作用域化 useMessage + QDialog 命令式）

### 横向一致性（每个新组件随批执行）

- [x] type.ts JSDoc 三标签 + README（Props/Emits/Slots/Exposes）+ `docs:update`（P5–P8 均随批完成）
- [x] 三文件注册 index.ts / install.ts / global.d.ts（util 则挂 utils/business）+ SearchBar 别名 + README 计数 + 本清单勾选（P5–P8 均随批完成）
- [x] 测试：纯逻辑（node）+ jsdom；eslint / prettier / vue-tsc / build 全绿；浏览器验证（P5–P8 均随批完成）
- [ ] 弹层 / 空态逐步接入 useQConfig——✅ 已接入 QTooltip/QPopover 的 getPopupContainer（Teleport 目标随 ConfigProvider）；renderEmpty / componentSize 及 Select/Dropdown/Table 等控件接入进行中
- [x] token 决策（2026-09-05）：**只保留自有语义层、删除全部派生中间层**——antd 别名层 `--q-ant-*` 与按钮派生 token（`--q-color-button-*`）、遗留短名 `--button-*` 均已删除；`QButton` / 旧式 `.button-primary` 直读语义（`--q-color-primary` / `-white` / `-primary-hover`）。目标 = 一套主色全局统一（改一处主色带动按钮），局部仍可 `QConfigProvider.cssVars` 覆盖 `--q-color-primary/-hover/-active` 自定义
- [x] 每批完成打 commit（conventional commit，≤127 字符）——最近：`ee68f3b`（P5–P8）
