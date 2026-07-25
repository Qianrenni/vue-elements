# 加载动画组件

本目录导出 `QBreathing`、`QSpinner` 和 `QSkeleton` 三个无配置的加载动画组件。

## QBreathing

### 用途

`QBreathing` 显示三个依次脉冲变化的圆点，适合表示轻量的等待状态。

### 基本用法

```vue
<script setup lang="ts">
import { QBreathing } from 'qyani-components';
</script>

<template>
  <QBreathing />
</template>
```

### Props

无。

### Emits

无。

### Slots

无。

### Exposes

无。

## QSpinner

### 用途

`QSpinner` 显示持续旋转的 SVG 圆环加载动画。

### 基本用法

```vue
<script setup lang="ts">
import { QSpinner } from 'qyani-components';
</script>

<template>
  <QSpinner />
</template>
```

### Props

无。

### Emits

无。

### Slots

无。

### Exposes

无。

## QSkeleton

### 用途

`QSkeleton` 显示带渐变扫光效果的骨架屏占位区域；其宽度和高度随父容器撑满，最小高度为 `20px`。

### 基本用法

```vue
<script setup lang="ts">
import { QSkeleton } from 'qyani-components';
</script>

<template>
  <div style="height: 80px">
    <QSkeleton />
  </div>
</template>
```

### Props

无。

### Emits

无。

### Slots

无。

### Exposes

无。
