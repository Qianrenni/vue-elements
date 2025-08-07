<!-- components/query/InputSingle.vue -->
<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: string | number;
  field: {
    type: string;
  }
}>(), {
  modelValue: '',
  field: () => {
    return {
      type: 'text'
    }
  }
})
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
      :placeholder="'请输入值'"
      :type="field.type === 'number' ? 'number' : 'text'"
      :value="modelValue"
      class="query-input-single"
      @input="emit('update:modelValue',( $event?.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.query-input-single {
  width: 120px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
