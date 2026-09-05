<!--
 * @component QApp
 * @description App 包裹组件（对标 antd App）：为子树提供作用域上下文（QAppContext），把命令式 message / notification / modal 渲染进本 App 根下以继承主题/变量；通过 useQApp() 消费。
 -->
<script lang="ts" setup>
import { createNotification } from '@/utils/business/useNotification';
import type { QNotificationScope } from '@/utils/business/useNotification';
import { onBeforeUnmount, ref } from 'vue';

import { provideQApp } from './composable';
import { createMessageScope, type MessageScope } from './messageScope';
import { createModalScope, type QModalScope } from './modalScope';

defineOptions({ name: 'QApp' });

const rootEl = ref<HTMLElement | null>(null);

// 作用域通知：open 时把容器挂到本 App 根（保持 QConfigProvider CSS 变量 / 主题继承）
const notification: QNotificationScope = createNotification({
  host: () => rootEl.value ?? document.body,
});

// 作用域消息：同样挂到本 App 根，继承主题变量
const message: MessageScope = createMessageScope({
  host: () => rootEl.value ?? document.body,
});

// 作用域弹窗：命令式 QDialog
const modal: QModalScope = createModalScope();

provideQApp({
  message,
  notification,
  modal,
});

onBeforeUnmount(() => {
  message.destroy();
  notification.destroy();
  modal.destroy();
});
</script>

<template>
  <div ref="rootEl" class="q-app">
    <slot />
  </div>
</template>

<style scoped>
.q-app {
  position: relative;
}
</style>
