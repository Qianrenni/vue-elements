# 工具类 (Utilities)

## 用途

直接作用于 HTML 的语义化样式类，覆盖布局、间距、颜色、排版、显示与响应式。
类名统一短横线命名，均基于设计变量实现，随主题自动适配。

## 布局 (Layout)

基于 Flexbox / Grid 的布局工具：

| 分类       | 类名                                                                       | 说明                      |
| ---------- | -------------------------------------------------------------------------- | ------------------------- |
| 容器       | `.flex` / `.inline-flex`                                                   | Flex 容器                 |
| 方向       | `.flex-row` / `.flex-col` / `.flex-column`                                 | 主轴方向                  |
| 反向       | `.flex-row-reverse` / `.flex-col-reverse`                                  | 反向排列                  |
| 对齐主轴   | `.justify-start` / `-center` / `-end` / `-between` / `-around` / `-evenly` | justify-content           |
| 对齐交叉轴 | `.items-start` / `-center` / `-end` / `-stretch` / `-baseline`             | align-items               |
| 对齐内容   | `.content-center` / `-start` / `-end` / `-between` / `-around`             | align-content             |
| 换行       | `.flex-wrap` / `-nowrap` / `-wrap-reverse`                                 | flex-wrap                 |
| 伸缩       | `.flex-1` / `.flex-2`                                                      | flex-grow                 |
| 间距       | `.gap-0` ~ `.gap-6`                                                        | gap（基于 `--q-space-*`） |
| 旧版别名   | `.gap` / `.gap-half` / `.gap-third` / `.gap-fourth`                        | 兼容                      |

```html
<div class="flex justify-between items-center gap-4">
  <div>左</div>
  <div>右</div>
</div>
```

## 间距 (Spacing)

格式：`.{m|p}{direction?}-{n}`

- `m` = margin，`p` = padding
- direction：`t`(top) / `r`(right) / `b`(bottom) / `l`(left) / `x`(horizontal) / `y`(vertical)
- n = 0–12（对应 `--q-space-*` 阶梯）

| 示例                                                    | 说明               |
| ------------------------------------------------------- | ------------------ |
| `.m-4` / `.p-4`                                         | 四周间距           |
| `.mt-2` / `.mb-4` / `.mx-2` / `.my-4`                   | 单边 / 水平 / 垂直 |
| `.padding-rem` / `.padding-half-rem` / `.padding-24rem` | 旧版 rem 别名      |
| `.margin-rem` / `.margin-half-rem`                      | 旧版 margin 别名   |

```html
<div class="padding-rem">内边距</div>
<div class="mt-4">上外边距</div>
```

## 颜色 (Color)

| 分类     | 类名                                                                                                                         | 说明       |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 背景     | `.bg-primary` / `-light` / `-success` / `-warning` / `-danger` / `-info` / `-card` / `-body` / `-secondary` / `-transparent` | 语义背景   |
| 背景灰阶 | `.bg-gray-50` ~ `.bg-gray-700`                                                                                               | 灰阶背景   |
| 文字     | `.text-primary` / `-description` / `-muted` / `-secondary` / `-white` / `-black`                                             | 语义文字色 |

```html
<div class="bg-primary text-white padding-rem">主色背景</div>
<span class="text-muted">次要文字</span>
```

## 排版 (Typography)

| 分类 | 类名                                                           | 说明        |
| ---- | -------------------------------------------------------------- | ----------- |
| 对齐 | `.text-left` / `-center` / `-right` / `-justify`               | text-align  |
| 字号 | `.text-xs` / `-sm` / `-base` / `-lg` / `-xl` / `-2xl` / `-3xl` | font-size   |
| 字重 | `.font-light` / `-normal` / `-medium` / `-semibold` / `-bold`  | font-weight |
| 截断 | `.text-1-line` / `.text-2-line` / `.text-3-line`               | 行数截断    |

```html
<h1 class="text-2xl font-bold text-center">标题</h1>
<p class="text-sm text-muted">说明文字</p>
```

## 显示 / 定位 / 圆角 / 阴影 (Display)

| 分类 | 类名                                                                                                     | 说明       |
| ---- | -------------------------------------------------------------------------------------------------------- | ---------- |
| 显示 | `.d-none` / `-block` / `-inline` / `-inline-block` / `-flex` / `-inline-flex` / `-grid` / `-inline-grid` | display    |
| 定位 | `.position-static` / `-relative` / `-absolute` / `-fixed` / `-sticky`                                    | position   |
| 指针 | `.cursor-pointer` / `.cursor-not-allowed`                                                                | cursor     |
| 圆角 | `.radius-half-rem` / `.radius-quarter-rem`                                                               | 圆角       |
| 阴影 | `.shadow-none` / `-xs` / `-sm` / `-md` / `-lg` / `-xl`                                                   | box-shadow |

## 响应式 (Responsive)

断点 768px（移动端 / 桌面端切换）：

| 类名                                 | 说明                    |
| ------------------------------------ | ----------------------- |
| `.hidden-768`                        | 移动端（≤768px）隐藏    |
| `.show-768`                          | 仅在移动端显示          |
| `.container-768-w100`                | 移动端宽度 100%         |
| `.scroll-container` / `.scroll-text` | 滚动容器 / 横向滚动文本 |

```html
<div class="hidden-768">桌面端可见</div>
<div class="show-768">移动端可见</div>
```
