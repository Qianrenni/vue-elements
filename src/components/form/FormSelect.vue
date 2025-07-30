<!-- components/form/FormSelect.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <select
        :id="name"
        :multiple="multiple"
        :name="name"
        :required="required"
        :value="value"
        @change="$emit('update:modelValue', value)"
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
const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})
const emit = defineEmits(['update:modelValue']);
</script>
