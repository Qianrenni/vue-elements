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
        <slot></slot>
      </div>

      <!-- 右侧操作区（始终存在） -->
      <div class="swiper-action__action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
defineOptions({
  name: 'SwiperAction'
});
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    threshold?: number
  }>(),
  {
    disabled: false,
    threshold: 50
  }
)

const emit = defineEmits<{
  (e: 'swipe'): void
  (e: 'update:open', open: boolean): void
}>()

// refs
const containerRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)

// 状态
const translateX = ref(0)
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const isTouchDevice = ref(false)
const actionWidth = ref(0)

// 自动获取右侧操作区宽度
onMounted(async () => {
  await nextTick()
  if (innerRef.value?.children?.[1]) {
    actionWidth.value = innerRef.value.children[1].clientWidth || 0
  }
})

// 事件处理
const onStart = (e: TouchEvent | MouseEvent) => {
  if (props.disabled) return
  isTouchDevice.value = e.type.startsWith('touch')
  const clientX = isTouchDevice.value
    ? (e as TouchEvent).touches[0].clientX
    : (e as MouseEvent).clientX
  startX.value = clientX
  currentX.value = translateX.value
  isDragging.value = true
}

const onMove = (e: TouchEvent) => {
  if (!isDragging.value || props.disabled) return
  const clientX = e.touches[0].clientX
  const diff = clientX - startX.value
  let newTranslate = currentX.value + diff

  // 限制：不能右滑（>0），不能左滑超过 action 宽度
  if (newTranslate > 0) newTranslate = 0
  if (newTranslate < -actionWidth.value) newTranslate = -actionWidth.value

  translateX.value = newTranslate
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || props.disabled || isTouchDevice.value) return
  const clientX = e.clientX
  const diff = clientX - startX.value
  let newTranslate = currentX.value + diff

  if (newTranslate > 0) newTranslate = 0
  if (newTranslate < -actionWidth.value) newTranslate = -actionWidth.value

  translateX.value = newTranslate
}

const onEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false

  if (actionWidth.value <= 0) {
    translateX.value = 0
    return
  }

  if (Math.abs(translateX.value) >= props.threshold) {
    // 完全展开
    translateX.value = -actionWidth.value
    emit('swipe')
    emit('update:open', true)
  } else {
    // 回弹关闭
    translateX.value = 0
    emit('update:open', false)
  }
}
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