<!--
 * @component QTooltip
 * @description 文字提示组件，弹层 Teleport 到 body 并依据触发元素视口定位，对齐 Ant Design Tooltip 常用能力。
 -->
<template>
  <span
    ref="wrapRef"
    class="q-tooltip-trigger"
    @click="onTriggerClick"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @pointerenter="onMouseEnter"
    @pointerleave="onMouseLeave"
  >
    <slot />
  </span>

  <Teleport to="body">
    <div
      v-if="showable"
      ref="tipRef"
      :class="[
        `q-tooltip--${side}`,
        { 'q-tooltip--align-start': align === 'start' },
        { 'q-tooltip--align-end': align === 'end' },
      ]"
      class="q-tooltip"
      role="tooltip"
      :style="tipStyle"
    >
      <span
        v-if="props.arrow"
        :style="arrowStyle"
        class="q-tooltip-arrow"
        aria-hidden="true"
      />
      <div class="q-tooltip-inner">
        <slot name="content">{{ props.content }}</slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useSlots,
  useTemplateRef,
  watch,
} from 'vue';

import { useQTooltip } from './composable';
import type { QTooltipEmits, QTooltipProps } from './type';

defineOptions({ name: 'QTooltip' });

const props = withDefaults(defineProps<QTooltipProps>(), {
  placement: 'top',
  trigger: 'hover',
  open: undefined,
  arrow: true,
  disabled: false,
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
});

const emit = defineEmits<QTooltipEmits>();

const slots = useSlots();

const { side, align, hasContent, isControlled } = useQTooltip(props);

const wrapRef = useTemplateRef<HTMLElement>('wrapRef');
const tipRef = useTemplateRef<HTMLElement>('tipRef');

/** 内部显隐（未受控时使用） */
const localOpen = ref(false);

/** 是否展示（受控 open 优先；disabled 或空内容时不展示） */
const showable = computed(() => hasContent.value || !!slots?.content);

/** 弹层最终是否渲染 */
const visible = computed(
  () =>
    !props.disabled &&
    showable.value &&
    (isControlled.value ? !!props.open : localOpen.value),
);

/** 定位（fixed，视口坐标） */
const pos = ref({ left: 0, top: 0 });
/** 箭头偏移 */
const arrowOff = ref({ x: 0, y: 0 });

/** 气泡背景色 */
const bgColor = computed(() => props.color ?? 'rgba(30, 30, 30, 0.92)');

const tipStyle = computed(() => ({
  display: visible.value ? 'block' : 'none',
  left: `${Math.round(pos.value.left)}px`,
  top: `${Math.round(pos.value.top)}px`,
  '--q-tooltip-bg': bgColor.value,
}));

const arrowStyle = computed(() => {
  const base: Record<string, string> = {};
  if (side.value === 'top' || side.value === 'bottom') {
    base['--q-arrow-x'] = `${Math.round(arrowOff.value.x)}px`;
  } else {
    base['--q-arrow-y'] = `${Math.round(arrowOff.value.y)}px`;
  }
  return base;
});

/** 弹层与触发元素的间距 */
const GAP = 8;
/** 视口安全边距 */
const VIEWPORT_MARGIN = 6;

/** 计算并设置 fixed 定位 */
async function updatePosition() {
  await nextTick();
  const wrap = wrapRef.value;
  const tip = tipRef.value;
  if (!wrap || !tip) return;

  const wr = wrap.getBoundingClientRect();
  const tipW = tip.offsetWidth;
  const tipH = tip.offsetHeight;
  const isTopBottom = side.value === 'top' || side.value === 'bottom';

  let left: number;
  let top: number;
  let arrowX = 0;
  let arrowY = 0;

  if (isTopBottom) {
    // 水平对齐
    if (align.value === 'start') left = wr.left;
    else if (align.value === 'end') left = wr.right - tipW;
    else left = wr.left + wr.width / 2 - tipW / 2;
    // 垂直位置
    top = side.value === 'top' ? wr.top - tipH - GAP : wr.bottom + GAP;
    // 箭头水平：对准触发元素中心
    arrowX = wr.left + wr.width / 2 - left;
  } else {
    // left / right（垂直居中）
    top = wr.top + wr.height / 2 - tipH / 2;
    left = side.value === 'left' ? wr.left - tipW - GAP : wr.right + GAP;
    arrowY = wr.top + wr.height / 2 - top;
  }

  // 视口内收敛，避免溢出
  const maxLeft = window.innerWidth - tipW - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - tipH - VIEWPORT_MARGIN;
  const clampedLeft = Math.min(
    Math.max(left, VIEWPORT_MARGIN),
    Math.max(maxLeft, VIEWPORT_MARGIN),
  );
  const clampedTop = Math.min(
    Math.max(top, VIEWPORT_MARGIN),
    Math.max(maxTop, VIEWPORT_MARGIN),
  );
  const dx = clampedLeft - left;
  const dy = clampedTop - top;

  pos.value = { left: clampedLeft, top: clampedTop };
  arrowOff.value = {
    x: Math.min(Math.max(arrowX - dx, 10), tipW - 10),
    y: Math.min(Math.max(arrowY - dy, 10), tipH - 10),
  };
}

let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
  showTimer = null;
  hideTimer = null;
}

/** 切换显隐并同步 emit */
function setOpen(open: boolean) {
  localOpen.value = open;
  emit('update:open', open);
}

function scheduleShow() {
  if (props.disabled) return;
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  showTimer = setTimeout(() => setOpen(true), props.mouseEnterDelay);
}

function scheduleHide() {
  if (showTimer) clearTimeout(showTimer);
  showTimer = null;
  hideTimer = setTimeout(() => setOpen(false), props.mouseLeaveDelay);
}

/** 事件：hover（mouse + pointer 双通道） */
function onMouseEnter() {
  if (props.trigger === 'click') return;
  scheduleShow();
}

function onMouseLeave() {
  if (props.trigger === 'click') return;
  scheduleHide();
}

/** 事件：focus（hover / focus 触发均启用键盘可达） */
function onFocusIn() {
  if (props.trigger === 'hover' || props.trigger === 'focus') scheduleShow();
}

function onFocusOut() {
  if (props.trigger === 'hover' || props.trigger === 'focus') scheduleHide();
}

/** 事件：click */
function onTriggerClick() {
  if (props.trigger !== 'click') return;
  if (props.disabled) return;
  setOpen(isControlled.value ? !props.open : !localOpen.value);
}

/** 跟随滚动 / 尺寸变化更新定位 */
function onMove() {
  if (visible.value) updatePosition();
}

watch(
  () => visible.value,
  (v) => {
    clearTimers();
    if (v) {
      updatePosition();
      window.addEventListener('resize', onMove);
      window.addEventListener('scroll', onMove, {
        capture: true,
        passive: true,
      });
    } else {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
    }
  },
);

onBeforeUnmount(() => {
  clearTimers();
  window.removeEventListener('resize', onMove);
  window.removeEventListener('scroll', onMove, true);
});
</script>

<style scoped>
.q-tooltip-trigger {
  display: inline-block;
}

.q-tooltip {
  position: fixed;
  z-index: var(--z-index-level-3);
  max-width: 280px;
}

.q-tooltip-inner {
  box-sizing: border-box;
  padding: 0.25rem 0.625rem;
  background: var(--q-tooltip-bg);
  color: var(--q-color-white);
  border-radius: var(--q-radius-sm);
  font-size: var(--q-font-size-xs);
  line-height: var(--q-line-height-normal);
  word-break: break-word;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.q-tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--q-tooltip-bg);
}

/* top */
.q-tooltip--top .q-tooltip-arrow {
  bottom: -4px;
  left: var(--q-arrow-x, 50%);
  margin-left: -4px;
  transform: rotate(45deg);
}

/* bottom */
.q-tooltip--bottom .q-tooltip-arrow {
  top: -4px;
  left: var(--q-arrow-x, 50%);
  margin-left: -4px;
  transform: rotate(45deg);
}

/* left / right */
.q-tooltip--left .q-tooltip-arrow,
.q-tooltip--right .q-tooltip-arrow {
  top: var(--q-arrow-y, 50%);
  margin-top: -4px;
}

.q-tooltip--left .q-tooltip-arrow {
  right: -4px;
  transform: rotate(45deg);
}

.q-tooltip--right .q-tooltip-arrow {
  left: -4px;
  transform: rotate(45deg);
}
</style>
