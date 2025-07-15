<template>
  <div v-if="type==='personal'" class="badge mouse-cursor " :style="{ color: foreground, backgroundColor: background }">
    {{ text }}
  </div>
  <div v-else class="badge  mouse-cursor"
      :class="{
      'badge-primary': type === 'primary',
      'badge-success': type === 'success',
      'badge-warning': type === 'warning',
      'badge-danger': type === 'danger',
      'badge-gray': type === 'gray',
      }">
    {{text}}
  </div>
</template>

<script lang="ts" setup>
import { defineOptions,defineProps } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'personal',
    validator: (value: string) => ['primary', 'danger', 'success', 'warning','gray','personal'].includes(value)
  },
  text: {
    type: String,
    required: true
  },
  foreground: {
    type: String,
    default: 'var(--text-color)'
  },
  background: {
    type: String,
    default: 'var(--background-color)'
  }
})

defineOptions({
  name: 'Badge'
})
</script>

<style scoped>

</style>
