<script lang="ts" setup>
defineOptions({
  name: 'Spinner'
})
</script>

<template>
  <div class="loader-spinner"/>
</template>

<style scoped>
.loader-spinner {
  width: 25px;
  height: 25px;
  border: 2px solid var(--color-inverse);
  border-top: 2px solid var(--background-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    border-top-color: var(--color-inverse);
    border-left-color: var(--background-color);
    border-right-color: var(--background-color);
    border-bottom-color: var(--background-color);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>