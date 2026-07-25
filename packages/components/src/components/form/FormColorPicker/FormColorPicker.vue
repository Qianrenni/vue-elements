<!--
 * @component QFormColorPicker
 * @description 颜色选择器表单组件
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction !== 'vertical',
      },
    ]"
  >
    <p v-if="label" :id="name" :for="name" class="text-label">
      {{ label }}
    </p>
    <input
      :id="name"
      :disabled="disabled"
      :name="name"
      :value="modelValue"
      class="text-input"
      type="color"
      @input="onInput"
    />
    <span
      :style="{
        color: modelValue ?? '#fff',
      }"
      class="text-085rem"
    >
      {{ modelValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';

import { useFormColorPicker } from './composable';
import type { FormColorPickerProps } from './type';

defineOptions({
  name: 'QFormColorPicker',
});
const props = withDefaults(defineProps<FormColorPickerProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '请选择颜色',
  clearable: true,
  modelValue: '#fff',
});
const emit = defineEmits<FormComponentEmits<string>>();
const { onInput } = useFormColorPicker(props, emit);
</script>

<style scoped></style>
