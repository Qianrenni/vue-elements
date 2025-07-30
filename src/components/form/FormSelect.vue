<!-- components/form/FormSelect.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <select :id="name" v-model="modelValue" :multiple="multiple" :name="name" :required="required">
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Options} from "@/types";

defineProps({
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
defineEmits(['update:modelValue']);
</script>
