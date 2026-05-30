<!-- components/form/FormText.vue -->
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
import { FormComponentEmits, FormComponentProps } from '@/types';
import { useFormEvents } from '@/events/useFormEvents';
import { QIcon } from '@/index';
import { ref } from 'vue';

type TextType = `text` | `email` | `password` | `number` | `tel` | `url`;

interface FormTextProps extends FormComponentProps<string> {
  type?: TextType;
  pattern?: string | undefined;
  editable?: boolean;
  prefixIcon?: string;
  validate?: (value: string) => boolean;
  hint?: string;
}

defineOptions({
  name: 'FormText',
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
const showHint = ref(false);
const emit = defineEmits<FormComponentEmits<string>>();
// 创建事件处理器
const { handleInput, handleChange, handleFocus, handleBlur } =
  useFormEvents<string>(emit);

// 具体事件绑定
const onInput = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value as string);
};

const onChange = (e: Event) => {
  handleChange((e.target as HTMLInputElement).value as string);
};

const onFocus = () => {
  showHint.value = false;
  handleFocus();
};

const onBlur = () => {
  if (props.required && !props.validate?.((props.modelValue as string) || '')) {
    showHint.value = true;
  }
  handleBlur();
};
</script>
