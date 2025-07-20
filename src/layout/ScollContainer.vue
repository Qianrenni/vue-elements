<template>
  <div
      class="scroll-container"
      :class="{
      'scroll-x': scrollX,
      'scroll-y': scrollY
    }"
      :style="{
      width: width,
      height: height
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineProps, defineOptions } from 'vue'

defineOptions({
  name: 'ScrollContainer'
})

defineProps({
  // 是否启用横向滚动
  scrollX: {
    type: Boolean,
    default: false
  },
  // 是否启用纵向滚动
  scrollY: {
    type: Boolean,
    default: false
  },
  // 容器宽度
  width: {
    type: [String, Number],
    default: 'auto'
  },
  // 容器高度
  height: {
    type: [String, Number],
    default: 'auto'
  }
})
</script>

<style scoped>

</style>