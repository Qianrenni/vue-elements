<!-- components/form/FormColorPicker.vue -->
<template>
  <div
    :class="[
      {
        'container-column':direction === 'vertical',
        'container':direction!=='vertical',
        'mouse-cursor-disable':disabled,
        'text-12rem':size==='large',
        'text-08rem':size==='small'
      }
    ]"
  >
    <p
      v-if="label"
      :id="name"
      :for="name"
      class="text-label"
    >
      {{ label }}
    </p>
    <input
      :id="name"
      :disabled="disabled"
      :name="name"
      :value="modelValue"
      class=" text-input"
      type="color"
      @input="onInput"
    >
    <span
      :style="{
        color: modelValue??'#fff',
      }"
    >
      {{ modelValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events";

defineOptions({
  name: 'FormColorPicker',
});
withDefaults(defineProps<FormComponentProps<string>>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '请选择颜色',
  clearable: true,
  modelValue: '#fff',
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
