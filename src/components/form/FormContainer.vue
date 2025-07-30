<!-- components/form/FormContainer.vue -->
<template>
  <div class="form-container">
    <h1 v-if="title">{{ title }}</h1>
    <p v-if="description">{{ description }}</p>
    <form @submit.prevent="emit('submit')">
      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string,
  description?: string
}>()
const emit = defineEmits<{ (e: 'submit'): void }>()
</script>

<style scoped>

</style>
