<!--
 * @component QFormDatePicker
 * @description 日期选择器表单组件，支持 date/time/datetime-local/month/week 五种类型
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction !== 'vertical',
        'container-align-center': direction !== 'vertical',
      },
    ]"
  >
    <p v-if="label" class="text-label">{{ label }}:</p>
    <input
      :id="name"
      class="text-input"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';

import { useFormDatePicker } from './composable';
import type { FormDatePickerProps } from './type';

defineOptions({
  name: 'QFormDatePicker',
});
const props = withDefaults(defineProps<FormDatePickerProps>(), {
  type: 'date',
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '请选择日期',
  clearable: true,
});

const emit = defineEmits<FormComponentEmits<string>>();
const { onInput } = useFormDatePicker(props, emit);
</script>

<style scoped></style>
