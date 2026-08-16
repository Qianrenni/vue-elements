# QCarousel

## 用途

基于 `QCarouselItem` 默认插槽构建的轮播容器，支持横向或纵向展示、自动播放、指示器、切换按钮和循环播放。

## 基本用法

```vue
<QCarousel :width="320" :height="180" @change="handleChange">
  <QCarouselItem>第一项</QCarouselItem>
  <QCarouselItem>第二项</QCarouselItem>
</QCarousel>
```

## Props

| 名称                | 类型                                                                                                                                 | 必填 | 默认值            | 说明                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- | ----------------- | ------------------------------------------ |
| `width`             | `number`                                                                                                                             | 是   | 无                | 轮播区域宽度，单位为 px。                  |
| `height`            | `number`                                                                                                                             | 是   | 无                | 轮播区域高度，单位为 px。                  |
| `vertical`          | `boolean`                                                                                                                            | 否   | `false`           | 是否使用纵向轮播。                         |
| `autoplay`          | `boolean`                                                                                                                            | 否   | `true`            | 是否自动播放；仅在轮播项多于一项时生效。   |
| `duration`          | `number`                                                                                                                             | 否   | `500`             | 切换过渡持续时间，单位为 ms。              |
| `indicator`         | `boolean`                                                                                                                            | 否   | `true`            | 是否显示指示器。                           |
| `indicatorPosition` | `'center-bottom' \| 'center-top' \| 'left-bottom' \| 'left-top' \| 'left-center' \| 'right-bottom' \| 'right-top' \| 'right-center'` | 否   | `'center-bottom'` | 指示器位置。                               |
| `interval`          | `number`                                                                                                                             | 否   | `1500`            | 自动播放间隔，单位为 ms。                  |
| `direction`         | `'next' \| 'prev'`                                                                                                                   | 否   | `'next'`          | 自动播放方向。                             |
| `showButton`        | `boolean`                                                                                                                            | 否   | `true`            | 是否显示前后切换按钮。                     |
| `loop`              | `boolean`                                                                                                                            | 否   | `true`            | 是否允许从首尾继续循环切换。               |
| `touchMove`         | `boolean`                                                                                                                            | 否   | `false`           | 触摸滑动开关；当前组件未绑定触摸滑动行为。 |

## Emits

| 事件名   | 参数类型        | 触发时机                                            |
| -------- | --------------- | --------------------------------------------------- |
| `change` | `index: number` | 当前实际轮播项索引发生变化时触发，索引从 `0` 开始。 |

## Slots

| 名称     | 作用域参数 | 说明                                       |
| -------- | ---------- | ------------------------------------------ |
| 默认插槽 | 无         | 放置 `QCarouselItem`；未提供时没有轮播项。 |

## 可访问性（Accessibility）

- 上/下一张箭头与指示器带 `role="button"`、`title` 与 `aria-label`，并支持 Enter / Space 键盘切换。

## Exposes

| 方法   | 类型                      | 说明                                       |
| ------ | ------------------------- | ------------------------------------------ |
| `prev` | `() => void`              | 切换到上一项；非循环模式位于首项时不执行。 |
| `next` | `() => void`              | 切换到下一项；非循环模式位于末项时不执行。 |
| `goTo` | `(index: number) => void` | 跳转到从 `0` 开始的指定轮播项索引。        |
