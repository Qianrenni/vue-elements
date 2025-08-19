# useMousePosition 钩子函数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| 无 | — | — | 否 | 无参数，直接调用即可获取鼠标位置 |

> 💡 提示：该钩子为单例模式，多个组件共用同一事件监听，自动管理生命周期。

---

# 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `x` | `Ref<number>` | 当前鼠标X坐标（页面坐标） |
| `y` | `Ref<number>` | 当前鼠标Y坐标（页面坐标） |

---

# 使用示例

```vue
<script setup lang="ts">
import { useMousePosition } from '@/composables/mouse'

const { x, y } = useMousePosition()
</script>

<template>
  <div>鼠标位置: {{ x }}, {{ y }}</div>
</template>
```

---

# 注意事项

- 该钩子使用 `ref` 和 `onMounted/onUnmounted` 实现状态共享与事件管理。
- 通过引用计数机制确保 `mousemove` 事件仅在第一个组件挂载时绑定，最后一个组件卸载时移除。
- 适用于需要全局访问鼠标位置的场景，如拖拽、画布操作、Tooltip 定位等。