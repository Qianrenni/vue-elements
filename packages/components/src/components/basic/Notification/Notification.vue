<!--
 * @component QNotification
 * @description 通知提醒卡片（单条）：由命令式 `useNotification` / `notification` 单例渲染进角标容器，或经 `QApp` 作用域注入；展示标题 + 描述 + 类型图标 + 关闭按钮。
 -->
<script lang="ts" setup>
import { computed } from 'vue';

import { useQNotificationItem } from './composable';
import type { QNotificationProps, QNotificationType } from './type';

defineOptions({ name: 'QNotification' });

const props = withDefaults(defineProps<QNotificationProps>(), {
  type: 'info',
  title: '',
  description: '',
  closable: true,
  showIcon: true,
  onClose: undefined,
});

const glyph = computed(
  () =>
    ({ success: '✓', info: 'i', warning: '!', error: '×' })[
      props.type as QNotificationType
    ],
);

const { typeClass } = useQNotificationItem(props);
</script>

<template>
  <div :class="['q-notification', typeClass]" role="alert">
    <button
      v-if="closable"
      class="q-notification-close"
      aria-label="关闭通知"
      type="button"
      @click="onClose?.()"
    >
      ×
    </button>
    <div class="q-notification-body">
      <span v-if="showIcon" class="q-notification-icon" aria-hidden="true">
        <slot name="icon">
          <span class="q-notification-glyph">{{ glyph }}</span>
        </slot>
      </span>
      <div class="q-notification-main">
        <div v-if="title || $slots.title" class="q-notification-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div
          v-if="description || $slots.description"
          class="q-notification-desc"
        >
          <slot name="description">{{ description }}</slot>
        </div>
        <div v-if="$slots.default" class="q-notification-actions">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-notification {
  position: relative;
  width: 320px;
  max-width: 100%;
  padding: var(--q-space-4, 16px);
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  box-shadow: var(--q-shadow-md, 0 6px 16px rgba(0, 0, 0, 0.12));
  box-sizing: border-box;
}
.q-notification--success {
  border-left: 3px solid var(--q-color-green-500, #52c41a);
}
.q-notification--info {
  border-left: 3px solid var(--q-color-blue-500, #1677ff);
}
.q-notification--warning {
  border-left: 3px solid var(--q-color-orange-400, #fa8c16);
}
.q-notification--error {
  border-left: 3px solid var(--q-color-red-500, #ff4d4f);
}
.q-notification-close {
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: transparent;
  color: var(--q-color-text-muted);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 4px;
}
.q-notification-close:hover {
  color: var(--q-color-text);
}
.q-notification-body {
  display: flex;
  gap: var(--q-space-3, 12px);
  align-items: flex-start;
}
.q-notification-icon {
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.q-notification--success .q-notification-icon {
  background: var(--q-color-green-500, #52c41a);
}
.q-notification--info .q-notification-icon {
  background: var(--q-color-blue-500, #1677ff);
}
.q-notification--warning .q-notification-icon {
  background: var(--q-color-orange-400, #fa8c16);
}
.q-notification--error .q-notification-icon {
  background: var(--q-color-red-500, #ff4d4f);
}
.q-notification-main {
  flex: 1;
  min-width: 0;
  padding-right: 12px;
}
.q-notification-title {
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
}
.q-notification-desc {
  margin-top: 6px;
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm, 14px);
  line-height: 1.6;
}
.q-notification-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
</style>

<!-- 容器 / 单条外层（命令式渲染全局使用，故不 scoped） -->
<style>
.q-notification-container {
  position: fixed;
  z-index: 2100;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
  box-sizing: border-box;
}
.q-notification-container .q-notification-notice {
  pointer-events: auto;
}
.q-notification-container[data-placement='top'] {
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.q-notification-container[data-placement='topLeft'] {
  top: 24px;
  left: 24px;
  align-items: flex-start;
}
.q-notification-container[data-placement='topRight'] {
  top: 24px;
  right: 24px;
  align-items: flex-end;
}
.q-notification-container[data-placement='bottom'] {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  flex-direction: column-reverse;
}
.q-notification-container[data-placement='bottomLeft'] {
  bottom: 24px;
  left: 24px;
  align-items: flex-start;
  flex-direction: column-reverse;
}
.q-notification-container[data-placement='bottomRight'] {
  bottom: 24px;
  right: 24px;
  align-items: flex-end;
  flex-direction: column-reverse;
}
.q-notification-notice {
  animation: q-notification-in 0.25s ease;
}
@keyframes q-notification-in {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
