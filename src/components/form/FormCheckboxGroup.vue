<!-- components/form/FormCheckboxGroup.vue -->
<template>
  <div>
    <label>{{ label }}:</label>
    <div class="checkbox-group">
      <label v-for="opt in options" :key="opt.value">
        <input
            :checked="modelValue.includes(opt.value)"
            :value="opt.value"
            type="checkbox"
            @change="handleChange"
        />
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from 'vue';
import {Options} from '@/types';

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[] | number[]>,
    default: () => []
  },
  label: String,
  options: {
    type: Array as PropType<Options[]>,
    required: true,
    validator: (value: Options[]) => value.length > 0
  }
});

const emit = defineEmits(['update:modelValue']);

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const checked = target.checked;
  const newValue = [...props.modelValue];

  if (checked) {
    newValue.push(value);
  } else {
    const index = newValue.indexOf(value);
    if (index > -1) {
      newValue.splice(index, 1);
    }
  }

  emit('update:modelValue', newValue);
}
</script>

<style scoped>

</style>
