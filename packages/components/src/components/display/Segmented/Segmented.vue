<!--
 * @component QSegmented
 * @description 分段控制器：互斥选中一段，支持图标/禁用/整块/纵向/键盘导航，对齐 Ant Design Segmented。
 -->
<template>
  <div
    ref="rootEl"
    class="q-segmented"
    :class="classList"
    role="radiogroup"
    :aria-disabled="isDisabledAll ? 'true' : undefined"
    :tabindex="isDisabledAll ? -1 : 0"
    @keydown="onKeydown"
    @focusout="onFocusout"
  >
    <div
      v-for="(opt, i) in options"
      :key="String(opt.value)"
      :ref="(el) => setItemEl(el, i)"
      class="q-segmented-item"
      :class="{
        'q-segmented-item--selected': optionChecked(i),
        'q-segmented-item--disabled': optionDisabled(i),
        'q-segmented-item--focused': focusIndex === i,
      }"
      role="radio"
      :aria-checked="optionChecked(i) ? 'true' : 'false'"
      :aria-disabled="optionDisabled(i) ? 'true' : undefined"
      tabindex="-1"
      @click="onItemClick(i)"
    >
      <span class="q-segmented-item-label">
        <QIcon
          v-if="opt.icon"
          class="q-segmented-item-icon"
          :icon="opt.icon"
          size="14"
        />
        <span class="q-segmented-item-text">{{ opt.label }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { nextTick, ref } from 'vue';

import {
  firstEnabledIndex,
  lastEnabledIndex,
  useSegmented,
} from './composable';
import type { SegmentedEmits, SegmentedProps } from './type';

defineOptions({ name: 'QSegmented' });

const props = withDefaults(defineProps<SegmentedProps>(), {
  options: () => [],
  modelValue: undefined,
  disabled: false,
  block: false,
  size: 'middle',
  vertical: false,
});

const emit = defineEmits<SegmentedEmits>();

const {
  options,
  selectedIndex,
  isDisabledAll,
  classList,
  optionDisabled,
  optionChecked,
  onSelect,
  step,
} = useSegmented(props, emit);

const rootEl = ref<HTMLElement | null>(null);
const itemEls = ref<HTMLElement[]>([]);
const focusIndex = ref(-1);

/** v-for 函数式 ref：收集每个选项 DOM */
function setItemEl(el: unknown, index: number): void {
  if (el) itemEls.value[index] = el as HTMLElement;
}

/** 当前焦点锚点：有手动焦点用焦点，否则回到选中项 */
function anchorIndex(): number {
  return focusIndex.value >= 0 ? focusIndex.value : selectedIndex.value;
}

function focusItem(index: number) {
  focusIndex.value = index;
  void nextTick(() => {
    itemEls.value[index]?.focus();
  });
}

function onItemClick(index: number) {
  onSelect(index);
  focusIndex.value = -1;
}

function onKeydown(e: KeyboardEvent) {
  if (isDisabledAll.value) return;
  const list = options.value;
  const handle = (index: number) => {
    if (index === -1) return;
    e.preventDefault();
    focusItem(index);
  };

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      handle(step(anchorIndex(), 1));
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      handle(step(anchorIndex(), -1));
      break;
    case 'Home':
      handle(firstEnabledIndex(list));
      break;
    case 'End':
      handle(lastEnabledIndex(list));
      break;
    case 'Enter':
    case ' ':
    case 'Spacebar':
      if (focusIndex.value >= 0) {
        e.preventDefault();
        onSelect(focusIndex.value);
        focusIndex.value = -1;
      }
      break;
    default:
      break;
  }
}

/** 焦点离开组件后复位手动焦点 */
function onFocusout(e: FocusEvent) {
  const next = e.relatedTarget as Node | null;
  if (!next || !rootEl.value?.contains(next)) {
    focusIndex.value = -1;
  }
}
</script>

<style scoped>
.q-segmented {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--q-space-1);
  padding: var(--q-space-1);
  background-color: var(--q-color-bg-secondary);
  border-radius: var(--q-radius-md);
  box-sizing: border-box;
  vertical-align: middle;
  width: fit-content;
}

.q-segmented--vertical {
  flex-direction: column;
  width: fit-content;
  align-items: stretch;
}

.q-segmented--block {
  display: flex;
  width: 100%;
}
.q-segmented--block .q-segmented-item {
  flex: 1 1 0;
  justify-content: center;
}

.q-segmented-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--q-space-3);
  height: 24px;
  border-radius: var(--q-radius-sm);
  font-size: var(--q-font-size-sm);
  color: var(--q-color-text-secondary);
  cursor: pointer;
  transition:
    background-color var(--q-duration-fast, 150ms) ease,
    color var(--q-duration-fast, 150ms) ease,
    box-shadow var(--q-duration-fast, 150ms) ease;
  user-select: none;
  outline: none;
  box-sizing: border-box;
  white-space: nowrap;
}

.q-segmented--middle .q-segmented-item {
  height: 28px;
}
.q-segmented--large .q-segmented-item {
  height: 34px;
  padding: 0 var(--q-space-4);
  font-size: var(--q-font-size-base);
}

.q-segmented--vertical .q-segmented-item {
  width: 100%;
  justify-content: flex-start;
}

.q-segmented-item--selected {
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  font-weight: var(--q-font-weight-semibold, 600);
}

.q-segmented-item:focus-visible,
.q-segmented-item--focused {
  box-shadow: 0 0 0 2px var(--q-color-primary-light);
}

.q-segmented-item--disabled {
  color: var(--q-color-text-tertiary, var(--q-color-gray-400));
  cursor: not-allowed;
}
.q-segmented-item--disabled.q-segmented-item--selected {
  background-color: var(--q-color-bg-card);
  box-shadow: none;
}

.q-segmented--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.q-segmented-item-label {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-2);
  line-height: 1;
}

.q-segmented-item-icon {
  flex: none;
}
</style>
