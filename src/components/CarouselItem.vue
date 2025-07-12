<template>
  <div class="carousel-item container-center container-align-center">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 仅作为容器，无需逻辑
defineOptions({
  name: 'CarouselItem'
})
</script>

<style scoped>
.carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>