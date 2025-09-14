<script lang="ts" setup>

</script>

<template>
  <div class="loader-skeleton">

  </div>
</template>

<style scoped>
.loader-skeleton {
  width: 100%;
  height: 100%;
  min-height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

</style>