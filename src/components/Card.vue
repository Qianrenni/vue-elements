<template>
  <div class="card container-column">
    <div class="card-header">
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot name="default"></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'

defineOptions({
  name: 'Card'
})
</script>

<style scoped>
.card {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

/*.card-header {*/
/*  flex: 0 0 auto;*/
/*}*/

/*.card-body {*/
/*  flex: 1 1 auto;*/
/*}*/

/*.card-footer {*/
/*  flex: 0 0 auto;*/
/*}*/

.card:hover {
  animation-name: up-down;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>