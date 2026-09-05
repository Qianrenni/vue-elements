# QImage

## 用途

图片组件：展示图片并支持点击进入全屏预览（放大/缩小/还原/旋转/关闭），支持 `object-fit` 适配、加载失败容错与受控预览，对齐 Ant Design Image 常用能力。

## 基本用法

```vue
<template>
  <QImage
    src="https://qianrenni.github.io/vue-elements/logo.png"
    width="120"
    height="80"
    fit="cover"
  />
</template>
```

## Props

| 属性          | 类型                                                       | 必填 | 默认值   | 说明                                     |
| ------------- | ---------------------------------------------------------- | ---- | -------- | ---------------------------------------- |
| `src`         | `string`                                                   | 是   | `''`     | 图片地址。                               |
| `alt`         | `string`                                                   | 否   | `''`     | 图片替代文本。                           |
| `width`       | `string \| number`                                         | 否   | 自适应   | 缩略图宽度（number=px）。                |
| `height`      | `string \| number`                                         | 否   | 自适应   | 缩略图高度（number=px）。                |
| `fit`         | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | 否   | `'fill'` | 图片适配（CSS object-fit）。             |
| `preview`     | `boolean`                                                  | 否   | `true`   | 是否可点击进入全屏预览。                 |
| `previewSrc`  | `string`                                                   | 否   | `src`    | 预览大图地址（可指向高清原图）。         |
| `fallback`    | `string`                                                   | 否   | —        | 加载失败时替换显示的图片地址。           |
| `previewOpen` | `boolean`                                                  | 否   | —        | 预览受控开关（`v-model:preview-open`）。 |
| `imageStyle`  | `CSSProperties`                                            | 否   | —        | 缩略图 `<img>` 自定义样式。              |

## Emits

| 事件                 | 参数      | 触发时机            |
| -------------------- | --------- | ------------------- |
| `update:previewOpen` | `boolean` | 预览开合变化时。    |
| `preview-change`     | `boolean` | 预览打开 / 关闭时。 |
| `error`              | `Event`   | 图片加载失败时。    |

## 预览操作

- 悬停缩略图出现遮罩，点击或按 Enter / Space 打开全屏预览。
- 底部工具栏：缩小 / 放大 / 还原 / 左旋 / 右旋 / 关闭；支持鼠标滚轮缩放；按 Esc 或点击遮罩关闭。
- 打开预览会锁定页面滚动，关闭后自动恢复。

## 受控预览

```vue
<QImage v-model:preview-open="open" src="..." width="120" />
```

## Exposes

无。

## 说明

- 缩略图加载失败：提供 `fallback` 则切换显示回退图；否则显示失败占位并触发 `error`。
- 多图相册预览（`PreviewGroup`）暂未提供，可后续扩展。
