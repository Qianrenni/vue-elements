<!--
 * @component QInputNumber
 * @description 数字输入框组件，支持 min/max/step/precision、增减按钮与键盘上下键，对齐 Ant Design InputNumber。
 -->
<template>
  <div
    :class="[
      `q-input-number--${props.size}`,
      { 'q-input-number--disabled': isDisabled },
    ]"
    class="q-input-number"
  >
    <input
      :aria-valuemax="props.max ?? undefined"
      :aria-valuemin="props.min ?? undefined"
      :aria-valuenow="currentValue ?? undefined"
      :disabled="isDisabled"
      :placeholder="props.placeholder"
      role="spinbutton"
      type="text"
      :value="displayText"
      class="q-input-number-input"
      inputmode="decimal"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keydown="onKeydown"
    />
    <span
      v-if="props.controls"
      class="q-input-number-controls"
      aria-hidden="true"
    >
      <button
        :disabled="!canPlus"
        class="q-input-number-btn q-input-number-plus"
        tabindex="-1"
        type="button"
        aria-label="增加"
        @click="plus"
        @mousedown.prevent
      >
        +
      </button>
      <button
        :disabled="!canMinus"
        class="q-input-number-btn q-input-number-minus"
        tabindex="-1"
        type="button"
        aria-label="减少"
        @click="minus"
        @mousedown.prevent
      >
        −
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { parseToNumber, useInputNumber } from './composable';
import type { InputNumberEmits, InputNumberProps } from './type';

defineOptions({ name: 'QInputNumber' });

const props = withDefaults(defineProps<InputNumberProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  disabled: false,
  controls: true,
  size: 'middle',
});

const emit = defineEmits<InputNumberEmits>();

const {
  displayText,
  isDisabled,
  canPlus,
  canMinus,
  onInput,
  onBlur,
  onFocus,
  onKeydown,
  plus,
  minus,
} = useInputNumber(props, emit);

/** 供 aria-valuenow 使用 */
const currentValue = computed(() => parseToNumber(props.modelValue) ?? null);
</script>

<style scoped>
.q-input-number {
  display: inline-flex;
  align-items: stretch;
  box-sizing: border-box;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background: var(--q-color-bg-card);
  transition: var(--q-transition-border);
  overflow: hidden;
  vertical-align: middle;
}

.q-input-number:hover,
.q-input-number:focus-within {
  border-color: var(--q-color-primary);
}

.q-input-number-input {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  padding: 0 var(--q-space-4);
  border: 0;
  outline: none;
  background: transparent;
  color: var(--q-color-text);
  font: inherit;
}

/* 尺寸 */
.q-input-number--small .q-input-number-input {
  height: 24px;
  font-size: var(--q-font-size-xs);
}
.q-input-number--middle .q-input-number-input {
  height: 32px;
  font-size: var(--q-font-size-sm);
}
.q-input-number--large .q-input-number-input {
  height: 40px;
  font-size: var(--q-font-size-base);
}

/* 按钮列 */
.q-input-number-controls {
  display: flex;
  flex-direction: column;
  flex: none;
  width: 22px;
  border-left: 1px solid var(--q-color-border-light);
}

.q-input-number-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex: 1;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
  line-height: 1;
  cursor: pointer;
  transition: var(--q-transition-color);
}

.q-input-number-btn + .q-input-number-btn {
  border-top: 1px solid var(--q-color-border-light);
}

.q-input-number-btn:hover:not(:disabled) {
  color: var(--q-color-primary);
}

.q-input-number-btn:disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-input-number--disabled {
  background: var(--q-color-bg-secondary);
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
