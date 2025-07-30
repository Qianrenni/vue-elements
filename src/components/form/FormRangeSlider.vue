<!-- components/form/FormRangeSlider.vue -->
<template>
  <div>
    <label :for="name" class="label">{{ label }}:</label>
    <input
        :id="name"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :name="name"
        :required="required"
        type="range"
        @input="onInput"
    />
    <output>{{ modelValue }}</output>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: number
  name: string
  label: string
  min?: number
  max?: number
  step?: number
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.valueAsNumber)
}
</script>