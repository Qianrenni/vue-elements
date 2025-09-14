<template>
  <div
      ref="containerRef"
      :class="{ 'lazy-image-container--loaded': loaded }"
      :style="{ width: width, height: height }"
      class="lazy-image-container"
  >
    <!-- 骨架屏占位 -->
    <div v-if="!loaded" class="lazy-image-skeleton"></div>

    <!-- 加载失败提示 -->
    <div v-else-if="loadError" class="lazy-image-error">
      <span>加载失败</span>
    </div>
    <!-- 实际图片 -->
    <img
        v-if="shouldRenderImage"
        ref="imgRef"
        :alt="alt"
        :height="parseSize(height)"
        :src="src"
        :width="parseSize(width)"
        class="lazy-image"
        @error="handleImageError"
        @load="handleImageLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref, useTemplateRef} from 'vue'

// Props 定义
interface Props {
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  width: '100%',
  height: '100%',
})

// 解析 width/height 为带单位的字符串
const parseSize = (size: string | number): string => {
  return typeof size === 'number' ? `${size}px` : size
}

// 样式用的字符串
const width = computed(() => parseSize(props.width))
const height = computed(() => parseSize(props.height))

// 引用
const containerRef = useTemplateRef<HTMLElement>('containerRef')
const imgRef = useTemplateRef<HTMLImageElement>('imgRef')

// 状态
const loaded = ref(false)
const shouldRenderImage = ref(false) // 控制是否渲染 img 标签（懒加载）
const loadError = ref(false) // 新增：标记是否加载失败

// 事件处理
const handleImageLoad = () => {
  loaded.value = true
  loadError.value = false;
}

const handleImageError = () => {
  loaded.value = true;
  loadError.value = true;
  console.warn(`Image failed to load: ${props.src}`)
}

// IntersectionObserver 相关
let observer: IntersectionObserver | null = null

const loadImage = () => {
  shouldRenderImage.value = true
}

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  // 创建 IntersectionObserver
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage()
        observer?.unobserve(container)
      }
    })
  })

  observer.observe(container)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: var(--card-bg);
}

.lazy-image-container--loaded {
  background-color: transparent;
}

/* 骨架屏样式 */
.lazy-image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

/* 加载失败提示 */
.lazy-image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--card-bg);
  font-size: 0.8rem;
  text-align: center;
  border: 1px dashed var(--border-color);
}

/* 图片样式 */
.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image-container--loaded .lazy-image {
  opacity: 1;
}
</style>