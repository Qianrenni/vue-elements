<!--
 * @component QColorPicker
 * @description 颜色选择器，对齐 Ant Design ColorPicker：v-model:value 双向绑定、预设色板、多格式展示
 -->
<template>
  <div
    ref="rootRef"
    class="q-color-picker"
    :class="[statusClass, { 'q-color-picker--disabled': disabled }]"
  >
    <div class="q-color-picker__field">
      <button
        class="q-color-picker__trigger"
        type="button"
        :aria-expanded="isOpen"
        :disabled="disabled"
        @click="onToggle"
      >
        <span
          aria-hidden="true"
          class="q-color-picker__swatch"
          :style="{ backgroundColor: color }"
        />
        <span v-if="showText" class="q-color-picker__text">{{ text }}</span>
      </button>
      <span
        v-if="showClear"
        class="q-color-picker__clear"
        @click="onClear"
        @mousedown.prevent
        >×</span
      >
    </div>

    <div v-if="isOpen" class="q-color-picker__panel">
      <div class="q-color-picker__fields">
        <input
          class="q-color-picker__native"
          type="color"
          :disabled="disabled"
          :value="color"
          @input="onPick(($event.target as HTMLInputElement).value)"
        />
        <input
          class="q-color-picker__input"
          type="text"
          spellcheck="false"
          :disabled="disabled"
          :value="color"
          @change="onHexChange"
        />
      </div>

      <div v-if="presets.length" class="q-color-picker__presets">
        <div
          v-for="(preset, index) in presets"
          :key="`${preset.label}-${index}`"
          class="q-color-picker__preset"
        >
          <span class="q-color-picker__preset-label">{{ preset.label }}</span>
          <div class="q-color-picker__preset-colors">
            <button
              v-for="item in preset.colors"
              :key="item"
              class="q-color-picker__preset-color"
              type="button"
              :disabled="disabled"
              :title="item"
              :style="{ backgroundColor: item }"
              @click="onPick(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

import { useColorPicker } from './composable';
import type { QColorPickerEmits, QColorPickerProps } from './type';

defineOptions({ name: 'QColorPicker' });

const props = withDefaults(defineProps<QColorPickerProps>(), {
  value: undefined,
  presets: () => [],
  disabled: false,
  allowClear: false,
  showText: false,
  format: 'hex',
  open: undefined,
  status: undefined,
});

const emit = defineEmits<QColorPickerEmits>();

const { color, showClear, isOpen, text, statusClass } = useColorPicker(props);

const rootRef = useTemplateRef<HTMLDivElement>('rootRef');

/** hex 校验（支持 #rgb 与 #rrggbb） */
const HEX_PATTERN = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/** 设置展开状态并派发 openChange */
function setOpen(next: boolean) {
  isOpen.value = next;
  emit('openChange', next);
}

/** 点击色块：切换面板展开 */
function onToggle() {
  if (props.disabled) return;
  setOpen(!isOpen.value);
}

/** 选中颜色：派发 update:value 与 change */
function onPick(next: string) {
  emit('update:value', next);
  emit('change', next, next);
}

/** hex 输入框变更：非法值回滚为当前色 */
function onHexChange(ev: Event) {
  const el = ev.target as HTMLInputElement;
  const next = el.value.trim();
  if (!HEX_PATTERN.test(next)) {
    el.value = color.value;
    return;
  }
  onPick(next.startsWith('#') ? next : `#${next}`);
}

/** 清空颜色 */
function onClear() {
  emit('update:value', '');
  emit('change', '', '');
  emit('clear');
}

/** 点击面板外部收起（受控模式下交由外部控制） */
function onDocumentMouseDown(ev: MouseEvent) {
  if (props.open !== undefined || !isOpen.value) return;
  if (rootRef.value?.contains(ev.target as Node)) return;
  setOpen(false);
}

onMounted(() => document.addEventListener('mousedown', onDocumentMouseDown));
onUnmounted(() =>
  document.removeEventListener('mousedown', onDocumentMouseDown),
);
</script>

<style scoped>
.q-color-picker {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

.q-color-picker__field {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-2);
  padding: var(--q-space-1) var(--q-space-2);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-color-picker__field:hover {
  border-color: var(--q-color-primary);
}

.q-color-picker--disabled .q-color-picker__field {
  background-color: var(--q-color-bg-secondary);
}

.q-color-picker--error .q-color-picker__field {
  border-color: var(--q-color-red-400);
}

.q-color-picker--warning .q-color-picker__field {
  border-color: var(--q-color-orange-300);
}

.q-color-picker__trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-2);
  padding: 0;
  border: none;
  background: none;
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  cursor: pointer;
}

.q-color-picker__trigger:disabled {
  cursor: not-allowed;
}

.q-color-picker__swatch {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
}

.q-color-picker__text {
  color: var(--q-color-text);
  font-family: var(--q-font-family-mono);
  font-size: var(--q-font-size-xs);
}

.q-color-picker__clear {
  color: var(--q-color-text-muted);
  line-height: 1;
  cursor: pointer;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-color-picker__clear:hover {
  color: var(--q-color-text);
}

/* 面板 */
.q-color-picker__panel {
  position: absolute;
  top: calc(100% + var(--q-space-2));
  inset-inline-start: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--q-space-4);
  min-width: 13rem;
  padding: var(--q-space-4);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  box-shadow: var(--q-shadow-md);
}

.q-color-picker__fields {
  display: flex;
  align-items: center;
  gap: var(--q-space-3);
}

.q-color-picker__native {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
  background-color: transparent;
  cursor: pointer;
}

.q-color-picker__input {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  padding: var(--q-space-1) var(--q-space-2);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  font-family: var(--q-font-family-mono);
  font-size: var(--q-font-size-xs);
  line-height: var(--q-line-height-normal);
  outline: none;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-color-picker__input:focus {
  border-color: var(--q-color-primary);
}

/* 预设色板 */
.q-color-picker__presets {
  display: flex;
  flex-direction: column;
  gap: var(--q-space-3);
}

.q-color-picker__preset {
  display: flex;
  flex-direction: column;
  gap: var(--q-space-2);
}

.q-color-picker__preset-label {
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-xs);
}

.q-color-picker__preset-colors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--q-space-2);
}

.q-color-picker__preset-color {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
  cursor: pointer;
  transition: transform var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-color-picker__preset-color:hover {
  transform: scale(1.1);
}

.q-color-picker__preset-color:disabled {
  cursor: not-allowed;
}
</style>
