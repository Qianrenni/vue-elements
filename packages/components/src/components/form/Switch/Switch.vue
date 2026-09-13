<!--
 * @component QSwitch
 * @description 开关，对齐 Ant Design Switch：v-model:value 双向绑定、支持加载中与内外文字
 -->
<template>
  <button
    class="q-switch"
    :class="[
      `q-switch--${size}`,
      {
        'q-switch--checked': checked,
        'q-switch--disabled': isDisabled,
        'q-switch--loading': loading,
      },
    ]"
    :aria-checked="checked"
    :autofocus="autofocus || undefined"
    :disabled="isDisabled"
    role="switch"
    type="button"
    @click="onToggle"
  >
    <span v-if="loading" aria-hidden="true" class="q-switch__loading" />
    <span v-else-if="hasText" class="q-switch__text">
      {{ checked ? checkedChildren : unCheckedChildren }}
    </span>
    <span aria-hidden="true" class="q-switch__handle" />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useSwitch } from './composable';
import type { QSwitchEmits, QSwitchProps } from './type';

defineOptions({ name: 'QSwitch' });

const props = withDefaults(defineProps<QSwitchProps>(), {
  value: false,
  disabled: false,
  loading: false,
  size: 'default',
  checkedChildren: undefined,
  unCheckedChildren: undefined,
  autofocus: false,
});

const emit = defineEmits<QSwitchEmits>();

const { checked, isDisabled } = useSwitch(props);

/** 是否存在内外文字（有文字时展示文案，否则纯滑块） */
const hasText = computed(
  () => !!props.checkedChildren || !!props.unCheckedChildren,
);

/** 切换开关：不可交互时忽略 */
function onToggle() {
  if (isDisabled.value) return;
  const next = !checked.value;
  emit('update:value', next);
  emit('change', next);
}
</script>

<style scoped>
.q-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 2.75rem;
  height: 1.375rem;
  padding: 0 0.375rem;
  border: none;
  border-radius: 999px;
  background-color: var(--q-color-gray-400);
  color: var(--q-color-white);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-xs);
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    opacity var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-switch--small {
  min-width: 1.75rem;
  height: 1rem;
  padding: 0 0.25rem;
}

.q-switch--checked {
  background-color: var(--q-color-primary);
}

.q-switch--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.q-switch__text {
  position: relative;
  z-index: 1;
  padding-inline: 0.25rem;
  white-space: nowrap;
}

.q-switch__handle {
  position: absolute;
  inset-inline-start: 0.125rem;
  top: 50%;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background-color: var(--q-color-white);
  box-shadow: 0 1px 2px var(--q-color-shadow);
  transform: translateY(-50%);
  transition: inset-inline-start var(--q-duration-fast)
    var(--q-easing-ease-in-out);
}

.q-switch--small .q-switch__handle {
  width: 0.75rem;
  height: 0.75rem;
}

.q-switch--checked .q-switch__handle {
  inset-inline-start: calc(100% - 1.25rem);
}

.q-switch--small.q-switch--checked .q-switch__handle {
  inset-inline-start: calc(100% - 0.875rem);
}

.q-switch--checked .q-switch__text {
  margin-inline-end: 0.5rem;
}

.q-switch__loading {
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: q-switch-spin 0.8s linear infinite;
}

@keyframes q-switch-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
