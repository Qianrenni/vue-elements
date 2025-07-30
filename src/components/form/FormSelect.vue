<!-- components/form/FormSelect.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <select
        :id="name"
        :multiple="multiple"
        :name="name"
        :required="required"
        :value="modelValue"
        @change="onInput"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {computed, PropType} from "vue";
import {Options} from "@/types";

const props = defineProps({
  modelValue: [String, Array],
  name: String,
  label: String,
  placeholder: String,
  options: {
    type: Array as PropType<Options[]>,
    validator: (v: Options[]) => v.length > 0,
  },
  multiple: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | null): void;
}>();
const onInput = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>
