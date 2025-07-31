<template>
  <div :class="{
      'container-column': direction === 'vertical'
      }"
       class="container-w100 container-h100 bg-gray-300"
  >
    <div
        :style="{ width: direction === 'horizontal' ? percent : '100%',
        height: direction === 'vertical' ? percent : '100%',
        backgroundColor: color }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ProgressBar'
})

withDefaults(defineProps<{
  percent: string
  color?: string
  direction?: 'horizontal' | 'vertical'
}>(), {
  color: 'var(--primary-color)',
  direction: 'horizontal'
})
</script>

<style scoped>

</style>
