<script setup lang="ts">
defineOptions({
  name: "Badge",
})
defineProps({
  type: {
    type: String as () => "primary" | "success" | "warning" | "danger" | "gray"|"info",
    default: "info",
  },
  value:{
    type:[Number, String],
    default: 1,
  },
  max: {
    type: Number,
    default: 99,
  },
  dot: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="container"
       style="position: relative">
    <slot />
    <span v-if="dot" class="dot"/>
    <span v-else
          style="position: absolute; top: 0; right: 0;transform: translateX(50%) translateY(-50%);padding: 0.1rem 0.4rem"
          :class="`text-${type}`"
          class="tag radius-rem"

    >
      {{(typeof value === 'number' && value > max)||(typeof value==='string' && parseInt(value)>max) ? `99+` :value}}
    </span>
  </div>
</template>

<style scoped>

</style>
