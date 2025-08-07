<!-- components/query/InputList.vue -->
<script lang="ts" setup>

withDefaults(defineProps<{
  modelValue: (string | number)[];
}>(), {
  modelValue: () => []
})
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
      :value="modelValue.join(', ')"
      class="query-input-list"
      placeholder="用逗号分隔多个值"
      @input="emit('update:modelValue', ($event?.target as HTMLInputElement).value.split(',').map(s => s.trim()))"
  />
</template>

<style scoped>
.query-input-list {
  width: 180px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
