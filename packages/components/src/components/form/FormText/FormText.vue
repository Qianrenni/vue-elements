<!--
 * @component QFormText
 * @description 文本输入表单组件，支持多种输入类型、前缀图标和自定义校验
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction === 'horizontal',
      },
    ]"
    role="none"
  >
    <p v-if="label" class="text-label">
      {{ label }}
    </p>
    <div class="inner-container-column container-flex-1">
      <div
        :class="[
          {
            'position-relative': prefixIcon != undefined,
          },
        ]"
      >
        <QIcon
          v-if="prefixIcon"
          :icon="prefixIcon"
          size="16"
          class="text-input-icon"
        />
        <input
          class="text-input container-w100"
          :class="[
            {
              uneditable: disabled,
              'text-left-padding': prefixIcon != undefined,
              error: showHint,
            },
          ]"
          :disabled="disabled"
          :name="name"
          :pattern="pattern"
          :placeholder="placeholder"
          :required="required"
          :type="type"
          :value="modelValue"
          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="onInput"
        />
      </div>
      <p v-if="showHint" class="text-hint">{{ hint }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';
import type { FormTextProps } from './type';
import { useFormText } from './composable';
import { QIcon } from '@/components/basic/Icon';

defineOptions({
  name: 'QFormText',
});
const props = withDefaults(defineProps<FormTextProps>(), {
  type: 'text',
  required: false,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
  pattern: undefined,
  editable: true,
});

const emit = defineEmits<FormComponentEmits<string>>();
const { showHint, onInput, onChange, onFocus, onBlur } = useFormText(
  props,
  emit,
);
</script>
