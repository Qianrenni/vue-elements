<!--
 * @component QPopover
 * @description 气泡卡片：点击/悬停目标弹出可交互卡片（标题+内容），Teleport 到 body 视口定位，12 方向 + 箭头 + 点击外部关闭 + 受控 v-model:open，对齐 Ant Design Popover 常用能力。
 -->
<template>
  <span
    ref="wrapRef"
    class="q-popover-trigger"
    :aria-expanded="visible ? 'true' : 'false'"
    :tabindex="focusable ? 0 : undefined"
    @click="onTriggerClick"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @pointerenter="onTriggerEnter"
    @pointerleave="onTriggerLeave"
  >
    <slot />
  </span>

  <Teleport :to="teleportTarget">
    <div
      v-if="showable"
      ref="popRef"
      :class="[
        `q-popover--${side}`,
        { 'q-popover--align-start': align === 'start' },
        { 'q-popover--align-end': align === 'end' },
      ]"
      class="q-popover"
      role="tooltip"
      :style="popStyle"
      @pointerenter="onPopupEnter"
      @pointerleave="onPopupLeave"
    >
      <div class="q-popover-card" :style="{ width: widthStyle }">
        <div v-if="hasTitle" class="q-popover-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="q-popover-content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
      <span
        v-if="arrow"
        :style="arrowStyle"
        class="q-popover-arrow"
        aria-hidden="true"
      />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useQConfig } from '@/components/theme/ConfigProvider/composable';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useSlots,
  useTemplateRef,
  watch,
} from 'vue';

import { useQPopover } from './composable';
import type { QPopoverEmits, QPopoverProps } from './type';

defineOptions({ name: 'QPopover' });

/** 弹层 Teleport 目标：优先取最近 QConfigProvider 的 getPopupContainer，否则 body */
const config = useQConfig();
const teleportTarget = computed(() => config?.getPopupContainer?.() ?? 'body');

const props = withDefaults(defineProps<QPopoverProps>(), {
  title: '',
  content: '',
  placement: 'top',
  trigger: 'hover',
  open: undefined,
  arrow: true,
  disabled: false,
  mouseEnterDelay: 0,
  mouseLeaveDelay: 120,
  width: '',
});

const emit = defineEmits<QPopoverEmits>();

const slots = useSlots();

const { side, align, isControlled, hasContent } = useQPopover(props);

const wrapRef = useTemplateRef<HTMLElement>('wrapRef');
const popRef = useTemplateRef<HTMLElement>('popRef');

const localOpen = ref(false);
const pointerInTrigger = ref(false);
const pointerInPopup = ref(false);

const showable = computed(
  () => hasContent.value || !!slots.content || !!slots.title,
);

/** 最终是否展示 */
const visible = computed(
  () =>
    !props.disabled &&
    showable.value &&
    (isControlled.value ? props.open === true : localOpen.value),
);

const focusable = computed(
  () => props.trigger === 'focus' || props.trigger === 'click',
);
const widthStyle = computed(() => props.width || undefined);

const hasTitle = computed(() => !!props.title || !!slots.title);

// ---------- 定位 ----------
const pos = ref({ left: 0, top: 0 });
const arrowOff = ref({ x: 0, y: 0 });

const GAP = 10;
const VIEWPORT_MARGIN = 8;

const popStyle = computed(() => ({
  display: visible.value ? 'block' : 'none',
  left: `${Math.round(pos.value.left)}px`,
  top: `${Math.round(pos.value.top)}px`,
}));

const arrowStyle = computed(() => {
  const base: Record<string, string> = {};
  if (side.value === 'top' || side.value === 'bottom') {
    base['--q-arrow-pos'] = `${Math.round(arrowOff.value.x)}px`;
  } else {
    base['--q-arrow-pos'] = `${Math.round(arrowOff.value.y)}px`;
  }
  return base;
});

async function updatePosition() {
  await nextTick();
  const wrap = wrapRef.value;
  const pop = popRef.value;
  if (!wrap || !pop) return;

  const wr = wrap.getBoundingClientRect();
  const popW = pop.offsetWidth;
  const popH = pop.offsetHeight;
  const isTopBottom = side.value === 'top' || side.value === 'bottom';

  let left: number;
  let top: number;

  if (isTopBottom) {
    // 沿水平方向对齐
    if (align.value === 'start') left = wr.left;
    else if (align.value === 'end') left = wr.right - popW;
    else left = wr.left + wr.width / 2 - popW / 2;
    top = side.value === 'top' ? wr.top - popH - GAP : wr.bottom + GAP;
  } else {
    // 沿垂直方向对齐
    if (align.value === 'start') top = wr.top;
    else if (align.value === 'end') top = wr.bottom - popH;
    else top = wr.top + wr.height / 2 - popH / 2;
    left = side.value === 'left' ? wr.left - popW - GAP : wr.right + GAP;
  }

  // 视口内收敛
  const maxLeft = window.innerWidth - popW - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - popH - VIEWPORT_MARGIN;
  const clampedLeft = Math.min(
    Math.max(left, VIEWPORT_MARGIN),
    Math.max(maxLeft, VIEWPORT_MARGIN),
  );
  const clampedTop = Math.min(
    Math.max(top, VIEWPORT_MARGIN),
    Math.max(maxTop, VIEWPORT_MARGIN),
  );
  pos.value = { left: clampedLeft, top: clampedTop };

  // 箭头锚点对准触发元素中心，并随视口位移修正
  const dx = clampedLeft - left;
  const dy = clampedTop - top;
  const rawX = isTopBottom ? wr.left + wr.width / 2 - left : 0;
  const rawY = isTopBottom ? 0 : wr.top + wr.height / 2 - top;
  const boundX = Math.max(popW - 12, 12);
  const boundY = Math.max(popH - 12, 12);
  arrowOff.value = {
    x: Math.min(Math.max(rawX - dx, 12), boundX),
    y: Math.min(Math.max(rawY - dy, 12), boundY),
  };
}

// ---------- 显隐 ----------
function setOpen(open: boolean) {
  localOpen.value = open;
  emit('update:open', open);
  emit('open-change', open);
}

let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
  showTimer = null;
  hideTimer = null;
}

function scheduleShow() {
  if (props.disabled || visible.value) return;
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  showTimer = setTimeout(() => setOpen(true), props.mouseEnterDelay ?? 0);
}

function scheduleHide() {
  if (showTimer) clearTimeout(showTimer);
  showTimer = null;
  hideTimer = setTimeout(() => setOpen(false), props.mouseLeaveDelay ?? 120);
}

function afterPointerLeave() {
  if (!pointerInTrigger.value && !pointerInPopup.value) scheduleHide();
}

// trigger 事件
function onTriggerEnter() {
  pointerInTrigger.value = true;
  if (props.trigger !== 'click') scheduleShow();
}

function onTriggerLeave() {
  pointerInTrigger.value = false;
  afterPointerLeave();
}

function onPopupEnter() {
  pointerInPopup.value = true;
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
}

function onPopupLeave() {
  pointerInPopup.value = false;
  afterPointerLeave();
}

// focus 触发
function onFocusIn() {
  if (props.trigger === 'focus' || props.trigger === 'hover') scheduleShow();
}

function onFocusOut() {
  if (props.trigger === 'focus' || props.trigger === 'hover') {
    if (!pointerInPopup.value) scheduleHide();
  }
}

// click 触发
function onTriggerClick() {
  if (props.trigger !== 'click') return;
  if (props.disabled) return;
  const next = isControlled.value ? !props.open : !localOpen.value;
  setOpen(next);
}

function onDocPointerdown(event: PointerEvent) {
  if (!visible.value || props.trigger !== 'click') return;
  const target = event.target as Node;
  if (wrapRef.value?.contains(target) || popRef.value?.contains(target)) return;
  setOpen(false);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && visible.value) setOpen(false);
}

function onMove() {
  if (visible.value) updatePosition();
}

watch(
  () => visible.value,
  (open) => {
    clearTimers();
    if (open) {
      updatePosition();
      window.addEventListener('resize', onMove);
      window.addEventListener('scroll', onMove, {
        capture: true,
        passive: true,
      });
      document.addEventListener('pointerdown', onDocPointerdown);
      document.addEventListener('keydown', onKeydown);
    } else {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
      document.removeEventListener('pointerdown', onDocPointerdown);
      document.removeEventListener('keydown', onKeydown);
    }
  },
);

onBeforeUnmount(() => {
  clearTimers();
  window.removeEventListener('resize', onMove);
  window.removeEventListener('scroll', onMove, true);
  document.removeEventListener('pointerdown', onDocPointerdown);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.q-popover-trigger {
  display: inline-block;
  cursor: default;
}
.q-popover-trigger:focus-visible {
  outline: none;
}

.q-popover {
  position: fixed;
  z-index: 1030;
  max-width: 280px;
  box-sizing: border-box;
}
.q-popover-card {
  position: relative;
  background-color: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  box-shadow: var(--q-elevation-3, 0 6px 16px rgba(0, 0, 0, 0.12));
  padding: var(--q-space-3, 12px);
  font-size: var(--q-font-size-sm, 14px);
  color: var(--q-color-text);
  overflow-wrap: break-word;
}
.q-popover-title {
  padding-bottom: var(--q-space-2, 8px);
  margin-bottom: var(--q-space-2, 8px);
  border-bottom: 1px solid var(--q-color-gray-100, #f1f1f1);
  font-weight: var(--q-font-weight-semibold, 600);
}
.q-popover-content {
  line-height: 1.6;
}

/* 箭头 */
.q-popover-arrow {
  position: absolute;
  width: 9px;
  height: 9px;
  background-color: var(--q-color-bg-card);
}
.q-popover--top .q-popover-arrow {
  top: 100%;
  left: var(--q-arrow-pos, 50%);
  transform: translate(-50%, -50%) rotate(45deg);
  border-right: 1px solid var(--q-color-border-light);
  border-bottom: 1px solid var(--q-color-border-light);
}
.q-popover--bottom .q-popover-arrow {
  top: 0;
  left: var(--q-arrow-pos, 50%);
  transform: translate(-50%, -50%) rotate(45deg);
  border-left: 1px solid var(--q-color-border-light);
  border-top: 1px solid var(--q-color-border-light);
}
.q-popover--left .q-popover-arrow {
  left: 100%;
  top: var(--q-arrow-pos, 50%);
  transform: translate(-50%, -50%) rotate(45deg);
  border-top: 1px solid var(--q-color-border-light);
  border-right: 1px solid var(--q-color-border-light);
}
.q-popover--right .q-popover-arrow {
  left: 0;
  top: var(--q-arrow-pos, 50%);
  transform: translate(-50%, -50%) rotate(45deg);
  border-bottom: 1px solid var(--q-color-border-light);
  border-left: 1px solid var(--q-color-border-light);
}
</style>
