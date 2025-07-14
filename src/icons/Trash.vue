<script setup lang="ts">
defineOptions({
  name: 'Trash'  // 修正组件名称
})
</script>

<template>
  <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="trash-icon"
  >
    <!-- 垃圾桶盖子 -->
    <path
        d="M35 20 V0 H65 V20"
        stroke-width="3"
        stroke-linecap="round"
        stroke="currentColor"
    />

    <!-- 垃圾桶盖子把手 -->
    <path
        d="M10 28 V20 H90 V28
        M20 30 V90 H80 V30 M35 30 V90 M50 30 V90 M65 30 V90"
        stroke-width="3"
        stroke-linecap="round"
        stroke="currentColor"
    />


  </svg>
</template>

<style scoped>
.trash-icon:hover {
  color: #ff4d4f; /* 悬停颜色 */
}
</style>
