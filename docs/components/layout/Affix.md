# QAffix

## 用途

固钉：将页面元素钉在可视区域。页面滚动使内容离开视口时，`QAffix` 让内容脱离文档流以 `fixed` 定位吸附在指定偏移处，并通过占位元素保留原空间避免布局跳动；支持吸顶（`offsetTop`）、吸底（`offsetBottom`）与自定义滚动容器（`target`），对齐 Ant Design Affix 常用能力。

## 基本用法

默认监听 `window` 滚动，`offsetTop` 未设置时等价于 `0`（内容顶部到达视口顶部即吸附）。

```vue
<template>
  <QAffix :offset-top="80">
    <QButton type="primary">吸顶操作栏</QButton>
  </QAffix>
</template>
```

## 吸底 offsetBottom

`offsetBottom` 会让内容吸附在滚动容器底部（适合放在长内容末尾的“返回/提交”按钮，滚动过程中始终可见）：

```vue
<template>
  <QAffix :offset-bottom="0">
    <QButton type="primary">提交</QButton>
  </QAffix>
</template>
```

## 自定义滚动容器 target

页面中只有局部区域滚动时，用 `target` 返回该滚动容器：

```vue
<script lang="ts" setup>
import { ref } from 'vue';

const containerRef = ref<HTMLElement | null>(null);
</script>

<template>
  <div ref="containerRef" class="scroll-box">
    <div style="height: 800px">滚动区域内容…</div>
    <QAffix :offset-top="0" :target="() => containerRef">
      <QButton>固定在容器顶部</QButton>
    </QAffix>
  </div>
</template>
```

## Props

| 属性           | 类型                                  | 必填 | 默认值        | 说明                                                                          |
| -------------- | ------------------------------------- | ---- | ------------- | ----------------------------------------------------------------------------- |
| `offsetTop`    | `number`                              | 否   | —（等价 `0`） | 距离滚动容器顶部触发固定的偏移(px)；`offsetBottom` 未设置时生效。             |
| `offsetBottom` | `number`                              | 否   | —             | 距离滚动容器底部触发固定的偏移(px)；设置后按底部固定（与 `offsetTop` 互斥）。 |
| `target`       | `() => Window \| HTMLElement \| null` | 否   | —（`window`） | 返回需要监听滚动事件的容器；未提供时监听视口。                                |
| `zIndex`       | `number`                              | 否   | `100`         | 固定态层级。                                                                  |
| `onChange`     | `(affixed: boolean) => void`          | 否   | —             | 固定状态改变时触发的回调。                                                    |

## Slots

| 插槽     | 说明             |
| -------- | ---------------- |
| 默认插槽 | 需要固定的内容。 |

## Emits

无（固定状态变化通过 `onChange` 回调监听）。

## Exposes

| 方法             | 说明                         |
| ---------------- | ---------------------------- |
| `updatePosition` | 手动触发一次位置测量与更新。 |

```vue
<script lang="ts" setup>
import QAffix from 'qyani-components';
import { ref } from 'vue';

const affixRef = ref<InstanceType<typeof QAffix> | null>(null);
// affixRef.value?.updatePosition();
</script>
```

## 说明

- 固定态下内容通过占位元素保留原空间，页面不跳动；吸顶时内容 `top` 定位、吸底时 `bottom` 定位，横向位置保持原样。
- 默认仅监听**纵向**滚动容器（FAQ：横向滚动场景建议使用原生 `position: sticky`）。
- 若祖先元素存在 `transform`/`filter`/`perspective`，`position: fixed` 会相对该祖先定位，可能造成偏差；如内容本身需要定位，请将其设置在 `QAffix` 外层的包裹元素上（同 antd 约束）。
