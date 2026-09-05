<!--
 * @component QFormItem
 * @description 表单项（配合 QForm）：label + 必填星号 + 控件槽 + 校验错误；通过 form 上下文注册字段并响应 change/blur 触发校验。
 -->
<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted } from 'vue';
import type { CSSProperties } from 'vue';

import { Q_FORM_KEY } from '../QForm/formContext';
import type { QFormContext } from '../QForm/formContext';
import type { QFormItemProps } from './type';

defineOptions({ name: 'QFormItem' });

const props = withDefaults(defineProps<QFormItemProps>(), {
  name: '',
  label: '',
  rules: () => [],
  required: undefined,
  validateTrigger: undefined,
});

const ctx = inject<QFormContext | null>(Q_FORM_KEY, null);

const effectiveRules = computed(() =>
  props.name
    ? props.rules.length > 0
      ? props.rules
      : ctx?.getRules(props.name)
    : undefined,
);
const required = computed(
  () =>
    props.required ?? effectiveRules.value?.some((r) => r.required) ?? false,
);
const error = computed(() =>
  props.name ? (ctx?.errors[props.name] ?? '') : '',
);
const hasError = computed(() => !!error.value);
const trigger = computed(
  () => props.validateTrigger ?? ctx?.validateTrigger ?? 'blur',
);

const labelStyle = computed<CSSProperties | undefined>(() => {
  if (!ctx || ctx.layout === 'vertical' || !props.label) return undefined;
  return {
    width:
      typeof ctx.labelWidth === 'number'
        ? `${ctx.labelWidth}px`
        : ctx.labelWidth,
    textAlign: ctx.labelAlign,
  };
});

function onAutoTrigger(event: Event) {
  if (!props.name) return;
  const type = event.type;
  const wanted = trigger.value;
  if (
    (type === 'change' && wanted === 'change') ||
    (type === 'focusout' && wanted === 'blur')
  ) {
    void ctx?.validateField(props.name);
  }
}

onMounted(() => {
  if (props.name) ctx?.registerField(props.name);
});
onBeforeUnmount(() => {
  if (props.name) ctx?.unregisterField(props.name);
});
</script>

<template>
  <div
    class="q-form-item"
    :class="{
      'q-form-item--horizontal': ctx?.layout !== 'vertical',
      'q-form-item--vertical': ctx?.layout === 'vertical',
      'is-required': required,
      'is-error': hasError,
    }"
    @change.capture="onAutoTrigger"
    @focusout.capture="onAutoTrigger"
  >
    <div v-if="label" class="q-form-item__label" :style="labelStyle">
      <span v-if="required" class="q-form-item__star" aria-hidden="true"
        >*</span
      >
      {{ label }}
    </div>
    <div class="q-form-item__content">
      <slot />
      <transition name="q-form-fade">
        <div v-if="hasError" class="q-form-item__error" role="alert">
          {{ error }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.q-form-item {
  display: flex;
  margin-bottom: 18px;
}
.q-form-item--horizontal {
  align-items: flex-start;
}
.q-form-item--vertical {
  flex-direction: column;
}
.q-form-item__label {
  flex: none;
  padding-right: 12px;
  line-height: 32px;
  color: var(--q-color-text);
  box-sizing: border-box;
}
.q-form-item__star {
  color: var(--q-color-red-500, #ff4d4f);
  margin-right: 4px;
}
.q-form-item__content {
  flex: 1;
  min-width: 0;
}
.q-form-item__error {
  margin-top: 4px;
  color: var(--q-color-red-500, #ff4d4f);
  font-size: var(--q-font-size-xs, 12px);
  line-height: 1.4;
}
.q-form-fade-enter-active,
.q-form-fade-leave-active {
  transition: opacity 0.15s ease;
}
.q-form-fade-enter-from,
.q-form-fade-leave-to {
  opacity: 0;
}
</style>
