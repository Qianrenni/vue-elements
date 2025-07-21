<template>
    <span v-if="type==='personal'"
          class="mouse-cursor "
          :style="{ color: foreground, backgroundColor: background }">
      {{text}}
    </span>
  <span v-else class="mouse-cursor padding-fourth-rem"
      :class="{
      'text-primary': type === 'primary',
      'text-success': type === 'success',
      'text-warning': type === 'warning',
      'text-danger': type === 'danger',
      'text-gray': type === 'gray',
      'text-info': type === 'info',
      }">
    {{text}}
  </span>
</template>

<script lang="ts" setup>
import { defineOptions,defineProps } from 'vue'
defineProps({
  type: {
    type: String as ()=>'primary' | 'danger' | 'success' | 'warning' | 'gray' | 'personal' |'info',
    default: 'personal',
    validator: (value: string) => ['primary', 'danger', 'success', 'warning','gray','personal','info'].includes(value)
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
