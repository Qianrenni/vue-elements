<!-- components/form/FormButton.vue -->
<template>
  <button
      :type="type"
      class="button"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  }
});
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
