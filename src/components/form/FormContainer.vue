<!-- components/form/FormContainer.vue -->
<template>
  <div class="form-container">
    <h1>{{ title }}</h1>
    <p v-if="description">{{ description }}</p>
    <form @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  description: String
});
defineEmits(['submit']);
</script>

<style scoped>

</style>
