<template>
  <img :src="$props.url" :style="{
        width: props.size,
        height: props.size,
       }" alt="人像"
       class="avatar"
  >
</template>

<script lang="ts" setup>
import {defineOptions, defineProps} from 'vue'

const props = withDefaults(defineProps<{
  url?: string
  size?: string
}>(), {
  url: 'https://picsum.photos/200/',
  size: '64px',
})
defineOptions({
  name: 'Avatar'
})
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>
