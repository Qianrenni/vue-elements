<!--
 * @component QFormButton
 * @description 表单按钮组件，支持 button/submit/reset 三种类型
 -->
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
import type { FormButtonProps } from './type';

defineOptions({
  name: 'QFormButton',
});
withDefaults(defineProps<FormButtonProps>(), {
  type: 'button',
  disabled: false,
  autofocus: false,
  size: 'middle',
});
</script>

<style scoped></style>
