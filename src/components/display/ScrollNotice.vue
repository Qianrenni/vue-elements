<template>
  <div
    ref="scrollRef"
    style="overflow: hidden;"
  >
    <div
      ref="noticeRef"
      class="scroll-text"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWindowResize } from '@/utils';
import { onBeforeUnmount, onMounted, watch, nextTick, useTemplateRef} from 'vue'

defineOptions({ name: 'ScrollNotice' })

const props = withDefaults(defineProps<{
  speed?: number  // 像素/帧
}>(), {
  speed: 1
})
const scrollRef = useTemplateRef('scrollRef')

const noticeRef = useTemplateRef('noticeRef')
let textWidth =  0;
let translateX = 0;
let animationFrameId: number | null = null
let  parentWidth = 0;
// 动画函数
const animate = () => {
  translateX -= props.speed
  
  // 当文本完全移出左侧时，重置到右侧起点
  if (translateX <= -textWidth) {
    translateX = parentWidth
  }
  
  // 直接更新 transform，不要用 nextTick
  if (noticeRef.value) {
    noticeRef.value.style.transform = `translateX(${translateX}px)`
  }
  
  animationFrameId = requestAnimationFrame(animate)
}

// 初始化/重启动画
const startAnimation = () => {
  // 清除旧动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  textWidth = noticeRef.value?.offsetWidth || 0;
  parentWidth = scrollRef.value?.offsetWidth || 0;
  // 重置初始位置：从容器右侧外部开始
  translateX = parentWidth;
  // 启动新动画（确保尺寸更新后再开始）
  nextTick(() => {
    animationFrameId = requestAnimationFrame(animate)
  })
}

onMounted(() => {
  startAnimation();
  useWindowResize.addHandler(startAnimation);
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  };
  useWindowResize.removeHandler(startAnimation);
})

// 文本或宽度变化时重启动画
watch(
  () => [props.speed] as const,
  () => {
    startAnimation()
  }
)
</script>

<style scoped>


</style>