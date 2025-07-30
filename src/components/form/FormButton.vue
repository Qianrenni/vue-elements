<template>
  <button
      :type="type"
      class="button"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset';
}>(), {
  type: 'button',
});

</script>

<style scoped>

</style>
