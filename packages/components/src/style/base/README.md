# 基础样式 (Base)

## 用途

提供全局重置与基础元素样式，保证跨浏览器一致的默认表现。

## 重置 (reset.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: inherit;
  color: inherit;
}
```

- 统一盒模型为 `border-box`
- 清除默认 margin / padding
- 颜色与背景默认继承，便于主题整体切换

## 基础元素 (base.css)

| 元素                              | 说明                                               |
| --------------------------------- | -------------------------------------------------- |
| `:root`                           | 根字号 16px                                        |
| `body`                            | 字体族、文字色、背景色、抗锯齿渲染                 |
| `pre` / `code`                    | 横向滚动 + 定制滚动条（4px，主色滑块）             |
| `input:-webkit-autofill`          | 覆盖浏览器自动填充黄色背景                         |
| `.fade-enter-*` / `.fade-leave-*` | Vue 过渡动画（透明度，基于 `--q-duration-normal`） |

## 示例

```html
<body>
  <p>正文段落</p>
  <pre><code>console.log('hello')</code></pre>
</body>
```
