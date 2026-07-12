<!--
 * @component QSkeleton
 * @description 骨架屏加载动画，显示渐变扫光效果
 -->
<script lang="ts" setup>
defineOptions({
  name: 'QSkeleton',
});
</script>

<template>
  <div class="loader-skeleton" />
</template>

<style scoped>
.loader-skeleton {
  width: 100%;
  height: 100%;
  min-height: 20px;
  background: var(--skeleton-linear-gradient);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
</style>
