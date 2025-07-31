<script lang="ts" setup>
defineOptions({
  name: "Badge",
})
withDefaults(defineProps<{
  type?: "primary" | "success" | "warning" | "danger" | "gray" | "info",
  value?: number | string,
  max?: number,
  dot?: boolean
}>(), {
  type: "info",
  value: 1,
  max: 99,
  dot: false
})
</script>

<template>
  <div class="container"
       style="position: relative">
    <slot/>
    <span v-if="dot" class="dot"/>
    <span v-else
          :class="`text-${type}`"
          class="tag radius-rem"
          style="position: absolute; top: 0; right: 0;transform: translateX(50%) translateY(-50%);padding: 0.1rem 0.4rem"

    >
      {{ (typeof value === 'number' && value > max) || (typeof value === 'string' && parseInt(value) > max) ? `99+` : value }}
    </span>
  </div>
</template>

<style scoped>

</style>
