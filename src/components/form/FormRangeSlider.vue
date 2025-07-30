<!-- components/form/FormRangeSlider.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input
        :id="name"
        v-model="value"
        :max="max"
        :min="min"
        :name="name"
        :step="step"
        type="range"
        @input="$emit('update:modelValue', value)"
    />
    <output>{{ modelValue }}</output>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: Number,
  name: String,
  label: String,
  min: {type: Number, default: 0},
  max: {type: Number, default: 100},
  step: {type: Number, default: 1}
});
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})

const emit = defineEmits(['update:modelValue']);
</script>
