<template>
    <span v-if="type==='personal'"
          class="badge mouse-cursor "
          :style="{ color: foreground, backgroundColor: background }">
      {{text}}
    </span>
  <span v-else class="badge  mouse-cursor"
      :class="{
      'text-primary': type === 'primary',
      'text-success': type === 'success',
      'text-warning': type === 'warning',
      'text-danger': type === 'danger',
      'text-gray': type === 'gray',
      }">
    {{text}}
  </span>
</template>

<script lang="ts" setup>
import { defineOptions,defineProps } from 'vue'
defineProps({
  type: {
    type: String as ()=>'primary' | 'danger' | 'success' | 'warning' | 'gray' | 'personal',
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
  name: 'TypeText'
})
</script>

<style scoped>

</style>
