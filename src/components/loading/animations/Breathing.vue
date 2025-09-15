<script lang="ts" setup>
defineOptions({
  name: 'Breathing'
})
</script>

<template>
  <div class="loader-dots">
    <span class="loader-dot"></span>
    <span class="loader-dot"></span>
    <span class="loader-dot"></span>
  </div>
</template>

<style scoped>
.loader-dots {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.loader-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-inverse);
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

.loader-dot:nth-child(1) {
  animation-delay: 0s;
}

.loader-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loader-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>