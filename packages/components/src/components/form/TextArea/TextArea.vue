<!--
 * @component QTextArea
 * @description 多行文本输入框，对齐 Ant Design Input.TextArea：支持自适应高度、字数统计与清除
 -->
<template>
  <div
    class="q-textarea"
    :class="[statusClass, { 'q-textarea--disabled': disabled }]"
  >
    <textarea
      ref="textareaRef"
      class="q-textarea__control"
      :autofocus="autofocus || undefined"
      :disabled="disabled"
      :maxlength="maxLength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :rows="rows"
      :style="{ resize: autoSizeConfig ? 'none' : undefined }"
      :value="text"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
      @input="onInput"
      @keydown.enter="emit('pressEnter', $event as KeyboardEvent)"
    />
    <span
      v-if="showClear"
      class="q-textarea__clear"
      @click="onClear"
      @mousedown.prevent
      >×</span
    >
    <span v-if="countText" class="q-textarea__count">{{ countText }}</span>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, useTemplateRef, watch } from 'vue';

import { useTextArea } from './composable';
import type { QTextAreaEmits, QTextAreaProps } from './type';

defineOptions({ name: 'QTextArea' });

const props = withDefaults(defineProps<QTextAreaProps>(), {
  value: '',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  rows: 3,
  autoSize: false,
  showCount: false,
  maxLength: undefined,
  allowClear: false,
  status: undefined,
  autofocus: false,
  name: undefined,
});

const emit = defineEmits<QTextAreaEmits>();

const { text, showClear, countText, statusClass, autoSizeConfig } =
  useTextArea(props);

const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef');

/** 按内容与 minRows/maxRows 调整高度 */
function adjustHeight() {
  const el = textareaRef.value;
  const config = autoSizeConfig.value;
  if (!el) return;
  if (!config) {
    el.style.height = '';
    el.style.overflowY = '';
    return;
  }
  el.style.height = 'auto';
  const style = window.getComputedStyle(el);
  const lineHeight = parseFloat(style.lineHeight) || 20;
  const spacing =
    parseFloat(style.paddingTop) +
    parseFloat(style.paddingBottom) +
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderBottomWidth);
  const minRows = config.minRows ?? props.rows;
  const maxRows = config.maxRows ?? Infinity;
  const minHeight = lineHeight * minRows + spacing;
  const maxHeight =
    maxRows === Infinity ? Infinity : lineHeight * maxRows + spacing;
  const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
  el.style.height = `${next}px`;
  el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

/** 输入：派发事件并同步高度 */
function onInput(ev: Event) {
  const value = (ev.target as HTMLTextAreaElement).value;
  emit('update:value', value);
  emit('change', value);
  void nextTick(adjustHeight);
}

/** 清除内容 */
function onClear() {
  emit('update:value', '');
  emit('change', '');
  emit('clear');
  textareaRef.value?.focus();
}

watch(text, () => void nextTick(adjustHeight));
watch(autoSizeConfig, () => void nextTick(adjustHeight));
onMounted(adjustHeight);
</script>

<style scoped>
.q-textarea {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.q-textarea__control {
  box-sizing: border-box;
  width: 100%;
  padding: var(--q-space-2) var(--q-space-5);
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  outline: none;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-textarea__control:focus {
  border-color: var(--q-color-primary);
}

.q-textarea--disabled .q-textarea__control {
  background-color: var(--q-color-bg-secondary);
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-textarea--error .q-textarea__control {
  border-color: var(--q-color-red-400);
}

.q-textarea--warning .q-textarea__control {
  border-color: var(--q-color-orange-300);
}

.q-textarea__clear,
.q-textarea__count {
  position: absolute;
  bottom: var(--q-space-2);
  font-size: var(--q-font-size-xs);
  color: var(--q-color-text-muted);
}

.q-textarea__clear {
  right: var(--q-space-2);
  cursor: pointer;
}

.q-textarea__count {
  right: var(--q-space-3);
}

.q-textarea__clear + .q-textarea__count {
  right: calc(var(--q-space-3) + 0.75rem);
}
</style>
