<!--
 * @component QAvatar
 * @description 头像组件，支持懒加载和骨架屏占位
 -->
<template>
  <div
    ref="containerRef"
    :class="{ 'avatar-container--loaded': loaded }"
    :style="{ width: size, height: size }"
    class="avatar-container"
  >
    <!-- 骨架屏占位 -->
    <div v-if="!loaded" class="avatar-skeleton" />

    <!-- 加载失败提示 -->
    <div v-else-if="loadError" class="avatar-error">
      <span>!</span>
    </div>

    <!-- 实际图片 -->
    <img
      v-if="shouldRenderImage"
      ref="imgRef"
      :alt="alt"
      :src="url"
      class="avatar"
      @error="handleImageError"
      @load="handleImageLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAvatarLazy } from './composable';
import type { AvatarProps } from './type';

defineOptions({ name: 'QAvatar' });

const props = withDefaults(defineProps<AvatarProps>(), {
  size: '2rem',
  alt: '人像',
});

const {
  size,
  loaded,
  shouldRenderImage,
  loadError,
  containerRef,
  imgRef,
  handleImageLoad,
  handleImageError,
} = useAvatarLazy(props);
</script>

<style scoped>
.avatar-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background-color: var(--card-bg);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.avatar-container--loaded {
  background-color: transparent;
}

/* 骨架屏样式 */
.avatar-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

/* 加载失败提示 */
.avatar-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--card-bg);
  font-size: 0.8rem;
  text-align: center;
  border: 1px dashed var(--border-color);
  color: var(--text-color-secondary);
}

/* 图片样式 */
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-container--loaded .avatar {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
