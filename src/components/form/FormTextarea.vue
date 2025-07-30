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
withDefaults(defineProps<{
  modelValue: string;
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  resizable?: boolean; // 是否允许拖拽调整大小，默认为true
}>(), {
  rows: 3,
  required: true,
  resizable: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value as string);
};
</script>

<style scoped>

</style>
