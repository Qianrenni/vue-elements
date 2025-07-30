<!-- components/form/FormButton.vue -->
<template>
  <button
      :style="{ backgroundColor }"
      :type="type"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  type: {type: String, default: 'button'},
  backgroundColor: {type: String, default: '#007BFF'},
});
</script>

<style scoped>
button {
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>
