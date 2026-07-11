<template>
  <button
    :autofocus="autofocus"
    :class="{
      'mouse-cursor-disable': disabled,
      'text-12rem': size === 'large',
      'text-08rem': size === 'small',
    }"
    :disabled="disabled"
    :type="type"
    class="button"
  >
    <slot
      :class="{
        'mouse-cursor-disable': disabled,
        'text-12rem': size === 'large',
        'text-08rem': size === 'small',
      }"
      :disabled="disabled"
    />
  </button>
</template>

<script lang="ts" setup>
import { FormComponentProps } from '@/types';

interface FormButtonProps extends FormComponentProps<null> {
  type?: 'button' | 'submit' | 'reset';
}

defineOptions({
  name: 'FormButton',
});
withDefaults(defineProps<FormButtonProps>(), {
  type: 'button',
  disabled: false,
  autofocus: false,
  size: 'middle',
});
</script>

<style scoped></style>
