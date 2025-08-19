# Props 参数

| 参数     | 类型                                                         | 默认值  | 必填 | 说明                     |
|--------|------------------------------------------------------------|------|----|------------------------|
| `icon` | `'Aim' \| 'Bell' \| 'Card' \| 'ChatDotRound' \| 'ChatLineSquare' \| 'CircleMinus' \| 'CirclePlus' \| 'Clock' \| 'Close' \| 'Copy' \| 'Down' \| 'Download' \| 'Edit' \| 'Emotion' \| 'EyeClose' \| 'EyeOpen' \| 'Female' \| 'Find' \| 'ForbiddenBell' \| 'FullScreen' \| 'History' \| 'House' \| 'Larger' \| 'Left' \| 'Link' \| 'Loading' \| 'Location' \| 'Lock' \| 'Male' \| 'Menu' \| 'Message' \| 'Minus' \| 'Moon' \| 'More' \| 'Picture' \| 'Plus' \| 'Position' \| 'RectangularClose' \| 'Refresh' \| 'Right' \| 'Save' \| 'Scissor' \| 'Search' \| 'Select' \| 'Service' \| 'Setting' \| 'Share' \| 'Smaller' \| 'Star' \| 'Sun' \| 'svg' \| 'Switch' \| 'Trash' \| 'Unlock' \| 'Up' \| 'Upload' \| 'User' \| 'VideoPause' \| 'VideoPlay' \| 'Warning' \| 'Wifi'` | —    | 是  | 图标名称，对应 `@/icons/` 目录下的 SVG 文件名 |
| `size` | `string \| number`                                         | `"32"` | 否  | 图标尺寸，支持数值或字符串（如 '24px'、'1.5em'） |

> 💡 提示：支持原生 `div` 的所有属性（如 `class`, `style`, `title` 等）

---

# Events 事件

| 事件名   | 回调参数 | 说明             |
|------|------|----------------|
| `click` | —    | 用户点击图标时触发 |

---

# Slots 插槽

| 插槽名       | 说明      | 示例                                            |
|-----------|---------|-----------------------------------------------|
| `default` | 默认内容插槽  | `<Icon><span>自定义内容</span></Icon>`         |

---

# Expose 方法

| 方法名 | 参数 | 返回值 | 说明 |
|------|----|-----|----|
| —    | —  | —   | 无暴露方法 |