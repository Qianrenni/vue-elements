<!-- components/form/FormColorPicker.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-color-picker"
  >
    <label
        v-if="label"
        :id="name"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
        :for="name"
        class="label"
    >
      {{ label }}
    </label>
    <div
        class="container"
    >
      <input
          :id="name"
          :class="[
              {
                'mouse-cursor-disable':disabled,
              }
          ]"
          :disabled="disabled"
          :name="name"
          :value="modelValue"
          class="border-primary"
          type="color"
          @input="onInput"
      />
      <span
          :class="[
              {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-05rem':size==='small'
              }
          ]"
          :style="{
            color: modelValue??'#fff',
          }"
          class="label"
      >
      {{ modelValue }}
    </span>
    </div>
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
.form-color-picker input {
  outline: none;
  border-width: 1px;
  cursor: pointer;
}
</style>
