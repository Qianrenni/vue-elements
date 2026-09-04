<!--
 * @component QAutoComplete
 * @description 自动完成组件：输入框 + 下拉候选，支持过滤、键盘导航、清空与展开受控，对齐 Ant Design AutoComplete。
 -->
<template>
  <div
    ref="rootEl"
    :class="[
      `q-auto-complete--${props.size}`,
      { 'q-auto-complete--disabled': isDisabled },
    ]"
    class="q-auto-complete"
  >
    <div class="q-auto-complete-input-wrap">
      <input
        ref="inputEl"
        :aria-activedescendant="activeDesc"
        :aria-autocomplete="'list'"
        :aria-expanded="open"
        :disabled="isDisabled"
        :placeholder="props.placeholder"
        :value="text"
        aria-label="自动完成"
        autocomplete="off"
        class="q-auto-complete-input"
        role="combobox"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @keydown="onKeydown"
      />
      <span
        v-if="props.allowClear && text"
        class="q-auto-complete-clear"
        aria-hidden="true"
        @click="onClear"
        @mousedown.prevent
      >
        <QIcon icon="Close" size="12" />
      </span>
    </div>

    <!-- 候选下拉 -->
    <div v-show="open" class="q-auto-complete-dropdown">
      <ul v-if="filtered.length" class="q-auto-complete-list" role="listbox">
        <li
          v-for="(opt, i) in filtered"
          :id="`qac-opt-${i}`"
          :key="opt.value"
          :aria-selected="activeIndex === i"
          :class="{
            'q-auto-complete-option--active': activeIndex === i,
            'q-auto-complete-option--disabled': opt.disabled,
          }"
          class="q-auto-complete-option"
          role="option"
          @click="onPickOption(opt)"
          @mousedown.prevent
        >
          {{ opt.label }}
        </li>
      </ul>
      <div v-else class="q-auto-complete-empty">无匹配项</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';

import { useAutoComplete } from './composable';
import type {
  AutoCompleteEmits,
  AutoCompleteOption,
  AutoCompleteProps,
} from './type';

defineOptions({ name: 'QAutoComplete' });

const props = withDefaults(defineProps<AutoCompleteProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  disabled: false,
  allowClear: true,
  size: 'middle',
  open: undefined,
  filterOption: undefined,
});

const emit = defineEmits<AutoCompleteEmits>();

const {
  filtered,
  activeIndex,
  activeOption,
  isDisabled,
  moveActive,
  ensureFirst,
  selectOption,
  clear,
} = useAutoComplete(props, emit);

const text = computed(() => props.modelValue ?? '');

/** 展开状态（受控时跟随 props.open） */
const innerOpen = ref(false);
const open = computed(() =>
  props.open === undefined ? innerOpen.value : props.open,
);

/** 键盘高亮项对应的可访问标识 */
const activeDesc = computed(() =>
  open.value && activeIndex.value >= 0
    ? `qac-opt-${activeIndex.value}`
    : undefined,
);

const rootEl = useTemplateRef<HTMLElement>('rootEl');
const inputEl = useTemplateRef<HTMLInputElement>('inputEl');

/** 设置展开态（受控时派发 update:open） */
function setOpen(v: boolean) {
  if (props.open === undefined) innerOpen.value = v;
  else emit('update:open', v);
}

function openDropdown() {
  setOpen(true);
  ensureFirst();
}

function closeDropdown() {
  setOpen(false);
  activeIndex.value = -1;
}

function onFocus(e: FocusEvent) {
  emit('focus', e);
  openDropdown();
}

function onBlur(e: FocusEvent) {
  emit('blur', e);
  closeDropdown();
}

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  emit('search', value);
  openDropdown();
}

function onKeydown(e: KeyboardEvent) {
  if (isDisabled.value) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!open.value) openDropdown();
    else moveActive(1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (open.value) moveActive(-1);
  } else if (e.key === 'Enter') {
    if (open.value && activeOption.value) {
      e.preventDefault();
      selectOption(activeOption.value);
      closeDropdown();
    }
  } else if (e.key === 'Escape') {
    if (open.value) {
      e.preventDefault();
      closeDropdown();
    }
  }
}

/** 点击候选项 */
function onPickOption(opt: AutoCompleteOption) {
  if (opt.disabled) return;
  selectOption(opt);
  closeDropdown();
  inputEl.value?.focus();
}

/** 清空 */
function onClear() {
  clear();
  inputEl.value?.focus();
}

/** 点击外部关闭 */
function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (rootEl.value?.contains(target)) return;
  closeDropdown();
}

watch(open, (v) => {
  if (v) document.addEventListener('click', onDocClick);
  else document.removeEventListener('click', onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick);
});
</script>

<style scoped>
.q-auto-complete {
  position: relative;
  display: inline-block;
  width: 100%;
  color: var(--q-color-text);
}

.q-auto-complete-input-wrap {
  position: relative;
}

.q-auto-complete-input {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 var(--q-space-4);
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  color: inherit;
  font: inherit;
  outline: none;
  transition: var(--q-transition-border);
}

.q-auto-complete-input:hover,
.q-auto-complete-input:focus {
  border-color: var(--q-color-primary);
}

.q-auto-complete--disabled .q-auto-complete-input {
  background: var(--q-color-bg-secondary);
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-auto-complete--small .q-auto-complete-input {
  height: 24px;
  font-size: var(--q-font-size-xs);
}

.q-auto-complete--middle .q-auto-complete-input {
  height: 32px;
  font-size: var(--q-font-size-sm);
}

.q-auto-complete--large .q-auto-complete-input {
  height: 40px;
  font-size: var(--q-font-size-base);
}

.q-auto-complete-clear {
  position: absolute;
  top: 50%;
  right: var(--q-space-3);
  display: inline-flex;
  transform: translateY(-50%);
  color: var(--q-color-text-muted);
  cursor: pointer;
}

.q-auto-complete-input-wrap:has(.q-auto-complete-clear) .q-auto-complete-input {
  padding-right: 28px;
}

/* — 下拉 — */
.q-auto-complete-dropdown {
  position: absolute;
  top: calc(100% + var(--q-space-1));
  right: 0;
  left: 0;
  z-index: var(--z-index-level-3);
  box-sizing: border-box;
  max-height: 260px;
  overflow: auto;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  box-shadow: var(--q-shadow-md);
}

.q-auto-complete-list {
  margin: 0;
  padding: var(--q-space-1) 0;
  list-style: none;
}

.q-auto-complete-option {
  box-sizing: border-box;
  padding: 0 var(--q-space-4);
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-auto-complete-option--active {
  background: var(--q-color-primary-lighter);
}

.q-auto-complete-option--disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-auto-complete-empty {
  padding: var(--q-space-4);
  text-align: center;
  color: var(--q-color-text-tertiary);
}
</style>
