<!--
 * @component QDatePicker
 * @description 日期选择器，对齐 Ant Design DatePicker：v-model:value 双向绑定、多粒度 picker、可选时间
 -->
<template>
  <div
    class="q-date-picker"
    :class="[
      statusClass,
      sizeClass,
      {
        'q-date-picker--disabled': disabled,
        'q-date-picker--clearable': showClear,
      },
    ]"
  >
    <input
      class="q-date-picker__control"
      :autofocus="autofocus || undefined"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :type="nativeType"
      :value="text"
      @blur="emit('blur', $event as FocusEvent)"
      @focus="emit('focus', $event as FocusEvent)"
      @input="onInput"
    />
    <span
      v-if="showClear"
      class="q-date-picker__clear"
      @click="onClear"
      @mousedown.prevent
      >×</span
    >
  </div>
</template>

<script lang="ts" setup>
import { useDatePicker } from './composable';
import type { QDatePickerEmits, QDatePickerProps } from './type';

defineOptions({ name: 'QDatePicker' });

const props = withDefaults(defineProps<QDatePickerProps>(), {
  value: undefined,
  picker: 'date',
  showTime: false,
  placeholder: undefined,
  disabled: false,
  allowClear: false,
  status: undefined,
  size: 'middle',
  name: undefined,
  autofocus: false,
});

const emit = defineEmits<QDatePickerEmits>();

const { nativeType, text, showClear, statusClass, sizeClass } =
  useDatePicker(props);

/** 值变化：派发 update:value 与 change（原生 change 事件照常冒泡供 QFormItem 校验） */
function onInput(ev: Event) {
  const value = (ev.target as HTMLInputElement).value;
  emit('update:value', value);
  emit('change', value, value);
}

/** 清空值 */
function onClear() {
  emit('update:value', '');
  emit('change', '', '');
  emit('clear');
}
</script>

<style scoped>
.q-date-picker {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.q-date-picker__control {
  box-sizing: border-box;
  width: 100%;
  padding: var(--q-space-2) var(--q-space-5);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  outline: none;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-date-picker__control:focus {
  border-color: var(--q-color-primary);
}

.q-date-picker--disabled .q-date-picker__control {
  background-color: var(--q-color-bg-secondary);
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-date-picker--error .q-date-picker__control {
  border-color: var(--q-color-red-400);
}

.q-date-picker--warning .q-date-picker__control {
  border-color: var(--q-color-orange-300);
}

/* 尺寸 */
.q-date-picker--small .q-date-picker__control {
  padding: var(--q-space-1) var(--q-space-2);
  font-size: var(--q-font-size-xs);
}

.q-date-picker--large .q-date-picker__control {
  padding: var(--q-space-3) var(--q-space-4);
  font-size: var(--q-font-size-base);
}

/* 有清除按钮时为右侧留出空间 */
.q-date-picker--clearable .q-date-picker__control {
  padding-inline-end: var(--q-space-9);
}

/* 清除按钮 */
.q-date-picker__clear {
  position: absolute;
  top: 50%;
  inset-inline-end: var(--q-space-3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: var(--q-radius-full);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-sm);
  line-height: 1;
  transform: translateY(-50%);
  cursor: pointer;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-date-picker__clear:hover {
  color: var(--q-color-text);
}

.q-date-picker--disabled .q-date-picker__clear {
  cursor: not-allowed;
}
</style>
