<!--
 * @component QCarouselItem
 * @description 轮播项组件，仅作为容器使用
 -->
<template>
  <div class="carousel-item">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'QCarouselItem',
});
</script>

<style scoped>
.carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>
