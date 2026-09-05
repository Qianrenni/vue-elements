<!--
 * @component QApp
 * @description App 包裹组件（对标 antd App）：为子树提供作用域上下文（QAppContext），把命令式通知渲染进本 App 根下以继承主题/变量；通过 useQApp() 消费。
 -->
<script lang="ts" setup>
import { useMessage } from '@/utils/business/useMessage';
import { createNotification } from '@/utils/business/useNotification';
import type { QNotificationScope } from '@/utils/business/useNotification';
import { onBeforeUnmount, ref } from 'vue';

import { provideQApp } from './composable';

defineOptions({ name: 'QApp' });

const rootEl = ref<HTMLElement | null>(null);

// 作用域通知：open 时把容器挂到本 App 根（保持 QConfigProvider CSS 变量 / 主题继承）
const notification: QNotificationScope = createNotification({
  host: () => rootEl.value ?? document.body,
});

provideQApp({
  message: useMessage,
  notification,
});

onBeforeUnmount(() => {
  notification.destroy();
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
