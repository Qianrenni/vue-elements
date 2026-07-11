<!--
 * @component QLazyImage
 * @description 懒加载图片组件，支持骨架屏占位和 IntersectionObserver 懒加载
 -->
<template>
  <div
    ref="containerRef"
    :class="{ 'lazy-image-container--loaded': loaded }"
    :style="{ width: width, height: height }"
    class="lazy-image-container"
  >
    <!-- 骨架屏占位 -->
    <div v-if="!loaded" class="lazy-image-skeleton" />

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
import { useLazyImage } from './composable';
import type { LazyImageProps } from './type';

defineOptions({ name: 'QLazyImage' });

const props = withDefaults(defineProps<LazyImageProps>(), {
  alt: '',
  width: '100%',
  height: '100%',
});

const {
  width,
  height,
  loaded,
  shouldRenderImage,
  loadError,
  containerRef,
  imgRef,
  handleImageLoad,
  handleImageError,
} = useLazyImage(props);

const parseSize = (size: string | number): string => {
  return typeof size === 'number' ? `${size}px` : size;
};
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
