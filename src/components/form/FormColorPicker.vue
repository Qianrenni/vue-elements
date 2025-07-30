<!-- components/form/FormColorPicker.vue -->
<template>
  <div>
    <label v-if="label" :for="name">{{ label }}:</label>
    <input
        :id="name"
        :name="name"
        :value="modelValue"
        style="margin-left: 10px;"
        type="color"
        @input="onInput"
    />
    <span style="margin-left: 10px; font-size: 14px;">{{ modelValue }}</span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: string;
  name: string;
  label?: string;
}>(), {
  label: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>

</style>
