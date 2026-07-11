<!--
 * @component QMessage
 * @description 消息提示组件，用于展示成功、错误、警告、信息等类型的消息
 -->
<script lang="ts" setup>
import { MessageProps } from './type';

defineOptions({
  name: 'QMessage',
});

defineProps<MessageProps>();
</script>

<template>
  <div
    :class="[
      {
        'text-success': type === 'success',
        'text-danger': type === 'error',
        'text-warning': type === 'warning',
        'text-gray': type === 'info',
      },
    ]"
    class="mouse-cursor message-container shadow-common animate-slide-in"
  >
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.message-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  z-index: var(--z-index-level-3);
  min-height: 100px;
  min-width: 200px;
  max-width: 600px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.message-close {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
}

/* 动画：从上滑入 */
.animate-slide-in {
  animation: slideInDown 0.3s ease forwards;
}

/* 动画：向上滑出 */
.animate-slide-out {
  animation: slideOutUp 0.3s ease forwards;
}

@keyframes slideInDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
}

@media screen and (max-width: 768px) {
  .message-container {
    max-width: 80vw;
    min-width: 150px;
    min-height: 80px;
    padding: 1rem;
  }
}
</style>
