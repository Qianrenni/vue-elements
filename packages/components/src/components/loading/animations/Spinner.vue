<script lang="ts" setup>
defineOptions({
  name: 'Spinner',
});
</script>

<template>
  <svg
    class="spinner"
    viewBox="0 0 100 100"
    fill="transparent"
    stroke="currentColor"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle class="spinner-circle" cx="50" cy="50" r="40"></circle>
  </svg>
</template>

<style scoped>
.spinner {
  animation: rotate 0.75s linear infinite;
  height: 25px;
  width: 25px;
}

.spinner-circle {
  animation: dash 1.5s ease-in-out infinite;
}
</style>
