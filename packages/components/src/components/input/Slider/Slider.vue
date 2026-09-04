<!--
 * @component QSlider
 * @description 单值滑动条，支持步长、刻度标记、点击/拖动/键盘控制，对齐 Ant Design Slider（单值）。
 -->
<template>
  <div
    :class="[`q-slider--${props.size}`, { 'q-slider--disabled': isDisabled }]"
    class="q-slider"
  >
    <div
      ref="trackRef"
      class="q-slider-track"
      @mousedown="onTrackDown"
      @pointerdown="onTrackDown"
    >
      <div class="q-slider-rail" />
      <div class="q-slider-fill" :style="{ width: `${percent}%` }" />
      <div
        v-for="m in markList"
        :key="m.value"
        class="q-slider-mark-dot"
        :style="{
          left: `${toPercent(m.value, props.min ?? 0, props.max ?? 100)}%`,
        }"
      />
      <div
        :aria-valuemax="props.max ?? 100"
        :aria-valuemin="props.min ?? 0"
        :aria-valuenow="value"
        class="q-slider-handle"
        role="slider"
        :style="{ left: `${percent}%` }"
        :tabindex="isDisabled ? -1 : 0"
        @keydown="onKeydown"
      />
    </div>
    <div v-if="markList.length" class="q-slider-marks">
      <span
        v-for="m in markList"
        :key="m.value"
        class="q-slider-mark-label"
        :style="{
          left: `${toPercent(m.value, props.min ?? 0, props.max ?? 100)}%`,
        }"
      >
        {{ m.label }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { toPercent, useSlider } from './composable';
import type { SliderEmits, SliderProps } from './type';

defineOptions({ name: 'QSlider' });

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  size: 'middle',
});

const emit = defineEmits<SliderEmits>();

const trackRef = useTemplateRef<HTMLElement>('trackRef');

const { value, percent, markList, isDisabled, setFromClientX, onKeydown } =
  useSlider(props, emit);

/** 拖动：pointerdown/mousedown 后监听全局 move/up 实现拖拽 */
function onTrackDown(e: PointerEvent | MouseEvent) {
  if (isDisabled.value) return;
  const track = trackRef.value;
  if (!track) return;
  // 点击立即定位
  setFromClientX(e.clientX, track, false);

  const isPointer = e.type === 'pointerdown';
  const moveEvent = isPointer ? 'pointermove' : 'mousemove';
  const upEvent = isPointer ? 'pointerup' : 'mouseup';

  const handleMove = (ev: PointerEvent | MouseEvent) => {
    setFromClientX(ev.clientX, track, false);
  };
  const handleUp = (ev: PointerEvent | MouseEvent) => {
    setFromClientX(ev.clientX, track, true);
    window.removeEventListener(moveEvent, handleMove);
    window.removeEventListener(upEvent, handleUp);
  };
  window.addEventListener(moveEvent, handleMove);
  window.addEventListener(upEvent, handleUp);
}
</script>

<style scoped>
.q-slider {
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  padding: var(--q-space-2) 0;
  user-select: none;
}

.q-slider-track {
  position: relative;
  height: 20px;
  cursor: pointer;
}

.q-slider-rail,
.q-slider-fill {
  position: absolute;
  top: 50%;
  height: 4px;
  transform: translateY(-50%);
  border-radius: var(--q-radius-full);
}

.q-slider-rail {
  left: 0;
  right: 0;
  background: var(--q-color-bg-secondary);
}

.q-slider-fill {
  left: 0;
  background: var(--q-color-primary);
}

.q-slider-handle {
  position: absolute;
  top: 50%;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  background: var(--q-color-bg-card);
  border: 2px solid var(--q-color-primary);
  border-radius: var(--q-radius-full);
  transform: translate(-0%, -50%);
  transition: var(--q-transition-border);
  outline: none;
}

.q-slider-handle:hover,
.q-slider-handle:focus-visible {
  border-color: var(--q-color-primary-hover);
  box-shadow: 0 0 0 4px var(--q-color-primary-lighter);
}

/* 刻度点 */
.q-slider-mark-dot {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  background: var(--q-color-bg-card);
  border: 2px solid var(--q-color-bg-secondary);
  border-radius: var(--q-radius-full);
  transform: translateY(-50%);
}

.q-slider-marks {
  position: relative;
  height: 20px;
  margin-top: var(--q-space-2);
}

.q-slider-mark-label {
  position: absolute;
  transform: translateX(-50%);
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-xs);
  white-space: nowrap;
}

/* 禁用 */
.q-slider--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.q-slider--disabled .q-slider-track {
  cursor: not-allowed;
}
.q-slider--disabled .q-slider-fill,
.q-slider--disabled .q-slider-handle {
  background: var(--q-color-bg-secondary);
  border-color: var(--q-color-border);
}
</style>
