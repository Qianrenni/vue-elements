<!-- components/form/FormDatePicker.vue -->
<template>
  <div
    :class="[
      {
        'container-column':direction === 'vertical',
        'container':direction!=='vertical',
        'container-align-center':direction!=='vertical',
      }
    ]"
  >
    <p
      v-if="label"
      class="text-label"
    >
      {{ label }}:
    </p>
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
    >
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events";
// 支持的日期类型
type DateType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

interface FormDatePickerProps extends FormComponentProps<string> {
  type?: DateType;
}

defineOptions({
  name: 'FormDatePicker',
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
})

const emit = defineEmits<FormComponentEmits<string>>()
const {handleInput} = useFormEvents(emit);
// 处理输入，确保输出为字符串
const onInput = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value)
};

</script>

<style scoped>
</style>
