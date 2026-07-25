<!--
 * @component QFormTextarea
 * @description 多行文本输入表单组件
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction === 'horizontal',
      },
    ]"
    class="form-text-area-container"
  >
    <p
      v-if="label"
      class="text-label"
      :class="[
        {
          required: required,
        },
      ]"
    >
      {{ label }}
    </p>
    <textarea
      :id="name"
      :class="[
        {
          uneditable: disabled,
        },
      ]"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :style="{ resize: resizable ? 'both' : 'none' }"
      :value="modelValue"
      class="text-input scroll-container"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';

import { useFormTextarea } from './composable';
import type { FormTextareaProps } from './type';

defineOptions({
  name: 'QFormTextarea',
});

const props = withDefaults(defineProps<FormTextareaProps>(), {
  rows: 5,
  resizable: false,
  placeholder: '请输入内容',
  required: true,
  direction: 'vertical',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
});

const emit = defineEmits<FormComponentEmits<string>>();
const { onInput } = useFormTextarea(props, emit);
</script>
