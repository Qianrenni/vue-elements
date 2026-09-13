<!--
 * @component QFormButton
 * @description 表单按钮组件：内部复用基础 QButton 实现，对外兼容 button/submit/reset 三种原生类型
 * @deprecated 已废弃，请改用 QButton（basic/Button）；原生提交/重置请使用 QButton 的 html-type
 -->
<template>
  <QButton
    :autofocus="autofocus"
    :class="[buttonClass, 'button']"
    :disabled="disabled"
    :html-type="htmlType ?? type"
    :size="size"
  >
    <slot :class="buttonClass" :disabled="disabled" />
  </QButton>
</template>

<script lang="ts" setup>
import { QButton } from '@/components/basic/Button';

import { useFormButton } from './composable';
import type { FormButtonProps } from './type';

defineOptions({
  name: 'QFormButton',
});

const props = withDefaults(defineProps<FormButtonProps>(), {
  type: 'button',
  htmlType: undefined,
  disabled: false,
  autofocus: false,
  size: 'middle',
});

const { buttonClass } = useFormButton(props);
</script>

<style scoped></style>
