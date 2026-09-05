<script lang="ts" setup>
import { docsSections } from '@/utils/docsSections';

defineProps<{
  active: string;
}>();

const emit = defineEmits<{
  (event: 'select', key: string): void;
}>();
</script>

<template>
  <nav class="topnav" aria-label="文档栏目">
    <button
      v-for="section in docsSections"
      :key="section.key"
      :class="{ 'is-active': section.key === active }"
      type="button"
      class="topnav-item"
      @click="emit('select', section.key)"
    >
      {{ section.label }}
    </button>
  </nav>
</template>

<style scoped>
.topnav {
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: none;
}
.topnav-item {
  border: 0;
  background: transparent;
  padding: 6px 12px;
  border-radius: var(--q-radius-sm, 6px);
  font-size: var(--q-font-size-sm, 14px);
  color: var(--q-color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition:
    color var(--q-duration-fast, 0.2s) ease,
    background-color var(--q-duration-fast, 0.2s) ease;
}
.topnav-item:hover {
  color: var(--q-color-text);
  background-color: var(--q-color-bg-secondary);
}
.topnav-item.is-active {
  color: var(--q-color-primary);
  background-color: var(--q-color-primary-light);
  font-weight: 600;
}
</style>
