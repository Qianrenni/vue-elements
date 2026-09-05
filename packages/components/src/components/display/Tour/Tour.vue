<!--
 * @component QTour
 * @description 漫游引导（对齐 antd Tour 基础能力）：按 steps 依次高亮目标并显示说明卡片（遮罩挖孔 + 上下左右位置 + 上一步/下一步/关闭）。
 -->
<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';

import {
  computeCardPos,
  computeMaskPanes,
  DEFAULT_TOUR_MASK,
  TOUR_CARD_WIDTH,
} from './composable';
import type { QTourEmits, QTourProps } from './type';

defineOptions({ name: 'QTour' });

const props = withDefaults(defineProps<QTourProps>(), {
  open: false,
  steps: () => [],
  current: undefined,
  maskColor: DEFAULT_TOUR_MASK,
  closable: true,
  prevText: '上一步',
  nextText: '下一步',
  onFinish: undefined,
});

const emit = defineEmits<QTourEmits>();

const internalCurrent = ref(props.current ?? 0);
const current = computed(() =>
  props.current !== undefined ? props.current : internalCurrent.value,
);
const step = computed(() => props.steps[current.value] ?? null);

const rect = ref({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
const hasTarget = ref(false);
const cardPos = ref({ top: 0, left: 0 });

const viewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

function measure() {
  const s = step.value;
  if (!s || !s.target) {
    hasTarget.value = false;
    cardPos.value = {
      top: Math.max(24, viewport().height * 0.3),
      left: Math.max(12, (viewport().width - TOUR_CARD_WIDTH) / 2),
    };
    return;
  }
  const el = document.querySelector(s.target);
  if (!el) {
    hasTarget.value = false;
    cardPos.value = {
      top: Math.max(24, viewport().height * 0.3),
      left: Math.max(12, (viewport().width - TOUR_CARD_WIDTH) / 2),
    };
    return;
  }
  const r = el.getBoundingClientRect();
  rect.value = {
    top: r.top,
    bottom: r.bottom,
    left: r.left,
    right: r.right,
    width: r.width,
    height: r.height,
  };
  hasTarget.value = true;
  cardPos.value = computeCardPos(
    rect.value,
    s.placement ?? 'bottom',
    viewport(),
  );
}

const maskPanes = computed(() =>
  hasTarget.value ? computeMaskPanes(rect.value, viewport()) : null,
);
const paneStyle = (pane: {
  top: number;
  left: number;
  width: number;
  height: number;
}): CSSProperties => ({
  position: 'fixed',
  top: `${pane.top}px`,
  left: `${pane.left}px`,
  width: `${pane.width}px`,
  height: `${pane.height}px`,
  background: props.maskColor,
  pointerEvents: 'none',
});

const cardStyle = computed<CSSProperties>(() => ({
  position: 'fixed',
  top: `${cardPos.value.top}px`,
  left: `${cardPos.value.left}px`,
  width: `${TOUR_CARD_WIDTH}px`,
}));

function go(delta: number) {
  const next = Math.min(
    props.steps.length - 1,
    Math.max(0, current.value + delta),
  );
  internalCurrent.value = next;
  emit('update:current', next);
  nextTick(measure);
}
function nextOrFinish() {
  if (current.value >= props.steps.length - 1) {
    close();
    props.onFinish?.();
    emit('finish');
    return;
  }
  go(1);
}
function close() {
  emit('update:open', false);
}
function onScrollOrResize() {
  if (props.open) measure();
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize);
      nextTick(measure);
    } else {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    }
  },
  { immediate: true },
);
watch(
  () => current.value,
  () => {
    if (props.open) nextTick(measure);
  },
);
watch(
  () => props.current,
  (v) => {
    if (v !== undefined) internalCurrent.value = v;
  },
);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize);
  window.removeEventListener('resize', onScrollOrResize);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="q-tour">
      <div v-if="maskPanes" class="q-tour__mask">
        <div
          v-for="(pane, key) in [
            maskPanes.top,
            maskPanes.bottom,
            maskPanes.left,
            maskPanes.right,
          ]"
          :key="key"
          :style="paneStyle(pane)"
        />
      </div>
      <div
        v-if="maskPanes"
        class="q-tour__ring"
        :style="{
          position: 'fixed',
          top: `${rect.top - 2}px`,
          left: `${rect.left - 2}px`,
          width: `${rect.width + 4}px`,
          height: `${rect.height + 4}px`,
        }"
      />
      <div class="q-tour__card" :style="cardStyle">
        <button
          v-if="closable"
          type="button"
          class="q-tour__close"
          aria-label="关闭"
          @click="close"
        >
          ×
        </button>
        <div v-if="step?.title" class="q-tour__title">{{ step.title }}</div>
        <div v-if="step?.description" class="q-tour__desc">
          {{ step.description }}
        </div>
        <div class="q-tour__footer">
          <span class="q-tour__index">
            {{ current + 1 }} / {{ steps.length }}
          </span>
          <button
            v-if="current > 0"
            type="button"
            class="q-tour__btn"
            @click="go(-1)"
          >
            {{ prevText }}
          </button>
          <button
            type="button"
            class="q-tour__btn q-tour__btn--primary"
            @click="nextOrFinish"
          >
            {{ current < steps.length - 1 ? nextText : '完成' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.q-tour__ring {
  position: fixed;
  border-radius: 8px;
  box-shadow: 0 0 0 9999px transparent;
  pointer-events: none;
  z-index: 1200;
}
.q-tour__card {
  position: fixed;
  z-index: 1201;
  box-sizing: border-box;
  padding: 16px;
  border-radius: var(--q-radius-md, 8px);
  background: var(--q-color-bg-card);
  box-shadow: var(--q-shadow-lg, 0 12px 24px rgba(0, 0, 0, 0.18));
}
.q-tour__close {
  position: absolute;
  top: 6px;
  right: 8px;
  border: none;
  background: transparent;
  color: var(--q-color-text-muted);
  font-size: 16px;
  cursor: pointer;
}
.q-tour__title {
  font-weight: 600;
  color: var(--q-color-text);
  margin-bottom: 6px;
}
.q-tour__desc {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm, 14px);
  line-height: 1.6;
}
.q-tour__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}
.q-tour__index {
  margin-right: auto;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.q-tour__btn {
  border: 1px solid var(--q-color-border-light);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 6px);
  padding: 3px 12px;
  cursor: pointer;
  font-size: var(--q-font-size-sm, 14px);
}
.q-tour__btn--primary {
  background: var(--q-color-primary);
  border-color: var(--q-color-primary);
  color: var(--q-color-white);
}
</style>
