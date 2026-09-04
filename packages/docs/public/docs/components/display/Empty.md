# QEmpty

## 用途

空状态组件，对齐 Ant Design `Empty`：数据为空/无结果时展示占位插画与文案，可自定义插画、描述与底部操作区。

## 基本用法

```vue
<template>
  <!-- 默认插画 + 默认文案 -->
  <QEmpty />

  <!-- 自定义描述 + 底部操作 -->
  <QEmpty description="暂无搜索结果">
    <QButton>重新搜索</QButton>
  </QEmpty>

  <!-- 简洁插画 -->
  <QEmpty preset="simple" description="暂无数据" />

  <!-- 完全自定义插画 -->
  <QEmpty>
    <template #image>
      <img src="/custom-empty.svg" width="120" alt="" />
    </template>
  </QEmpty>
</template>
```

## Props

| 属性          | 类型                    | 必填 | 默认值       | 说明                                      |
| ------------- | ----------------------- | ---- | ------------ | ----------------------------------------- |
| `description` | `string`                | 否   | `'暂无数据'` | 描述文案（用 `description` 插槽可覆盖）。 |
| `preset`      | `'default' \| 'simple'` | 否   | `'default'`  | 插画预设。                                |
| `imageStyle`  | `CSSProperties`         | 否   | 无           | 图片容器样式。                            |

## Slots

| 插槽          | 说明                         |
| ------------- | ---------------------------- |
| `image`       | 替换整张插画。               |
| `description` | 替换描述文案。               |
| 默认插槽      | 渲染为底部操作区（footer）。 |

## 可访问性（Accessibility）

- 插画 SVG 以 `aria-hidden="true"` 隐藏（纯装饰）。

## Exposes

无。
