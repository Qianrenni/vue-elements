# Props 参数

| 参数              | 类型                                                                 | 默认值              | 必填 | 说明                                                         |
|-------------------|----------------------------------------------------------------------|-------------------|----|------------------------------------------------------------|
| `vertical`        | `boolean`                                                            | `false`           | 否  | 是否垂直方向轮播                                               |
| `autoplay`        | `boolean`                                                            | `true`            | 否  | 是否自动播放                                                   |
| `duration`        | `number`                                                             | `500`             | 否  | 动画持续时间（毫秒）                                            |
| `indicator`       | `boolean`                                                            | `true`            | 否  | 是否显示指示器                                                 |
| `indicatorPosition` | `'center-bottom' \| 'center-top' \| 'left-bottom' \| 'left-top' \| 'left-center' \| 'right-bottom' \| 'right-top' \| 'right-center'` | `'center-bottom'` | 否  | 指示器位置                                                    |
| `width`           | `number`                                                             | —                 | 是  | 轮播容器宽度（px）                                             |
| `height`          | `number`                                                             | —                 | 是  | 轮播容器高度（px）                                             |
| `interval`        | `number`                                                             | `1500`            | 否  | 自动播放间隔时间（毫秒）                                        |
| `direction`       | `'next' \| 'prev'`                                                   | `'next'`          | 否  | 自动播放方向                                                    |
| `showButton`      | `boolean`                                                            | `true`            | 否  | 是否显示左右切换按钮                                             |

---

# Events 事件

当前组件未显式定义自定义事件。

---

# Slots 插槽

| 插槽名       | 说明           | 示例 |
|-----------|--------------|------|
| `default` | 轮播内容插槽，每个 `CarouselItem` 为一个轮播项 | —    |

---

# Expose 方法

当前组件未暴露任何方法（未使用 `defineExpose`）。