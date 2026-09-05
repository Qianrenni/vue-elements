<!--
 * @component QImage
 * @description 图片组件：可点击全屏预览（缩放/旋转/还原/关闭），支持适配模式与加载失败容错，对齐 Ant Design Image 常用能力。
 -->
<template>
  <div class="q-image" :style="wrapStyle">
    <img
      v-if="currentSrc"
      ref="thumbRef"
      :alt="alt"
      :class="['q-image-img', { 'q-image-img--error': errored && !fallback }]"
      :height="heightStyle"
      :src="currentSrc"
      :style="imgStyle"
      :width="widthStyle"
      @error="onThumbError"
      @load="onThumbLoad"
    />
    <div v-else class="q-image-placeholder" />

    <div
      v-if="previewable && !errored && currentSrc"
      class="q-image-mask"
      role="button"
      :aria-label="'预览图片'"
      tabindex="0"
      @click="openPreview"
      @keydown.enter.prevent="openPreview"
      @keydown.space.prevent="openPreview"
    >
      <span class="q-image-mask-icon" aria-hidden="true" />
      <span class="q-image-mask-text">预览</span>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="visible"
      class="q-image-preview"
      role="dialog"
      aria-modal="true"
      :aria-label="'图片预览'"
      @wheel.prevent="onPreviewWheel"
    >
      <div class="q-image-preview-mask" @click="closePreview" />
      <div class="q-image-preview-body">
        <img
          :alt="alt"
          :src="previewSrc"
          class="q-image-preview-img"
          :style="previewImgStyle"
          @click.stop
        />
      </div>
      <div class="q-image-preview-info">
        {{ scaleText }}
      </div>
      <div class="q-image-preview-toolbar">
        <button
          :aria-label="'缩小'"
          class="q-image-preview-btn"
          title="缩小"
          type="button"
          @click="onZoom(-1)"
        >
          <span class="q-image-preview-op q-image-preview-op--minus" />
        </button>
        <button
          :aria-label="'放大'"
          class="q-image-preview-btn"
          title="放大"
          type="button"
          @click="onZoom(1)"
        >
          <span class="q-image-preview-op q-image-preview-op--plus" />
        </button>
        <button
          :aria-label="'还原'"
          class="q-image-preview-btn"
          title="还原"
          type="button"
          @click="resetTransform"
        >
          <span class="q-image-preview-op q-image-preview-op--reset" />
        </button>
        <button
          :aria-label="'向左旋转'"
          class="q-image-preview-btn"
          title="向左旋转"
          type="button"
          @click="rotate(-1)"
        >
          <span class="q-image-preview-op q-image-preview-op--rotate-l" />
        </button>
        <button
          :aria-label="'向右旋转'"
          class="q-image-preview-btn"
          title="向右旋转"
          type="button"
          @click="rotate(1)"
        >
          <span class="q-image-preview-op q-image-preview-op--rotate-r" />
        </button>
        <button
          :aria-label="'关闭预览'"
          class="q-image-preview-btn"
          title="关闭"
          type="button"
          @click="closePreview"
        >
          <span class="q-image-preview-op q-image-preview-op--close" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties, onBeforeUnmount, ref, watch } from 'vue';

import { turnAngle, useQImage, zoomAt } from './composable';
import type { QImageEmits, QImageProps } from './type';

defineOptions({ name: 'QImage' });

const props = withDefaults(defineProps<QImageProps>(), {
  src: '',
  alt: '',
  fit: 'fill',
  preview: true,
  fallback: '',
  previewSrc: undefined,
  previewOpen: undefined,
  imageStyle: undefined,
  width: undefined,
  height: undefined,
});

const emit = defineEmits<QImageEmits>();

const {
  widthStyle,
  heightStyle,
  previewable,
  previewSrc,
  openControlled,
  fit,
} = useQImage(props);

const wrapStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (widthStyle.value) style.width = widthStyle.value;
  if (heightStyle.value) style.height = heightStyle.value;
  return style;
});

/** 缩略图 img 样式（适配方式 + 用户覆盖） */
const imgStyle = computed<CSSProperties>(() => ({
  objectFit: fit.value as CSSProperties['objectFit'],
  ...(props.imageStyle ?? {}),
}));

/** 当前展示地址（fallback 时替换） */
const currentSrc = ref(props.src || '');
const loaded = ref(false);
const errored = ref(false);

watch(
  () => props.src,
  (val) => {
    currentSrc.value = val || '';
    loaded.value = false;
    errored.value = false;
  },
);

/** 是否有回退地址可用 */
const fallback = computed(() => props.fallback);

function onThumbLoad() {
  loaded.value = true;
  errored.value = false;
}

function onThumbError(event: Event) {
  if (fallback.value && currentSrc.value !== fallback.value) {
    currentSrc.value = fallback.value;
    return;
  }
  errored.value = true;
  emit('error', event);
}

// ---------- 预览 ----------
const internalOpen = ref(false);
const scale = ref(1);
const rotateDeg = ref(0);

/** 是否展示预览 */
const visible = computed(() =>
  openControlled.value ? props.previewOpen === true : internalOpen.value,
);

/** 预览图 transform */
const previewImgStyle = computed(() => ({
  transform: `rotate(${rotateDeg.value}deg) scale(${scale.value})`,
}));

const scaleText = computed(() => `${Math.round(scale.value * 100)}%`);

function setOpen(open: boolean) {
  internalOpen.value = open;
  emit('update:previewOpen', open);
  emit('preview-change', open);
}

function openPreview() {
  if (!previewable.value) return;
  resetTransform();
  setOpen(true);
}

function closePreview() {
  setOpen(false);
}

function resetTransform() {
  scale.value = 1;
  rotateDeg.value = 0;
}

function onZoom(direction: 1 | -1) {
  scale.value = zoomAt(scale.value, direction);
}

function rotate(direction: 1 | -1) {
  rotateDeg.value = turnAngle(rotateDeg.value, direction);
}

function onPreviewWheel(event: WheelEvent) {
  const delta = event.deltaY < 0 ? 1 : -1;
  onZoom(delta as 1 | -1);
}

// 打开预览：锁定滚动、监听 Esc、重置变换
watch(
  () => visible.value,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeydown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
    }
  },
);

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closePreview();
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.q-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 0;
  background-color: var(--q-color-gray-100, #f1f1f1);
  border-radius: var(--q-radius-sm, 4px);
}
.q-image-img {
  width: 100%;
  height: 100%;
  display: block;
}
.q-image-placeholder {
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;
}

/* 悬浮遮罩（预览入口） */
.q-image-mask {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.45);
  opacity: 0;
  cursor: zoom-in;
  transition: opacity 0.2s ease;
}
.q-image:hover .q-image-mask,
.q-image-mask:focus-visible {
  opacity: 1;
}
.q-image-mask-icon {
  position: relative;
  width: 26px;
  height: 26px;
  border: 2px solid currentColor;
  border-radius: 50%;
}
.q-image-mask-icon::after {
  content: '';
  position: absolute;
  right: -6px;
  bottom: -4px;
  width: 10px;
  height: 2px;
  background: currentColor;
  transform: rotate(45deg);
}
.q-image-mask-text {
  font-size: 12px;
  line-height: 1;
}

/* ---------- 预览浮层 ---------- */
.q-image-preview {
  position: fixed;
  inset: 0;
  z-index: 1100;
}
.q-image-preview-mask {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.72);
}
.q-image-preview-body {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
}
.q-image-preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.18s ease;
  user-select: none;
}
.q-image-preview-info {
  position: absolute;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 2px 10px;
}
.q-image-preview-toolbar {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 8px;
}
.q-image-preview-btn {
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  position: relative;
}
.q-image-preview-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

/* 简易操作图标（CSS 绘制） */
.q-image-preview-op {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.q-image-preview-op--plus,
.q-image-preview-op--minus {
  width: 14px;
  height: 2px;
  background: currentColor;
}
.q-image-preview-op--plus::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 14px;
  background: currentColor;
  transform: translate(-50%, -50%);
}
.q-image-preview-op--reset {
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-radius: 50%;
}
.q-image-preview-op--rotate-r,
.q-image-preview-op--rotate-l {
  width: 12px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
}
.q-image-preview-op--rotate-r::before,
.q-image-preview-op--rotate-l::before {
  content: '';
  position: absolute;
  right: -2px;
  top: -3px;
  border-style: solid;
  border-width: 3px;
}
.q-image-preview-op--rotate-r::before {
  border-color: currentColor transparent transparent currentColor;
}
.q-image-preview-op--rotate-l::before {
  left: -2px;
  right: auto;
  border-color: currentColor currentColor transparent transparent;
}
.q-image-preview-op--close {
  width: 16px;
  height: 2px;
  background: currentColor;
  transform: translate(-50%, -50%) rotate(45deg);
}
.q-image-preview-op--close::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 2px;
  background: currentColor;
  transform: rotate(90deg);
}
</style>
