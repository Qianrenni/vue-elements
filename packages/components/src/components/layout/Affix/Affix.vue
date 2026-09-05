<!--
 * @component QAffix
 * @description 固钉：将页面元素钉在可视区域。滚动到指定偏移后内容脱离文档流 fixed 定位，并通过占位元素保留原空间；支持自定义滚动容器（target）与 offsetBottom 吸底，对齐 Ant Design Affix 常用能力。
 -->
<template>
  <div ref="holderEl" class="q-affix" :class="{ 'is-affixed': affixed }">
    <div
      v-if="affixed"
      class="q-affix-placeholder"
      aria-hidden="true"
      :style="placeholderStyle"
    />
    <div
      ref="contentEl"
      class="q-affix-content"
      :class="{ 'is-affixed': affixed }"
      :style="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import type { CSSProperties } from 'vue';

import {
  AFFIX_DEFAULT_Z_INDEX,
  computeAffixState,
  getTargetRect,
} from './composable';
import type { QAffixRect, QAffixState } from './composable';
import type { QAffixProps } from './type';

defineOptions({ name: 'QAffix' });

const props = defineProps<QAffixProps>();

const holderEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);

/** 是否处于固定态 */
const affixed = ref(false);
/** 占位元素尺寸（固定时保留原空间） */
const placeholderStyle = ref<CSSProperties | undefined>(undefined);
/** 内容元素 fixed 样式 */
const contentStyle = ref<CSSProperties | undefined>(undefined);

/** 当前 fixed 样式来源，用于避免重复渲染 */
let currentState: QAffixState | null = null;
/** 上一次上报的固定态（onChange 仅在切换时触发） */
let lastAffixed = false;

const zIndex = computed(() => props.zIndex ?? AFFIX_DEFAULT_Z_INDEX);

/** 解析滚动目标（默认 window；target 返回 null 时按未就绪处理） */
function resolveTarget(): Window | HTMLElement | null {
  if (typeof props.target === 'function') {
    return props.target() ?? null;
  }
  return window;
}

function getViewportHeight(): number {
  return window.innerHeight || 0;
}

function applyState(next: QAffixState | null) {
  const prev = currentState;
  const same =
    (prev === null) === (next === null) &&
    (next === null ||
      (prev !== null &&
        prev.mode === next.mode &&
        prev.top === next.top &&
        prev.bottom === next.bottom &&
        prev.width === next.width &&
        prev.height === next.height));
  if (same) return;

  currentState = next;
  affixed.value = next !== null;

  if (next === null) {
    placeholderStyle.value = undefined;
    contentStyle.value = undefined;
  } else {
    const width = `${next.width}px`;
    const height = `${next.height}px`;
    const style: CSSProperties = {
      position: 'fixed',
      width,
      height,
      zIndex: String(zIndex.value),
    };
    if (next.mode === 'top' && next.top !== undefined) {
      style.top = `${next.top}px`;
    } else if (next.mode === 'bottom' && next.bottom !== undefined) {
      style.bottom = `${next.bottom}px`;
    }
    placeholderStyle.value = { width, height };
    contentStyle.value = style;
  }

  const newAffixed = next !== null;
  if (newAffixed !== lastAffixed) {
    lastAffixed = newAffixed;
    props.onChange?.(newAffixed);
  }
}

/** 依据当前几何状态计算并应用固定态 */
function measure() {
  const holder = holderEl.value;
  if (!holder) return;
  const targetNode = resolveTarget();
  if (!targetNode) return;

  const rect = holder.getBoundingClientRect();
  if (
    rect.width === 0 &&
    rect.height === 0 &&
    rect.top === 0 &&
    rect.left === 0
  ) {
    return;
  }
  const placeholderRect: QAffixRect = {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
  const targetRect = getTargetRect(targetNode, getViewportHeight());
  const next = computeAffixState(placeholderRect, targetRect, {
    offsetTop: props.offsetTop,
    offsetBottom: props.offsetBottom,
    viewportHeight: getViewportHeight(),
  });
  applyState(next);
}

/** rAF 节流：合并同一帧内的多次滚动/尺寸变化 */
let rafId = 0;
function scheduleMeasure() {
  if (rafId) return;
  if (typeof requestAnimationFrame === 'function') {
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      measure();
    });
  } else {
    rafId = window.setTimeout(() => {
      rafId = 0;
      measure();
    }, 16);
  }
}

/** 手动触发一次测量（通过 ref 调用） */
function updatePosition() {
  if (rafId) {
    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafId);
    } else {
      window.clearTimeout(rafId);
    }
    rafId = 0;
  }
  measure();
}

/** 监听滚动目标与窗口 resize */
let currentTargetNode: Window | HTMLElement | null = null;
function onScroll() {
  scheduleMeasure();
}
function bindListeners() {
  removeListeners();
  const node = resolveTarget();
  if (!node) return;
  currentTargetNode = node;
  if (node === window) {
    window.addEventListener('scroll', onScroll, { passive: true });
  } else {
    // 容器自身滚动 + 外层页面滚动（容器在可滚动页面内会位移）
    node.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('resize', onScroll);
}
function removeListeners() {
  const node = currentTargetNode;
  if (node) {
    if (node === window) {
      window.removeEventListener('scroll', onScroll);
    } else {
      node.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.removeEventListener('resize', onScroll);
  currentTargetNode = null;
}

/** ResizeObserver：内容/占位尺寸变化时重新测量 */
let observer: ResizeObserver | null = null;
function setupObserver() {
  if (typeof ResizeObserver === 'undefined') return;
  observer = new ResizeObserver(() => scheduleMeasure());
  if (holderEl.value) observer.observe(holderEl.value);
  if (contentEl.value) observer.observe(contentEl.value);
}
function teardownObserver() {
  observer?.disconnect();
  observer = null;
}

onMounted(() => {
  bindListeners();
  setupObserver();
  // 首次布局后测量（异步布局未完成时由 RO 兜底）
  nextTick(updatePosition);
});
onBeforeUnmount(() => {
  removeListeners();
  teardownObserver();
  if (rafId) {
    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(rafId);
    } else {
      window.clearTimeout(rafId);
    }
    rafId = 0;
  }
});

watch(
  () => props.target,
  () => {
    bindListeners();
    scheduleMeasure();
  },
);
watch(
  () => [props.offsetTop, props.offsetBottom],
  () => scheduleMeasure(),
);

defineExpose({ updatePosition });
</script>
