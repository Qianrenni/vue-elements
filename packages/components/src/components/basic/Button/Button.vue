<!--
 * @component QButton
 * @description 通用按钮组件，对齐 Ant Design token 模式，支持 primary/default/dashed/text/link 语义类型、level1~6 大小档位、danger、ghost、block、loading 与 href 链接形态。
 -->
<template>
  <component
    :is="tag"
    :aria-busy="props.loading || undefined"
    :class="buttonClass"
    class="q-btn"
    v-bind="rootAttrs"
    @click="handleClick"
  >
    <span v-if="props.loading" aria-hidden="true" class="q-btn-spinner" />
    <span v-else-if="$slots.icon" aria-hidden="true" class="q-btn-icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="q-btn-text"><slot /></span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useQButton } from './composable';
import type { QButtonEmits, QButtonProps } from './type';

defineOptions({ name: 'QButton' });

const props = withDefaults(defineProps<QButtonProps>(), {
  type: 'default',
  size: 'middle',
  htmlType: 'button',
  disabled: false,
  loading: false,
  danger: false,
  ghost: false,
  block: false,
  autofocus: false,
});

const emit = defineEmits<QButtonEmits>();

const { buttonClass, tag, isDisabled } = useQButton(props);

/** 根元素原生属性：button 与 a 形态分别绑定对应属性 */
const rootAttrs = computed(() => {
  if (tag.value === 'button') {
    return {
      type: props.htmlType,
      autofocus: props.autofocus || undefined,
      disabled: isDisabled.value || undefined,
    };
  }
  return {
    href: props.href,
    target: props.target,
    'aria-disabled': isDisabled.value || undefined,
    tabindex: isDisabled.value ? -1 : undefined,
  };
});

/** 点击处理：disabled/loading 时阻止默认行为与冒泡 */
function handleClick(ev: MouseEvent) {
  if (isDisabled.value) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    return;
  }
  emit('click', ev);
}
</script>

<style scoped>
.q-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: var(--q-space-2);
  margin: 0;
  border: 1px solid transparent;
  border-radius: var(--q-radius-md);
  font-family: var(--q-font-family-base);
  font-weight: var(--q-font-weight-normal);
  line-height: var(--q-line-height-normal);
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition:
    background-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    border-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    color var(--q-duration-fast) var(--q-easing-ease-in-out),
    opacity var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-btn:focus-visible {
  outline: 2px solid var(--q-color-primary);
  outline-offset: 2px;
}

/* — level1~level6（默认 level3） — */
.q-btn--level-1 {
  height: 1.5rem;
  padding-inline: 0.625rem;
  font-size: var(--q-font-size-xs);
}

.q-btn--level-2 {
  height: 1.75rem;
  padding-inline: 0.75rem;
  font-size: 0.8125rem;
}

.q-btn--level-3 {
  height: 2rem;
  padding-inline: 0.875rem;
  font-size: var(--q-font-size-sm);
}

.q-btn--level-4 {
  height: 2.25rem;
  padding-inline: 1rem;
  font-size: 0.9375rem;
}

.q-btn--level-5 {
  height: 2.5rem;
  padding-inline: 1.25rem;
  font-size: var(--q-font-size-base);
}

.q-btn--level-6 {
  height: 3rem;
  padding-inline: 1.5rem;
  font-size: 1.125rem;
}

/* — 语义类型：primary（实心主按钮） — */
.q-btn--primary {
  border-color: transparent;
  background-color: var(--q-color-button-bg);
  color: var(--q-color-button-text);
}

.q-btn--primary:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-button-hover);
}

.q-btn--primary:active:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-primary-active);
}

/* — 语义类型：default — */
.q-btn--default {
  border-color: var(--q-color-border-light);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
}

.q-btn--default:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}

.q-btn--default:active:not(.q-btn--disabled):not(.q-btn--loading) {
  border-color: var(--q-color-primary-active);
  color: var(--q-color-primary-active);
}

/* — 语义类型：dashed — */
.q-btn--dashed {
  border-style: dashed;
  border-color: var(--q-color-border-light);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
}

.q-btn--dashed:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}

/* — 语义类型：text — */
.q-btn--text {
  border-color: transparent;
  background-color: transparent;
  color: var(--q-color-text);
}

.q-btn--text:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-bg-secondary);
}

/* — 语义类型：link — */
.q-btn--link {
  border-color: transparent;
  background-color: transparent;
  color: var(--q-color-primary);
}

.q-btn--link:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  color: var(--q-color-primary-hover);
}

/* — danger — */
.q-btn--danger.q-btn--primary {
  border-color: transparent;
  background-color: var(--q-color-red-400);
  color: var(--q-color-white);
}

.q-btn--danger.q-btn--primary:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-red-500);
}

.q-btn--danger.q-btn--primary:active:not(.q-btn--disabled):not(
    .q-btn--loading
  ) {
  background-color: var(--q-color-red-600);
}

.q-btn--danger.q-btn--default,
.q-btn--danger.q-btn--dashed {
  border-color: var(--q-color-red-300);
  color: var(--q-color-red-400);
}

.q-btn--danger.q-btn--default:hover:not(.q-btn--disabled):not(.q-btn--loading),
.q-btn--danger.q-btn--dashed:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  border-color: var(--q-color-red-400);
  background-color: var(--q-color-red-50);
  color: var(--q-color-red-400);
}

.q-btn--danger.q-btn--text {
  color: var(--q-color-red-400);
}

.q-btn--danger.q-btn--text:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-red-50);
}

.q-btn--danger.q-btn--link {
  color: var(--q-color-red-400);
}

/* — ghost（透明背景 + 描边/文字） — */
.q-btn--ghost.q-btn--primary {
  background-color: transparent;
  color: var(--q-color-primary);
  border-color: var(--q-color-primary);
}

.q-btn--ghost.q-btn--primary:hover:not(.q-btn--disabled):not(.q-btn--loading) {
  background-color: var(--q-color-primary);
  color: var(--q-color-white);
}

.q-btn--ghost.q-btn--danger.q-btn--primary {
  background-color: transparent;
  color: var(--q-color-red-400);
  border-color: var(--q-color-red-400);
}

.q-btn--ghost.q-btn--danger.q-btn--primary:hover:not(.q-btn--disabled):not(
    .q-btn--loading
  ) {
  background-color: var(--q-color-red-400);
  color: var(--q-color-white);
}

/* — block — */
.q-btn--block {
  display: flex;
  width: 100%;
}

/* — 禁用 & 加载 — */
.q-btn--disabled {
  cursor: not-allowed;
  opacity: 0.65;
  pointer-events: none;
}

.q-btn--loading {
  cursor: default;
  pointer-events: none;
}

.q-btn-icon,
.q-btn-spinner {
  display: inline-flex;
  align-items: center;
}

.q-btn-text:not(:empty) {
  display: inline-flex;
  align-items: center;
}

.q-btn-spinner {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--q-radius-full);
  animation: q-btn-spin var(--q-duration-slow) linear infinite;
}

@keyframes q-btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
