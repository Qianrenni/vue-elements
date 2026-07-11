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
import type { FormDatePickerProps } from './type';
import { useFormEvents } from '@/events';

defineOptions({
  name: 'QFormDatePicker',
});
withDefaults(defineProps<FormDatePickerProps>(), {
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
const { handleInput } = useFormEvents(emit);
/** 处理输入，确保输出为字符串 */
const onInput = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value);
};
</script>

<style scoped></style>
