<template>
  <div class="divider"></div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Divider'
})
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color: var(--gray-700);
  margin: 1rem 0;
}
</style>