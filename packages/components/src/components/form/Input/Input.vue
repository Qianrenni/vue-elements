<!--
 * @component QInput
 * @description 文本输入框，对齐 Ant Design Input：支持前后缀图标、清除、字数统计与校验状态
 -->
<template>
  <div
    class="q-input"
    :class="[
      statusClass,
      sizeClass,
      {
        'q-input--disabled': disabled,
        'q-input--with-prefix': !!prefix,
        'q-input--with-suffix': !!suffix || showClear,
      },
    ]"
  >
    <span
      v-if="prefix"
      aria-hidden="true"
      class="q-input__affix q-input__prefix"
    >
      <QIcon :icon="prefix" size="16" />
    </span>
    <input
      ref="inputRef"
      class="q-input__control"
      :autofocus="autofocus || undefined"
      :disabled="disabled"
      :maxlength="maxLength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :type="type"
      :value="text"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
      @input="onInput"
      @keydown.enter="emit('pressEnter', $event as KeyboardEvent)"
    />
    <span
      v-if="showClear"
      class="q-input__affix q-input__clear"
      @click="onClear"
      @mousedown.prevent
      >×</span
    >
    <span
      v-else-if="suffix"
      aria-hidden="true"
      class="q-input__affix q-input__suffix"
    >
      <QIcon :icon="suffix" size="16" />
    </span>
    <span v-if="countText" class="q-input__count">{{ countText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { useTemplateRef } from 'vue';

import { useInput } from './composable';
import type { QInputEmits, QInputProps } from './type';

defineOptions({ name: 'QInput' });

const props = withDefaults(defineProps<QInputProps>(), {
  value: '',
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  allowClear: false,
  maxLength: undefined,
  showCount: false,
  prefix: undefined,
  suffix: undefined,
  status: undefined,
  size: 'middle',
  autofocus: false,
  name: undefined,
});

const emit = defineEmits<QInputEmits>();

const { text, showClear, countText, statusClass, sizeClass } = useInput(props);

const inputRef = useTemplateRef<HTMLInputElement>('inputRef');

/** 输入：派发 update:value 与 change */
function onInput(ev: Event) {
  const value = (ev.target as HTMLInputElement).value;
  emit('update:value', value);
  emit('change', value);
}

/** 清除内容 */
function onClear() {
  emit('update:value', '');
  emit('change', '');
  emit('clear');
  inputRef.value?.focus();
}
</script>

<style scoped>
.q-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-input:focus-within {
  border-color: var(--q-color-primary);
}

.q-input--disabled {
  background-color: var(--q-color-bg-secondary);
  cursor: not-allowed;
}

.q-input--error {
  border-color: var(--q-color-red-400);
}

.q-input--warning {
  border-color: var(--q-color-orange-300);
}

.q-input__control {
  flex: 1;
  min-width: 0;
  padding: var(--q-space-2) var(--q-space-5);
  border: none;
  border-radius: inherit;
  background-color: transparent;
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  outline: none;
}

.q-input__control:disabled {
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-input__affix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-sm);
}

.q-input__prefix {
  padding-inline-start: var(--q-space-5);
}

.q-input__suffix,
.q-input__clear {
  padding-inline-end: var(--q-space-5);
}

.q-input__clear {
  cursor: pointer;
}

.q-input__count {
  flex-shrink: 0;
  padding-inline-end: var(--q-space-3);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-xs);
}

/* 尺寸 */
.q-input--small .q-input__control {
  height: 1.75rem;
  font-size: var(--q-font-size-xs);
}

.q-input--middle .q-input__control {
  height: 2rem;
}

.q-input--large .q-input__control {
  height: 2.5rem;
  font-size: var(--q-font-size-base);
}
</style>
