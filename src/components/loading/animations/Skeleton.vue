<script lang="ts" setup>
defineOptions({
  name: 'Skeleton'
})
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