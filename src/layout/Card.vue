<template>
  <div class="card container-column "
       :class="{
        'card-animation': animation
       }"
    >

    <div class="card-header container-space-between ">
      <slot name="header"></slot>
    </div>

    <div class="card-body container-space-between ">
      <slot name="left"></slot>
      <div >
        <slot name="default"/>
      </div>
      <slot name="right"></slot>
    </div>

    <div class="card-footer container-space-between ">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'

defineProps({
  animation: {
    type: Boolean,
    default: false
  }
})
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

.card-header {
  flex: 0 0 auto;
}

.card-body {
  flex: 1 1 auto;
}

.card-footer {
  flex: 0 0 auto;
}

.card-animation:hover {
  /*修改转动点为中心*/
  animation-name: up-down;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

@keyframes up-down {
  0% {
    transform: translateY(0) ;
  }
  50% {
    transform: translateY(-10px) rotateY(270deg);
  }
  100% {
    transform: translateY(0)  rotateY(360deg);
  }
}
</style>
