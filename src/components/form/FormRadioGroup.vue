<!-- components/form/FormRadioGroup.vue -->
<template>
  <div>
    <label>{{ label }} <span v-if="required">*</span></label>
    <div class="radio-group">
      <label v-for="opt in options" :key="opt.value">
        <input
            :checked="modelValue === opt.value"
            :name="name"
            :required="required"
            :value="opt.value"
            type="radio"
            @change="$emit('update:modelValue', opt.value)"
        />
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Options} from "@/types";

defineProps({
  modelValue: String,
  name: String,
  label: String,
  options: {
    type: Array as PropType<Options[]>,
    validator: (value: Options[]) => value.length > 0
  },
  required: {
    type: Boolean,
    default: true
  }
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.radio-group {
  display: flex;
  gap: 15px;
}

.radio-group label {
  display: inline-flex;
  align-items: center;
  margin: 0;
}

</style>
