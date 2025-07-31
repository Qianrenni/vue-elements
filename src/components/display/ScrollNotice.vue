<template>
  <div :style="{'width': `${props.width}px`}"
       class="container-flex-end "
       style="overflow: hidden;"
  >
    <div
        ref="noticeRef"
        :style="{ transform: `translateX(${translateX}px)`}"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref, useTemplateRef, watch} from 'vue'

defineOptions({
  name: 'ScrollNotice'
})
const props = defineProps<{
  width: number
  text: string
}>();

const noticeRef = useTemplateRef('noticeRef')
const textWidth = ref(0)
const translateX = ref(0)
let animationFrameId: number | null = null
let speed = 1 // 滚动速度，可以根据需要调整
// 获取元素尺寸
const updateDimensions = () => {
  if (noticeRef.value) {
    textWidth.value = (noticeRef.value as HTMLElement).offsetWidth;
  }
}

// 动画函数
const animate = () => {
  translateX.value -= speed;
  // 如果文本完全移出左侧，则重置到右侧
  if (translateX.value <= -props.width) {
    translateX.value = textWidth.value;
  }

  animationFrameId = requestAnimationFrame(animate)
}

// 初始化动画
const startAnimation = () => {
  updateDimensions()
  cancelAnimationFrame(animationFrameId!)
  animationFrameId = requestAnimationFrame(animate)
}

// 监听窗口大小变化以适配
const handleResize = () => {
  updateDimensions()
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', handleResize)
  startAnimation()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// 当 text 改变时，重新计算宽度
watch(
    () => props.text,
    () => {
      setTimeout(() => {
        updateDimensions()
      }, 10)
    }
)
</script>

<style scoped>
</style>
