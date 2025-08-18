# Props 参数

| 参数     | 类型                                                                                                                                           | 默认值   | 必填 | 说明     |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------|-------|----|--------|
| `icon` | `'Aim' \| 'Bell' \| 'Card' \| 'ChatDotRound' \| 'ChatLineSquare' \| 'CircleMinus' \| 'CirclePlus' \| 'Clock' \| 'Close' \| 'Copy' \| 'Down' \| 'Download' \| 'Edit' \| 'Emotion' \| 'EyeClose' \| 'EyeOpen' \| 'Female' \| 'Find' \| 'ForbiddenBell' \| 'FullScreen' \| 'History' \| 'House' \| 'Larger' \| 'Left' \| 'Link' \| 'Loading' \| 'Location' \| 'Lock' \| 'Male' \| 'Menu' \| 'Message' \| 'Minus' \| 'Moon' \| 'More' \| 'Picture' \| 'Plus' \| 'Position' \| 'RectangularClose' \| 'Refresh' \| 'Right' \| 'Save' \| 'Scissor' \| 'Search' \| 'Select' \| 'Service' \| 'Setting' \| 'Share' \| 'Smaller' \| 'Star' \| 'Sun' \| 'svg' \| 'Switch' \| 'Trash' \| 'Unlock' \| 'Up' \| 'Upload' \| 'User' \| 'VideoPause' \| 'VideoPlay' \| 'Warning' \| 'Wifi'` | —     | 是  | 图标名称   |
| `size` | `string \| number`                                                                                                                           | `32`  | 否  | 图标尺寸(px) |

---

# Events 事件

该组件不直接触发任何事件，但包裹的图标元素具有以下行为：

| 事件名     | 回调参数 | 说明      |
|---------|------|---------|
| `click` | —    | 点击图标时触发 |

---

# Slots 插槽

该组件无插槽设计，图标内容通过props传入。

---
