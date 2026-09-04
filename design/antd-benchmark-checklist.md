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

| 组件        | 说明                         | 本库状态                               |
| ----------- | ---------------------------- | -------------------------------------- |
| Button      | 按钮（唯一标准按钮）         | ⬜ 仅表单内 FormButton，缺独立 QButton |
| FloatButton | 悬浮按钮                     | ⬜                                     |
| Icon        | 图标                         | ✅ QIcon（basic/Icon）                 |
| Typography  | 排版（Title/Text/Paragraph） | ⬜                                     |

### 布局 Layout（7）

| 组件     | 说明                                | 本库状态                       |
| -------- | ----------------------------------- | ------------------------------ |
| Divider  | 分割线                              | ✅ QDivider（display/Divider） |
| Flex     | 弹性布局                            | ⬜                             |
| Grid     | 栅格（Row/Col）                     | ⬜                             |
| Layout   | 布局（Header/Sider/Content/Footer） | ⬜                             |
| Masonry  | 瀑布流 🆕6.0                        | ⬜                             |
| Space    | 间距                                | ⬜                             |
| Splitter | 分隔面板                            | ⬜                             |

### 导航 Navigation（7）

| 组件       | 说明     | 本库状态                                 |
| ---------- | -------- | ---------------------------------------- |
| Anchor     | 锚点     | ⬜（QMarkdownRender 目录滚动高亮可参考） |
| Breadcrumb | 面包屑   | ⬜                                       |
| Dropdown   | 下拉菜单 | ⬜                                       |
| Menu       | 导航菜单 | ⬜ 部分能力见 NavSection                 |
| Pagination | 分页     | ✅ QPagination（basic/Pagination）       |
| Steps      | 步骤条   | ⬜                                       |
| Tabs       | 标签页   | ✅ QTab（navigation/Tab）                |

### 数据录入 Data Entry（18）

| 组件                   | 本库状态                              |
| ---------------------- | ------------------------------------- |
| AutoComplete 自动完成  | ⬜（QSearch 部分类似）                |
| Cascader 级联选择      | ⬜                                    |
| Checkbox 多选框        | ✅ FormCheckboxGroup                  |
| ColorPicker 颜色选择器 | ✅ FormColorPicker                    |
| DatePicker 日期选择    | ✅ FormDatePicker                     |
| Form 表单              | ⬜ 目前表单控件以 Form\* 独立提供     |
| Input 输入框           | ✅ FormText                           |
| InputNumber 数字输入   | ⬜                                    |
| Mentions 提及          | ⬜                                    |
| Radio 单选框           | ✅ FormRadioGroup                     |
| Rate 评分              | ⬜                                    |
| Select 选择器          | ✅ FormSelect                         |
| Slider 滑动输入条      | ✅ FormRangeSlider（Range）           |
| Switch 开关            | ✅ FormSwitch                         |
| TimePicker 时间选择    | ⬜（FormDatePicker 是否含时间待确认） |
| Transfer 穿梭框        | ⬜                                    |
| TreeSelect 树选择      | ⬜（有 QTree，可封装）                |
| Upload 上传            | ✅ FormFileUpload                     |

### 数据展示 Data Display（21）

| 组件                  | 本库状态                                       |
| --------------------- | ---------------------------------------------- |
| Avatar 头像           | ✅ QAvatar（display/Avatar）                   |
| Badge 徽标数          | ✅ QBadge（display/Badge）                     |
| Calendar 日历         | ⬜                                             |
| Card 卡片             | ✅ QCard（layout/Card）                        |
| Carousel 走马灯       | ✅ QCarousel + CarouselItem                    |
| Collapse 折叠面板     | ✅ QCollapse + CollapseItem/CollapsibleSection |
| Descriptions 描述列表 | ⬜                                             |
| Empty 空状态          | ⬜                                             |
| Image 图片            | ⬜ 仅 LazyImage，缺独立 Image 预览             |
| List 列表（已废弃）   | ⬜                                             |
| Listy 虚拟列表 🆕6.6  | ⬜                                             |
| Popover 气泡卡片      | ⬜（PopContainer 部分类似）                    |
| QRCode 二维码         | ⬜                                             |
| Segmented 分段控制器  | ⬜                                             |
| Statistic 统计数值    | ⬜                                             |
| Table 表格            | ⬜ 仅表单场景 FormTable，缺通用 QTable         |
| Tag 标签              | ✅ QTag（basic/Tag）                           |
| Timeline 时间轴       | ⬜                                             |
| Tooltip 文字提示      | ⬜                                             |
| Tour 漫游引导         | ⬜                                             |
| Tree 树形控件         | ✅ QTree + TreeNode（layout/Tree）             |

### 反馈 Feedback（11）

| 组件                    | 本库状态                               |
| ----------------------- | -------------------------------------- |
| Alert 警告提示          | ⬜                                     |
| Drawer 抽屉             | ✅ QDrawer（layout/Drawer）            |
| Message 全局提示        | ✅ QMessage（basic/Message）           |
| Modal 对话框            | ✅ QDialog（layout/Dialog）≈ Modal     |
| Notification 通知提醒框 | ⬜                                     |
| Popconfirm 气泡确认框   | ⬜                                     |
| Progress 进度条         | ✅ QProgressBar（display/ProgressBar） |
| Result 结果             | ⬜                                     |
| Skeleton 骨架屏         | ✅ QSkeleton（loading/animations）     |
| Spin 加载中             | ✅ QLoading / QSpinner（loading/）     |
| Watermark 水印          | ⬜                                     |

### 其他 Other（5）

| 组件                      | 本库状态                              |
| ------------------------- | ------------------------------------- |
| Affix 固钉                | ⬜                                    |
| App 包裹组件              | ⬜（全局 message/modal 上下文）       |
| BorderBeam 边框流光 🆕6.4 | ⬜                                    |
| ConfigProvider 全局化配置 | ⬜（主题由 ThemeToggle 承担部分能力） |
| Util 工具类               | — 非视觉组件                          |

### 重型 Pro 组件（独立包 @ant-design/pro-components）

ProLayout、ProForm、ProTable、ProDescriptions、ProList、EditableProTable（暂不在基础对标范围）

---

## 二、qyani-components 现有组件（`packages/components/src/components/`）

| 分类目录     | 数量   | 组件                                                                                                                                                                               |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| basic/       | 4      | Icon、Message、Pagination、Tag                                                                                                                                                     |
| display/     | 9      | Avatar、Badge、Carousel、CarouselItem、Divider、LazyImage、MarkdownRender、ProgressBar、ScrollNotice                                                                               |
| form/        | 13     | FormButton、FormCheckboxGroup、FormColorPicker、FormDatePicker、FormFileUpload、FormRadioGroup、FormRangeSlider、FormSelect、FormSwitch、FormTable、FormText、FormTextarea、Search |
| layout/      | 11     | Card、Collapse、CollapseItem、CollapsibleSection、Dialog、Drawer、PopContainer、ScrollContainer、SwiperAction、Tree、TreeNode                                                      |
| loading/     | 2 目录 | Loading、animations/（Breathing、Skeleton、Spinner）                                                                                                                               |
| navigation/  | 2      | NavSection、Tab                                                                                                                                                                    |
| theme/       | 1      | ThemeToggle                                                                                                                                                                        |
| **目录合计** | **42** | 含子组件约 44 个                                                                                                                                                                   |

**qyani 独有（Ant Design 无对应）**：QMarkdownRender、QLazyImage、QScrollNotice、QSwiperAction、QThemeToggle、QNavSection、QPopContainer、QScrollContainer、QBreathing 等。

---

## 三、命名对照速查

| qyani 组件                         | 对应 Ant Design              |
| ---------------------------------- | ---------------------------- |
| FormText / FormTextarea            | Input / Input.TextArea       |
| FormSelect                         | Select                       |
| FormCheckboxGroup / FormRadioGroup | Checkbox.Group / Radio.Group |
| FormColorPicker                    | ColorPicker                  |
| FormDatePicker                     | DatePicker                   |
| FormFileUpload                     | Upload                       |
| FormRangeSlider                    | Slider (range)               |
| FormSwitch                         | Switch                       |
| FormButton                         | Button（表单提交场景）       |
| FormTable                          | Table（表单编辑场景）        |
| Search                             | Input.Search / AutoComplete  |
| Dialog                             | Modal                        |
| ProgressBar                        | Progress                     |
| Tab                                | Tabs                         |
| Tree / TreeNode                    | Tree                         |

---

## 四、建议建设优先级（勾选即完成）

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

- [ ] QTable（通用数据表格：排序/筛选/分页/展开/选择）
- [x] QEmpty（空状态）【display/】
- [x] QStatistic（统计数值 + 滚动动画 countUp）【display/】
- [x] QSegmented（分段控制器，roving radio 键盘导航/图标/禁用/block/vertical）【display/】
- [x] QTimeline（时间轴 left/right/alternate + 标签/自定义圆点/倒序/幽灵待定）【display/】
- [ ] QPopover（气泡卡片）
- [ ] QImage（图片 + 预览）
- [x] QTimeline（时间轴 left/right/alternate、标签/自定义圆点/倒序/幽灵待定）【display/】
- [ ] QDescriptions（描述列表）
- [ ] QQRCode（二维码）

### P4 反馈与其他

- [ ] QAlert（警告提示）
- [ ] QNotification（通知提醒框）
- [ ] QPopconfirm（气泡确认框）
- [ ] QResult（结果页）
- [ ] QWatermark（水印）
- [ ] QConfigProvider（全局主题/尺寸/语言配置）
- [ ] QAffix（固钉）
