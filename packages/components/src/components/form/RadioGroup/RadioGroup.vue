<!--
 * @component QRadioGroup
 * @description 单选框组，对齐 Ant Design Radio.Group：options 驱动、v-model:value 双向绑定、支持按钮组形态
 -->
<template>
  <div
    class="q-radio-group"
    :class="[
      `q-radio-group--${optionType}`,
      `q-radio-group--${buttonStyle}`,
      `q-radio-group--${size}`,
    ]"
    role="radiogroup"
  >
    <label
      v-for="option in normalizedOptions"
      :key="option.value"
      class="q-radio-group__item"
      :class="{
        'q-radio-group__item--checked': isChecked(option.value),
        'q-radio-group__item--disabled': isOptionDisabled(option),
      }"
    >
      <input
        class="q-radio-group__input"
        type="radio"
        :checked="isChecked(option.value)"
        :disabled="isOptionDisabled(option)"
        :name="name"
        :value="option.value"
        @change="onChange(option.value)"
      />
      <span class="q-radio-group__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useRadioGroup } from './composable';
import type { NormalizedRadioOption } from './composable';
import type { QRadioGroupEmits, QRadioGroupProps, RadioValue } from './type';

defineOptions({ name: 'QRadioGroup' });

const props = withDefaults(defineProps<QRadioGroupProps>(), {
  options: () => [],
  value: undefined,
  disabled: false,
  name: undefined,
  optionType: 'default',
  buttonStyle: 'outline',
  size: 'middle',
});

const emit = defineEmits<QRadioGroupEmits>();

const { normalizedOptions, isChecked } = useRadioGroup(props);

/** 选项是否禁用：整体禁用优先于单项禁用 */
function isOptionDisabled(option: NormalizedRadioOption): boolean {
  return props.disabled || option.disabled;
}

/** 选项变更：派发 update:value 与 change */
function onChange(value: RadioValue) {
  emit('update:value', value);
  emit('change', value);
}
</script>

<style scoped>
.q-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--q-space-4);
}

.q-radio-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-4);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  color: var(--q-color-text);
  cursor: pointer;
}

.q-radio-group__item--disabled {
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-radio-group__input {
  width: 1rem;
  height: 1rem;
  margin: 0;
  accent-color: var(--q-color-primary);
  cursor: inherit;
}

/* — 按钮形态 — */
.q-radio-group--button {
  gap: 0;
}

.q-radio-group--button .q-radio-group__item {
  position: relative;
  justify-content: center;
  padding-inline: var(--q-space-4);
  border: 1px solid var(--q-color-border-light);
  border-inline-start-width: 0;
  transition:
    color var(--q-duration-fast) var(--q-easing-ease-in-out),
    background-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-radio-group--button .q-radio-group__item:first-child {
  border-inline-start-width: 1px;
  border-start-start-radius: var(--q-radius-md);
  border-end-start-radius: var(--q-radius-md);
}

.q-radio-group--button .q-radio-group__item:last-child {
  border-start-end-radius: var(--q-radius-md);
  border-end-end-radius: var(--q-radius-md);
}

.q-radio-group--button .q-radio-group__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* outline：选中态主色描边 + 主色文字 */
.q-radio-group--button.q-radio-group--outline
  .q-radio-group__item--checked:not(.q-radio-group__item--disabled) {
  position: relative;
  z-index: 1;
  color: var(--q-color-primary);
  border-color: var(--q-color-primary);
}

/* solid：选中态主色实心 */
.q-radio-group--button.q-radio-group--solid
  .q-radio-group__item--checked:not(.q-radio-group__item--disabled) {
  position: relative;
  z-index: 1;
  color: var(--q-color-white);
  background-color: var(--q-color-primary);
  border-color: var(--q-color-primary);
}

/* 尺寸 */
.q-radio-group--button.q-radio-group--small .q-radio-group__item {
  height: 1.75rem;
  font-size: var(--q-font-size-xs);
}

.q-radio-group--button.q-radio-group--middle .q-radio-group__item {
  height: 2rem;
  font-size: var(--q-font-size-sm);
}

.q-radio-group--button.q-radio-group--large .q-radio-group__item {
  height: 2.5rem;
  font-size: var(--q-font-size-base);
}
</style>
