<!--
 * @component QAlert
 * @description 警告提示：success / info / warning / error 四种语义，支持描述、图标、可关闭与 banner 通栏，对齐 Ant Design Alert 常用能力。
 -->
<template>
  <Transition name="q-alert">
    <div
      v-if="!closed"
      class="q-alert"
      :class="[
        `q-alert--${type}`,
        { 'q-alert--banner': banner, 'q-alert--no-icon': !showIcon },
      ]"
      role="alert"
    >
      <span v-if="showIcon" class="q-alert-icon" aria-hidden="true">
        <slot name="icon">{{ glyph }}</slot>
      </span>

      <div class="q-alert-body">
        <template v-if="hasDescription">
          <div class="q-alert-message">
            <slot name="message">{{ message }}</slot>
          </div>
          <div class="q-alert-description">
            <slot name="description">{{ description }}</slot>
          </div>
        </template>
        <template v-else>
          <div class="q-alert-message q-alert-message--single">
            <slot name="message">{{ message }}</slot>
          </div>
        </template>
      </div>

      <div v-if="$slots.action" class="q-alert-action">
        <slot name="action" />
      </div>

      <button
        v-if="closable"
        class="q-alert-close"
        type="button"
        :aria-label="'关闭'"
        @click="close"
      >
        <slot name="closeText">{{ closeText || '×' }}</slot>
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useQAlert } from './composable';
import type { QAlertEmits, QAlertProps } from './type';

defineOptions({ name: 'QAlert' });

const props = withDefaults(defineProps<QAlertProps>(), {
  type: 'info',
  message: '',
  description: '',
  closable: false,
  closeText: '',
  showIcon: true,
  banner: false,
});

const emit = defineEmits<QAlertEmits>();

const { type, glyph, hasDescription } = useQAlert(props);

/** 是否已关闭 */
const closed = ref(false);

function close() {
  if (closed.value) return;
  closed.value = true;
  emit('close');
}
</script>

<style scoped>
.q-alert {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--q-space-2, 8px);
  padding: var(--q-space-2, 8px) var(--q-space-3, 12px);
  border-radius: var(--q-radius-sm, 6px);
  border: 1px solid transparent;
  font-size: var(--q-font-size-sm, 14px);
  line-height: 1.5;
  box-sizing: border-box;
}
.q-alert-icon {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-weight: var(--q-font-weight-semibold, 600);
  font-style: normal;
  user-select: none;
}
.q-alert-body {
  flex: 1;
  min-width: 0;
}
.q-alert-message {
  font-weight: var(--q-font-weight-semibold, 600);
}
.q-alert-message--single {
  font-weight: var(--q-font-weight-normal, 400);
}
.q-alert-description {
  margin-top: var(--q-space-1, 4px);
  opacity: 0.9;
}
.q-alert-action {
  flex: none;
  align-self: center;
}
.q-alert-close {
  flex: none;
  align-self: flex-start;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}
.q-alert-close:hover {
  opacity: 1;
}

/* 类型配色（稳定调色板，暗色友好） */
.q-alert--success {
  background: var(--q-color-green-50);
  border-color: var(--q-color-green-100);
  color: var(--q-color-green-700);
}
.q-alert--success .q-alert-icon {
  background: var(--q-color-green-400);
}
.q-alert--info {
  background: var(--q-color-blue-50);
  border-color: var(--q-color-blue-100);
  color: var(--q-color-blue-700);
}
.q-alert--info .q-alert-icon {
  background: var(--q-color-blue-400);
}
.q-alert--warning {
  background: var(--q-color-orange-50);
  border-color: var(--q-color-orange-100);
  color: var(--q-color-orange-600);
}
.q-alert--warning .q-alert-icon {
  background: var(--q-color-orange-300);
}
.q-alert--error {
  background: var(--q-color-red-50);
  border-color: var(--q-color-red-100);
  color: var(--q-color-red-600);
}
.q-alert--error .q-alert-icon {
  background: var(--q-color-red-400);
}
.q-alert--no-icon .q-alert-body {
  padding-left: 2px;
}

/* banner 通栏：无圆角、更紧凑 */
.q-alert--banner {
  border-radius: 0;
  border-left: none;
  border-right: none;
}
</style>
