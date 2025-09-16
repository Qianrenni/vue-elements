<!-- Message.vue -->
<script lang="ts" setup>
import {MessageType} from "@/types";
import {onMounted, ref} from "vue";

defineOptions({
  name: 'Message',
})

defineProps<{
  message: string;
  type: MessageType,
  onClose?: () => void;
}>()

// 控制动画类
const isVisible = ref(true);

// 派发关闭事件（供父级调用）
const emit = defineEmits<{
  close: []
}>()

// 自动设置关闭（由外部控制 duration）
onMounted(() => {
  // 触发下一帧添加 enter 类（避免初始就动画）
  requestAnimationFrame(() => {
    // 可在这里加 enter 动画类（可选）
  })
})
</script>

<template>
  <div
      :class="[{
      'text-success': type === 'success',
      'text-danger': type === 'error',
      'text-warning': type === 'warning',
      'text-gray': type === 'info',
    }]"
      class="mouse-cursor message-container container-center container-align-center radius-half-rem padding-24rem shadow-black animate-slide-in"
      @click="onClose?.()"
  >
    <p>{{ message }}</p>
    <!-- 可加关闭按钮 -->
  </div>
</template>

<style scoped>
.message-container {
  position: relative;
  z-index: var(--z-index-level-3);
  min-height: 100px;
  min-width: 200px;
  max-width: 600px;
  /* 启用过渡 */
  transition: transform 0.3s ease, opacity 0.3s ease;
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
