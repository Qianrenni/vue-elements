<template>
  <div class="container-w100 container-h100 bg-gray-300"
       :class="{
      'container-column': direction === 'vertical'
      }"
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

defineProps({
  percent: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'var(--primary-color)'
  },
  direction: {
    type: String as () => 'horizontal' | 'vertical',
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
})
</script>

<style scoped>

</style>
