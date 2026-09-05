<!--
 * @component QMentions
 * @description 提及输入（对齐 antd Mentions）：textarea 中输入 @ 触发候选下拉，选中后替换为 @value 文本。
 -->
<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import {
  filterMentions,
  findTriggerAtEnd,
  optionLabel,
  replaceTrigger,
} from './composable';
import type { QMentionsEmits, QMentionsOption, QMentionsProps } from './type';

defineOptions({ name: 'QMentions' });

const props = withDefaults(defineProps<QMentionsProps>(), {
  modelValue: '',
  options: () => [],
  prefix: '@',
  placeholder: '请输入，@ 提及',
  disabled: false,
  rows: 3,
  autoSize: false,
  open: undefined,
});

const emit = defineEmits<QMentionsEmits>();

const text = ref(props.modelValue ?? '');
watch(
  () => props.modelValue,
  (value) => {
    text.value = value ?? '';
  },
);

const rootRef = ref<HTMLElement | null>(null);
const internalOpen = ref(false);
const isOpen = computed(() =>
  props.open !== undefined ? props.open === true : internalOpen.value,
);
const trigger = computed(() =>
  isOpen.value ? findTriggerAtEnd(text.value, props.prefix) : null,
);
const candidates = computed(() =>
  trigger.value ? filterMentions(props.options, trigger.value.query) : [],
);
const activeIndex = ref(0);

function setOpen(open: boolean) {
  internalOpen.value = open;
  emit('update:open', open);
}

function onInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value;
  text.value = value;
  emit('update:modelValue', value);
  if (value !== props.modelValue) emit('change', value);
  const hit = findTriggerAtEnd(value, props.prefix);
  if (hit) {
    activeIndex.value = 0;
    setOpen(true);
  } else {
    setOpen(false);
  }
}

function choose(opt: QMentionsOption) {
  if (!trigger.value) return;
  const next = replaceTrigger(text.value, trigger.value, opt.value);
  text.value = next;
  emit('update:modelValue', next);
  emit('change', next);
  setOpen(false);
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value || candidates.value.length === 0) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % candidates.value.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value =
      (activeIndex.value - 1 + candidates.value.length) %
      candidates.value.length;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const opt = candidates.value[activeIndex.value];
    if (opt && !opt.disabled) choose(opt);
  } else if (e.key === 'Escape') {
    setOpen(false);
  }
}

function onOutside(e: PointerEvent) {
  const target = e.target as Node | null;
  if (rootRef.value && target && rootRef.value.contains(target)) return;
  setOpen(false);
}

watch(isOpen, (open) => {
  if (open) document.addEventListener('pointerdown', onOutside);
  else document.removeEventListener('pointerdown', onOutside);
});
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside));
</script>

<template>
  <div ref="rootRef" class="q-mentions" :class="{ 'is-disabled': disabled }">
    <textarea
      class="q-mentions__textarea"
      :value="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="autoSize ? undefined : rows"
      :style="autoSize ? { overflow: 'hidden' } : undefined"
      @input="onInput"
      @keydown="onKeydown"
    />
    <div v-if="isOpen && candidates.length > 0" class="q-mentions__pop">
      <div
        v-for="(opt, index) in candidates"
        :key="opt.value"
        class="q-mentions__item"
        :class="{
          'is-active': index === activeIndex,
          'is-disabled': opt.disabled,
        }"
        @click="!opt.disabled && choose(opt)"
        @mousemove="!opt.disabled && (activeIndex = index)"
      >
        {{ optionLabel(opt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-mentions {
  position: relative;
  display: inline-block;
  width: 100%;
}
.q-mentions__textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-sm, 6px);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
  line-height: 1.6;
  padding: 6px 10px;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}
.q-mentions__textarea:focus {
  border-color: var(--q-color-primary);
}
.q-mentions.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.q-mentions__pop {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 160px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 30;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  box-shadow: var(--q-shadow-md, 0 6px 16px rgba(0, 0, 0, 0.12));
  padding: 4px;
}
.q-mentions__item {
  padding: 4px 10px;
  border-radius: var(--q-radius-sm, 6px);
  cursor: pointer;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
}
.q-mentions__item:hover,
.q-mentions__item.is-active {
  background: var(--q-color-bg-secondary);
  color: var(--q-color-primary);
}
.q-mentions__item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
