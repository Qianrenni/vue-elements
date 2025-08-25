<!-- components/form/FormDatePicker.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-text-container"
  >
    <label
        v-if="label"
        :id="name"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-08rem':size==='small'
        }"
        :for="name"
        class="label"
    >
      {{ label }}:
    </label>
    <input
        :id="name"
        :class="[
              {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-08rem':size==='small'
              }
        ]"
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
