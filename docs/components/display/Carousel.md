# Props 参数

| 参数                | 类型                                                                                                                                 | 默认值            | 必填 | 说明             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---- | ---------------- |
| `vertical`          | `boolean`                                                                                                                            | `false`           | 否   | 是否垂直方向     |
| `autoplay`          | `boolean`                                                                                                                            | `true`            | 否   | 是否自动播放     |
| `duration`          | `number`                                                                                                                             | `500`             | 否   | 动画持续时间     |
| `indicator`         | `boolean`                                                                                                                            | `true`            | 否   | 是否显示指示器   |
| `indicatorPosition` | `'center-bottom' \| 'center-top' \| 'left-bottom' \| 'left-top' \| 'left-center' \| 'right-bottom' \| 'right-top' \| 'right-center'` | `'center-bottom'` | 否   | 指示器位置       |
| `width`             | `number`                                                                                                                             | —                 | 是   | 轮播宽度         |
| `height`            | `number`                                                                                                                             | —                 | 是   | 轮播高度         |
| `interval`          | `number`                                                                                                                             | `1500`            | 否   | 自动播放间隔     |
| `direction`         | `'next' \| 'prev'`                                                                                                                   | `'next'`          | 否   | 播放方向         |
| `showButton`        | `boolean`                                                                                                                            | `true`            | 否   | 是否显示按钮     |
| `loop`              | `boolean`                                                                                                                            | `true`            | 否   | 是否循环播放     |
| `touchMove`         | `boolean`                                                                                                                            | `false`           | 否   | 是否支持触摸滑动 |

---

# Events 事件

| 事件名   | 回调参数        | 说明           |
| -------- | --------------- | -------------- |
| `change` | `index: number` | 页码变化时触发 |

---

# Slots 插槽

| 插槽名    | 说明       | 示例                                                     |
| --------- | ---------- | -------------------------------------------------------- |
| `default` | 轮播项内容 | `<Carousel><CarouselItem>内容</CarouselItem></Carousel>` |

---

# Expose 方法

| 方法名 | 参数            | 返回值 | 说明         |
| ------ | --------------- | ------ | ------------ |
| `prev` | —               | —      | 上一页       |
| `next` | —               | —      | 下一页       |
| `goTo` | `index: number` | —      | 跳转到指定页 |
