<!--
 * @component QTimePicker
 * @description 时间选择器（对齐 antd TimePicker 常用能力）：时/分/秒列表面板 + 下拉展开，支持 format、步长、允许清除、v-model 与受控 open。
 -->
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import {
  buildOptions,
  DEFAULT_TIME_FORMAT,
  DEFAULT_TIME_PLACEHOLDER,
  formatHasSeconds,
  formatTime,
  parseTimeValue,
} from './composable';
import type { TimeParts } from './composable';
import type { QTimePickerEmits, QTimePickerProps } from './type';

defineOptions({ name: 'QTimePicker' });

const props = withDefaults(defineProps<QTimePickerProps>(), {
  modelValue: '',
  format: DEFAULT_TIME_FORMAT,
  placeholder: DEFAULT_TIME_PLACEHOLDER,
  disabled: false,
  allowClear: true,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  open: undefined,
});

const emit = defineEmits<QTimePickerEmits>();

const rootRef = ref<HTMLElement | null>(null);
const internalOpen = ref(false);
const isControlledOpen = computed(() => props.open !== undefined);
const isOpen = computed(() =>
  isControlledOpen.value ? props.open === true : internalOpen.value,
);

const hasSeconds = computed(() => formatHasSeconds(props.format));
const hours = computed(() => buildOptions(24, props.hourStep));
const minutes = computed(() => buildOptions(60, props.minuteStep));
const seconds = computed(() => buildOptions(60, props.secondStep));

/** 单位列配置 */
const units = computed<
  { key: keyof TimeParts; label: string; options: number[] }[]
>(() => {
  const list: { key: keyof TimeParts; label: string; options: number[] }[] = [
    { key: 'hour', label: '时', options: hours.value },
    { key: 'minute', label: '分', options: minutes.value },
  ];
  if (hasSeconds.value) {
    list.push({ key: 'second', label: '秒', options: seconds.value });
  }
  return list;
});

const displayValue = computed(() =>
  props.modelValue
    ? formatTime(parseTimeValue(props.modelValue), props.format)
    : '',
);

const draft = ref<TimeParts>(parseTimeValue(props.modelValue));

function open() {
  if (props.disabled) return;
  draft.value = parseTimeValue(props.modelValue);
  internalOpen.value = true;
  emit('update:open', true);
}
function close() {
  internalOpen.value = false;
  emit('update:open', false);
}
function toggle() {
  if (isOpen.value) close();
  else open();
}
function confirm(value: string) {
  emit('update:modelValue', value);
  if (value !== props.modelValue) emit('change', value);
  close();
}
function confirmDraft() {
  confirm(formatTime(draft.value, props.format));
}
function clearValue() {
  confirm('');
}

function onDocumentPointer(e: Event) {
  const target = e.target as Node | null;
  if (rootRef.value && target && rootRef.value.contains(target)) return;
  close();
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

watch(isOpen, (value) => {
  if (value) {
    document.addEventListener('pointerdown', onDocumentPointer);
    document.addEventListener('keydown', onKeydown);
  } else {
    document.removeEventListener('pointerdown', onDocumentPointer);
    document.removeEventListener('keydown', onKeydown);
  }
});
onMounted(() => {
  if (isOpen.value) {
    document.addEventListener('pointerdown', onDocumentPointer);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointer);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div ref="rootRef" class="q-timepicker" :class="{ 'is-disabled': disabled }">
    <div class="q-timepicker__field" @click="toggle">
      <input
        class="q-timepicker__input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
      />
      <button
        v-if="allowClear && modelValue && !disabled"
        class="q-timepicker__clear"
        type="button"
        aria-label="清除"
        @click.stop="clearValue"
      >
        ×
      </button>
      <span class="q-timepicker__caret" aria-hidden="true">▾</span>
    </div>

    <div v-if="isOpen" class="q-timepicker__panel">
      <div class="q-timepicker__cols">
        <div v-for="unit in units" :key="unit.key" class="q-timepicker__col">
          <div class="q-timepicker__col-label">{{ unit.label }}</div>
          <ul class="q-timepicker__list">
            <li
              v-for="opt in unit.options"
              :key="opt"
              class="q-timepicker__item"
              :class="{ 'is-active': draft[unit.key] === opt }"
              @click="draft[unit.key] = opt"
            >
              {{ String(opt).padStart(2, '0') }}
            </li>
          </ul>
        </div>
      </div>
      <div class="q-timepicker__footer">
        <button
          v-if="allowClear"
          class="q-timepicker__btn"
          type="button"
          @click="clearValue"
        >
          清除
        </button>
        <button
          class="q-timepicker__btn q-timepicker__btn--primary"
          type="button"
          @click="confirmDraft"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-timepicker {
  position: relative;
  display: inline-block;
  width: 128px;
}
.q-timepicker__field {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-sm, 6px);
  background: var(--q-color-bg-card);
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.q-timepicker__field:hover {
  border-color: var(--q-color-primary);
}
.q-timepicker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.q-timepicker__input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
  padding: 0 8px;
  cursor: pointer;
}
.q-timepicker__input::placeholder {
  color: var(--q-color-text-muted);
}
.q-timepicker__clear {
  border: none;
  background: transparent;
  color: var(--q-color-text-muted);
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
}
.q-timepicker__caret {
  padding: 0 6px 0 0;
  color: var(--q-color-text-muted);
  font-size: 10px;
}
.q-timepicker__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 20;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  box-shadow: var(--q-shadow-md, 0 6px 16px rgba(0, 0, 0, 0.12));
  padding: 8px;
}
.q-timepicker__cols {
  display: flex;
  gap: 4px;
}
.q-timepicker__col {
  display: flex;
  flex-direction: column;
  width: 52px;
}
.q-timepicker__col-label {
  text-align: center;
  font-size: 11px;
  color: var(--q-color-text-muted);
  padding: 2px 0;
}
.q-timepicker__list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 180px;
  overflow-y: auto;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 6px);
}
.q-timepicker__item {
  text-align: center;
  padding: 4px 0;
  cursor: pointer;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
}
.q-timepicker__item:hover {
  background: var(--q-color-bg-secondary);
}
.q-timepicker__item.is-active {
  color: var(--q-color-primary);
  font-weight: 600;
  background: color-mix(in srgb, var(--q-color-primary) 10%, transparent);
}
.q-timepicker__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
.q-timepicker__btn {
  border: 1px solid var(--q-color-border-light);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 6px);
  padding: 2px 12px;
  cursor: pointer;
  font-size: var(--q-font-size-xs, 12px);
}
.q-timepicker__btn--primary {
  background: var(--q-color-primary);
  border-color: var(--q-color-primary);
  color: var(--q-color-white);
}
</style>
