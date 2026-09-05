# QConfigProvider

## 用途

全局化配置容器（对标 Ant Design ConfigProvider）。以 `display: contents` 包裹子树（不产生布局盒子），把 `componentSize` / `direction` / CSS 变量覆盖等通过 `provide` 注入子树；`cssVars` 可实现**局部主题定制**（无需全局改主题）。

## 局部主题定制（cssVars）

把任意 CSS 自定义属性（如 `--q-color-primary`、`--q-radius-md`）作用到子树。按钮等组件**直接消费主色语义 token**，局部覆盖 `--q-color-primary` / `-hover` / `-active` 即可让主按钮、描边、链接一起换肤：

```vue
<template>
  <QConfigProvider
    :css-vars="{
      '--q-color-primary': '#3b82f6',
      '--q-color-primary-hover': '#2f6fe0',
      '--q-color-primary-active': '#2a63c6',
    }"
  >
    <QButton type="primary">蓝色主题下的主按钮</QButton>
  </QConfigProvider>
</template>
```

单条覆盖（文字 / 描边 / 链接色）直接生效：

```vue
<template>
  <QConfigProvider :css-vars="{ '--q-color-primary': '#722ed1' }">
    <a class="q-color-primary">紫罗兰链接</a>
  </QConfigProvider>
</template>
```

## 尺寸 / 方向

```vue
<template>
  <QConfigProvider component-size="small" direction="rtl">
    <QButton>小尺寸 · RTL</QButton>
  </QConfigProvider>
</template>
```

`componentSize` / `direction` / `getPopupContainer` / `renderEmpty` 通过 `provide` 提供给子树，子孙组件可用 `useQConfig()` 读取（未包裹时返回 `null`）：

```ts
import { useQConfig } from 'qyani-components';

const config = useQConfig();
config?.getPopupContainer?.(); // 弹层挂载容器解析函数
config?.componentSize.value; // 'small' | 'middle' | 'large'
```

## Props

| 属性                | 类型                             | 必填 | 默认值     | 说明                                                   |
| ------------------- | -------------------------------- | ---- | ---------- | ------------------------------------------------------ |
| `componentSize`     | `'small' \| 'middle' \| 'large'` | 否   | `'middle'` | 组件尺寸档位（provide 供子孙消费）。                   |
| `direction`         | `'ltr' \| 'rtl'`                 | 否   | `'ltr'`    | 文本方向（rtl 时对子树生效）。                         |
| `cssVars`           | `Record<string, string>`         | 否   | —          | CSS 自定义属性覆盖，作用于本节点子树（局部主题定制）。 |
| `getPopupContainer` | `() => HTMLElement`              | 否   | —          | 弹层挂载容器解析函数。                                 |
| `renderEmpty`       | `() => unknown`                  | 否   | —          | 自定义空状态渲染。                                     |

## Slots

| 插槽     | 说明                 |
| -------- | -------------------- |
| 默认插槽 | 受该配置影响的内容。 |

## Exposes / Emits

无。

## 说明

- 组件默认直接消费设计系统 token（`--q-*`）；本组件把覆盖变量写在内联样式上，通过 CSS 继承作用于子树，适合局部主题 / 品牌色定制。
- `componentSize` 等语义化字段已通过 `useQConfig()` 可注入，供弹层 / 空态等组件逐步接入（覆盖变量统一走自有语义 `--q-*`）。
