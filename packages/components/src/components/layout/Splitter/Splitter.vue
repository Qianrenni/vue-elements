<!--
 * @component QSplitter
 * @description 分隔面板（对齐 antd Splitter 基础能力）：两个面板 + 可拖拽分隔条，支持 row/column、受控 v-model:size、min/max、键盘方向键调整；多栏可用 QSplitter 嵌套。
 -->
<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { PropType } from 'vue';

import {
  clampPanelSize,
  DEFAULT_SPLITTER_MIN,
  percentToPx,
  resolvePanelBasis,
  useQSplitter,
} from './composable';
import type { QSplitterDirection, QSplitterProps } from './type';

defineOptions({ name: 'QSplitter' });

const props = defineProps({
  direction: { type: String as PropType<QSplitterDirection>, default: 'row' },
  size: {
    type: [String, Number] as PropType<number | string>,
    default: undefined,
  },
  defaultSize: { type: Number, default: undefined },
  min: { type: Number, default: DEFAULT_SPLITTER_MIN },
  max: { type: Number, default: undefined },
  resizable: { type: Boolean, default: true },
  gutter: { type: Number, default: 8 },
});

const emit = defineEmits(['update:size', 'resize-start', 'resize-end']);

const containerRef = ref<HTMLElement | null>(null);
const internalBasis = ref<string>(
  resolvePanelBasis(props.size, props.defaultSize ?? 300),
);

watch(
  () => props.size,
  (value) => {
    if (value !== undefined) {
      internalBasis.value = resolvePanelBasis(value, props.defaultSize ?? 300);
    }
  },
);

const basis = computed(() =>
  props.size !== undefined
    ? resolvePanelBasis(props.size, props.defaultSize ?? 300)
    : internalBasis.value,
);

const { sizeProp, posProp, paneStyle, gutterStyle } = useQSplitter(
  props as QSplitterProps,
  basis,
);

const minPx = props.min ?? DEFAULT_SPLITTER_MIN;
let dragging = false;
let startPos = 0;
let startPx = 0;
let maxPx: number | null = null;

function readCurrentPx(): number {
  const containerSize = containerRef.value
    ? containerRef.value.getBoundingClientRect()[sizeProp]
    : 0;
  const parsed = /%/.test(basis.value)
    ? percentToPx(basis.value, containerSize)
    : parseFloat(basis.value);
  const current = Number.isNaN(parsed) ? 0 : parsed;
  maxPx =
    props.max !== undefined
      ? props.max
      : containerSize > 0
        ? Math.max(0, containerSize - minPx)
        : null;
  return current;
}

function applySize(px: number) {
  const clamped = clampPanelSize(px, minPx, maxPx);
  internalBasis.value = `${clamped}px`;
  emit('update:size', clamped);
}

function onPointerDown(ev: PointerEvent) {
  if (!props.resizable) return;
  if (ev.button !== 0) return;
  dragging = true;
  startPos = ev[posProp];
  startPx = readCurrentPx();
  emit('resize-start');
  document.body.style.userSelect = 'none';
  document.body.style.cursor =
    props.direction === 'row' ? 'col-resize' : 'row-resize';
}

function onPointerMove(ev: PointerEvent) {
  if (!dragging) return;
  applySize(startPx + (ev[posProp] - startPos));
}

function onPointerUp() {
  if (!dragging) return;
  dragging = false;
  document.body.style.userSelect = '';
  document.body.style.cursor = '';
  const parsed = parseFloat(basis.value);
  emit('resize-end', Number.isNaN(parsed) ? minPx : parsed);
}

function onKeydown(ev: KeyboardEvent) {
  if (!props.resizable) return;
  const step = 10;
  const dirs: Record<string, number> = {
    ArrowLeft: -step,
    ArrowUp: -step,
    ArrowRight: step,
    ArrowDown: step,
  };
  const delta = dirs[ev.key];
  if (delta === undefined) return;
  ev.preventDefault();
  applySize(readCurrentPx() + delta);
}

onBeforeUnmount(() => {
  if (dragging) onPointerUp();
});
</script>

<template>
  <div ref="containerRef" :class="[`q-splitter q-splitter--${direction}`]">
    <div class="q-splitter-pane" :style="paneStyle">
      <slot name="first" />
    </div>
    <div
      class="q-splitter-gutter"
      :tabindex="resizable ? 0 : undefined"
      role="separator"
      :aria-orientation="direction === 'row' ? 'vertical' : 'horizontal'"
      :style="gutterStyle"
      @keydown="onKeydown"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <span class="q-splitter-gutter__line" aria-hidden="true" />
    </div>
    <div class="q-splitter-pane q-splitter-pane--rest">
      <slot name="second" />
    </div>
  </div>
</template>

<style scoped>
.q-splitter {
  display: flex;
  width: 100%;
  height: 100%;
}
.q-splitter--row {
  flex-direction: row;
}
.q-splitter--column {
  flex-direction: column;
}
.q-splitter-pane {
  box-sizing: border-box;
}
.q-splitter-pane--rest {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
}
.q-splitter-gutter {
  position: relative;
  outline: none;
}
.q-splitter--row .q-splitter-gutter {
  cursor: col-resize;
}
.q-splitter--column .q-splitter-gutter {
  cursor: row-resize;
}
.q-splitter-gutter__line {
  width: 1px;
  height: 24px;
  background: var(--q-color-border);
  border-radius: 1px;
  transition: background-color 0.2s ease;
}
.q-splitter--row .q-splitter-gutter__line {
  width: 1px;
  height: 24px;
}
.q-splitter--column .q-splitter-gutter__line {
  width: 24px;
  height: 1px;
}
.q-splitter-gutter:hover .q-splitter-gutter__line,
.q-splitter-gutter:focus-visible .q-splitter-gutter__line {
  background: var(--q-color-primary);
}
</style>
