<!--
 * @component QSelect
 * @description 选择器，对齐 Ant Design Select：options 驱动、v-model:value 双向绑定，支持多选、搜索、清除与加载态
 -->
<template>
  <div
    ref="rootRef"
    class="q-select"
    :class="[
      statusClass,
      sizeClass,
      {
        'q-select--disabled': disabled,
        'q-select--open': isOpen,
        'q-select--multiple': isMultiple,
      },
    ]"
  >
    <div class="q-select__selector" @click="onSelectorClick">
      <template v-if="isMultiple">
        <span
          v-for="option in selectedOptions"
          :key="option.value"
          class="q-select__tag"
        >
          {{ option.label }}
          <span
            class="q-select__tag-remove"
            @click.stop="onRemove(option.value)"
            >×</span
          >
        </span>
      </template>
      <input
        ref="inputRef"
        class="q-select__input"
        :disabled="disabled"
        :name="name"
        :placeholder="inputPlaceholder"
        :readonly="!showSearch"
        :value="inputText"
        @blur="onBlur"
        @focus="onFocus"
        @input="onSearchInput"
      />
      <span v-if="loading" aria-hidden="true" class="q-select__spinner" />
      <span
        v-else-if="showClear"
        class="q-select__clear"
        @click.stop="onClear"
        @mousedown.prevent
        >×</span
      >
      <span v-else aria-hidden="true" class="q-select__arrow">▾</span>
    </div>

    <Transition name="q-select-fade">
      <div v-show="isOpen" class="q-select__dropdown scroll-container">
        <p v-if="!filteredOptions.length" class="q-select__empty">
          暂无匹配数据
        </p>
        <p
          v-for="option in filteredOptions"
          :key="option.value"
          class="q-select__option"
          :class="{
            'q-select__option--selected': isSelected(option.value),
            'q-select__option--disabled': option.disabled,
          }"
          @click="onSelect(option)"
          @mousedown.prevent
        >
          {{ option.label }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue';

import { useSelect } from './composable';
import type {
  NormalizedSelectOption,
  QSelectEmits,
  QSelectProps,
} from './type';

defineOptions({ name: 'QSelect' });

const props = withDefaults(defineProps<QSelectProps>(), {
  options: () => [],
  value: undefined,
  mode: 'default',
  placeholder: undefined,
  disabled: false,
  allowClear: false,
  showSearch: false,
  filterOption: undefined,
  size: 'middle',
  status: undefined,
  loading: false,
  open: undefined,
  name: undefined,
});

const emit = defineEmits<QSelectEmits>();

const {
  isMultiple,
  selectedOptions,
  filteredOptions,
  displayText,
  showClear,
  isOpen,
  innerOpen,
  searchText,
  statusClass,
  sizeClass,
  isSelected,
  nextValue,
  removeValue,
} = useSelect(props);

const inputRef = useTemplateRef<HTMLInputElement>('inputRef');

const rootRef = useTemplateRef<HTMLElement>('rootRef');

/** 输入框展示值：可搜索时展示关键字，否则展示单选文案 */
const inputText = computed(() =>
  props.showSearch ? searchText.value : displayText.value,
);

/** 占位文本：多选有标签时隐藏占位 */
const inputPlaceholder = computed(() =>
  isMultiple.value && selectedOptions.value.length
    ? ''
    : (props.placeholder ?? ''),
);

/** 切换展开状态并派发 dropdownVisibleChange */
function setOpen(next: boolean, notify = true) {
  if (props.disabled) return;
  if (props.open === undefined) innerOpen.value = next;
  if (notify) emit('dropdownVisibleChange', next);
}

/** 点击选择器区域：聚焦输入框并切换展开（开关状态只由此处与搜索输入决定） */
function onSelectorClick() {
  if (props.disabled) return;
  if (props.showSearch) inputRef.value?.focus();
  setOpen(!isOpen.value);
}

/** 选中选项 */
function onSelect(option: NormalizedSelectOption) {
  if (props.disabled || option.disabled) return;
  const next = nextValue(option);
  emit('update:value', next);
  emit('change', next, isMultiple.value ? selectedOptions.value : option);
  if (!isMultiple.value) {
    searchText.value = '';
    setOpen(false);
  }
}

/** 移除多选标签 */
function onRemove(value: string | number) {
  if (props.disabled) return;
  const next = removeValue(value);
  emit('update:value', next);
  emit('change', next, selectedOptions.value);
}

/** 搜索输入 */
function onSearchInput(ev: Event) {
  const value = (ev.target as HTMLInputElement).value;
  searchText.value = value;
  emit('search', value);
  if (!isOpen.value) setOpen(true, false);
}

/** 清空选中值 */
function onClear() {
  const next = isMultiple.value ? [] : undefined;
  emit('update:value', next);
  emit('change', next, isMultiple.value ? [] : ([] as never));
  emit('clear');
}

/** 聚焦：仅派发事件；展开由点击或搜索输入触发，避免与点击叠加导致面板闪现 */
function onFocus(ev: FocusEvent) {
  emit('focus', ev);
}

/** 失焦：清空搜索词并收起下拉 */
function onBlur(ev: FocusEvent) {
  emit('blur', ev);
  if (props.showSearch && props.open === undefined) searchText.value = '';
  setOpen(false);
}

/** 点击组件外部：收起下拉 */
function onDocumentMousedown(ev: MouseEvent) {
  const root = rootRef.value;
  if (!root || !(ev.target instanceof Node) || root.contains(ev.target)) return;
  if (isOpen.value) setOpen(false);
}

onMounted(() => document.addEventListener('mousedown', onDocumentMousedown));
onBeforeUnmount(() =>
  document.removeEventListener('mousedown', onDocumentMousedown),
);
</script>

<style scoped>
.q-select {
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
}

/* 边框 / 圆角 / 背景统一放在 selector 上：
   若放在外层容器，内部直角元素会盖住容器圆角内侧，出现「圆角发白、边框是主题色」的错位感 */
.q-select__selector {
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--q-space-2);
  box-sizing: border-box;
  min-width: 0;
  min-height: var(--q-space-9);
  padding: var(--q-space-2) var(--q-space-5);
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  cursor: pointer;
  transition: border-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-select--open .q-select__selector {
  border-color: var(--q-color-primary);
}

.q-select--disabled .q-select__selector {
  background-color: var(--q-color-bg-secondary);
  cursor: not-allowed;
}

.q-select--error .q-select__selector {
  border-color: var(--q-color-red-400);
}

.q-select--warning .q-select__selector {
  border-color: var(--q-color-orange-300);
}

.q-select__input {
  flex: 1;
  min-width: 2rem;
  border: none;
  background-color: transparent;
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  outline: none;
  cursor: inherit;
}

.q-select__input::placeholder {
  color: var(--q-color-text-muted);
}

.q-select__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-1);
  padding: 0 var(--q-space-3);
  border-radius: var(--q-radius-sm);
  background-color: var(--q-color-bg-secondary);
  color: var(--q-color-text);
  font-size: var(--q-font-size-xs);
  line-height: 1.5;
}

.q-select__tag-remove {
  cursor: pointer;
}

.q-select__arrow,
.q-select__clear {
  flex-shrink: 0;
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-sm);
}

.q-select__clear {
  cursor: pointer;
}

.q-select__spinner {
  flex-shrink: 0;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--q-color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: q-select-spin 0.8s linear infinite;
}

@keyframes q-select-spin {
  to {
    transform: rotate(360deg);
  }
}

.q-select__dropdown {
  position: absolute;
  z-index: var(--q-z-index-popover);
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  max-height: 15rem;
  padding: var(--q-space-2);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  box-shadow: 0 4px 12px var(--q-color-shadow);
  overflow-y: auto;
}

.q-select__option,
.q-select__empty {
  margin: 0;
  padding: var(--q-space-2) var(--q-space-5);
  border-radius: var(--q-radius-sm);
  font-size: var(--q-font-size-sm);
  color: var(--q-color-text);
  cursor: pointer;
}

.q-select__empty {
  color: var(--q-color-text-muted);
  cursor: default;
}

.q-select__option--selected {
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-medium, 500);
}

.q-select__option--disabled {
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-select__option:not(.q-select__option--disabled):hover {
  background-color: var(--q-color-bg-secondary);
}

.q-select-fade-enter-active,
.q-select-fade-leave-active {
  transition: opacity var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-select-fade-enter-from,
.q-select-fade-leave-to {
  opacity: 0;
}
</style>
