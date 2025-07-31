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
            @change="emit('update:modelValue', opt.value)"
        />
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentProps, Options} from "@/types";

interface FormRadioGroupProps extends FormComponentProps<string> {
  options: Options[]
}

const props = withDefaults(defineProps<FormRadioGroupProps>()
    , {
      required: true,
      direction: 'horizontal',
      disabled: false,
      autofocus: false,
      readonly: false,
      size: 'middle',
      placeholder: '',
      clearable: true,
    })
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();
</script>

<style scoped>

</style>
