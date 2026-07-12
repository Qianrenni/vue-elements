<template>
  <div
    ref="containerRef"
    class="swiper-action"
    @touchstart="onStart"
    @touchmove="onMove"
    @touchend="onEnd"
    @mousedown="onStart"
    @mousemove="onMouseMove"
    @mouseup="onEnd"
    @mouseleave="onEnd"
  >
    <!-- 单层滑动容器 -->
    <div
      ref="innerRef"
      class="swiper-action__inner"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <!-- 主内容 -->
      <div class="swiper-action__content">
        <slot />
      </div>

      <!-- 右侧操作区（始终存在） -->
      <div class="swiper-action__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import type { SwiperActionProps, SwiperActionEmits } from './type';
import { useSwiperAction } from './composable';

defineOptions({
  name: 'QSwiperAction',
});

const props = withDefaults(defineProps<SwiperActionProps>(), {
  disabled: false,
  threshold: 50,
});

const emit = defineEmits<SwiperActionEmits>();

const containerRef = useTemplateRef('containerRef');
const innerRef = useTemplateRef('innerRef');

const { translateX, onStart, onMove, onMouseMove, onEnd } = useSwiperAction(
  props,
  emit,
  innerRef,
);
</script>

<style scoped>
.swiper-action {
  overflow: hidden;
  position: relative;
  user-select: none;
}

.swiper-action__inner {
  display: flex;
  transition: transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  will-change: transform;
  min-width: 100%;
}

.swiper-action__content {
  flex-shrink: 0;
  width: 100%;
}

.swiper-action__action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
