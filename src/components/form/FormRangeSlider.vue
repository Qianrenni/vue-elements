<!-- components/form/FormRangeSlider.vue -->
<template>
  <div>
    <label :for="name" class="label">{{ label }}:</label>
    <input
        :id="name"
        :max="max"
        :min="min"
        :name="name"
        :required="required"
        :step="step"
        :value="modelValue"
        type="range"
        @input="onInput"
    />
    <output>{{ modelValue }}</output>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: number
  name: string
  label: string
  min?: number
  max?: number
  step?: number
  required?: boolean
}>(), {
  required: true,
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.valueAsNumber)
}
</script>