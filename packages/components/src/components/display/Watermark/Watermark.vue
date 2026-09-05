<!--
 * @component QWatermark
 * @description 水印：在内容上层/下层叠加平铺的旋转文本水印（Canvas 绘制成图平铺，性能稳定），对齐 Ant Design Watermark 常用能力。
 -->
<template>
  <div class="q-watermark">
    <div class="q-watermark-content">
      <slot />
    </div>
    <div class="q-watermark-mask" :style="maskStyle" aria-hidden="true" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  type CSSProperties,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

import { rotatedBounds, useQWatermark } from './composable';
import type { QWatermarkProps } from './type';

defineOptions({ name: 'QWatermark' });

const props = withDefaults(defineProps<QWatermarkProps>(), {
  content: undefined,
  gap: () => [100, 100],
  offset: () => [0, 0],
  rotate: -22,
  font: () => ({}),
  zIndex: 1,
});

const { lines, gap, rotate, font } = useQWatermark(props);

const maskBg = ref('');
let canvas: HTMLCanvasElement | null = null;

/** 生成水印瓦片并导出 dataURL */
function draw() {
  if (typeof document === 'undefined') return;
  if (lines.value.length === 0) {
    maskBg.value = '';
    return;
  }
  const ctxFont = `${font.value.fontWeight} ${font.value.fontSize}px ${font.value.fontFamily}`;
  if (!canvas) canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 度量文本
  ctx.font = ctxFont;
  const lineHeight = font.value.fontSize * 1.3;
  let textWidth = 0;
  for (const line of lines.value) {
    textWidth = Math.max(textWidth, ctx.measureText(line).width);
  }
  const textHeight = lines.value.length * lineHeight;
  // 旋转后外接矩形，再叠加间距作为瓦片尺寸
  const bound = rotatedBounds(textWidth, textHeight, rotate.value);
  const tileW = Math.ceil(bound.width + gap.value[0]);
  const tileH = Math.ceil(bound.height + gap.value[1]);
  const scale = Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = Math.ceil(tileW * scale);
  canvas.height = Math.ceil(tileH * scale);
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, tileW, tileH);
  ctx.font = ctxFont;
  ctx.fillStyle = font.value.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.translate(tileW / 2, tileH / 2);
  ctx.rotate((rotate.value * Math.PI) / 180);
  const blockTop = -textHeight / 2;
  lines.value.forEach((line, index) => {
    ctx.fillText(line, 0, blockTop + index * lineHeight + lineHeight / 2);
  });
  maskBg.value = canvas.toDataURL();
}

const maskStyle = computed<CSSProperties>(() => ({
  backgroundImage: maskBg.value ? `url(${maskBg.value})` : undefined,
  backgroundPosition: `${props.offset?.[0] ?? 0}px ${props.offset?.[1] ?? 0}px`,
  zIndex: props.zIndex,
}));

onMounted(draw);
watch(
  () => [props.content, props.gap, props.offset, props.rotate, props.font],
  draw,
  { deep: true },
);

onBeforeUnmount(() => {
  canvas = null;
});
</script>

<style scoped>
.q-watermark {
  position: relative;
  box-sizing: border-box;
}
.q-watermark-content {
  position: relative;
  z-index: 2;
}
.q-watermark-mask {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  pointer-events: none;
}
</style>
