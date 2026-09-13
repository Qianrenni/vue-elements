<!--
 * @component QRangeSlider
 * @description 范围滑块，对齐 Ant Design Slider 的 range 模式：v-model:value 双向绑定、支持步进/刻度/提示
 -->
<template>
  <div
    class="q-range-slider"
    :class="{
      'q-range-slider--disabled': isDisabled,
      'q-range-slider--vertical': vertical,
    }"
  >
    <div class="q-range-slider__body">
      <div class="q-range-slider__rail">
        <span class="q-range-slider__track" />
        <span class="q-range-slider__range" :style="rangeStyle" />

        <!-- 两个原生滑块绝对定位重叠，仅滑块自身可交互 -->
        <input
          v-for="(item, index) in range"
          :key="`input-${index}`"
          class="q-range-slider__input"
          type="range"
          :aria-label="index === 0 ? '最小值' : '最大值'"
          :disabled="isDisabled"
          :max="max"
          :min="min"
          :step="step"
          :style="{ zIndex: inputZIndex(index) }"
          :value="item"
          @change="onAfterChange(index, $event)"
          @input="onInput(index, $event)"
        />

        <template v-if="tooltip">
          <span
            v-for="(item, index) in range"
            :key="`tooltip-${index}`"
            class="q-range-slider__tooltip"
            :style="{ insetInlineStart: `${percent[index]}%` }"
          >
            {{ item }}
          </span>
        </template>
      </div>

      <!-- 刻度 -->
      <div v-if="markList.length" class="q-range-slider__marks">
        <span
          v-for="mark in markList"
          :key="mark.value"
          class="q-range-slider__mark"
          :style="{ insetInlineStart: `${mark.percent}%` }"
        >
          {{ mark.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useRangeSlider } from './composable';
import type {
  QRangeSliderEmits,
  QRangeSliderProps,
  RangeSliderValue,
} from './type';

defineOptions({ name: 'QRangeSlider' });

const props = withDefaults(defineProps<QRangeSliderProps>(), {
  value: () => [0, 100],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  tooltip: true,
  marks: undefined,
  vertical: false,
});

const emit = defineEmits<QRangeSliderEmits>();

const { range, percent, isDisabled, clamp, markList } = useRangeSlider(props);

/** 选中区间的位置与宽度 */
const rangeStyle = computed(() => ({
  insetInlineStart: `${percent.value[0]}%`,
  width: `${percent.value[1] - percent.value[0]}%`,
}));

/**
 * 两个滑块重叠时的层级：左滑块到顶时降到下层，右滑块到底时提到上层，
 * 保证末端的滑块始终可抓取
 */
function inputZIndex(index: number): number {
  if (index === 0) return range.value[0] >= (props.max ?? 100) ? 1 : 3;
  return range.value[1] <= (props.min ?? 0) ? 3 : 2;
}

/**
 * 读取原生输入值并校正，返回校正后的区间值
 */
function resolveValue(index: number, ev: Event): RangeSliderValue {
  const input = ev.target as HTMLInputElement;
  const slot: 0 | 1 = index === 0 ? 0 : 1;
  const next = clamp(slot, Number(input.value));

  // 受控回写：夹取后让原生滑块与模型保持一致
  if (input.value !== String(next)) input.value = String(next);

  return slot === 0 ? [next, range.value[1]] : [range.value[0], next];
}

/** 拖动中：派发 update:value 与 change */
function onInput(index: number, ev: Event) {
  const value = resolveValue(index, ev);
  emit('update:value', value);
  emit('change', value);
}

/** 松开滑块：派发 afterChange */
function onAfterChange(index: number, ev: Event) {
  emit('afterChange', resolveValue(index, ev));
}
</script>

<style scoped>
.q-range-slider {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding-block: var(--q-space-8);
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-xs);
  line-height: var(--q-line-height-normal);
}

.q-range-slider__body {
  display: flex;
  flex-direction: column;
  gap: var(--q-space-2);
  width: 100%;
}

/* — 轨道 — */
.q-range-slider__rail {
  position: relative;
  width: calc(100% - 1rem);
  height: 0.5rem;
  margin-inline: 0.5rem;
}

.q-range-slider__track {
  position: absolute;
  inset: 0;
  border-radius: var(--q-radius-full);
  background-color: var(--q-color-gray-200);
}

.q-range-slider__range {
  position: absolute;
  inset-block: 0;
  border-radius: var(--q-radius-full);
  background-color: var(--q-color-primary);
}

/* — 原生滑块：铺满轨道、本身透明、仅滑块可交互 — */
.q-range-slider__input {
  position: absolute;
  inset-inline: 0;
  top: 50%;
  box-sizing: border-box;
  width: 100%;
  height: 1.25rem;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  transform: translateY(-50%);
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  cursor: pointer;
}

.q-range-slider__input::-webkit-slider-runnable-track {
  height: 100%;
  border: none;
  background-color: transparent;
}

.q-range-slider__input::-webkit-slider-thumb {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid var(--q-color-primary);
  border-radius: 50%;
  background-color: var(--q-color-bg-card);
  box-shadow: 0 1px 2px var(--q-color-gray-400);
  cursor: grab;
  pointer-events: auto;
  -webkit-appearance: none;
  appearance: none;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-range-slider__input:focus-visible::-webkit-slider-thumb {
  border-color: var(--q-color-primary-hover);
  box-shadow: 0 0 0 3px var(--q-color-primary-light);
}

.q-range-slider__input::-moz-range-track {
  height: 100%;
  border: none;
  background-color: transparent;
}

.q-range-slider__input::-moz-range-thumb {
  box-sizing: border-box;
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid var(--q-color-primary);
  border-radius: 50%;
  background-color: var(--q-color-bg-card);
  box-shadow: 0 1px 2px var(--q-color-gray-400);
  cursor: grab;
  pointer-events: auto;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-range-slider__input:focus-visible::-moz-range-thumb {
  border-color: var(--q-color-primary-hover);
  box-shadow: 0 0 0 3px var(--q-color-primary-light);
}

/* — 数值提示 — */
.q-range-slider__tooltip {
  position: absolute;
  bottom: calc(100% + var(--q-space-2));
  padding: var(--q-space-1) var(--q-space-2);
  border-radius: var(--q-radius-sm);
  background-color: var(--q-color-gray-800);
  color: var(--q-color-white);
  font-size: var(--q-font-size-xs);
  line-height: 1;
  white-space: nowrap;
  transform: translateX(-50%);
  pointer-events: none;
}

/* — 刻度 — */
.q-range-slider__marks {
  position: relative;
  width: calc(100% - 1rem);
  height: 1rem;
  margin-inline: 0.5rem;
  font-size: var(--q-font-size-xs);
}

.q-range-slider__mark {
  position: absolute;
  top: 0;
  color: var(--q-color-text-muted);
  white-space: nowrap;
  transform: translateX(-50%);
}

/* — 禁用态 — */
.q-range-slider--disabled .q-range-slider__range {
  background-color: var(--q-color-text-disabled);
}

.q-range-slider--disabled .q-range-slider__input::-webkit-slider-thumb {
  border-color: var(--q-color-text-disabled);
  background-color: var(--q-color-bg-secondary);
  cursor: not-allowed;
}

.q-range-slider--disabled .q-range-slider__input::-moz-range-thumb {
  border-color: var(--q-color-text-disabled);
  background-color: var(--q-color-bg-secondary);
  cursor: not-allowed;
}

.q-range-slider--disabled .q-range-slider__tooltip {
  background-color: var(--q-color-text-disabled);
}

.q-range-slider--disabled .q-range-slider__mark {
  color: var(--q-color-text-disabled);
}

/* — 垂直方向：整体旋转 90°，位置计算保持水平逻辑 — */
.q-range-slider--vertical {
  width: 3rem;
  height: 12rem;
  padding-block: 0;
}

.q-range-slider--vertical .q-range-slider__body {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11rem;
  transform: translate(-50%, -50%) rotate(-90deg);
}
</style>
