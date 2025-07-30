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
.form-container {
  max-width: 800px;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container h1, .form-container h2 {
  color: #333;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

legend {
  font-weight: bold;
  color: #444;
}

label {
  display: block;
  margin: 10px 0 5px;
}
</style>
