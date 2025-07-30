<!-- components/form/FormTextarea.vue -->
<template>
  <div>
    <label v-if="label" :for="name">{{ label }}:</label>
    <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :style="{ resize: resizable ? 'vertical' : 'none' }"
        :value="modelValue"
        @input="onInput"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  resizable?: boolean; // 是否允许拖拽调整大小，默认为true
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>

</style>
